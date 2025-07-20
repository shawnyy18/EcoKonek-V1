'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface ItemForm {
  condition: 'working' | 'not-working' | '';
  quantity: string;
  photo: File | null;
  action: 'donate' | 'recycle' | '';
}

export default function Donate() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ItemForm>({
    condition: '',
    quantity: '1',
    photo: null,
    action: '',
  });

  const ewasteCategories = [
    {
      id: 'smartphones',
      name: 'Smartphones',
      icon: 'ri-smartphone-line',
      description: 'Mobile phones, old smartphones',
      image: 'https://readdy.ai/api/search-image?query=icon%2C%20realistic%20modern%20smartphone%20device%2C%20sleek%20design%2C%20high-detail%203D%20rendering%2C%20prominent%20main%20subject%2C%20clear%20and%20sharp%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20soft%20lighting%2C%20subtle%20shadows%2C%20product%20photography%20style&width=100&height=100&seq=eco-phone&orientation=squarish',
    },
    {
      id: 'laptops',
      name: 'Laptops',
      icon: 'ri-computer-line',
      description: 'Notebooks, old computers',
      image: 'https://readdy.ai/api/search-image?query=icon%2C%20realistic%20laptop%20computer%2C%20modern%20design%2C%20high-detail%203D%20rendering%2C%20prominent%20main%20subject%2C%20clear%20and%20sharp%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20soft%20lighting%2C%20subtle%20shadows%2C%20product%20photography%20style&width=100&height=100&seq=eco-laptop&orientation=squarish',
    },
    {
      id: 'tablets',
      name: 'Tablets',
      icon: 'ri-tablet-line',
      description: 'iPads, Android tablets',
      image: 'https://readdy.ai/api/search-image?query=icon%2C%20realistic%20tablet%20device%2C%20sleek%20modern%20design%2C%20high-detail%203D%20rendering%2C%20prominent%20main%20subject%2C%20clear%20and%20sharp%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20soft%20lighting%2C%20subtle%20shadows%2C%20product%20photography%20style&width=100&height=100&seq=eco-tablet&orientation=squarish',
    },
    {
      id: 'batteries',
      name: 'Batteries',
      icon: 'ri-battery-line',
      description: 'Rechargeable, AA, AAA batteries',
      image: 'https://readdy.ai/api/search-image?query=icon%2C%20realistic%20battery%20pack%20and%20small%20batteries%2C%20various%20sizes%2C%20high-detail%203D%20rendering%2C%20prominent%20main%20subject%2C%20clear%20and%20sharp%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20soft%20lighting%2C%20subtle%20shadows%2C%20product%20photography%20style&width=100&height=100&seq=eco-battery&orientation=squarish',
    },
    {
      id: 'cables',
      name: 'Cables & Chargers',
      icon: 'ri-plug-line',
      description: 'USB cables, phone chargers',
      image: 'https://readdy.ai/api/search-image?query=icon%2C%20realistic%20USB%20cables%20and%20chargers%20bundle%2C%20various%20types%2C%20high-detail%203D%20rendering%2C%20prominent%20main%20subject%2C%20clear%20and%20sharp%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20soft%20lighting%2C%20subtle%20shadows%2C%20product%20photography%20style&width=100&height=100&seq=eco-cables&orientation=squarish',
    },
    {
      id: 'appliances',
      name: 'Small Appliances',
      icon: 'ri-tools-line',
      description: 'Electric kettles, blenders, toasters',
      image: 'https://readdy.ai/api/search-image?query=icon%2C%20realistic%20small%20kitchen%20appliances%20including%20electric%20kettle%20and%20blender%2C%20modern%20design%2C%20high-detail%203D%20rendering%2C%20prominent%20main%20subject%2C%20clear%20and%20sharp%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20soft%20lighting%2C%20subtle%20shadows%2C%20product%20photography%20style&width=100&height=100&seq=eco-appliances&orientation=squarish',
    },
  ];

  const handleItemSelect = (categoryId: string) => {
    setSelectedItem(categoryId);
    setShowForm(true);
    setFormData({
      condition: '',
      quantity: '1',
      photo: null,
      action: '',
    });
  };

  const handleBack = () => {
    if (showForm) {
      setShowForm(false);
      setSelectedItem('');
    } else {
      router.push('/');
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({ ...formData, photo: file });
    }
  };

  const handleSubmit = () => {
    if (formData.condition && formData.action && formData.quantity) {
      router.push('/donate/success');
    }
  };

  const canSubmit = formData.condition !== '' && formData.action !== '' && formData.quantity !== '';
  const selectedCategory = ewasteCategories.find((cat) => cat.id === selectedItem);

  if (showForm && selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pb-24">
        <Header title={selectedCategory.name} showBack onBack={handleBack} />

        <main className="pt-20 px-4">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-3xl overflow-hidden bg-white shadow-lg mx-auto mb-4">
              <img src={selectedCategory.image} alt={selectedCategory.name} className="w-full h-full object-cover" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Item Details</h2>
            <p className="text-gray-600">Please provide information about your {selectedCategory.name.toLowerCase()}</p>
          </div>

          <form className="space-y-6">
            <Card>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Item Condition *</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, condition: 'working' })}
                      className={`p-4 rounded-2xl border-2 transition-all text-sm font-medium relative ${
                        formData.condition === 'working'
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <i className="ri-check-circle-line text-2xl"></i>
                        <span>Working</span>
                      </div>
                      {formData.condition === 'working' && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <i className="ri-check-line text-white text-sm"></i>
                        </div>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, condition: 'not-working' })}
                      className={`p-4 rounded-2xl border-2 transition-all text-sm font-medium ${
                        formData.condition === 'not-working'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <i className="ri-close-circle-line text-2xl"></i>
                        <span>Not Working</span>
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Quantity *</label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, quantity: Math.max(1, parseInt(formData.quantity) - 1).toString() })
                      }
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                      <i className="ri-subtract-line text-gray-600"></i>
                    </button>
                    <Input
                      type="number"
                      min="1"
                      max="50"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="text-center font-semibold w-20"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, quantity: Math.min(50, parseInt(formData.quantity) + 1).toString() })
                      }
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                      <i className="ri-add-line text-gray-600"></i>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Photo Upload (Optional)</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="block w-full p-4 border-2 border-dashed border-gray-300 rounded-2xl hover:border-green-400 transition-colors cursor-pointer"
                    >
                      <div className="text-center">
                        {formData.photo ? (
                          <div className="flex items-center justify-center gap-2 text-green-600">
                            <i className="ri-image-line text-xl"></i>
                            <span className="text-sm font-medium">{formData.photo.name}</span>
                          </div>
                        ) : (
                          <div className="text-gray-500">
                            <i className="ri-camera-line text-2xl mb-2"></i>
                            <p className="text-sm">Tap to add photo</p>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Preferred Action *</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, action: 'donate' })}
                      className={`p-4 rounded-2xl border-2 transition-all text-sm font-medium ${
                        formData.action === 'donate'
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <i className="ri-gift-line text-2xl"></i>
                        <span>Donate</span>
                        <span className="text-xs text-gray-500">Help others</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, action: 'recycle' })}
                      className={`p-4 rounded-2xl border-2 transition-all text-sm font-medium ${
                        formData.action === 'recycle'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <i className="ri-recycle-line text-2xl"></i>
                        <span>Recycle</span>
                        <span className="text-xs text-gray-500">Eco-friendly</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            <Button onClick={handleSubmit} disabled={!canSubmit} className="w-full !rounded-button">
              Submit Request
            </Button>
          </form>
        </main>

        <Navigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pb-24">
      <Header title="Donate or Recycle" showBack onBack={handleBack} />

      <main className="pt-20 px-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-recycle-line text-white text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">What item do you want to donate or recycle?</h2>
          <p className="text-gray-600">Choose from the categories below to get started</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {ewasteCategories.map((category) => (
            <Card
              key={category.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
              onClick={() => handleItemSelect(category.id)}
            >
              <div className="text-center p-2">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 mx-auto mb-3">
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{category.name}</h3>
                <p className="text-xs text-gray-500 leading-tight">{category.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <Card className="bg-green-50 border-green-200">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="ri-leaf-line text-white text-sm"></i>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 mb-1">Make a Difference</h4>
              <p className="text-sm text-green-700">
                Every item you donate or recycle helps reduce e-waste and supports our community.
              </p>
            </div>
          </div>
        </Card>
      </main>

      <Navigation />
    </div>
  );
}
