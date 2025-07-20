
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function AdminContentPage() {
  const router = useRouter();
  const [isRouterReady, setIsRouterReady] = useState(false);
  const [activeTab, setActiveTab] = useState('facts');
  const [searchQuery, setSearchQuery] = useState('');
  const [showContentModal, setShowContentModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [contentData, setContentData] = useState({
    facts: [
      {
        id: 1,
        title: 'Global E-Waste Crisis',
        content: '54 million tons of e-waste are produced globally each year, making it the fastest-growing waste stream.',
        status: 'Visible',
        dateCreated: '2024-01-10',
        views: 1250,
        category: 'Statistics'
      },
      {
        id: 2,
        title: 'Philippines E-Waste Generation',
        content: 'The Philippines generates approximately 3.3 kg of e-waste per person annually.',
        status: 'Visible',
        dateCreated: '2024-01-08',
        views: 890,
        category: 'Local Data'
      },
      {
        id: 3,
        title: 'Recycling Rate Statistics',
        content: 'Only 20% of global e-waste is properly recycled through appropriate channels.',
        status: 'Hidden',
        dateCreated: '2024-01-12',
        views: 0,
        category: 'Statistics'
      }
    ],
    tips: [
      {
        id: 4,
        title: 'Donate Old Devices',
        content: 'Giving away old gadgets to schools or charities helps reduce harmful waste and benefits communities.',
        status: 'Visible',
        dateCreated: '2024-01-09',
        views: 756,
        category: 'Best Practices'
      },
      {
        id: 5,
        title: 'Proper Data Deletion',
        content: 'Always securely wipe your data before disposing of electronic devices to protect your privacy.',
        status: 'Visible',
        dateCreated: '2024-01-11',
        views: 623,
        category: 'Security'
      },
      {
        id: 6,
        title: 'Battery Disposal',
        content: 'Never throw batteries in regular trash. Use designated collection points for safe disposal.',
        status: 'Visible',
        dateCreated: '2024-01-07',
        views: 445,
        category: 'Safety'
      }
    ],
    impact: [
      {
        id: 7,
        title: 'Community Transformation',
        content: 'Your donations have helped provide technology access to 50+ local schools in Metro Manila.',
        status: 'Visible',
        dateCreated: '2024-01-06',
        views: 1123,
        category: 'Success Stories'
      },
      {
        id: 8,
        title: 'Environmental Savings',
        content: 'Together, we have prevented 15 tons of e-waste from ending up in landfills this year.',
        status: 'Visible',
        dateCreated: '2024-01-05',
        views: 987,
        category: 'Environment'
      },
      {
        id: 9,
        title: 'Digital Divide Reduction',
        content: 'Our program has bridged the digital gap for 200+ families in underserved communities.',
        status: 'Hidden',
        dateCreated: '2024-01-13',
        views: 0,
        category: 'Social Impact'
      }
    ]
  });
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Statistics',
    status: 'Visible'
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState('');

  // Wait for router to be ready
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRouterReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    if (isRouterReady) {
      try {
        router.push('/admin');
      } catch (error) {
        console.error('Navigation error:', error);
        window.location.href = '/admin';
      }
    } else {
      window.location.href = '/admin';
    }
  };

  const currentContent = contentData[activeTab as keyof typeof contentData].filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showAlert = (message: string) => {
    setShowSuccessAlert(message);
    setTimeout(() => setShowSuccessAlert(''), 3000);
  };

  const generateId = () => {
    const allContent = [...contentData.facts, ...contentData.tips, ...contentData.impact];
    return Math.max(...allContent.map(item => item.id)) + 1;
  };

  const handleCreateContent = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      showAlert('Please fill in all required fields');
      return;
    }

    const newContent = {
      id: generateId(),
      title: formData.title,
      content: formData.content,
      category: formData.category,
      status: formData.status,
      dateCreated: new Date().toISOString().split('T')[0],
      views: 0
    };

    setContentData(prev => ({
      ...prev,
      [activeTab]: [...prev[activeTab as keyof typeof prev], newContent]
    }));

    setFormData({ title: '', content: '', category: 'Statistics', status: 'Visible' });
    setShowContentModal(false);
    showAlert('Content created successfully!');
  };

  const handleUpdateContent = () => {
    if (!selectedContent || !formData.title.trim() || !formData.content.trim()) {
      showAlert('Please fill in all required fields');
      return;
    }

    setContentData(prev => ({
      ...prev,
      [activeTab]: prev[activeTab as keyof typeof prev].map(item =>
        item.id === selectedContent.id
          ? { ...item, title: formData.title, content: formData.content, category: formData.category, status: formData.status }
          : item
      )
    }));

    setShowContentModal(false);
    setSelectedContent(null);
    showAlert('Content updated successfully!');
  };

  const handleDeleteContent = (contentId: number) => {
    if (confirm('Are you sure you want to delete this content?')) {
      setContentData(prev => ({
        ...prev,
        [activeTab]: prev[activeTab as keyof typeof prev].filter(item => item.id !== contentId)
      }));
      showAlert('Content deleted successfully!');
    }
  };

  const handleToggleStatus = (contentId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'Visible' ? 'Hidden' : 'Visible';
    setContentData(prev => ({
      ...prev,
      [activeTab]: prev[activeTab as keyof typeof prev].map(item =>
        item.id === contentId
          ? { ...item, status: newStatus }
          : item
      )
    }));
    showAlert(`Content ${newStatus.toLowerCase()} successfully!`);
  };

  const handleAddContent = () => {
    setSelectedContent(null);
    setFormData({ title: '', content: '', category: 'Statistics', status: 'Visible' });
    setIsEditing(true);
    setShowContentModal(true);
  };

  const handleEditContent = (content: any) => {
    setSelectedContent(content);
    setFormData({
      title: content.title,
      content: content.content,
      category: content.category,
      status: content.status
    });
    setIsEditing(true);
    setShowContentModal(true);
  };

  const handleViewContent = (content: any) => {
    setSelectedContent(content);
    setIsEditing(false);
    setShowContentModal(true);
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getStatusColor = (status: string) => {
    return status === 'Visible'
      ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-800';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Statistics': 'bg-blue-100 text-blue-800',
      'Local Data': 'bg-purple-100 text-purple-800',
      'Best Practices': 'bg-green-100 text-green-800',
      'Security': 'bg-red-100 text-red-800',
      'Safety': 'bg-yellow-100 text-yellow-800',
      'Success Stories': 'bg-emerald-100 text-emerald-800',
      'Environment': 'bg-teal-100 text-teal-800',
      'Social Impact': 'bg-pink-100 text-pink-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTabStats = (tab: string) => {
    const data = contentData[tab as keyof typeof contentData];
    return {
      total: data.length,
      visible: data.filter(item => item.status === 'Visible').length,
      hidden: data.filter(item => item.status === 'Hidden').length
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pb-24">
      <Header
        title="Content Management"
        showBack={true}
        onBack={handleBack}
        rightAction={
          <Button variant="ghost" size="sm" onClick={handleAddContent}>
            <i className="ri-add-line"></i>
          </Button>
        }
      />

      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="fixed top-20 left-4 right-4 z-50">
          <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <i className="ri-check-line"></i>
            <span className="text-sm">{showSuccessAlert}</span>
          </div>
        </div>
      )}

      <main className="pt-20 px-4">
        {/* Tab Navigation */}
        <Card className="mb-6 p-1">
          <div className="grid grid-cols-3 gap-1">
            {['facts', 'tips', 'impact'].map((tab) => {
              const stats = getTabStats(tab);
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`p-3 rounded-lg text-center transition-colors ${
                    activeTab === tab
                      ? 'bg-green-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="font-medium capitalize">{tab}</div>
                  <div className="text-xs mt-1">
                    {stats.visible}/{stats.total}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Search */}
        <Card className="mb-6 p-4">
          <Input
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </Card>

        {/* Content Statistics */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {(() => {
            const stats = getTabStats(activeTab);
            return (
              <>
                <Card className="p-3 text-center">
                  <div className="text-lg font-bold text-gray-900">{stats.total}</div>
                  <div className="text-xs text-gray-600">Total</div>
                </Card>
                <Card className="p-3 text-center">
                  <div className="text-lg font-bold text-green-600">{stats.visible}</div>
                  <div className="text-xs text-gray-600">Visible</div>
                </Card>
                <Card className="p-3 text-center">
                  <div className="text-lg font-bold text-gray-600">{stats.hidden}</div>
                  <div className="text-xs text-gray-600">Hidden</div>
                </Card>
              </>
            );
          })()}
        </div>

        {/* Content List */}
        <div className="space-y-3">
          {currentContent.map((content) => (
            <Card key={content.id} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(content.category)}`}>
                    {content.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(content.status)}`}>
                    {content.status}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{content.views} views</span>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2">{content.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{content.content}</p>

              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500">Created: {content.dateCreated}</span>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleViewContent(content)}
                >
                  <i className="ri-eye-line mr-1"></i>
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditContent(content)}
                >
                  <i className="ri-edit-line"></i>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleToggleStatus(content.id, content.status)}
                >
                  <i className={content.status === 'Visible' ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteContent(content.id)}
                  className="text-red-600"
                >
                  <i className="ri-delete-bin-line"></i>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {currentContent.length === 0 && (
          <div className="text-center py-8">
            <i className="ri-file-text-line text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-600">No content found</p>
          </div>
        )}

        {/* Add Content FAB */}
        <button
          onClick={handleAddContent}
          className="fixed bottom-20 right-4 w-14 h-14 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-colors"
        >
          <i className="ri-add-line text-xl"></i>
        </button>
      </main>

      {/* Content Modal */}
      {showContentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-sm max-h-[80vh] overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">
                  {isEditing ? (selectedContent ? 'Edit Content' : 'Add Content') : 'View Content'}
                </h3>
                <button
                  onClick={() => setShowContentModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <Input
                      placeholder="Enter title..."
                      value={formData.title}
                      onChange={(e) => handleFormChange('title', e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => handleFormChange('category', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="Statistics">Statistics</option>
                      <option value="Local Data">Local Data</option>
                      <option value="Best Practices">Best Practices</option>
                      <option value="Security">Security</option>
                      <option value="Safety">Safety</option>
                      <option value="Success Stories">Success Stories</option>
                      <option value="Environment">Environment</option>
                      <option value="Social Impact">Social Impact</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-32 resize-none"
                      placeholder="Enter content..."
                      value={formData.content}
                      onChange={(e) => handleFormChange('content', e.target.value)}
                      maxLength={500}
                    />
                    <div className="text-xs text-gray-500 mt-1">{formData.content.length}/500 characters</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => handleFormChange('status', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="Visible">Visible</option>
                      <option value="Hidden">Hidden</option>
                    </select>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <Button 
                      variant="primary" 
                      className="flex-1"
                      onClick={selectedContent ? handleUpdateContent : handleCreateContent}
                    >
                      {selectedContent ? 'Update' : 'Create'}
                    </Button>
                    <Button variant="outline" onClick={() => setShowContentModal(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : selectedContent && (
                <div className="space-y-4">
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(selectedContent.category)}`}>
                      {selectedContent.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ml-2 ${getStatusColor(selectedContent.status)}`}>
                      {selectedContent.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{selectedContent.title}</h4>
                    <p className="text-gray-700">{selectedContent.content}</p>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p>Created: {selectedContent.dateCreated}</p>
                    <p>Views: {selectedContent.views}</p>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <Button variant="primary" className="flex-1" onClick={() => setIsEditing(true)}>
                      Edit Content
                    </Button>
                    <Button variant="outline" onClick={() => setShowContentModal(false)}>
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      <Navigation />
    </div>
  );
}
