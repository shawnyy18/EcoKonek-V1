
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Navigation from '../../../components/Navigation';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  category: 'Pickup' | 'Learning' | 'Achievement' | 'General';
  icon: string;
}

export default function NotificationSettings() {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'pickup_reminders',
      title: 'Pickup Reminders',
      description: 'Get notified about upcoming e-waste pickups',
      enabled: true,
      category: 'Pickup',
      icon: 'ri-truck-line'
    },
    {
      id: 'pickup_confirmations',
      title: 'Pickup Confirmations',
      description: 'Receive updates when pickups are confirmed or completed',
      enabled: true,
      category: 'Pickup',
      icon: 'ri-check-line'
    },
    {
      id: 'new_content',
      title: 'New Learning Content',
      description: 'Be the first to know about new educational materials',
      enabled: false,
      category: 'Learning',
      icon: 'ri-book-line'
    },
    {
      id: 'learning_progress',
      title: 'Learning Progress',
      description: 'Track your educational journey and milestones',
      enabled: true,
      category: 'Learning',
      icon: 'ri-graduation-cap-line'
    },
    {
      id: 'achievement_alerts',
      title: 'Achievement Alerts',
      description: 'Celebrate when you earn badges and reach milestones',
      enabled: true,
      category: 'Achievement',
      icon: 'ri-medal-line'
    },
    {
      id: 'point_updates',
      title: 'Point Updates',
      description: 'Stay updated on your points and rewards',
      enabled: false,
      category: 'Achievement',
      icon: 'ri-star-line'
    },
    {
      id: 'donation_updates',
      title: 'Donation Updates',
      description: 'Learn about the impact of your donations',
      enabled: true,
      category: 'General',
      icon: 'ri-heart-line'
    },
    {
      id: 'app_updates',
      title: 'App Updates',
      description: 'Important news and feature announcements',
      enabled: true,
      category: 'General',
      icon: 'ri-notification-line'
    }
  ]);

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleSetting = (id: string) => {
    setSettings(settings.map(setting => 
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  const handleSavePreferences = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const categorizeSettings = () => {
    const categories = ['Pickup', 'Learning', 'Achievement', 'General'] as const;
    return categories.map(category => ({
      name: category,
      settings: settings.filter(setting => setting.category === category)
    }));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Pickup': return 'ri-truck-fill';
      case 'Learning': return 'ri-book-fill';
      case 'Achievement': return 'ri-trophy-fill';
      case 'General': return 'ri-settings-fill';
      default: return 'ri-notification-fill';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Pickup': return 'text-blue-500';
      case 'Learning': return 'text-green-500';
      case 'Achievement': return 'text-yellow-500';
      case 'General': return 'text-purple-500';
      default: return 'text-gray-500';
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
            <h1 className="text-xl font-semibold text-gray-900">Notification Settings</h1>
          </div>

          {showSuccess && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg flex items-center">
              <i className="ri-check-circle-line text-green-600 mr-2"></i>
              <span className="text-green-800 text-sm">Settings saved successfully!</span>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm p-4 mb-6 text-center">
            <i className="ri-notification-3-line text-3xl text-green-500 mb-2"></i>
            <h3 className="font-medium text-gray-900 mb-1">Stay Connected</h3>
            <p className="text-sm text-gray-600">
              Customize your notifications to stay informed about what matters to you
            </p>
          </div>

          <div className="space-y-6">
            {categorizeSettings().map((category) => (
              <Card key={category.name} className="p-4">
                <div className="flex items-center mb-4">
                  <i className={`${getCategoryIcon(category.name)} ${getCategoryColor(category.name)} text-lg mr-2`}></i>
                  <h3 className="font-medium text-gray-900">{category.name} Notifications</h3>
                </div>
                
                <div className="space-y-4">
                  {category.settings.map((setting) => (
                    <div key={setting.id} className="flex items-start justify-between">
                      <div className="flex-1 mr-4">
                        <div className="flex items-center mb-1">
                          <i className={`${setting.icon} text-gray-400 text-sm mr-2`}></i>
                          <h4 className="font-medium text-gray-900 text-sm">{setting.title}</h4>
                        </div>
                        <p className="text-xs text-gray-600 ml-5">{setting.description}</p>
                      </div>
                      
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={setting.enabled}
                          onChange={() => toggleSetting(setting.id)}
                          className="sr-only peer"
                        />
                        <div className="w-12 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300/50 rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all duration-300 ease-in-out peer-checked:bg-green-500 peer-checked:after:border-green-500 shadow-inner"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-4 mt-6">
            <div className="flex items-center mb-3">
              <i className="ri-time-line text-gray-400 mr-2"></i>
              <h3 className="font-medium text-gray-900">Quiet Hours</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Set specific hours when you don't want to receive notifications
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Enable Quiet Hours</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-12 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300/50 rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all duration-300 ease-in-out peer-checked:bg-green-500 peer-checked:after:border-green-500 shadow-inner"></div>
              </label>
            </div>
          </Card>

          <div className="mt-8">
            <Button 
              variant="primary" 
              className="w-full !rounded-full"
              onClick={handleSavePreferences}
            >
              <i className="ri-save-line mr-2"></i>
              Save Preferences
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              You can always change these settings later. Some notifications may still be sent for important account updates.
            </p>
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  );
}
