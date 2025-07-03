'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Welcome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: 'Welcome to EcoKonek PH',
      subtitle: 'Connecting Communities for Sustainable E-Waste Solutions',
      description: 'Transform electronic waste into opportunities for environmental impact and community development.',
      image: 'https://readdy.ai/api/search-image?query=Modern%20sustainable%20technology%20recycling%20facility%20with%20green%20plants%20and%20solar%20panels%2C%20clean%20minimalist%20design%2C%20bright%20natural%20lighting%2C%20eco-friendly%20atmosphere%2C%20professional%20photography%20style%2C%20high%20resolution&width=300&height=400&seq=welcome1&orientation=portrait'
    },
    {
      title: 'Easy E-Waste Collection',
      subtitle: 'Schedule Pickups with One Tap',
      description: 'Book convenient pickups for your electronic devices and contribute to a cleaner environment.',
      image: 'https://readdy.ai/api/search-image?query=Person%20using%20smartphone%20to%20schedule%20waste%20collection%2C%20modern%20mobile%20app%20interface%2C%20clean%20home%20environment%2C%20natural%20lighting%2C%20lifestyle%20photography%2C%20professional%20quality&width=300&height=400&seq=welcome2&orientation=portrait'
    },
    {
      title: 'Give Devices New Life',
      subtitle: 'Donate to Make a Difference',
      description: 'Help bridge the digital divide by donating working devices to communities in need.',
      image: 'https://readdy.ai/api/search-image?query=Happy%20Filipino%20family%20receiving%20refurbished%20electronic%20devices%2C%20community%20center%20setting%2C%20warm%20lighting%2C%20genuine%20smiles%2C%20documentary%20photography%20style%2C%20heartwarming%20moment&width=300&height=400&seq=welcome3&orientation=portrait'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4CAF50]/5 to-white flex flex-col">
      {/* Slides */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          {/* Image */}
          <div className="w-72 h-80 mx-auto mb-8 rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover object-top"
            />
          </div>
          
          {/* Logo */}
          <div className="mb-6">
            <h1 className="text-3xl font-pacifico text-[#4CAF50] mb-2">EcoKonek PH</h1>
          </div>
          
          {/* Content */}
          <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {slides[currentSlide].title}
            </h2>
            <h3 className="text-lg font-semibold text-[#4CAF50]">
              {slides[currentSlide].subtitle}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {slides[currentSlide].description}
            </p>
          </div>
        </div>
      </div>
      
      {/* Slide Indicators */}
      <div className="flex justify-center gap-2 mb-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-[#4CAF50] w-8' 
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      
      {/* Navigation Buttons */}
      <div className="px-6 pb-8 space-y-3">
        {currentSlide < slides.length - 1 ? (
          <>
            <Button 
              onClick={() => setCurrentSlide(currentSlide + 1)}
              className="w-full"
            >
              Continue
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setCurrentSlide(slides.length - 1)}
              className="w-full"
            >
              Skip
            </Button>
          </>
        ) : (
          <>
            <Link href="/auth/login">
              <Button className="w-full mb-3">
                Get Started
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}