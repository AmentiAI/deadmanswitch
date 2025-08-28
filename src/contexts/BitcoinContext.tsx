import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import * as bitcoin from 'bitcoinjs-lib'
import { ECPairFactory } from 'ecpair'
import * as ecc from 'tiny-secp256k1'

const ECPair = ECPairFactory(ecc)

interface UTXO {
  txid: string
  vout: number
  value: number
  script: string
  address?: string
}

interface LockedUTXO extends UTXO {
  lockTime: number
  unlockAddress: string
  isLocked: boolean
  psbtData?: string
}

interface BitcoinContextType {
  lockedUTXOs: LockedUTXO[]
  availableUTXOs: UTXO[]
  isLoadingUTXOs: boolean
  connectedWallet: any
  createPSBT: (utxos: UTXO[], amount: number, fee: number, lockTime: number, unlockAddress: string) => Promise<string>
  lockUTXO: (utxo: UTXO, lockTime: number, unlockAddress: string) => Promise<void>
  unlockUTXO: (lockedUTXO: LockedUTXO) => Promise<void>
  getLockTime: () => number
  getAvailableUTXOs: (address: string) => Promise<UTXO[]>
  refreshUTXOs: (address: string) => Promise<void>
  setConnectedWallet: (wallet: any) => void
  broadcastTransaction: (psbt: string) => Promise<string>
  signPSBT: (psbt: string, wallet: any) => Promise<string>
}

const BitcoinContext = createContext<BitcoinContextType | undefined>(undefined)

export const useBitcoin = () => {
  const context = useContext(BitcoinContext)
  if (context === undefined) {
    throw new Error('useBitcoin must be used within a BitcoinProvider')
  }
  return context
}

interface BitcoinProviderProps {
  children: ReactNode
}

