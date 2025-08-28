import React, { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle, Mail, MessageSquare } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
  category: string
}

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactEmail, setContactEmail] = useState('')
  const [contactMessage, setContactMessage] = useState('')

  const faqData: FAQItem[] = [
         {
       question: "What is a Dead Man's Switch?",
       answer: "A Dead Man's Switch is like a time capsule for your Bitcoin, but instead of opening in 10 years, it opens when you're probably dead. It's the ultimate 'I'll deal with this later' solution, except 'later' is 99 years from now.",
       category: "General"
     },
    {
      question: "How does the 99-year lock work?",
      answer: "The lock uses Bitcoin's nLockTime field, which prevents a transaction from being included in a block until a specific block height is reached. We calculate this as current block height + (99 years × 6 blocks per hour × 24 hours × 365 days).",
      category: "Technical"
    },
    {
      question: "Is my Bitcoin safe during the lock period?",
      answer: "Yes, your Bitcoin remains completely secure. The funds stay in your control until the timelock expires. We use Bitcoin's consensus rules and cryptographic security - no third-party custody is involved.",
      category: "Security"
    },
    {
      question: "What happens if I lose my PSBT?",
      answer: "If you lose your PSBT (Partially Signed Bitcoin Transaction), you may not be able to unlock your funds when the timelock expires. It's crucial to store your PSBT securely, preferably in multiple secure locations.",
      category: "Security"
    },
         {
       question: "Can I unlock my funds before 99 years?",
       answer: "Nope! That's the whole point. Once you lock it, it's locked until 99 years from now. Think of it as the ultimate commitment device. No take-backsies, no 'I changed my mind' - just pure, unbreakable regret.",
       category: "Technical"
     },
    {
      question: "What fees are involved?",
      answer: "You'll need to pay standard Bitcoin network fees for the initial locking transaction. The fee amount depends on network congestion and transaction size. We recommend setting aside 0.0001 BTC for fees.",
      category: "Fees"
    },
    {
      question: "Can I lock multiple UTXOs?",
      answer: "Yes, you can lock multiple UTXOs in a single transaction. This can be more cost-effective than locking them separately. The system will calculate the optimal way to combine your UTXOs.",
      category: "Technical"
    },
    {
      question: "What happens after 99 years?",
      answer: "After the timelock expires, anyone with the correct unlocking script can spend the UTXO. You should ensure your heirs or beneficiaries have access to the necessary information to claim the funds.",
      category: "General"
    },
    {
      question: "Is this service free to use?",
      answer: "The Dead Man's Switch service is free to use. You only pay standard Bitcoin network fees for your transactions. We believe in making Bitcoin security accessible to everyone.",
      category: "Fees"
    },
    {
      question: "Can I use this with hardware wallets?",
      answer: "Yes, our system is compatible with all Bitcoin wallets that support PSBT (Partially Signed Bitcoin Transactions), including popular hardware wallets like Ledger, Trezor, and others.",
      category: "Technical"
    },
    {
      question: "What if Bitcoin's consensus rules change?",
      answer: "Bitcoin's consensus rules are designed to be extremely difficult to change. The nLockTime feature has been part of Bitcoin since its inception and is considered one of the most stable and secure features.",
      category: "Technical"
    },
    {
      question: "How do I get help if something goes wrong?",
      answer: "We provide comprehensive documentation, a support team, and community forums. For urgent issues, you can contact our support team directly. Remember, your funds are secured by Bitcoin's network, not our service.",
      category: "Support"
    }
  ]

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const categories = ['All', ...new Set(faqData.map(item => item.category))]

  const filteredFAQData = selectedCategory === 'All' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory)

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactEmail || !contactMessage) {
      alert('Please fill in all fields')
      return
    }
    
    // In a real app, this would send to your backend
    alert(`📧 Support Request Sent!\n\nWe've received your support inquiry and will get back to you within 24 hours.\n\nEmail: ${contactEmail}\nMessage: ${contactMessage}\n\nRemember: Your Bitcoin is secured by the Bitcoin network, not our service.`)
    
    // Reset form
    setContactEmail('')
    setContactMessage('')
    setShowContactForm(false)
  }

  const handleSupportContact = () => {
    setShowContactForm(true)
  }

  return (
    <div className="card max-w-4xl mx-auto">
             <div className="text-center mb-8">
         <div className="flex items-center justify-center space-x-3 mb-4">
           <HelpCircle className="w-8 h-8 text-bitcoin-orange" />
           <h2 className="text-3xl font-bold text-text-primary">
             Questions You're Too Afraid to Ask
           </h2>
         </div>
         <p className="text-text-secondary text-lg">
           Everything you need to know about locking your Bitcoin away forever
         </p>
       </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              selectedCategory === category
                ? 'bg-bitcoin-orange text-white border-bitcoin-orange'
                : 'bg-dark-bg border-border-color text-text-secondary hover:text-bitcoin-orange hover:border-bitcoin-orange'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFAQData.map((item, index) => (
          <div
            key={index}
            className="bg-dark-bg rounded-lg border border-border-color overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-card-bg transition-colors"
            >
              <span className="font-medium text-text-primary pr-4">
                {item.question}
              </span>
              {openItems.includes(index) ? (
                <ChevronUp className="w-5 h-5 text-bitcoin-orange flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-bitcoin-orange flex-shrink-0" />
              )}
            </button>
            
            {openItems.includes(index) && (
              <div className="px-6 pb-4">
                <p className="text-text-secondary leading-relaxed">
                  {item.answer}
                </p>
                <div className="mt-3">
                  <span className="inline-block px-2 py-1 bg-bitcoin-orange/20 text-bitcoin-orange text-xs rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Support Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="card max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-text-primary">Contact Support</h3>
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
                  placeholder="Describe your issue or question..."
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

             {/* Contact Support */}
       <div className="mt-8 text-center p-6 bg-bitcoin-orange/10 border border-bitcoin-orange/20 rounded-lg">
         <h3 className="text-lg font-semibold text-text-primary mb-2">
           Still confused? Don't worry!
         </h3>
         <p className="text-text-secondary mb-4">
           Our support team is here to help, even if you're having second thoughts about locking your Bitcoin for 99 years.
         </p>
         <button 
           onClick={handleSupportContact}
           className="btn-primary flex items-center space-x-2 mx-auto"
         >
           <MessageSquare className="w-4 h-4" />
           <span>Help, I'm Having Regrets</span>
         </button>
       </div>
    </div>
  )
}

export default FAQ
