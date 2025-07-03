'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function Donate() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [deviceType, setDeviceType] = useState('');
  const [deviceCondition, setDeviceCondition] = useState('');
  const [deviceDetails, setDeviceDetails] = useState({
    brand: '',
    model: '',
    year: '',
    description: ''
  });

  const deviceTypes = [
    { id: 'smartphone', name: 'Smartphone', icon: 'ri-smartphone-line', image: 'https://readdy.ai/api/search-image?query=icon%2C%20realistic%20modern%20smartphone%2C%20high-detail%203D%20rendering%2C%20prominent%20main%20subject%2C%20clear%20and%20sharp%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20soft%20lighting%2C%20subtle%20shadows%2C%20product%20photography%20style&width=100&height=100&seq=donate-phone&orientation=squarish' },
    { id: 'laptop', name: 'Laptop', icon: 'ri-computer-line', image: 'https://readdy.ai/api/search-image?query=icon%2C%20realistic%20laptop%20computer%2C%20high-detail%203D%20rendering%2C%20prominent%20main%20subject%2C%20clear%20and%20sharp%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20soft%20lighting%2C%20subtle%20shadows%2C%20product%20photography%20style&width=100&height=100&seq=donate-laptop&orientation=squarish' },
    { id: 'tablet', name: 'Tablet', icon: 'ri-tablet-line', image: 'https://readdy.ai/api/search-image?query=icon%2C%20realistic%20tablet%20device%2C%20high-detail%203D%20rendering%2C%20prominent%20main%20subject%2C%20clear%20and%20sharp%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20soft%20lighting%2C%20subtle%20shadows%2C%20product%20photography%20style&width=100&height=100&seq=donate-tablet&orientation=squarish' },
    { id: 'desktop', name: 'Desktop PC', icon: 'ri-computer-line', image: 'https://readdy.ai/api/search-image?query=icon%2C%20realistic%20desktop%20computer%20tower%2C%20high-detail%203D%20rendering%2C%20prominent%20main%20subject%2C%20clear%20and%20sharp%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20soft%20lighting%2C%20subtle%20shadows%2C%20product%20photography%20style&width=100&height=100&seq=donate-desktop&orientation=squarish' }
  ];

  const conditions = [
    { 
      id: 'excellent', 
      name: 'Excellent', 
      description: 'Like new, minimal wear',
      color: 'from-green-500 to-green-600',
      icon: 'ri-star-line'
    },
    { 
      id: 'good', 
      name: 'Good', 
      description: 'Works well, minor scratches',
      color: 'from-blue-500 to-blue-600',
      icon: 'ri-thumb-up-line'
    },
    { 
      id: 'fair', 
      name: 'Fair', 
      description: 'Functional but shows wear',
      color: 'from-yellow-500 to-yellow-600',
      icon: 'ri-tools-line'
    },
    { 
      id: 'needs-repair', 
      name: 'Needs Repair', 
      description: 'Has issues but repairable',
      color: 'from-orange-500 to-orange-600',
      icon: 'ri-hammer-line'
    }
  ];

  const handleNext = () => {
    if (currentStep === 1 && deviceType) {
      setCurrentStep(2);
    } else if (currentStep === 2 && deviceCondition) {
      setCurrentStep(3);
    }
  };

  const handleSubmit = () => {
    router.push('/donate/success');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What device are you donating?</h2>
              <p className="text-gray-600">Select the type of device you'd like to donate</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {deviceTypes.map((device) => (
                <Card
                  key={device.id}
                  onClick={() => setDeviceType(device.id)}
                  className={`cursor-pointer transition-all ${
                    deviceType === device.id 
                      ? 'border-[#4CAF50] bg-[#4CAF50]/5 shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden bg-gray-50">
                      <img 
                        src={device.image} 
                        alt={device.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-semibold text-gray-900">{device.name}</p>
                  </div>
                  {deviceType === device.id && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-[#4CAF50] rounded-full flex items-center justify-center">
                      <i className="ri-check-line text-white text-sm"></i>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Device Condition</h2>
              <p className="text-gray-600">How would you rate the condition of your device?</p>
            </div>

            <div className="space-y-3">
              {conditions.map((condition) => (
                <Card
                  key={condition.id}
                  onClick={() => setDeviceCondition(condition.id)}
                  className={`cursor-pointer transition-all ${
                    deviceCondition === condition.id 
                      ? 'border-[#4CAF50] bg-[#4CAF50]/5 shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${condition.color} flex items-center justify-center text-white shadow-md`}>
                      <i className={`${condition.icon} text-xl`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{condition.name}</h3>
                      <p className="text-sm text-gray-600">{condition.description}</p>
                    </div>
                    {deviceCondition === condition.id && (
                      <i className="ri-check-line text-[#4CAF50] text-xl"></i>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Device Details</h2>
              <p className="text-gray-600">Help us better understand your donation</p>
            </div>

            <div className="space-y-4">
              <Input
                label="Brand"
                placeholder="e.g., Apple, Samsung, Dell"
                value={deviceDetails.brand}
                onChange={(e) => setDeviceDetails({...deviceDetails, brand: e.target.value})}
              />
              
              <Input
                label="Model"
                placeholder="e.g., iPhone 12, Galaxy S21"
                value={deviceDetails.model}
                onChange={(e) => setDeviceDetails({...deviceDetails, model: e.target.value})}
              />
              
              <Input
                label="Year"
                placeholder="e.g., 2020"
                value={deviceDetails.year}
                onChange={(e) => setDeviceDetails({...deviceDetails, year: e.target.value})}
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Description
                </label>
                <textarea
                  value={deviceDetails.description}
                  onChange={(e) => setDeviceDetails({...deviceDetails, description: e.target.value})}
                  placeholder="Any additional details about the device..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all duration-200 text-sm resize-none"
                  rows={4}
                />
              </div>
            </div>

            <Card className="bg-[#4CAF50]/5 border-[#4CAF50]/20">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#4CAF50]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="ri-information-line text-[#4CAF50] text-sm"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-[#4CAF50] mb-1">Impact of Your Donation</h4>
                  <p className="text-sm text-gray-700">
                    Your donated device will be refurbished and given to students or families in need, 
                    helping bridge the digital divide while reducing e-waste.
                  </p>
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
      <Header 
        title="Donate Device" 
        showBack 
        onBack={() => {
          if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
          } else {
            router.push('/');
          }
        }} 
      />
      
      <main className="pt-20 px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step {currentStep} of 3</span>
            <span className="text-sm text-gray-500">
              {currentStep === 1 ? 'Device Type' : currentStep === 2 ? 'Condition' : 'Details'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#4CAF50] h-2 rounded-full transition-all duration-300" 
              style={{width: `${(currentStep / 3) * 100}%`}}
            ></div>
          </div>
        </div>

        {renderStepContent()}

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          {currentStep < 3 ? (
            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !deviceType) ||
                (currentStep === 2 && !deviceCondition)
              }
              className="w-full"
            >
              Continue
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!deviceDetails.brand || !deviceDetails.model}
              className="w-full"
            >
              Submit Donation
            </Button>
          )}
          
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="w-full"
            >
              Back
            </Button>
          )}
        </div>
      </main>

      <Navigation />
    </div>
  );
}