'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function Home() {
  const [user] = useState({ name: 'Shawn Ashlee Guarin', points: 1250 });

  const quickActions = [
    {
      title: 'Donate Devices',
      description: 'Give working devices a second life',
      icon: 'ri-gift-line',
      color: 'from-[#66BB6A] to-[#81C784]',
      href: '/donate'
    },
    {
      title: 'Find Community',
      description: 'Connect with eco-warriors near you',
      icon: 'ri-group-line',
      color: 'from-[#42A5F5] to-[#64B5F6]',
      href: '/community'
    },
    {
      title: 'Learn About E-Waste',
      description: 'Discover environmental impact & solutions',
      icon: 'ri-leaf-line',
      color: 'from-[#81C784] to-[#A5D6A7]',
      href: '/learn'
    }
  ];

  const stats = [
    { label: 'Devices Donated', value: '23', icon: 'ri-smartphone-line' },
    { label: 'CO₂ Saved', value: '45kg', icon: 'ri-leaf-line' },
    { label: 'Eco Points', value: user.points.toLocaleString(), icon: 'ri-star-line' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pb-24">
      <Header />
      
      <main className="pt-20 px-4">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}! 👋
          </h2>
          <p className="text-gray-600">Ready to make a positive environmental impact today?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} padding="sm" shadow="sm" className="text-center">
              <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center bg-[#4CAF50]/10 rounded-full">
                <i className={`${stat.icon} text-[#4CAF50] text-sm`}></i>
              </div>
              <div className="text-lg font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Card shadow="lg" className="relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-5`}></div>
                <div className="relative flex items-center gap-4">
                  <div className={`w-12 h-12 flex items-center justify-center bg-gradient-to-r ${action.color} rounded-2xl text-white shadow-lg`}>
                    <i className={`${action.icon} text-xl`}></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{action.title}</h4>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-arrow-right-line text-gray-400"></i>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <Card>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#4CAF50]/10 rounded-full flex items-center justify-center">
                <i className="ri-check-line text-[#4CAF50]"></i>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Pickup Completed</p>
                <p className="text-sm text-gray-600">3 devices collected from Makati City</p>
              </div>
              <span className="text-xs text-gray-500">2 days ago</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#66BB6A]/10 rounded-full flex items-center justify-center">
                <i className="ri-gift-line text-[#66BB6A]"></i>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Device Donated</p>
                <p className="text-sm text-gray-600">iPhone 12 donated to local school</p>
              </div>
              <span className="text-xs text-gray-500">1 week ago</span>
            </div>
          </Card>
        </div>
      </main>

      <Navigation />
    </div>
  );
}