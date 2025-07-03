'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function Learn() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('facts');

  const facts = [
    {
      title: 'Global E-Waste Crisis',
      stat: '54M tons',
      description: 'E-waste generated globally every year',
      icon: 'ri-earth-line',
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'Recovery Rate',
      stat: '20%',
      description: 'Of e-waste is properly recycled worldwide',
      icon: 'ri-recycle-line',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Toxic Materials',
      stat: '1000+',
      description: 'Harmful substances found in electronics',
      icon: 'ri-skull-line',
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Philippines E-Waste',
      stat: '3.2M tons',
      description: 'Annual e-waste generation in PH',
      icon: 'ri-flag-line',
      color: 'from-green-500 to-green-600'
    }
  ];

  const tips = [
    {
      title: 'Extend Device Life',
      description: 'Use protective cases, avoid extreme temperatures, and perform regular maintenance',
      icon: 'ri-shield-check-line',
      image: 'https://readdy.ai/api/search-image?query=Person%20taking%20care%20of%20smartphone%20with%20protective%20case%2C%20clean%20modern%20home%20setting%2C%20natural%20lighting%2C%20lifestyle%20photography%2C%20professional%20quality%2C%20caring%20hands%20holding%20device&width=300&height=200&seq=tips1&orientation=landscape'
    },
    {
      title: 'Proper Storage',
      description: 'Store unused electronics in dry, cool places to prevent damage',
      icon: 'ri-archive-line',
      image: 'https://readdy.ai/api/search-image?query=Organized%20storage%20area%20with%20electronic%20devices%20neatly%20arranged%2C%20clean%20modern%20interior%2C%20good%20lighting%2C%20minimalist%20aesthetic%2C%20home%20organization%20photography&width=300&height=200&seq=tips2&orientation=landscape'
    },
    {
      title: 'Data Security',
      description: 'Always wipe personal data before donating or recycling devices',
      icon: 'ri-lock-line',
      image: 'https://readdy.ai/api/search-image?query=Person%20securely%20deleting%20data%20from%20smartphone%2C%20close-up%20hands%20typing%2C%20modern%20device%20interface%2C%20security%20concept%2C%20professional%20photography&width=300&height=200&seq=tips3&orientation=landscape'
    },
    {
      title: 'Choose Certified Centers',
      description: 'Only use certified e-waste recycling facilities for proper disposal',
      icon: 'ri-award-line',
      image: 'https://readdy.ai/api/search-image?query=Certified%20e-waste%20recycling%20facility%2C%20modern%20clean%20environment%2C%20workers%20in%20safety%20gear%2C%20professional%20industrial%20setting%2C%20sustainability%20concept&width=300&height=200&seq=tips4&orientation=landscape'
    }
  ];

  const impact = [
    {
      title: 'Environmental Benefits',
      items: [
        'Reduces landfill waste by 90%',
        'Prevents soil and water contamination',
        'Conserves natural resources',
        'Reduces carbon footprint'
      ],
      icon: 'ri-leaf-line',
      color: 'bg-green-500'
    },
    {
      title: 'Social Impact',
      items: [
        'Creates job opportunities',
        'Supports local communities',
        'Provides devices to students',
        'Bridges digital divide'
      ],
      icon: 'ri-community-line',
      color: 'bg-blue-500'
    },
    {
      title: 'Economic Value',
      items: [
        'Recovers valuable materials',
        'Reduces mining costs',
        'Creates circular economy',
        'Generates local revenue'
      ],
      icon: 'ri-money-dollar-circle-line',
      color: 'bg-purple-500'
    }
  ];

  const tabs = [
    { id: 'facts', label: 'Facts', icon: 'ri-bar-chart-line' },
    { id: 'tips', label: 'Tips', icon: 'ri-lightbulb-line' },
    { id: 'impact', label: 'Impact', icon: 'ri-heart-line' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'facts':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">E-Waste Facts</h2>
              <p className="text-gray-600">Understanding the global e-waste challenge</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {facts.map((fact, index) => (
                <Card key={index} shadow="lg" className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-r ${fact.color} flex items-center justify-center text-white shadow-md`}>
                    <i className={`${fact.icon} text-xl`}></i>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{fact.stat}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{fact.title}</h3>
                  <p className="text-xs text-gray-600">{fact.description}</p>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-[#4CAF50]/10 to-[#66BB6A]/10 border-[#4CAF50]/20">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#4CAF50] rounded-full flex items-center justify-center">
                  <i className="ri-recycle-line text-white text-2xl"></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Make a Difference</h3>
                <p className="text-gray-700 mb-4">
                  Every device you properly recycle or donate helps reduce environmental impact 
                  and supports communities in need.
                </p>
                <Button size="sm" onClick={() => router.push('/schedule')}>
                  Schedule Pickup
                </Button>
              </div>
            </Card>
          </div>
        );

      case 'tips':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Best Practices</h2>
              <p className="text-gray-600">Tips for responsible e-waste management</p>
            </div>

            <div className="space-y-4">
              {tips.map((tip, index) => (
                <Card key={index} shadow="md">
                  <div className="mb-4 rounded-2xl overflow-hidden">
                    <img 
                      src={tip.image} 
                      alt={tip.title}
                      className="w-full h-32 object-cover object-top"
                    />
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#4CAF50]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className={`${tip.icon} text-[#4CAF50]`}></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                      <p className="text-sm text-gray-600">{tip.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'impact':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Positive Impact</h2>
              <p className="text-gray-600">How proper e-waste management helps</p>
            </div>

            <div className="space-y-4">
              {impact.map((category, index) => (
                <Card key={index} shadow="md">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 ${category.color} rounded-2xl flex items-center justify-center text-white shadow-md`}>
                      <i className={`${category.icon} text-xl`}></i>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                  </div>
                  <div className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#4CAF50] rounded-full"></div>
                        <p className="text-sm text-gray-700">{item}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Your Contribution Matters</h3>
                <p className="text-gray-700 mb-4">
                  Join thousands of Filipinos making a positive environmental and social impact 
                  through responsible e-waste management.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <Button size="sm" onClick={() => router.push('/donate')}>
                    Donate Device
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => router.push('/schedule')}>
                    Schedule Pickup
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pb-24">
      <Header title="Learn" />
      
      <main className="pt-20 px-4">
        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="bg-gray-100 rounded-2xl p-1 grid grid-cols-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 rounded-xl transition-all text-sm font-medium flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-white text-[#4CAF50] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <i className={`${tab.icon} text-sm`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {renderContent()}
      </main>

      <Navigation />
    </div>
  );
}