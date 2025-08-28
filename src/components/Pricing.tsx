import React, { useState } from 'react'
import { Check, Star, Zap, Shield, Lock, Bitcoin, ExternalLink, Mail } from 'lucide-react'

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactEmail, setContactEmail] = useState('')
  const [contactMessage, setContactMessage] = useState('')

  const plans = [
    {
      name: "Free Tier",
      price: { monthly: 0, yearly: 0 },
      description: "Perfect for getting started with Bitcoin security",
      features: [
        "Lock up to 0.01 BTC",
        "Basic PSBT generation",
        "Community support",
        "Standard security features",
        "99-year timelock"
      ],
      popular: false,
      icon: <Bitcoin className="w-6 h-6" />,
      action: "Get Started Free"
    },
    {
      name: "Pro",
      price: { monthly: 9.99, yearly: 99.99 },
      description: "For serious Bitcoin holders and investors",
      features: [
        "Lock up to 1 BTC",
        "Advanced PSBT features",
        "Priority support",
        "Enhanced security",
        "Multi-UTXO locking",
        "Custom lock durations",
        "Export and backup tools"
      ],
      popular: true,
      icon: <Shield className="w-6 h-6" />,
      action: "Choose Pro Plan"
    },
    {
      name: "Enterprise",
      price: { monthly: 49.99, yearly: 499.99 },
      description: "For institutions and large-scale operations",
      features: [
        "Unlimited BTC locking",
        "White-label solutions",
        "Dedicated support",
        "Advanced analytics",
        "API access",
        "Custom integrations",
        "Compliance reporting",
        "Multi-signature support"
      ],
      popular: false,
      icon: <Zap className="w-6 h-6" />,
      action: "Contact Sales"
    }
  ]

  const savings = {
    monthly: 0,
    yearly: 20
  }

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName)
    
    if (planName === 'Free Tier') {
      // Scroll to the Dead Man's Switch component
      document.getElementById('deadmans-switch')?.scrollIntoView({ behavior: 'smooth' })
    } else if (planName === 'Pro') {
      // Show upgrade modal or redirect to payment
      alert(`🚀 Pro Plan Selected!\n\nYou've chosen the ${planName} plan for $${plans[1].price[billingCycle]}/${billingCycle === 'monthly' ? 'month' : 'year'}.\n\nThis plan is currently in development. For now, enjoy the free tier!`)
      // Scroll to the Dead Man's Switch component
      document.getElementById('deadmans-switch')?.scrollIntoView({ behavior: 'smooth' })
    } else if (planName === 'Enterprise') {
      setShowContactForm(true)
    }
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactEmail || !contactMessage) {
      alert('Please fill in all fields')
      return
    }
    
    // In a real app, this would send to your backend
    alert(`📧 Contact Request Sent!\n\nWe've received your enterprise inquiry and will get back to you within 24 hours.\n\nEmail: ${contactEmail}\nMessage: ${contactMessage}\n\nFor now, you can use the free tier to test the Dead Man's Switch functionality.`)
    
    // Reset form
    setContactEmail('')
    setContactMessage('')
    setShowContactForm(false)
    
    // Scroll to the Dead Man's Switch component
    document.getElementById('deadmans-switch')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleEnterpriseContact = () => {
    setShowContactForm(true)
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-text-primary mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          Choose the plan that fits your Bitcoin security needs. All plans include our core 
          Dead Man's Switch functionality with different feature sets.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center">
        <div className="bg-card-bg rounded-lg p-1 border border-border-color">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingCycle === 'monthly'
                ? 'bg-bitcoin-orange text-white'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingCycle === 'yearly'
                ? 'bg-bitcoin-orange text-white'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Yearly
            {billingCycle === 'yearly' && (
              <span className="ml-2 px-2 py-1 bg-accent-green text-white text-xs rounded-full">
                Save {savings.yearly}%
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative card ${
              plan.popular
                ? 'ring-2 ring-bitcoin-orange bg-gradient-to-b from-card-bg to-bitcoin-orange/5'
                : ''
            } ${selectedPlan === plan.name ? 'ring-2 ring-accent-green' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-bitcoin-orange text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>Most Popular</span>
                </div>
              </div>
            )}

            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="text-bitcoin-orange">
                  {plan.icon}
                </div>
                <h3 className="text-xl font-semibold text-text-primary">
                  {plan.name}
                </h3>
              </div>
              <p className="text-text-secondary text-sm mb-4">
                {plan.description}
              </p>
              <div className="mb-2">
                <span className="text-3xl font-bold text-text-primary">
                  ${plan.price[billingCycle]}
                </span>
                {plan.price[billingCycle] > 0 && (
                  <span className="text-text-secondary text-lg">
                    /{billingCycle === 'monthly' ? 'mo' : 'year'}
                  </span>
                )}
              </div>
              {plan.price[billingCycle] === 0 && (
                <span className="text-bitcoin-orange font-medium">Forever Free</span>
              )}
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-accent-green flex-shrink-0" />
                  <span className="text-sm text-text-secondary">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handlePlanSelect(plan.name)}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                plan.popular
                  ? 'btn-primary'
                  : 'btn-secondary'
              } ${selectedPlan === plan.name ? 'bg-accent-green border-accent-green text-white' : ''}`}
            >
              {plan.action}
            </button>
          </div>
        ))}
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="card max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-text-primary">Enterprise Contact</h3>
              <button
                onClick={() => setShowContactForm(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="input-field"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Message
                </label>
                <textarea
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="input-field min-h-[100px]"
                  placeholder="Tell us about your enterprise needs..."
                  required
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="btn-primary flex-1 flex items-center justify-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Additional Information */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="card">
          <h3 className="text-xl font-semibold text-text-primary mb-4">
            What's Included in All Plans
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-accent-green" />
              <span className="text-text-secondary">99-year Bitcoin timelock</span>
            </li>
            <li className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-accent-green" />
              <span className="text-text-secondary">PSBT generation and download</span>
            </li>
            <li className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-accent-green" />
              <span className="text-text-secondary">WalletConnect integration</span>
            </li>
            <li className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-accent-green" />
              <span className="text-text-secondary">Bank-grade security</span>
            </li>
            <li className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-accent-green" />
              <span className="text-text-secondary">24/7 system monitoring</span>
            </li>
          </ul>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold text-text-primary mb-4">
            No Hidden Fees
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Service fee:</span>
              <span className="text-text-primary font-medium">$0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Setup fee:</span>
              <span className="text-text-primary font-medium">$0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Cancellation fee:</span>
              <span className="text-text-primary font-medium">$0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Bitcoin network fees:</span>
              <span className="text-text-primary font-medium">Standard</span>
            </div>
          </div>
          <p className="text-sm text-text-secondary mt-4">
            * Bitcoin network fees are standard and go to miners, not to us.
          </p>
        </div>
      </div>

      {/* Enterprise Contact */}
      <div className="text-center p-8 bg-gradient-to-r from-bitcoin-orange/10 to-bitcoin-gold/10 rounded-xl border border-bitcoin-orange/20">
        <Lock className="w-16 h-16 text-bitcoin-orange mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-text-primary mb-4">
          Need a Custom Solution?
        </h3>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-6">
          For enterprise customers with specific requirements, we offer custom integrations, 
          white-label solutions, and dedicated support.
        </p>
        <button 
          onClick={handleEnterpriseContact}
          className="btn-primary flex items-center space-x-2 mx-auto"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Contact Enterprise Sales</span>
        </button>
      </div>
    </div>
  )
}

export default Pricing


