import React, { useState, useEffect } from 'react'
import { useBitcoin } from '../contexts/BitcoinContext'
import { Lock, Unlock, Clock, Bitcoin, Download, AlertTriangle } from 'lucide-react'

const DeadMansSwitch: React.FC = () => {
  const { 
    lockedUTXOs, 
    availableUTXOs, 
    isLoadingUTXOs,
    connectedWallet,
    createPSBT, 
    lockUTXO, 
    unlockUTXO, 
    getLockTime,
    refreshUTXOs,
    signPSBT,
    broadcastTransaction
  } = useBitcoin()
  
  const [amount, setAmount] = useState('')
  const [fee, setFee] = useState('0.0001')
  const [unlockAddress, setUnlockAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [psbtData, setPsbtData] = useState('')
  const [showPSBT, setShowPSBT] = useState(false)
  const [selectedUTXO, setSelectedUTXO] = useState<string>('')

  // Load UTXOs when wallet connects
  useEffect(() => {
    if (connectedWallet?.address) {
      refreshUTXOs(connectedWallet.address)
      setUnlockAddress(connectedWallet.address) // Default unlock address to connected wallet
    }
  }, [connectedWallet, refreshUTXOs])

  const handleLockUTXO = async () => {
    if (!connectedWallet) {
      alert('Please connect your wallet first')
      return
    }

    if (!selectedUTXO || !amount || !unlockAddress) {
      alert('Please select a UTXO and fill in all fields')
      return
    }

    setIsLoading(true)
    try {
      const lockTime = getLockTime()
      const amountSatoshis = Math.floor(parseFloat(amount) * 100000000)
      const feeSatoshis = Math.floor(parseFloat(fee) * 100000000)

      // Find the selected UTXO
      const utxo = availableUTXOs.find(u => `${u.txid}:${u.vout}` === selectedUTXO)
      if (!utxo) {
        throw new Error('Selected UTXO not found')
      }

      // Create PSBT
      const psbt = await createPSBT([utxo], amountSatoshis, feeSatoshis, lockTime, unlockAddress)
      
      // Sign the PSBT with the connected wallet
      const signedPSBT = await signPSBT(psbt, connectedWallet)
      
      // Broadcast the transaction
      const txid = await broadcastTransaction(signedPSBT)
      
      // Lock the UTXO in our state
      await lockUTXO(utxo, lockTime, unlockAddress)
      
      // Show the signed PSBT
      setPsbtData(signedPSBT)
      setShowPSBT(true)
      
      alert(`🚀 DEAD MAN'S SWITCH DEPLOYED SUCCESSFULLY!\n\nTransaction ID: ${txid}\n\nYour UTXO is now locked for 99 years!`)
    } catch (error) {
      console.error('Error locking UTXO:', error)
      alert('Failed to lock UTXO: ' + (error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnlockUTXO = async (lockedUTXO: any) => {
    try {
      await unlockUTXO(lockedUTXO)
      alert('UTXO unlocked successfully!')
    } catch (error) {
      console.error('Error unlocking UTXO:', error)
      alert('Failed to unlock UTXO: ' + (error as Error).message)
    }
  }

  const downloadPSBT = () => {
    const blob = new Blob([psbtData], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'deadmans-switch-psbt.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!connectedWallet) {
    return (
      <div className="card max-w-2xl mx-auto text-center">
        <Lock className="w-16 h-16 text-text-secondary mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-text-primary mb-2">
          Connect Wallet to Continue
        </h2>
        <p className="text-text-secondary">
          You need to connect your wallet to use the Dead Man's Switch
        </p>
      </div>
    )
  }

  return (
    <div id="deadmans-switch" className="space-y-8">
      {/* Debug Info */}
      <div className="card max-w-2xl mx-auto bg-blue-900/20 border border-blue-500/30">
        <h3 className="text-lg font-semibold text-blue-400 mb-2">Debug Info</h3>
        <p className="text-sm text-blue-300">Connected: {connectedWallet ? 'Yes' : 'No'}</p>
        <p className="text-sm text-blue-300">UTXOs: {availableUTXOs.length}</p>
        <p className="text-sm text-blue-300">Amount: {amount}</p>
        <p className="text-sm text-blue-300">Fee: {fee}</p>
        <p className="text-sm text-blue-300">Address: {unlockAddress}</p>
      </div>

      {/* Lock UTXO Form */}
      <div className="card max-w-2xl mx-auto bg-gradient-to-br from-card-bg via-accent-red/5 to-bitcoin-orange/5 border-2 border-accent-red/30 shadow-xl shadow-accent-red/20 relative z-10">
        <div className="flex items-center space-x-3 mb-6">
          <Lock className="w-10 h-10 text-accent-red animate-pulse" />
          <h2 className="text-3xl font-bold text-text-primary font-mono">
            🚨 DEPLOY LOCK PROTOCOL
          </h2>
        </div>

        <div className="space-y-6">
          {/* UTXO Selection */}
          <div className="bg-dark-bg/50 rounded-lg p-4 border border-border-color">
            <label className="block text-sm font-medium text-text-secondary mb-3">
              Select UTXO to Lock
            </label>
            {isLoadingUTXOs ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bitcoin-orange mx-auto"></div>
                <p className="text-sm text-text-secondary mt-2">Loading available UTXOs...</p>
              </div>
            ) : availableUTXOs.length > 0 ? (
              <select
                value={selectedUTXO}
                onChange={(e) => {
                  setSelectedUTXO(e.target.value)
                  const utxo = availableUTXOs.find(u => `${u.txid}:${u.vout}` === e.target.value)
                  if (utxo) {
                    setAmount((utxo.value / 100000000).toFixed(8))
                  }
                }}
                className="input-field bg-card-bg border-2 border-bitcoin-orange/30 focus:border-bitcoin-orange"
              >
                <option value="">Select a UTXO</option>
                {availableUTXOs.map((utxo) => (
                  <option key={`${utxo.txid}:${utxo.vout}`} value={`${utxo.txid}:${utxo.vout}`}>
                    {(utxo.value / 100000000).toFixed(8)} BTC - {utxo.txid.slice(0, 8)}...{utxo.txid.slice(-8)}:{utxo.vout}
                  </option>
                ))}
              </select>
            ) : (
              <div className="text-center py-4 text-text-secondary">
                <p>No UTXOs available</p>
                <button
                  onClick={() => {
                    if (connectedWallet?.address) refreshUTXOs(connectedWallet.address)
                  }}
                  className="text-bitcoin-orange hover:text-bitcoin-gold text-sm mt-2"
                >
                  Refresh UTXOs
                </button>
              </div>
            )}
          </div>

          <div className="bg-dark-bg/50 rounded-lg p-4 border border-border-color">
            <label className="block text-sm font-medium text-text-secondary mb-3">
              Amount to Lock (BTC)
            </label>
            <input
              type="number"
              step="0.00000001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.001"
              className="input-field bg-card-bg border-2 border-bitcoin-orange/30 focus:border-bitcoin-orange"
              disabled={!selectedUTXO}
            />
            {!selectedUTXO && (
              <p className="text-xs text-text-secondary mt-2">Select a UTXO first to set amount</p>
            )}
          </div>

          <div className="bg-dark-bg/50 rounded-lg p-4 border border-border-color">
            <label className="block text-sm font-medium text-text-secondary mb-3">
              Network Fee (BTC)
            </label>
            <input
              type="number"
              step="0.00000001"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              placeholder="0.0001"
              className="input-field bg-card-bg border-2 border-bitcoin-orange/30 focus:border-bitcoin-orange"
            />
            <p className="text-xs text-text-secondary mt-2">Recommended: 0.0001 BTC</p>
          </div>

          <div className="bg-dark-bg/50 rounded-lg p-4 border border-border-color">
            <label className="block text-sm font-medium text-text-secondary mb-3">
              Unlock Address
            </label>
            <input
              type="text"
              value={unlockAddress}
              onChange={(e) => setUnlockAddress(e.target.value)}
              placeholder="bc1..."
              className="input-field bg-card-bg border-2 border-bitcoin-orange/30 focus:border-bitcoin-orange"
            />
            <p className="text-xs text-text-secondary mt-2">Address where funds will be unlocked after 99 years</p>
          </div>

          <div className="bg-dark-bg rounded-lg p-4 border border-border-color">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-bitcoin-orange" />
              <span className="text-sm font-medium text-text-primary">Lock Duration</span>
            </div>
            <p className="text-sm text-text-secondary">
              Your UTXO will be locked for exactly 99 years from now. 
              The locktime is set to block height: {getLockTime().toLocaleString()}
            </p>
          </div>

          <button
            onClick={handleLockUTXO}
            disabled={isLoading || !selectedUTXO || !amount || !unlockAddress}
            className="bg-gradient-to-r from-accent-red to-bitcoin-orange text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-bitcoin-orange hover:to-accent-red transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-accent-red/50 border-2 border-accent-red disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none w-full"
          >
            {isLoading ? '🚀 DEPLOYING PROTOCOL...' : '🚀 DEPLOY LOCK PROTOCOL'}
          </button>
        </div>
      </div>

      {/* PSBT Display */}
      {showPSBT && (
        <div className="card max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-text-primary">Generated PSBT</h3>
            <button
              onClick={downloadPSBT}
              className="btn-secondary flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download PSBT</span>
            </button>
          </div>
          
          <div className="bg-dark-bg rounded-lg p-4 border border-border-color">
            <p className="text-sm text-text-secondary mb-2">PSBT Data (Base64):</p>
            <div className="font-mono text-xs text-text-primary break-all bg-card-bg p-3 rounded border">
              {psbtData}
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-yellow-400 mb-1">Important</h4>
                <p className="text-sm text-yellow-300">
                  Save this PSBT securely. You'll need it to unlock your UTXO after 99 years. 
                  The transaction must be signed and broadcast to the Bitcoin network to activate the lock.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Locked UTXOs Display */}
      {lockedUTXOs.length > 0 && (
        <div className="card max-w-2xl mx-auto">
          <div className="flex items-center space-x-3 mb-6">
            <Lock className="w-8 h-8 text-accent-red" />
            <h2 className="text-2xl font-semibold text-text-primary">
              Locked UTXOs
            </h2>
          </div>

          <div className="space-y-4">
            {lockedUTXOs.map((utxo, index) => (
              <div key={index} className="bg-dark-bg rounded-lg p-4 border border-border-color">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Bitcoin className="w-5 h-5 text-bitcoin-orange" />
                    <span className="text-sm font-medium text-text-primary">
                      {(utxo.value / 100000000).toFixed(8)} BTC
                    </span>
                  </div>
                  <span className="text-xs text-text-secondary">
                    Locked until block {utxo.lockTime.toLocaleString()}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">TXID:</span>
                    <span className="font-mono text-text-primary">
                      {utxo.txid.slice(0, 8)}...{utxo.txid.slice(-8)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Vout:</span>
                    <span className="text-text-primary">{utxo.vout}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Unlock Address:</span>
                    <span className="font-mono text-text-primary">
                      {utxo.unlockAddress.slice(0, 8)}...{utxo.unlockAddress.slice(-8)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleUnlockUTXO(utxo)}
                  className="btn-secondary w-full flex items-center justify-center space-x-2"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Attempt to Unlock</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

                    {/* Available UTXOs Display */}
              {connectedWallet && availableUTXOs.length > 0 && (
        <div className="card max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 mb-6">
            <Bitcoin className="w-8 h-8 text-bitcoin-orange" />
            <h2 className="text-2xl font-semibold text-text-primary">
              Available UTXOs
            </h2>
          </div>

          <div className="space-y-4">
            {availableUTXOs.map((utxo, index) => (
              <div key={index} className="bg-dark-bg rounded-lg p-4 border border-border-color hover:border-bitcoin-orange transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Bitcoin className="w-5 h-5 text-bitcoin-orange" />
                    <span className="text-lg font-semibold text-text-primary">
                      {(utxo.value / 100000000).toFixed(8)} BTC
                    </span>
                  </div>
                  <span className="text-xs text-text-secondary bg-card-bg px-2 py-1 rounded">
                    Available
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">TXID:</span>
                    <span className="font-mono text-text-primary">
                      {utxo.txid.slice(0, 8)}...{utxo.txid.slice(-8)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Vout:</span>
                    <span className="text-text-primary">{utxo.vout}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedUTXO(`${utxo.txid}:${utxo.vout}`)
                    setAmount((utxo.value / 100000000).toFixed(8))
                  }}
                  className="btn-secondary w-full flex items-center justify-center space-x-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Select for Locking</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* How It Works Section */}
      <div className="card max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-text-primary mb-6 text-center">
          How The Dead Man's Switch Works
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-bitcoin-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-bitcoin-orange" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">1. Lock UTXO</h3>
            <p className="text-text-secondary text-sm">
              Select a UTXO and lock it with a 99-year timelock using Bitcoin's nLockTime feature
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-bitcoin-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-bitcoin-orange" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">2. Wait Period</h3>
            <p className="text-text-secondary text-sm">
              The UTXO remains locked until 99 years have passed and the specified block height is reached
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-bitcoin-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Unlock className="w-8 h-8 text-bitcoin-orange" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">3. Automatic Unlock</h3>
            <p className="text-text-secondary text-sm">
              After the timelock expires, anyone can spend the UTXO using the correct unlocking script
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeadMansSwitch
