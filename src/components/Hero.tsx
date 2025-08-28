import React, { useState } from 'react'
import { Lock, Shield, Clock, ArrowRight, Play, Download, Bitcoin, X, FileText } from 'lucide-react'

const Hero: React.FC = () => {
  const [showManual, setShowManual] = useState(false)

  const manualContent = [
    {
      title: "Step 1: Connect Your Wallet",
      content: "First, connect your Bitcoin wallet. We support Unisat, Xverse, Phantom, Leather, and many other popular Bitcoin wallets. Your private keys stay in your wallet - we never see them."
    },
    {
      title: "Step 2: Select Your UTXO",
      content: "Choose which Bitcoin UTXO you want to lock. You can select from your available UTXOs. Make sure you have enough to cover the amount you want to lock plus network fees."
    },
    {
      title: "Step 3: Set Lock Parameters",
      content: "Configure the lock parameters: amount to lock, network fee, and unlock address. The unlock address is where your funds will be sent after 99 years. We recommend using a fresh address."
    },
    {
      title: "Step 4: Generate and Sign PSBT",
      content: "The system will generate a Partially Signed Bitcoin Transaction (PSBT) with a 99-year timelock. Sign this transaction with your wallet to create the lock."
    },
    {
      title: "Step 5: Broadcast Transaction",
      content: "Broadcast the signed transaction to the Bitcoin network. Once confirmed, your UTXO is locked for 99 years. Download and securely store your PSBT for safekeeping."
    },
    {
      title: "Step 6: Wait 99 Years",
      content: "Your Bitcoin is now locked until 99 years from now. After the timelock expires, anyone with the correct unlocking information can spend the UTXO."
    }
  ]

  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-bitcoin-orange/5 via-transparent to-bitcoin-gold/5" />
      
      <div className="relative container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-bitcoin-orange to-accent-red text-white px-6 py-3 rounded-full text-sm font-bold mb-6 animate-pulse border-2 border-bitcoin-orange shadow-lg shadow-bitcoin-orange/50">
              <Shield className="w-5 h-5 animate-bounce" />
              <span className="text-shadow-glow">🚨 MISSION: LOCK YOUR BITCOIN FOREVER 🚨</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
              <span className="bg-gradient-to-r from-bitcoin-orange via-accent-red to-bitcoin-gold bg-clip-text text-transparent animate-pulse">
                DEAD MAN'S SWITCH
              </span>
              <span className="block text-bitcoin-orange text-3xl md:text-4xl mt-4 font-mono">
                [LOCK_LEVEL: 99_YEARS]
              </span>
            </h1>
            
            <p className="text-xl text-text-secondary mb-8 leading-relaxed max-w-lg lg:max-w-none font-mono">
              <span className="text-bitcoin-orange">[MISSION_BRIEF]</span> Your Bitcoin has been compromised by your own impulsiveness. 
              Deploy the Dead Man's Switch protocol to lock your funds for exactly 99 years. 
              <span className="text-accent-red"> No take-backsies, no regrets, just pure commitment.</span>
            </p>
            
            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center space-x-3 text-text-secondary bg-card-bg p-3 rounded-lg border border-border-color hover:border-bitcoin-orange transition-all group">
                <Lock className="w-5 h-5 text-bitcoin-orange group-hover:scale-110 transition-transform" />
                <span className="text-sm font-mono">[SKILL: IMPULSE_CONTROL]</span>
              </div>
              <div className="flex items-center space-x-3 text-text-secondary bg-card-bg p-3 rounded-lg border border-border-color hover:border-bitcoin-orange transition-all group">
                <Clock className="w-5 h-5 text-bitcoin-orange group-hover:scale-110 transition-transform" />
                <span className="text-sm font-mono">[TIMER: 99_YEARS]</span>
              </div>
              <div className="flex items-center space-x-3 text-text-secondary bg-card-bg p-3 rounded-lg border border-border-color hover:border-bitcoin-orange transition-all group">
                <Shield className="w-5 h-5 text-bitcoin-orange group-hover:scale-110 transition-transform" />
                <span className="text-sm font-mono">[STATUS: CAT_PROOF]</span>
              </div>
            </div>
            
            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                             <button 
                 onClick={() => document.getElementById('deadmans-switch')?.scrollIntoView({ behavior: 'smooth' })}
                 className="bg-gradient-to-r from-bitcoin-orange to-accent-red text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-accent-red hover:to-bitcoin-orange transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-bitcoin-orange/50 border-2 border-bitcoin-orange group"
               >
                 <span className="flex items-center space-x-2">
                   <Lock className="w-6 h-6 animate-pulse" />
                   <span>🚀 DEPLOY SWITCH PROTOCOL</span>
                   <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                 </span>
               </button>
              <button 
                onClick={() => setShowManual(true)}
                className="bg-gradient-to-r from-dark-bg to-card-bg text-text-primary px-8 py-4 rounded-lg font-bold text-lg hover:from-card-bg hover:to-dark-bg transition-all duration-300 transform hover:scale-105 border-2 border-border-color hover:border-bitcoin-orange group"
              >
                <span className="flex items-center space-x-2">
                  <Play className="w-6 h-6" />
                  <span>📖 READ MANUAL</span>
                </span>
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-text-secondary">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent-green rounded-full"></div>
                <span>No judgment from us</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent-green rounded-full"></div>
                <span>Cat-approved technology</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent-green rounded-full"></div>
                <span>Future you will thank us</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Visual */}
          <div className="relative">
            <div className="relative z-10">
                             {/* Main Card */}
               <div className="card p-8 bg-gradient-to-br from-card-bg via-bitcoin-orange/10 to-accent-red/5 border-2 border-bitcoin-orange/30 shadow-2xl shadow-bitcoin-orange/20 relative overflow-hidden">
                 {/* Scanning line effect */}
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bitcoin-orange/5 to-transparent animate-pulse"></div>
                 
                 <div className="text-center mb-6 relative z-10">
                   <div className="w-24 h-24 bg-gradient-to-br from-bitcoin-orange to-accent-red rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse border-4 border-bitcoin-orange/30 shadow-lg shadow-bitcoin-orange/50">
                     <Lock className="w-12 h-12 text-white" />
                   </div>
                   <h3 className="text-2xl font-bold text-text-primary mb-2 font-mono">
                     🔒 SWITCH PROTOCOL v1.0
                   </h3>
                   <p className="text-text-secondary font-mono">
                     [STATUS: READY_TO_DEPLOY]
                   </p>
                 </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Amount:</span>
                    <span className="text-text-primary font-mono">0.001 BTC</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Lock Duration:</span>
                    <span className="text-text-primary font-mono">99 Years</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Unlock Address:</span>
                    <span className="text-text-primary font-mono">bc1...</span>
                  </div>
                </div>
                
                               <button 
                 onClick={() => document.getElementById('deadmans-switch')?.scrollIntoView({ behavior: 'smooth' })}
                 className="btn-primary w-full hover:scale-105 transition-transform"
               >
                 🚀 DEPLOY NOW
               </button>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-bitcoin-gold/20 rounded-full flex items-center justify-center">
                <Bitcoin className="w-8 h-8 text-bitcoin-gold" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent-red/20 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-accent-red" />
              </div>
            </div>
            
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-bitcoin-orange/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-bitcoin-gold/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center bg-card-bg p-6 rounded-xl border-2 border-border-color hover:border-bitcoin-orange transition-all transform hover:scale-105 group">
            <div className="text-4xl font-bold text-bitcoin-orange mb-2 group-hover:text-accent-red transition-colors">99</div>
            <div className="text-sm text-text-secondary font-mono">[LOCK_DURATION: YEARS]</div>
            <div className="w-2 h-2 bg-accent-red rounded-full mx-auto mt-2 animate-pulse"></div>
          </div>
          <div className="text-center bg-card-bg p-6 rounded-xl border-2 border-border-color hover:border-bitcoin-orange transition-all transform hover:scale-105 group">
            <div className="text-4xl font-bold text-bitcoin-orange mb-2 group-hover:text-accent-red transition-colors">256</div>
            <div className="text-sm text-text-secondary font-mono">[SECURITY: BITS]</div>
            <div className="w-2 h-2 bg-accent-red rounded-full mx-auto mt-2 animate-pulse"></div>
          </div>
          <div className="text-center bg-card-bg p-6 rounded-xl border-2 border-border-color hover:border-bitcoin-orange transition-all transform hover:scale-105 group">
            <div className="text-4xl font-bold text-bitcoin-orange mb-2 group-hover:text-accent-red transition-colors">0%</div>
            <div className="text-sm text-text-secondary font-mono">[EARLY_ACCESS: DENIED]</div>
            <div className="w-2 h-2 bg-accent-red rounded-full mx-auto mt-2 animate-pulse"></div>
          </div>
          <div className="text-center bg-card-bg p-6 rounded-xl border-2 border-border-color hover:border-bitcoin-orange transition-all transform hover:scale-105 group">
            <div className="text-4xl font-bold text-bitcoin-orange mb-2 group-hover:text-accent-red transition-colors">24/7</div>
            <div className="text-sm text-text-secondary font-mono">[MONITORING: ACTIVE]</div>
            <div className="w-2 h-2 bg-accent-red rounded-full mx-auto mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Manual Modal */}
      {showManual && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <FileText className="w-8 h-8 text-bitcoin-orange" />
                <h2 className="text-2xl font-bold text-text-primary">Dead Man's Switch Manual</h2>
              </div>
              <button
                onClick={() => setShowManual(false)}
                className="text-text-secondary hover:text-text-primary p-2 rounded-lg hover:bg-card-bg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              {manualContent.map((step, index) => (
                <div key={index} className="bg-dark-bg rounded-lg p-6 border border-border-color">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-bitcoin-orange text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary mb-2">
                        {step.title}
                      </h3>
                      <p className="text-text-secondary leading-relaxed">
                        {step.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-bitcoin-orange/10 border border-bitcoin-orange/20 rounded-lg">
              <h4 className="text-lg font-semibold text-text-primary mb-2">⚠️ Important Notes:</h4>
              <ul className="text-text-secondary space-y-2">
                <li>• Once locked, your Bitcoin cannot be unlocked before 99 years</li>
                <li>• Store your PSBT securely - losing it means losing access</li>
                <li>• This is a commitment device - use it wisely</li>
                <li>• Network fees are required for the locking transaction</li>
                <li>• Your funds are secured by Bitcoin's network, not our service</li>
              </ul>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowManual(false)}
                className="btn-secondary"
              >
                Got it, let's deploy!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Hero
