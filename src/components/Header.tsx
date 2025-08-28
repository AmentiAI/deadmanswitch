import React, { useState } from 'react'
import { Skull, Bitcoin, Menu, X } from 'lucide-react'

interface HeaderProps {
  onSectionChange: (section: string) => void
}

const Header: React.FC<HeaderProps> = ({ onSectionChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationItems = [
    { id: 'main', label: 'Home', href: '#home' },
    { id: 'security', label: 'Security', href: '#security' },
    { id: 'faq', label: 'FAQ', href: '#faq' },
    { id: 'pricing', label: 'Pricing', href: '#pricing' }
  ]

  const handleNavigation = (sectionId: string) => {
    onSectionChange(sectionId)
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="bg-card-bg border-b border-border-color sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Skull className="w-8 h-8 text-accent-red" />
              <Bitcoin className="w-4 h-4 text-bitcoin-orange absolute -bottom-1 -right-1" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">
                The Dead Man's Switch
              </h1>
                             <p className="text-sm text-text-secondary font-mono">
                 [MISSION: IMPULSE_CONTROL_DISABLED]
               </p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className="text-text-secondary hover:text-bitcoin-orange transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-text-secondary hover:text-bitcoin-orange transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border-color">
            <nav className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className="text-left text-text-secondary hover:text-bitcoin-orange transition-colors font-medium py-2"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
