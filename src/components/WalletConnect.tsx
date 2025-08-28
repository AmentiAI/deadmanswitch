import React from 'react'
import { Wallet, LogOut, Copy, Check, Bitcoin } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useBitcoin } from '../contexts/BitcoinContext'

// Extend Window interface for wallet detection
declare global {
  interface Window {
    unisat?: any
    xverse?: any
    leather?: any
    okxwallet?: any
    bitgetwallet?: any
    phantom?: any
    hiro?: any
    alby?: any
  }
}

interface WalletInfo {
  name: string
  address: string
  balance?: number
  network: 'mainnet' | 'testnet'
}

const WalletConnect: React.FC = () => {
  const { setConnectedWallet: setBitcoinWallet } = useBitcoin()
  
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const [connectedWallet, setConnectedWallet] = useState<WalletInfo | null>(null)
  const [isConnectingDirect, setIsConnectingDirect] = useState(false)

  // Check for available Bitcoin wallets
  const getAvailableWallets = () => {
    const wallets = []
    if (typeof window !== 'undefined') {
      if (window.unisat) wallets.push({ name: 'Unisat', key: 'unisat' })
      if (window.xverse) wallets.push({ name: 'Xverse', key: 'xverse' })
      if (window.leather) wallets.push({ name: 'Leather', key: 'leather' })
      if (window.okxwallet) wallets.push({ name: 'OKX', key: 'okxwallet' })
      if (window.bitgetwallet) wallets.push({ name: 'Bitget', key: 'bitgetwallet' })
      if (window.phantom) wallets.push({ name: 'Phantom', key: 'phantom' })
      if (window.hiro) wallets.push({ name: 'Hiro', key: 'hiro' })
      if (window.alby) wallets.push({ name: 'Alby', key: 'alby' })
    }
    return wallets
  }

  // Connect to Unisat wallet
  const connectUnisat = async () => {
    try {
      setIsConnectingDirect(true)
      setError('')
      setSuccess('')
      
      if (!window.unisat) {
        throw new Error('Unisat wallet not found. Please install the Unisat extension.')
      }

      // Unisat API has changed - use the correct methods
      try {
        // Request connection first
        const accounts = await window.unisat.requestAccounts()
        
        // Get network and balance
        const network = await window.unisat.getNetwork()
        let balance = 0
        
        try {
          const balanceData = await window.unisat.getBalance()
          balance = balanceData.total || balanceData.confirmed || 0
        } catch (balanceError) {
          console.log('Could not get balance, using 0')
        }
        
        const walletInfo: WalletInfo = {
          name: 'Unisat',
          address: accounts[0],
          balance: balance,
          network: network === 'livenet' ? 'mainnet' : 'testnet'
        }
        
        setConnectedWallet(walletInfo)
        setBitcoinWallet(walletInfo)
        setSuccess(`Connected to Unisat! Address: ${accounts[0].slice(0, 8)}...${accounts[0].slice(-8)}`)
        console.log('Unisat connected:', walletInfo)
      } catch (connectionError) {
        // Try alternative connection method
        if (window.unisat.accounts && window.unisat.accounts.length > 0) {
          const accounts = window.unisat.accounts
          const network = await window.unisat.getNetwork()
          
          const walletInfo: WalletInfo = {
            name: 'Unisat',
            address: accounts[0],
            network: network === 'livenet' ? 'mainnet' : 'testnet'
          }
          
          setConnectedWallet(walletInfo)
          setBitcoinWallet(walletInfo)
          setSuccess(`Connected to Unisat! Address: ${accounts[0].slice(0, 8)}...${accounts[0].slice(-8)}`)
          console.log('Unisat connected (alternative method):', walletInfo)
        } else {
          throw connectionError
        }
      }
    } catch (error) {
      console.error('Error connecting Unisat:', error)
      setError('Failed to connect Unisat: ' + (error as Error).message)
    } finally {
      setIsConnectingDirect(false)
    }
  }

  // Connect to Xverse wallet
  const connectXverse = async () => {
    try {
      setIsConnectingDirect(true)
      setError('')
      setSuccess('')
      
      if (!window.xverse) {
        throw new Error('Xverse wallet not found. Please install the Xverse extension.')
      }

      // Xverse uses a different API
      const accounts = await window.xverse.requestAccounts()
      const network = await window.xverse.getNetwork()
      
      const walletInfo: WalletInfo = {
        name: 'Xverse',
        address: accounts[0],
        network: network === 'mainnet' ? 'mainnet' : 'testnet'
      }
      
      setConnectedWallet(walletInfo)
      setBitcoinWallet(walletInfo)
      setSuccess(`Connected to Xverse! Address: ${accounts[0].slice(0, 8)}...${accounts[0].slice(-8)}`)
      console.log('Xverse connected:', walletInfo)
    } catch (error) {
      console.error('Error connecting Xverse:', error)
      setError('Failed to connect Xverse: ' + (error as Error).message)
    } finally {
      setIsConnectingDirect(false)
    }
  }

  // Connect to Phantom wallet
  const connectPhantom = async () => {
    try {
      setIsConnectingDirect(true)
      setError('')
      setSuccess('')
      
      if (!window.phantom) {
        throw new Error('Phantom wallet not found. Please install the Phantom extension.')
      }

      // Phantom Bitcoin wallet connection
      if (window.phantom.bitcoin) {
        const resp = await window.phantom.bitcoin.connect()
        const accounts = await window.phantom.bitcoin.getAccounts()
        
        const walletInfo: WalletInfo = {
          name: 'Phantom',
          address: accounts[0].address,
          network: 'mainnet' // Phantom Bitcoin is mainnet only
        }
        
        setConnectedWallet(walletInfo)
        setBitcoinWallet(walletInfo)
        setSuccess(`Connected to Phantom! Address: ${accounts[0].address.slice(0, 8)}...${accounts[0].address.slice(-8)}`)
        console.log('Phantom connected:', walletInfo)
      } else {
        throw new Error('Phantom Bitcoin wallet not available')
      }
    } catch (error) {
      console.error('Error connecting Phantom:', error)
      setError('Failed to connect Phantom: ' + (error as Error).message)
    } finally {
      setIsConnectingDirect(false)
    }
  }

  // Connect to Leather wallet
  const connectLeather = async () => {
    try {
      setIsConnectingDirect(true)
      setError('')
      setSuccess('')
      
      if (!window.leather) {
        throw new Error('Leather wallet not found. Please install the Leather extension.')
      }

      // Leather wallet connection
      const accounts = await window.leather.requestAccounts()
      
      const walletInfo: WalletInfo = {
        name: 'Leather',
        address: accounts[0],
        network: 'mainnet' // Leather is mainnet by default
      }
      
      setConnectedWallet(walletInfo)
      setBitcoinWallet(walletInfo)
      setSuccess(`Connected to Leather! Address: ${accounts[0].slice(-8)}`)
      console.log('Leather connected:', walletInfo)
    } catch (error) {
      console.error('Error connecting Leather:', error)
      setError('Failed to connect Leather: ' + (error as Error).message)
    } finally {
      setIsConnectingDirect(false)
    }
  }

  // Generic wallet connector
  const connectWallet = async (walletKey: string) => {
    switch (walletKey) {
      case 'unisat':
        await connectUnisat()
        break
      case 'xverse':
        await connectXverse()
        break
      case 'phantom':
        await connectPhantom()
        break
      case 'leather':
        await connectLeather()
        break
      default:
        setError(`${walletKey} connection not yet implemented.`)
    }
  }

  // Disconnect wallet
  const disconnectWallet = () => {
    setConnectedWallet(null)
    setBitcoinWallet(null)
    setSuccess('')
    setError('')
    console.log('Wallet disconnected')
  }

  // Copy address to clipboard
  const copyAddress = async () => {
    const addressToCopy = connectedWallet?.address
    if (addressToCopy) {
      await navigator.clipboard.writeText(addressToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  // Clear messages after 5 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('')
        setError('')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [success, error])

  // Show connecting state
  if (isConnectingDirect) {
    return (
      <div className="card max-w-md mx-auto mb-8 text-center">
        <div className="mb-4">
          <Wallet className="w-12 h-12 text-bitcoin-orange mx-auto mb-3 animate-pulse" />
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            Connecting...
          </h2>
          <p className="text-text-secondary">
            Please approve the connection in your wallet
          </p>
        </div>
      </div>
    )
  }

  // Show connected state
  if (connectedWallet) {
    return (
      <div className="card max-w-md mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">
            Wallet Connected
          </h2>
          <button
            onClick={disconnectWallet}
            className="text-accent-red hover:text-red-400 transition-colors"
            title="Disconnect"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
        
        <div className="bg-dark-bg rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-secondary text-sm">Wallet:</span>
            <span className="text-bitcoin-orange font-semibold">{connectedWallet.name}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-secondary text-sm">Network:</span>
            <span className="text-text-primary font-mono text-sm">{connectedWallet.network}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-secondary text-sm">Address:</span>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-text-primary text-sm">
                {formatAddress(connectedWallet.address)}
              </span>
              <button
                onClick={copyAddress}
                className="text-text-secondary hover:text-bitcoin-orange transition-colors"
                title="Copy address"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-accent-green" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          {connectedWallet.balance && (
            <div className="flex items-center justify-between">
              <span className="text-text-secondary text-sm">Balance:</span>
              <span className="text-bitcoin-orange font-semibold">
                {(connectedWallet.balance / 100000000).toFixed(8)} BTC
              </span>
            </div>
          )}
        </div>
        
        <div className="text-center">
          <p className="text-sm text-text-secondary">
            You can now lock your Bitcoin UTXOs for 99 years
          </p>
        </div>
      </div>
    )
  }

  // Show wallet selection
  const availableWalletsList = getAvailableWallets()
  
  return (
    <div className="card max-w-md mx-auto mb-8 text-center">
      <div className="mb-4">
        <Wallet className="w-12 h-12 text-bitcoin-orange mx-auto mb-3" />
        <h2 className="text-xl font-semibold text-text-primary mb-2">
          Connect Your Bitcoin Wallet
        </h2>
        <p className="text-text-secondary">
          Connect your Bitcoin wallet to start using the Dead Man's Switch
        </p>
      </div>
      
      <div className="space-y-4">
        {error && (
          <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-3">
            <p className="text-green-400 text-sm">{success}</p>
          </div>
        )}
        
        <div className="space-y-2">
          <p className="text-sm text-text-secondary">Available wallets:</p>
          
          {/* Direct wallet connections */}
          {availableWalletsList.length > 0 ? (
            <div className="space-y-2">
              {availableWalletsList.map((wallet, index) => (
                <button
                  key={`direct-${index}`}
                  onClick={() => connectWallet(wallet.key)}
                  className="btn-primary w-full text-left px-4 py-3"
                >
                  <span className="flex items-center space-x-2">
                    <Bitcoin className="w-5 h-5" />
                    <span>Connect {wallet.name}</span>
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-text-secondary mb-2">No Bitcoin wallets detected</p>
              <p className="text-sm text-text-secondary">
                Please install a Bitcoin wallet extension like Unisat, Xverse, or Phantom
              </p>
            </div>
          )}
        </div>
        
        <div className="text-xs text-text-secondary text-center">
          <p>Make sure you have a Bitcoin wallet extension installed:</p>
          <p>• Unisat • Xverse • Phantom • Leather • OKX • Bitget • Hiro • Alby</p>
        </div>
      </div>
    </div>
  )
}

export default WalletConnect
