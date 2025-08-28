import React from 'react'
import { Shield, Lock, Eye, Key, Globe, Cpu, Zap, CheckCircle } from 'lucide-react'

const SecurityFeatures: React.FC = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Bank-Grade Security",
      description: "Uses the same cryptographic standards as major financial institutions. Your funds are protected by Bitcoin's battle-tested security model.",
      benefits: ["256-bit encryption", "Multi-signature support", "Hardware wallet compatible"]
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Native Bitcoin Timelocks",
      description: "Leverages Bitcoin's built-in nLockTime feature. No custom smart contracts or third-party dependencies that could introduce vulnerabilities.",
      benefits: ["Bitcoin consensus rules", "No external dependencies", "Immutable locking"]
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Zero Knowledge Architecture",
      description: "We never see your private keys or have access to your funds. All cryptographic operations happen locally in your browser.",
      benefits: ["Private key privacy", "Local computation", "No data collection"]
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: "PSBT Standard",
      description: "Uses the industry-standard Partially Signed Bitcoin Transaction format. Compatible with all major Bitcoin wallets and tools.",
      benefits: ["Industry standard", "Wide compatibility", "Future-proof"]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Decentralized Security",
      description: "Security is enforced by Bitcoin's global network of nodes, not by any single company or service provider.",
      benefits: ["Global consensus", "No single point of failure", "Censorship resistant"]
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Open Source Code",
      description: "All code is open source and auditable. Security researchers can review and verify the implementation.",
      benefits: ["Transparent code", "Community audited", "Continuous improvement"]
    }
  ]

  const securityMetrics = [
    { label: "Years of Bitcoin Security", value: "15+", color: "text-bitcoin-orange" },
    { label: "Cryptographic Strength", value: "256-bit", color: "text-accent-green" },
    { label: "Network Confirmations", value: "6+", color: "text-bitcoin-gold" },
    { label: "Uptime Guarantee", value: "99.9%", color: "text-accent-green" }
  ]

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Shield className="w-10 h-10 text-bitcoin-orange" />
          <h2 className="text-3xl font-bold text-text-primary">
            Security Features
          </h2>
        </div>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          Your Bitcoin security is our top priority. We've implemented multiple layers of protection 
          to ensure your funds remain safe for the next 99 years.
        </p>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {securityMetrics.map((metric, index) => (
          <div key={index} className="text-center p-6 bg-card-bg rounded-xl border border-border-color">
            <div className={`text-3xl font-bold ${metric.color} mb-2`}>
              {metric.value}
            </div>
            <div className="text-sm text-text-secondary">
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="card">
            <div className="flex items-start space-x-4">
              <div className="text-bitcoin-orange flex-shrink-0">
                {feature.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-text-secondary mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-accent-green flex-shrink-0" />
                      <span className="text-sm text-text-secondary">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security Comparison */}
      <div className="card">
        <h3 className="text-2xl font-semibold text-text-primary mb-6 text-center">
          How We Compare to Traditional Solutions
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-dark-bg rounded-lg border border-border-color">
            <div className="w-16 h-16 bg-bitcoin-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-bitcoin-orange" />
            </div>
            <h4 className="text-lg font-semibold text-text-primary mb-2">Traditional Banks</h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Third-party custody</li>
              <li>• Government regulations</li>
              <li>• Inflation risk</li>
              <li>• Limited access</li>
            </ul>
          </div>

          <div className="text-center p-6 bg-bitcoin-orange/10 border border-bitcoin-orange/20 rounded-lg">
            <div className="w-16 h-16 bg-bitcoin-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-bitcoin-orange" />
            </div>
            <h4 className="text-lg font-semibold text-text-primary mb-2">Dead Man's Switch</h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Self-custody</li>
              <li>• Bitcoin consensus</li>
              <li>• Deflationary asset</li>
              <li>• Global access</li>
            </ul>
          </div>

          <div className="text-center p-6 bg-dark-bg rounded-lg border border-border-color">
            <div className="w-16 h-16 bg-bitcoin-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Cpu className="w-8 h-8 text-bitcoin-orange" />
            </div>
            <h4 className="text-lg font-semibold text-text-primary mb-2">Smart Contracts</h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Code vulnerabilities</li>
              <li>• Upgrade risks</li>
              <li>• Network dependencies</li>
              <li>• Gas costs</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Security Commitment */}
      <div className="text-center p-8 bg-gradient-to-r from-bitcoin-orange/10 to-bitcoin-gold/10 rounded-xl border border-bitcoin-orange/20">
        <Shield className="w-16 h-16 text-bitcoin-orange mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-text-primary mb-4">
          Our Security Commitment
        </h3>
        <p className="text-text-secondary text-lg max-w-3xl mx-auto mb-6">
          We believe that Bitcoin security should be accessible to everyone. That's why we've built 
          The Dead Man's Switch using only the most proven, battle-tested security mechanisms available.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center space-x-2 text-text-primary">
            <CheckCircle className="w-5 h-5 text-accent-green" />
            <span>Regular Security Audits</span>
          </div>
          <div className="flex items-center space-x-2 text-text-primary">
            <CheckCircle className="w-5 h-5 text-accent-green" />
            <span>Open Source Code</span>
          </div>
          <div className="flex items-center space-x-2 text-text-primary">
            <CheckCircle className="w-5 h-5 text-accent-green" />
            <span>Community Driven</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecurityFeatures


