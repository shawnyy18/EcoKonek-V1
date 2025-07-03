'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function Schedule() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const eWasteItems = [
    { id: 'smartphones', name: 'Smartphones', icon: 'ri-smartphone-line', image: 'https://readdy.ai/api/search-image?query=icon%2C%20realistic%20smartphone%20device%2C%20high-detail%203D%20rendering%2C%20prominent%20main%20subject%2C%20clear%20and%20sharp%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20soft%20lighting%2C%20subtle%20shadows%2C%20product%20photography%20style&width=100&height=100&seq=phone&orientation=squarish' },
    { id: 'laptops', name: 'Laptops', icon: 'ri-computer-line', image: 'https://readdy.ai/api/search-image?query=icon%2C%20realistic%20laptop%20computer%2C%20high-detail%203D%20rendering%2C%20prominent%20main%20subject%2C%20clear%20and%20sharp%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20soft%20lighting%2C%20subtle%20shadows%2C%20product%20photography%20style&width=100&height=100&seq=laptop&orientation=squarish' },
    { id: 'tablets', name: 'Tablets', icon: 'ri-tablet-line', image: 'https://readdy.ai/api/search-image?query=icon%2C%20realistic%20tablet%20device%2C%20high-detail%203D%20rendering%2C%20prominent%20main%20subject%2C%20clear%20and%20sharp%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20soft%20lighting%2C%20subtle%20shadows%2C%20product%20photography%20style&width=100&height=100&seq=tablet&orientation=squarish' },
    { id: 'batteries', name: 'Batteries', icon: 'ri-battery-line', image: 'https://readdy.ai/api/search-image?query=icon%2C%20realistic%20batteries%20collection%2C%20high-detail%203D%20rendering%2C%20prominent%20main%20subject%2C%20clear%20and%20sharp%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20soft%20lighting%2C%20subtle%20shadows%2C%20product%20photography%20style&width=100&height=100&seq=battery&orientation=squarish' },
    { id: 'cables', name: 'Cables & Chargers', icon: 'ri-plug-line', image: 'https://readdy.ai/api/search-image?query=icon%2C%20realistic%20USB%20cables%20and%20chargers%2C%20high-detail%203D%20rendering%2C%20prominent%20main%20subject%2C%20clear%20and%20sharp%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20soft%20lighting%2C%20subtle%20shadows%2C%20product%20photography%20style&width=100&height=100&seq=cables&orientation=squarish' },
    { id: 'appliances', name: 'Small Appliances', icon: 'ri-home-gear-line', image: 'https://readdy.ai/api/search-image?query=icon%2C%20realistic%20small%20kitchen%20appliances%2C%20high-detail%203D%20rendering%2C%20prominent%20main%20subject%2C%20clear%20and%20sharp%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20soft%20lighting%2C%20subtle%20shadows%2C%20product%20photography%20style&width=100&height=100&seq=appliance&orientation=squarish' }
  ];

  const timeSlots = [
    '8:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM', 
    '1:00 PM - 3:00 PM',
    '3:00 PM - 5:00 PM',
    '5:00 PM - 7:00 PM'
  ];

  const toggleItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSchedule = () => {
    if (selectedDate && selectedTime && selectedItems.length > 0 && address) {
      router.push('/schedule/confirmation');
    }
  };

  const getNextDays = (count: number) => {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= count; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      weekday: 'short'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pb-24">
      <Header 
        title="Schedule Pickup" 
        showBack 
        onBack={() => router.push('/')} 
      />
      
      <main className="pt-20 px-4">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step 1 of 3</span>
            <span className="text-sm text-gray-500">Schedule Details</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[#4CAF50] h-2 rounded-full" style={{width: '33%'}}></div>
          </div>
        </div>

        {/* Select Date */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h3>
          <div className="grid grid-cols-3 gap-3">
            {getNextDays(6).map((date, index) => {
              const dateStr = date.toISOString().split('T')[0];
              const isSelected = selectedDate === dateStr;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`p-3 rounded-2xl border-2 transition-all text-center ${
                    isSelected 
                      ? 'border-[#4CAF50] bg-[#4CAF50]/10 text-[#4CAF50]' 
                      : 'border-gray-200 hover:border-[#4CAF50]/50'
                  }`}
                >
                  <div className="text-xs font-medium text-gray-600">{formatDate(date).split(' ')[0]}</div>
                  <div className="text-lg font-bold">{date.getDate()}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Select Time */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Time</h3>
          <div className="space-y-2">
            {timeSlots.map((time, index) => (
              <button
                key={index}
                onClick={() => setSelectedTime(time)}
                className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                  selectedTime === time
                    ? 'border-[#4CAF50] bg-[#4CAF50]/10 text-[#4CAF50]'
                    : 'border-gray-200 hover:border-[#4CAF50]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{time}</span>
                  {selectedTime === time && (
                    <i className="ri-check-line text-[#4CAF50]"></i>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Select Items */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What items do you have?</h3>
          <div className="grid grid-cols-2 gap-3">
            {eWasteItems.map((item) => {
              const isSelected = selectedItems.includes(item.id);
              return (
                <Card
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`relative transition-all cursor-pointer ${
                    isSelected 
                      ? 'border-[#4CAF50] bg-[#4CAF50]/5 shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-2xl overflow-hidden bg-gray-50">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[#4CAF50] rounded-full flex items-center justify-center">
                      <i className="ri-check-line text-white text-sm"></i>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* Address */}
        <div className="mb-6">
          <Input
            label="Pickup Address"
            placeholder="Enter your full address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            icon={<i className="ri-map-pin-line"></i>}
          />
        </div>

        {/* Notes */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any special instructions or details..."
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all duration-200 text-sm resize-none"
            rows={3}
          />
        </div>

        {/* Continue Button */}
        <Button
          onClick={handleSchedule}
          disabled={!selectedDate || !selectedTime || selectedItems.length === 0 || !address}
          className="w-full"
        >
          Continue to Review
        </Button>
      </main>

      <Navigation />
    </div>
  );
}