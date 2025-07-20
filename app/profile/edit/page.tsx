
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Navigation from '../../../components/Navigation';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

export default function EditProfile() {
  const [formData, setFormData] = useState({
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    mobile: '+63 917 123 4567',
    bio: 'Environmental advocate passionate about sustainable living'
  });
  const [profileImage, setProfileImage] = useState('/api/user-avatar.jpg');
  const [isVerified, setIsVerified] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
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
            <h1 className="text-xl font-semibold text-gray-900">Edit Profile</h1>
          </div>

          {showSuccess && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg flex items-center">
              <i className="ri-check-circle-line text-green-600 mr-2"></i>
              <span className="text-green-800 text-sm">Profile updated successfully!</span>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover border-4 border-green-100"
                />
                <label className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2 cursor-pointer hover:bg-green-600 transition-colors">
                  <i className="ri-camera-line text-white text-sm"></i>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              {isVerified && (
                <div className="flex items-center justify-center mt-2">
                  <i className="ri-verified-badge-fill text-blue-500 mr-1"></i>
                  <span className="text-sm text-blue-600">Verified Account</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Input
                  label="Mobile Number"
                  name="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  maxLength={150}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="Tell us about yourself (optional)"
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                  {formData.bio.length}/150
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="font-medium text-gray-900 mb-4 flex items-center">
              <i className="ri-shield-check-line text-green-500 mr-2"></i>
              Account Security
            </h3>
            <div className="space-y-3">
              <Link href="/auth/change-password" className="flex items-center justify-between py-2">
                <span className="text-gray-700">Change Password</span>
                <i className="ri-arrow-right-s-line text-gray-400"></i>
              </Link>
              <Link href="/profile/privacy" className="flex items-center justify-between py-2">
                <span className="text-gray-700">Privacy Settings</span>
                <i className="ri-arrow-right-s-line text-gray-400"></i>
              </Link>
            </div>
          </div>

          <Button 
            variant="primary" 
            className="w-full rounded-full"
            onClick={handleSave}
          >
            <i className="ri-save-line mr-2"></i>
            Save Changes
          </Button>
        </div>
      </main>

      <Navigation />
    </div>
  );
}
