
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

function DonationSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showShareModal, setShowShareModal] = useState(false);
  
  // Get donation details from URL params or use defaults
  const donatedItems = searchParams.get('items')?.split(',') || ['Laptop', 'Mobile Phone'];
  const recipient = searchParams.get('recipient') || 'Local Community School';
  const impact = searchParams.get('impact') || 'Help students access digital learning';

  const handleShare = (platform: string) => {
    const shareText = `I just donated ${donatedItems.join(', ')} through EcoKonek PH to help reduce e-waste! 🌱 #EcoKonek #SustainablePH`;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}&quote=${encodeURIComponent(shareText)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText)}`
    };

    if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
    }
    setShowShareModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pb-24">
      <Header 
        title="Donation Success" 
        showBack={true}
        onBack={() => router.push('/donate')}
      />
      
      <main className="pt-20 px-4">
        <div className="space-y-6">
          {/* Thank You Message */}
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-heart-line text-3xl text-white"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              🎉 Thank You for Your Donation!
            </h1>
            <p className="text-gray-600">
              Your generous donation will make a meaningful impact in our community.
            </p>
          </div>

          {/* Donation Details Card */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-gift-line text-green-500"></i>
              Donation Summary
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="ri-smartphone-line text-blue-600 text-sm"></i>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Items Donated</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {donatedItems.map((item, index) => (
                      <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {item.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <i className="ri-building-line text-purple-600 text-sm"></i>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Recipient</p>
                  <p className="text-gray-600">{recipient}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <i className="ri-lightbulb-line text-yellow-600 text-sm"></i>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Impact</p>
                  <p className="text-gray-600">{impact}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Environmental Impact */}
          <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <i className="ri-leaf-line text-lg text-white"></i>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Environmental Impact</p>
                <p className="text-sm text-gray-600">Your donation helps reduce e-waste</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">2.5kg</p>
                <p className="text-xs text-gray-600">E-waste prevented</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">15kg</p>
                <p className="text-xs text-gray-600">CO₂ emissions saved</p>
              </div>
            </div>
          </Card>

          {/* Points & Badge */}
          <Card className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center">
                  <i className="ri-medal-line text-xl text-white"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Achievement Unlocked!</p>
                  <p className="text-gray-600">+10 points • "Generous Giver" badge</p>
                </div>
              </div>
            </div>
          </Card>

          {/* What Happens Next */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">What Happens Next?</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <i className="ri-check-line text-green-500 mt-1"></i>
                <p className="text-sm text-gray-600">Your items will be prepared for the recipient</p>
              </div>
              <div className="flex items-start gap-2">
                <i className="ri-truck-line text-green-500 mt-1"></i>
                <p className="text-sm text-gray-600">Delivery will be arranged within 3-5 business days</p>
              </div>
              <div className="flex items-start gap-2">
                <i className="ri-notification-line text-green-500 mt-1"></i>
                <p className="text-sm text-gray-600">You'll receive updates on the donation status</p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              variant="primary" 
              className="w-full h-12"
              onClick={() => setShowShareModal(true)}
            >
              <i className="ri-share-line mr-2"></i>
              Share Your Donation
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full h-12"
              onClick={() => router.push('/profile')}
            >
              <i className="ri-history-line mr-2"></i>
              View My Donations
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full h-12"
              onClick={() => router.push('/')}
            >
              <i className="ri-home-line mr-2"></i>
              Back to Home
            </Button>
          </div>
        </div>
      </main>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 p-4">
          <Card className="w-full max-w-sm">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Share Your Impact</h3>
                <button 
                  onClick={() => setShowShareModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Inspire others to donate by sharing your contribution!
              </p>
              
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => handleShare('facebook')}
                >
                  <i className="ri-facebook-fill text-blue-600 mr-3"></i>
                  Share on Facebook
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => handleShare('twitter')}
                >
                  <i className="ri-twitter-fill text-blue-400 mr-3"></i>
                  Share on Twitter
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => handleShare('whatsapp')}
                >
                  <i className="ri-whatsapp-fill text-green-600 mr-3"></i>
                  Share on WhatsApp
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <Navigation />
    </div>
  );
}

export default function DonationSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading success page...</p>
        </div>
      </div>
    }>
      <DonationSuccessContent />
    </Suspense>
  );
}