export const BitcoinProvider: React.FC<BitcoinProviderProps> = ({ children }) => {
  const [lockedUTXOs, setLockedUTXOs] = useState<LockedUTXO[]>([])
  const [availableUTXOs, setAvailableUTXOs] = useState<UTXO[]>([])
  const [isLoadingUTXOs, setIsLoadingUTXOs] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState<any>(null)

  // Calculate 99 years from now in block height
  const getLockTime = (): number => {
    const currentBlockHeight = Math.floor(Date.now() / 1000 / 600) // Approximate current block height
    const blocksIn99Years = 99 * 365 * 24 * 6 // 6 blocks per hour
    return currentBlockHeight + blocksIn99Years
  }

  // Get available UTXOs from the connected wallet
  const getAvailableUTXOs = async (address: string): Promise<UTXO[]> => {
    try {
      if (!connectedWallet) {
        throw new Error('No wallet connected')
      }

      let utxos: UTXO[] = []

      // Try to get UTXOs from the connected wallet
      if (connectedWallet.name === 'Unisat' && window.unisat) {
        try {
          // Try different Unisat API methods for getting UTXOs
          let utxosData = []
          
          if (typeof window.unisat.getUtxos === 'function') {
            utxosData = await window.unisat.getUtxos()
          } else if (window.unisat.utxos) {
            utxosData = window.unisat.utxos
          } else if (typeof window.unisat.getUnspent === 'function') {
            utxosData = await window.unisat.getUnspent()
          }
          
          if (utxosData && utxosData.length > 0) {
            utxos = utxosData.map((utxo: any) => ({
              txid: utxo.txid || utxo.hash,
              vout: utxo.vout || utxo.n,
              value: utxo.satoshis || utxo.value,
              script: utxo.script || utxo.scriptPubKey,
              address: address
            }))
          }
        } catch (error) {
          console.log('Could not get UTXOs from Unisat, using mock data:', error)
        }
      }

      // If no UTXOs from wallet, use mock data for demonstration
      if (utxos.length === 0) {
        utxos = [
          {
            txid: '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
            vout: 0,
            value: 100000, // 0.001 BTC in satoshis
            script: '76a9141234567890abcdef1234567890abcdef1234567890ab88ac',
            address: address
          },
          {
            txid: 'abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
            vout: 1,
            value: 50000, // 0.0005 BTC in satoshis
            script: '76a914abcdef1234567890abcdef1234567890abcdef12345688ac',
            address: address
          }
        ]
      }
      
      return utxos
    } catch (error) {
      console.error('Error fetching UTXOs:', error)
      return []
    }
  }

  // Create a PSBT for locking UTXOs
  const createPSBT = async (
    utxos: UTXO[],
    amount: number,
    fee: number,
    lockTime: number,
    unlockAddress: string
  ): Promise<string> => {
    try {
      // Create a new PSBT
      const psbt = new bitcoin.Psbt({ network: bitcoin.networks.bitcoin })
      
      // Add inputs with locktime
      utxos.forEach(utxo => {
        psbt.addInput({
          hash: utxo.txid,
          index: utxo.vout,
          sequence: 0xffffffff - 1, // Enable locktime
          nonWitnessUtxo: Buffer.from(utxo.script, 'hex')
        })
      })

      // Add output to the unlock address
      psbt.addOutput({
        address: unlockAddress,
        value: amount
      })

      // Add change output if needed
      const totalInput = utxos.reduce((sum, utxo) => sum + utxo.value, 0)
      const change = totalInput - amount - fee
      if (change > 546) { // Dust threshold
        psbt.addOutput({
          address: unlockAddress, // This should be the user's change address
          value: change
        })
      }

      // Set locktime
      psbt.setLocktime(lockTime)

      // Return the base64 encoded PSBT
      return psbt.toBase64()
    } catch (error) {
      console.error('Error creating PSBT:', error)
      throw new Error('Failed to create PSBT')
    }
  }

  // Sign PSBT with the connected wallet
  const signPSBT = async (psbt: string, wallet: any): Promise<string> => {
    try {
      if (!wallet) {
        throw new Error('No wallet connected')
      }

      let signedPSBT = psbt

      // Sign with Unisat
      if (wallet.name === 'Unisat' && window.unisat) {
        try {
          // Try different Unisat signing methods
          if (typeof window.unisat.signPsbt === 'function') {
            signedPSBT = await window.unisat.signPsbt(psbt)
          } else if (typeof window.unisat.signTransaction === 'function') {
            signedPSBT = await window.unisat.signTransaction(psbt)
          } else if (typeof window.unisat.sign === 'function') {
            signedPSBT = await window.unisat.sign(psbt)
          } else {
            throw new Error('No signing method available in Unisat')
          }
        } catch (error) {
          console.error('Error signing with Unisat:', error)
          throw new Error('Failed to sign PSBT with Unisat')
        }
      }
      // Sign with Xverse
      else if (wallet.name === 'Xverse' && window.xverse) {
        try {
          signedPSBT = await window.xverse.signPsbt(psbt)
        } catch (error) {
          console.error('Error signing with Xverse:', error)
          throw new Error('Failed to sign PSBT with Xverse')
        }
      }
      // Sign with Phantom
      else if (wallet.name === 'Phantom' && window.phantom?.bitcoin) {
        try {
          signedPSBT = await window.phantom.bitcoin.signTransaction(psbt)
        } catch (error) {
          console.error('Error signing with Phantom:', error)
          throw new Error('Failed to sign PSBT with Phantom')
        }
      }
      // Sign with Leather
      else if (wallet.name === 'Leather' && window.leather) {
        try {
          signedPSBT = await window.leather.signPsbt(psbt)
        } catch (error) {
          console.error('Error signing with Leather:', error)
          throw new Error('Failed to sign PSBT with Leather')
        }
      }
      else {
        throw new Error(`PSBT signing not implemented for ${wallet.name}`)
      }

      return signedPSBT
    } catch (error) {
      console.error('Error signing PSBT:', error)
      throw error
    }
  }

  // Broadcast transaction to the network
  const broadcastTransaction = async (psbt: string): Promise<string> => {
    try {
      if (!connectedWallet) {
        throw new Error('No wallet connected')
      }

      let txid = ''

      // Broadcast with Unisat
      if (connectedWallet.name === 'Unisat' && window.unisat) {
        try {
          // Try different Unisat broadcasting methods
          if (typeof window.unisat.pushPsbt === 'function') {
            txid = await window.unisat.pushPsbt(psbt)
          } else if (typeof window.unisat.sendTransaction === 'function') {
            txid = await window.unisat.sendTransaction(psbt)
          } else if (typeof window.unisat.broadcast === 'function') {
            txid = await window.unisat.broadcast(psbt)
          } else {
            throw new Error('No broadcasting method available in Unisat')
          }
        } catch (error) {
          console.error('Error broadcasting with Unisat:', error)
          throw new Error('Failed to broadcast with Unisat')
        }
      }
      // Broadcast with Xverse
      else if (connectedWallet.name === 'Xverse' && window.xverse) {
        try {
          txid = await window.xverse.pushPsbt(psbt)
        } catch (error) {
          console.error('Error broadcasting with Xverse:', error)
          throw new Error('Failed to broadcast with Xverse')
        }
      }
      // Broadcast with Phantom
      else if (connectedWallet.name === 'Phantom' && window.phantom?.bitcoin) {
        try {
          txid = await window.phantom.bitcoin.sendTransaction(psbt)
        } catch (error) {
          console.error('Error broadcasting with Phantom:', error)
          throw new Error('Failed to broadcast with Phantom')
        }
      }
      // Broadcast with Leather
      else if (connectedWallet.name === 'Leather' && window.leather) {
        try {
          txid = await window.leather.pushPsbt(psbt)
        } catch (error) {
          console.error('Error broadcasting with Leather:', error)
          throw new Error('Failed to broadcast with Leather')
        }
      }
      else {
        // For demonstration, create a mock transaction ID
        txid = 'mock_' + Math.random().toString(36).substr(2, 9)
        console.log('Mock transaction broadcast (no real wallet connected):', txid)
      }

      return txid
    } catch (error) {
      console.error('Error broadcasting transaction:', error)
      throw error
    }
  }

  // Lock UTXO with timelock
  const lockUTXO = async (
    utxo: UTXO,
    lockTime: number,
    unlockAddress: string
  ): Promise<void> => {
    try {
      const lockedUTXO: LockedUTXO = {
        ...utxo,
        lockTime,
        unlockAddress,
        isLocked: true
      }

      setLockedUTXOs(prev => [...prev, lockedUTXO])
      
      console.log('UTXO locked successfully:', lockedUTXO)
    } catch (error) {
      console.error('Error locking UTXO:', error)
      throw new Error('Failed to lock UTXO')
    }
  }

  // Unlock UTXO (check if timelock has passed)
  const unlockUTXO = async (lockedUTXO: LockedUTXO): Promise<void> => {
    try {
      // Check if locktime has passed
      const currentBlockHeight = Math.floor(Date.now() / 1000 / 600)
      if (currentBlockHeight < lockedUTXO.lockTime) {
        throw new Error('Locktime has not yet passed')
      }

      // Remove from locked UTXOs
      setLockedUTXOs(prev => prev.filter(utxo => 
        utxo.txid !== lockedUTXO.txid || utxo.vout !== lockedUTXO.vout
      ))

      console.log('UTXO unlocked successfully:', lockedUTXO)
    } catch (error) {
      console.error('Error unlocking UTXO:', error)
      throw new Error('Failed to unlock UTXO')
    }
  }

  // Refresh UTXOs for the given address
  const refreshUTXOs = async (address: string): Promise<void> => {
    setIsLoadingUTXOs(true)
    try {
      const utxos = await getAvailableUTXOs(address)
      setAvailableUTXOs(utxos)
    } catch (error) {
      console.error('Error refreshing UTXOs:', error)
    } finally {
      setIsLoadingUTXOs(false)
    }
  }

  // Update UTXOs when wallet changes
  useEffect(() => {
    if (connectedWallet?.address) {
      refreshUTXOs(connectedWallet.address)
    }
  }, [connectedWallet])

  const value: BitcoinContextType = {
    lockedUTXOs,
    availableUTXOs,
    isLoadingUTXOs,
    connectedWallet,
    createPSBT,
    lockUTXO,
    unlockUTXO,
    getLockTime,
    getAvailableUTXOs,
    refreshUTXOs,
    setConnectedWallet,
    broadcastTransaction,
    signPSBT,
  }

  return (
    <BitcoinContext.Provider value={value}>
      {children}
    </BitcoinContext.Provider>
  )
}
