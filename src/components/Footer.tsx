import React from 'react'
import { Bitcoin, Github, Twitter, Mail, Shield, Lock, Clock, ExternalLink } from 'lucide-react'

interface FooterProps {
  onSectionChange?: (section: string) => void
}

const Footer: React.FC<FooterProps> = ({ onSectionChange }) => {
  const handleQuickLink = (section: string) => {
    if (onSectionChange) {
      onSectionChange(section)
    }
  }

  const handleSocialLink = (platform: string) => {
    const links = {
      github: 'https://github.com/deadmanswitch',
      twitter: 'https://twitter.com/deadmanswitch',
      mail: 'mailto:support@deadmanswitch.com'
    }
    
    if (links[platform as keyof typeof links]) {
      window.open(links[platform as keyof typeof links], '_blank')
    }
  }

  const handleSupportLink = (link: string) => {
    const links = {
      documentation: 'https://docs.deadmanswitch.com',
      api: 'https://api.deadmanswitch.com',
      contact: 'mailto:support@deadmanswitch.com',
      status: 'https://status.deadmanswitch.com'
    }
    
    if (links[link as keyof typeof links]) {
      window.open(links[link as keyof typeof links], '_blank')
    } else {
      alert('This link is coming soon! In the meantime, feel free to use our contact form above.')
    }
  }

  return (
    <footer className="bg-card-bg border-t border-border-color mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <Bitcoin className="w-8 h-8 text-bitcoin-orange" />
                <Lock className="w-4 h-4 text-accent-red absolute -bottom-1 -right-1" />
              </div>
              <h3 className="text-xl font-bold text-text-primary">
                The Dead Man's Switch
              </h3>
            </div>
                         <p className="text-text-secondary mb-4 max-w-md">
               Secure your Bitcoin legacy with our advanced UTXO locking technology. 
               Because sometimes you need to lock your money away from yourself for 99 years.
             </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => handleSocialLink('github')}
                className="text-text-secondary hover:text-bitcoin-orange transition-colors p-2 rounded-lg hover:bg-bitcoin-orange/10"
                title="View on GitHub"
              >
                <Github className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleSocialLink('twitter')}
                className="text-text-secondary hover:text-bitcoin-orange transition-colors p-2 rounded-lg hover:bg-bitcoin-orange/10"
                title="Follow on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleSocialLink('mail')}
                className="text-text-secondary hover:text-bitcoin-orange transition-colors p-2 rounded-lg hover:bg-bitcoin-orange/10"
                title="Contact via Email"
              >
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleQuickLink('main')}
                  className="text-text-secondary hover:text-bitcoin-orange transition-colors text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickLink('security')}
                  className="text-text-secondary hover:text-bitcoin-orange transition-colors text-left"
                >
                  Security Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickLink('faq')}
                  className="text-text-secondary hover:text-bitcoin-orange transition-colors text-left"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleQuickLink('pricing')}
                  className="text-text-secondary hover:text-bitcoin-orange transition-colors text-left"
                >
                  Pricing
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-text-primary mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleSupportLink('documentation')}
                  className="text-text-secondary hover:text-bitcoin-orange transition-colors text-left flex items-center space-x-1"
                >
                  <span>Documentation</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSupportLink('api')}
                  className="text-text-secondary hover:text-bitcoin-orange transition-colors text-left flex items-center space-x-1"
                >
                  <span>API Reference</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSupportLink('contact')}
                  className="text-text-secondary hover:text-bitcoin-orange transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSupportLink('status')}
                  className="text-text-secondary hover:text-bitcoin-orange transition-colors text-left flex items-center space-x-1"
                >
                  <span>Service Status</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border-color mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="flex items-center space-x-2 text-text-secondary">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Bank-grade Security</span>
              </div>
              <div className="flex items-center space-x-2 text-text-secondary">
                <Clock className="w-4 h-4" />
                <span className="text-sm">99-Year Lock</span>
              </div>
            </div>
                         <div className="text-text-secondary text-sm">
               © 2024 The Dead Man's Switch. No refunds, no regrets, no take-backsies.
             </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
