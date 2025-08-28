import React, { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import WalletConnect from './components/WalletConnect'
import DeadMansSwitch from './components/DeadMansSwitch'
import SecurityFeatures from './components/SecurityFeatures'
import FAQ from './components/FAQ'
import Pricing from './components/Pricing'
import Footer from './components/Footer'
import { BitcoinProvider } from './contexts/BitcoinContext'

function App() {
  const [activeSection, setActiveSection] = useState('main')

  const renderSection = () => {
    switch (activeSection) {
      case 'security':
        return <SecurityFeatures />
      case 'faq':
        return <FAQ />
      case 'pricing':
        return <Pricing />
      default:
        return (
          <>
            <Hero />
            <WalletConnect />
            <DeadMansSwitch />
          </>
        )
    }
  }

  return (
    <BitcoinProvider>
      <div className="min-h-screen bg-dark-bg">
        <Header onSectionChange={setActiveSection} />
        <main className="container mx-auto px-4 py-8">
          {renderSection()}
        </main>
        <Footer onSectionChange={setActiveSection} />
      </div>
    </BitcoinProvider>
  )
}

export default App
