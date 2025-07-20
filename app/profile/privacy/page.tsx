
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Navigation from '../../../components/Navigation';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

interface PrivacySetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  category: 'Profile' | 'Data' | 'Communication';
}

export default function PrivacySettings() {
  const [settings, setSettings] = useState<PrivacySetting[]>([
    {
      id: 'private_profile',
      title: 'Make Profile Private',
      description: 'Hide your profile from other users and search engines',
      enabled: false,
      category: 'Profile'
    },
    {
      id: 'donation_sharing',
      title: 'Share Donation Stories',
      description: 'Allow your donation impact stories to be featured',
      enabled: true,
      category: 'Profile'
    },
    {
      id: 'location_sharing',
      title: 'Location Services',
      description: 'Help us provide better pickup services in your area',
      enabled: true,
      category: 'Data'
    },
    {
      id: 'usage_analytics',
      title: 'Usage Analytics',
      description: 'Help improve the app by sharing anonymous usage data',
      enabled: true,
      category: 'Data'
    },
    {
      id: 'marketing_emails',
      title: 'Marketing Communications',
      description: 'Receive updates about new features and environmental tips',
      enabled: false,
      category: 'Communication'
    }
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleSetting = (id: string) => {
    setSettings(settings.map(setting => 
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
  };

  const categorizeSettings = () => {
    const categories = ['Profile', 'Data', 'Communication'] as const;
    return categories.map(category => ({
      name: category,
      settings: settings.filter(setting => setting.category === category)
    }));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Profile': return 'ri-user-fill';
      case 'Data': return 'ri-database-fill';
      case 'Communication': return 'ri-mail-fill';
      default: return 'ri-settings-fill';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Profile': return 'text-blue-500';
      case 'Data': return 'text-green-500';
      case 'Communication': return 'text-purple-500';
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
            <h1 className="text-xl font-semibold text-gray-900">Privacy Settings</h1>
          </div>

          {showSuccess && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg flex items-center">
              <i className="ri-check-circle-line text-green-600 mr-2"></i>
              <span className="text-green-800 text-sm">Privacy settings updated successfully!</span>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm p-4 mb-6 text-center">
            <i className="ri-shield-check-line text-3xl text-green-500 mb-2"></i>
            <h3 className="font-medium text-gray-900 mb-1">Your Privacy Matters</h3>
            <p className="text-sm text-gray-600">
              Control how your data is used and shared within EcoKonek
            </p>
          </div>

          <div className="space-y-6">
            {categorizeSettings().map((category) => (
              <Card key={category.name} className="p-4">
                <div className="flex items-center mb-4">
                  <i className={`${getCategoryIcon(category.name)} ${getCategoryColor(category.name)} text-lg mr-2`}></i>
                  <h3 className="font-medium text-gray-900">{category.name} Privacy</h3>
                </div>
                
                <div className="space-y-4">
                  {category.settings.map((setting) => (
                    <div key={setting.id} className="flex items-start justify-between">
                      <div className="flex-1 mr-4">
                        <h4 className="font-medium text-gray-900 text-sm mb-1">{setting.title}</h4>
                        <p className="text-xs text-gray-600">{setting.description}</p>
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
            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
              <i className="ri-file-text-line text-blue-500 mr-2"></i>
              Legal Documents
            </h3>
            <div className="space-y-2">
              <Link href="#" className="flex items-center justify-between py-2 text-sm text-gray-700 hover:text-blue-600">
                <span>Privacy Policy</span>
                <i className="ri-external-link-line text-gray-400"></i>
              </Link>
              <Link href="#" className="flex items-center justify-between py-2 text-sm text-gray-700 hover:text-blue-600">
                <span>Terms of Service</span>
                <i className="ri-external-link-line text-gray-400"></i>
              </Link>
              <Link href="#" className="flex items-center justify-between py-2 text-sm text-gray-700 hover:text-blue-600">
                <span>Data Usage Policy</span>
                <i className="ri-external-link-line text-gray-400"></i>
              </Link>
            </div>
          </Card>

          <Card className="p-4 mt-6">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
              <i className="ri-download-line text-green-500 mr-2"></i>
              Data Rights
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left py-2 text-sm text-gray-700 hover:text-green-600 flex items-center justify-between">
                <span>Download My Data</span>
                <i className="ri-arrow-right-s-line text-gray-400"></i>
              </button>
              <button className="w-full text-left py-2 text-sm text-gray-700 hover:text-green-600 flex items-center justify-between">
                <span>Request Data Correction</span>
                <i className="ri-arrow-right-s-line text-gray-400"></i>
              </button>
            </div>
          </Card>

          <div className="mt-8">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full rounded-full mb-4"
            >
              {isSaving ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Saving...
                </div>
              ) : (
                <>
                  <i className="ri-save-line mr-2"></i>
                  Save Privacy Settings
                </>
              )}
            </Button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full bg-red-50 text-red-600 py-3 px-4 rounded-full text-sm font-medium hover:bg-red-100 transition-colors flex items-center justify-center"
            >
              <i className="ri-delete-bin-line mr-2"></i>
              Delete My Account
            </button>
          </div>
        </div>
      </main>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <div className="text-center mb-4">
              <i className="ri-alert-line text-4xl text-red-500 mb-2"></i>
              <h3 className="font-medium text-gray-900 mb-2">Delete Account</h3>
              <p className="text-sm text-gray-600">
                This action cannot be undone. All your data, donations, and pickup history will be permanently deleted.
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={handleDeleteAccount}
                className="w-full bg-red-500 text-white py-3 px-4 rounded-full text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Yes, Delete My Account
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Navigation />
    </div>
  );
}
