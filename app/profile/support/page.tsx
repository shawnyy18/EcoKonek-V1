
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Navigation from '../../../components/Navigation';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'Pickup' | 'Donation' | 'Account' | 'General';
}

export default function SupportPage() {
  const [faqs] = useState<FAQ[]>([
    {
      id: '4',
      question: 'How do I donate my devices?',
      answer: 'Visit the Donate section, take photos of your items, provide descriptions, and choose a recipient organization. We\'ll handle the rest!',
      category: 'Donation'
    },
    {
      id: '5',
      question: 'What happens to donated items?',
      answer: 'Donated items are either refurbished for community use, recycled responsibly, or their parts are reused to extend other devices\' lifecycles.',
      category: 'Donation'
    },
    {
      id: '6',
      question: 'How do I reset my password?',
      answer: 'Go to Settings → Account Security → Change Password, or use the "Forgot Password" link on the login page.',
      category: 'Account'
    },
    {
      id: '7',
      question: 'Can I delete my account?',
      answer: 'Yes, you can delete your account from Profile → Privacy Settings → Delete Account. This action cannot be undone.',
      category: 'Account'
    },
    {
      id: '8',
      question: 'How do points work?',
      answer: 'You earn points by completing learning modules and donating items. Points unlock badges and show your environmental impact.',
      category: 'General'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'FAQ' | 'Contact'>('FAQ');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowSuccess(true);
    setContactForm({ subject: '', message: '', email: '' });
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Donation': return 'text-green-600 bg-green-100';
      case 'Account': return 'text-purple-600 bg-purple-100';
      case 'General': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-16 pb-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-6">
            <Link href="/profile" className="mr-3">
              <i className="ri-arrow-left-line text-xl text-gray-600"></i>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Help Center</h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 mb-6 text-center">
            <i className="ri-customer-service-line text-3xl text-green-500 mb-2"></i>
            <h3 className="font-medium text-gray-900 mb-1">We're Here to Help</h3>
            <p className="text-sm text-gray-600">
              Find answers to common questions or get in touch with our support team
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm mb-6">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('FAQ')}
                className={`flex-1 py-3 px-4 text-sm font-medium text-center transition-colors ${
                  activeTab === 'FAQ'
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <i className="ri-question-line mr-2"></i>
                FAQ
              </button>
              <button
                onClick={() => setActiveTab('Contact')}
                className={`flex-1 py-3 px-4 text-sm font-medium text-center transition-colors ${
                  activeTab === 'Contact'
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <i className="ri-mail-line mr-2"></i>
                Contact Us
              </button>
            </div>

            <div className="p-4">
              {activeTab === 'FAQ' ? (
                <div className="space-y-3">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="border border-gray-100 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium mr-2 ${getCategoryColor(faq.category)}`}>
                                {faq.category}
                              </span>
                            </div>
                            <h3 className="font-medium text-gray-900 text-sm">{faq.question}</h3>
                          </div>
                          <i className={`ri-arrow-${expandedFAQ === faq.id ? 'up' : 'down'}-s-line text-gray-400 ml-2`}></i>
                        </div>
                      </button>

                      {expandedFAQ === faq.id && (
                        <div className="px-4 pb-4 border-t border-gray-100">
                          <p className="text-sm text-gray-600 pt-3">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {showSuccess && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg flex items-center">
                      <i className="ri-check-circle-line text-green-600 mr-2"></i>
                      <span className="text-green-800 text-sm">Message sent successfully! We'll get back to you soon.</span>
                    </div>
                  )}

                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                    />

                    <Input
                      label="Subject"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="Brief description of your issue"
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={contactForm.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        maxLength={500}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                        placeholder="Please describe your issue in detail..."
                      />
                      <div className="text-right text-xs text-gray-500 mt-1">
                        {contactForm.message.length}/500
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full !rounded-button"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                          Sending...
                        </div>
                      ) : (
                        <>
                          <i className="ri-send-plane-line mr-2"></i>
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="p-4 text-center">
              <i className="ri-phone-line text-2xl text-green-500 mb-2"></i>
              <h3 className="font-medium text-gray-900 text-sm mb-1">Call Us</h3>
              <p className="text-xs text-gray-600">+63 2 8123 4567</p>
              <p className="text-xs text-gray-500">Mon-Fri 9AM-6PM</p>
            </Card>

            <Card className="p-4 text-center">
              <i className="ri-mail-line text-2xl text-blue-500 mb-2"></i>
              <h3 className="font-medium text-gray-900 text-sm mb-1">Email Us</h3>
              <p className="text-xs text-gray-600">support@ecokonek.ph</p>
              <p className="text-xs text-gray-500">24/7 Response</p>
            </Card>
          </div>

          <Card className="p-4">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
              <i className="ri-links-line text-green-500 mr-2"></i>
              Quick Links
            </h3>
            <div className="space-y-2">
              <Link href="#" className="flex items-center justify-between py-2 text-sm text-gray-700 hover:text-green-600">
                <span>User Guide</span>
                <i className="ri-external-link-line text-gray-400"></i>
              </Link>
              <Link href="#" className="flex items-center justify-between py-2 text-sm text-gray-700 hover:text-green-600">
                <span>Privacy Policy</span>
                <i className="ri-external-link-line text-gray-400"></i>
              </Link>
              <Link href="#" className="flex items-center justify-between py-2 text-sm text-gray-700 hover:text-green-600">
                <span>Terms of Service</span>
                <i className="ri-external-link-line text-gray-400"></i>
              </Link>
            </div>
          </Card>
        </div>
      </main>

      <Navigation />
    </div>
  );
}
