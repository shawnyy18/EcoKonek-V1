
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Navigation from '../../../components/Navigation';
import Card from '../../../components/ui/Card';

interface Donation {
  id: string;
  donationDate: string;
  items: string[];
  status: 'Processing' | 'Received' | 'Distributed';
  recipient?: string;
  impact?: string;
}

export default function DonationHistory() {
  const [donations] = useState<Donation[]>([
    {
      id: 'DN-2024-001',
      donationDate: '2024-01-14',
      items: ['Old Laptop', '2 Mobile Phones', 'Tablet'],
      status: 'Distributed',
      recipient: 'Makati Elementary School',
      impact: 'Helped 3 students with digital learning'
    },
    {
      id: 'DN-2024-002',
      donationDate: '2024-01-20',
      items: ['Desktop Computer', 'Monitor', 'Keyboard'],
      status: 'Received',
      recipient: 'Hope Foundation'
    },
    {
      id: 'DN-2024-003',
      donationDate: '2024-01-18',
      items: ['Printer', 'Scanner'],
      status: 'Processing'
    }
  ]);

  const [filter, setFilter] = useState<'All' | 'Processing' | 'Received' | 'Distributed'>('All');

  const filteredDonations = donations.filter(donation => 
    filter === 'All' || donation.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Distributed': return 'text-green-600 bg-green-100';
      case 'Received': return 'text-blue-600 bg-blue-100';
      case 'Processing': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Distributed': return 'ri-check-circle-line';
      case 'Received': return 'ri-inbox-line';
      case 'Processing': return 'ri-time-line';
      default: return 'ri-question-line';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
            <h1 className="text-xl font-semibold text-gray-900">Donation History</h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Your Impact</h3>
              <i className="ri-gift-fill text-green-500"></i>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {donations.filter(d => d.status === 'Distributed').length}
                </div>
                <div className="text-xs text-gray-600">Distributed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {donations.filter(d => d.status === 'Received').length}
                </div>
                <div className="text-xs text-gray-600">Received</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{donations.length}</div>
                <div className="text-xs text-gray-600">Total</div>
              </div>
            </div>
          </div>

          <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
            {['All', 'Processing', 'Received', 'Distributed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === status
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {filteredDonations.length === 0 ? (
            <Card className="text-center py-12">
              <i className="ri-gift-line text-4xl text-gray-300 mb-4"></i>
              <h3 className="font-medium text-gray-900 mb-2">No donations yet</h3>
              <p className="text-gray-600 text-sm mb-6">Make your first device donation today and help bridge the digital divide!</p>
              <Link href="/donate">
                <button className="bg-green-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition-colors !rounded-button">
                  Donate Device
                </button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredDonations.map((donation) => (
                <Card key={donation.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <i className={`${getStatusIcon(donation.status)} text-lg mr-2 ${
                        donation.status === 'Distributed' ? 'text-green-500' :
                        donation.status === 'Received' ? 'text-blue-500' : 'text-yellow-500'
                      }`}></i>
                      <div>
                        <h3 className="font-medium text-gray-900">Donation #{donation.id.split('-')[2]}</h3>
                        <p className="text-xs text-gray-500">Donated on {formatDate(donation.donationDate)}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(donation.status)}`}>
                      {donation.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-start text-sm text-gray-600">
                      <i className="ri-archive-line mr-2 mt-0.5"></i>
                      <span className="flex-1">{donation.items.join(', ')}</span>
                    </div>
                    {donation.recipient && (
                      <div className="flex items-center text-sm text-gray-600">
                        <i className="ri-community-line mr-2"></i>
                        Recipient: {donation.recipient}
                      </div>
                    )}
                    {donation.impact && (
                      <div className="flex items-start text-sm text-green-600 bg-green-50 p-2 rounded-lg">
                        <i className="ri-leaf-line mr-2 mt-0.5"></i>
                        <span className="flex-1">{donation.impact}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {donation.status === 'Distributed' && (
                      <button className="flex-1 bg-green-50 text-green-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors !rounded-button">
                        <i className="ri-share-line mr-1"></i>
                        Share Impact
                      </button>
                    )}
                    <button className="flex-1 bg-purple-50 text-purple-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors !rounded-button">
                      <i className="ri-file-text-line mr-1"></i>
                      View Receipt
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <Link href="/donate" className="text-green-600 text-sm font-medium">
              Donate More Devices →
            </Link>
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  );
}
