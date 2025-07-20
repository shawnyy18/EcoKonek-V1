
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function Profile() {
  const router = useRouter();
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [user] = useState({
    name: 'Shawn Ashlee Guarin',
    email: 'saqguarin.student@ua.edu.ph',
    phone: '+63 912 345 6789',
    location: 'Mexico, Pampanga, Philippines',
    memberSince: 'July 2025',
    avatar: 'https://scontent.fcrk1-5.fna.fbcdn.net/v/t39.30808-6/495028313_24083384424602751_7351688264169458085_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=4ytaQE9qY2EQ7kNvwGwjfBo&_nc_oc=AdlsN0ZT2BowQ1jOmjHekDPS9kfj2Qe_2RFrvOPJkzUX3bHIjemPwANZeSSciWrJSys&_nc_zt=23&_nc_ht=scontent.fcrk1-5.fna&_nc_gid=9GDZ0O4P3sAtNlVaRs_YCw&oh=00_AfTETalnYSIm6lf0vLZPKQv6v6-sWTuxZzqHOoc61YvElg&oe=6882983F'
  });

  const stats = [
    { label: 'Devices Donated', value: '23', icon: 'ri-gift-line', color: 'bg-blue-500' },
    { label: 'CO₂ Saved', value: '45kg', icon: 'ri-leaf-line', color: 'bg-emerald-500' },
    { label: 'Eco Points', value: '1,250', icon: 'ri-star-line', color: 'bg-yellow-500' },
    { label: 'Impact Score', value: '89%', icon: 'ri-heart-line', color: 'bg-pink-500' }
  ];

  const badges = [
    { name: 'Eco Warrior', description: 'Donated 20+ devices', icon: 'ri-award-line', earned: true },
    { name: 'Green Champion', description: 'Saved 50kg+ CO₂', icon: 'ri-medal-line', earned: false },
    { name: 'Community Helper', description: 'Helped 10+ families', icon: 'ri-heart-line', earned: true },
    { name: 'Sustainability Expert', description: 'Completed all courses', icon: 'ri-graduation-cap-line', earned: false }
  ];

  const recentActivity = [
    {
      type: 'donation',
      title: 'iPhone 12 Donated',
      description: 'Donated to Nueva Ecija Elementary School',
      date: '2 days ago',
      icon: 'ri-gift-line',
      color: 'bg-blue-500'
    },
    {
      type: 'learning',
      title: 'Course Completed',
      description: 'E-Waste Management Basics',
      date: '2 weeks ago',
      icon: 'ri-book-line',
      color: 'bg-purple-500'
    },
    {
      type: 'impact',
      title: 'Impact Milestone',
      description: 'Helped reduce 50kg of e-waste',
      date: '3 weeks ago',
      icon: 'ri-leaf-line',
      color: 'bg-green-500'
    }
  ];

  const menuItems = [
    { title: 'Edit Profile', icon: 'ri-edit-line', href: '/profile/edit' },
    { title: 'Donation History', icon: 'ri-history-line', href: '/profile/donations' },
    { title: 'Notifications', icon: 'ri-notification-line', href: '/profile/notifications' },
    { title: 'Help & Support', icon: 'ri-question-line', href: '/profile/support' },
    { title: 'Privacy Policy', icon: 'ri-shield-line', href: '/profile/privacy' },
    { title: 'Admin Dashboard', icon: 'ri-shield-user-line', href: '/admin' }
  ];

  const settingsMenuItems = [
    { title: 'Edit Profile', icon: 'ri-edit-line', href: '/profile/edit' },
    { title: 'Privacy Settings', icon: 'ri-shield-line', href: '/profile/privacy' },
    { title: 'Notifications', icon: 'ri-notification-line', href: '/profile/notifications' },
    { title: 'Help & Support', icon: 'ri-question-line', href: '/profile/support' }
  ];

  const handleSettingsClick = () => {
    setShowSettingsMenu(!showSettingsMenu);
  };

  const handleSettingsItemClick = (href: string) => {
    setShowSettingsMenu(false);
    router.push(href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pb-24">
      <Header
        title="Profile"
        rightAction={
          <div className="relative">
            <button
              onClick={handleSettingsClick}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <i className="ri-settings-line"></i>
            </button>

            {showSettingsMenu && (
              <div className="absolute right-0 top-12 w-48 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 z-50">
                {settingsMenuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSettingsItemClick(item.href)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <i className={`${item.icon} text-gray-600`}></i>
                    <span className="text-gray-900">{item.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        }
      />

      {showSettingsMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSettingsMenu(false)}
        />
      )}

      <main className="pt-20 px-4">
        {/* Profile Header */}
        <Card shadow="lg" className="mb-6">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h2>
            <p className="text-gray-600 mb-2">{user.email}</p>
            <p className="text-sm text-gray-500 mb-4">
              <i className="ri-map-pin-line mr-1"></i>
              {user.location}
            </p>
            <div className="inline-flex items-center gap-2 bg-[#4CAF50]/10 text-[#4CAF50] px-3 py-1 rounded-full text-sm">
              <i className="ri-calendar-line"></i>
              Member since {user.memberSince}
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} shadow="sm" className="text-center">
              <div
                className={`w-10 h-10 mx-auto mb-2 ${stat.color} rounded-full flex items-center justify-center text-white shadow-md`}
              >
                <i className={`${stat.icon} text-lg`}></i>
              </div>
              <div className="text-lg font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Badges */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
          <div className="grid grid-cols-2 gap-3">
            {badges.map((badge, index) => (
              <Card
                key={index}
                className={`text-center relative ${badge.earned ? 'border-[#4CAF50] bg-[#4CAF50]/5' : 'opacity-60'}`}
              >
                <div
                  className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${badge.earned ? 'bg-[#4CAF50] text-white shadow-lg' : 'bg-gray-200 text-gray-400'}`}
                >
                  <i className={`${badge.icon} text-xl`}></i>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">{badge.name}</h4>
                <p className="text-xs text-gray-600">{badge.description}</p>
                {badge.earned && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-[#4CAF50] rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-white text-xs"></i>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <Card>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 ${activity.color} rounded-full flex items-center justify-center text-white shadow-md flex-shrink-0`}
                  >
                    <i className={`${activity.icon} text-sm`}></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{activity.title}</h4>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.date}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Menu Items */}
        <div className="space-y-2 mb-6">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              onClick={() => router.push(item.href)}
              className="cursor-pointer hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <i className={`${item.icon} text-gray-600`}></i>
                </div>
                <span className="flex-1 font-medium text-gray-900">{item.title}</span>
                <i className="ri-arrow-right-s-line text-gray-400"></i>
              </div>
            </Card>
          ))}
        </div>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full border-red-200 text-red-600 hover:bg-red-50"
          onClick={() => router.push('/auth/login')}
        >
          <i className="ri-logout-circle-line"></i>
          Sign Out
        </Button>
      </main>

      <Navigation />
    </div>
  );
}
