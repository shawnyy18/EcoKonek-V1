
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [isRouterReady, setIsRouterReady] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['overview']);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedBarangay, setSelectedBarangay] = useState('all');
  const [showNotifications, setShowNotifications] = useState(false);

  // Wait for router to be ready
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRouterReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = (path: string) => {
    if (isRouterReady) {
      try {
        router.push(path);
      } catch (error) {
        console.error('Navigation error:', error);
        window.location.href = path;
      }
    } else {
      window.location.href = path;
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const barangayData = [
    { name: 'Lagundi', items: 342, trend: 'up', change: '+15%', active: true },
    { name: 'Sto.Rosario', items: 289, trend: 'up', change: '+8%', active: true },
    { name: 'San Carlos', items: 234, trend: 'down', change: '-3%', active: true },
    { name: 'San Antonio', items: 198, trend: 'up', change: '+12%', active: true },
    { name: 'San Vicente', items: 156, trend: 'up', change: '+5%', active: false },
    { name: 'San Lorenzo', items: 123, trend: 'down', change: '-8%', active: true },
    { name: 'San Jose', items: 87, trend: 'up', change: '+22%', active: false },
    { name: 'Del Pilar', items: 45, trend: 'up', change: '+18%', active: false }
  ];

  const itemTypesData = [
    { type: 'Smartphones', count: 456, percentage: 35, working: 234, color: 'bg-blue-500' },
    { type: 'Laptops', count: 234, percentage: 18, working: 87, color: 'bg-purple-500' },
    { type: 'Tablets', count: 189, percentage: 15, working: 45, color: 'bg-green-500' },
    { type: 'Computers', count: 156, percentage: 12, working: 23, color: 'bg-orange-500' },
    { type: 'TVs', count: 134, percentage: 10, working: 12, color: 'bg-red-500' },
    { type: 'Others', count: 131, percentage: 10, working: 34, color: 'bg-gray-500' }
  ];

  const redistributionData = {
    available: [
      { item: 'Working Smartphones', count: 234, icon: 'ri-smartphone-line' },
      { item: 'Functional Laptops', count: 87, icon: 'ri-computer-line' },
      { item: 'Working Tablets', count: 45, icon: 'ri-tablet-line' },
      { item: 'Desktop Computers', count: 23, icon: 'ri-computer-line' },
      { item: 'Functional TVs', count: 12, icon: 'ri-tv-line' }
    ],
    recipients: [
      { category: 'Students', count: 145, verified: 132, icon: 'ri-graduation-cap-line', color: 'bg-blue-500' },
      { category: 'Senior Citizens', count: 78, verified: 67, icon: 'ri-user-heart-line', color: 'bg-green-500' },
      { category: 'PWDs', count: 43, verified: 38, icon: 'ri-wheelchair-line', color: 'bg-purple-500' },
      { category: 'Low-Income Families', count: 89, verified: 76, icon: 'ri-home-heart-line', color: 'bg-orange-500' }
    ]
  };

  const keyMetrics = [
    { 
      label: 'Total Items Collected', 
      value: '1,474', 
      change: '+12%', 
      icon: 'ri-recycle-line', 
      color: 'bg-green-500',
      trend: 'up'
    },
    { 
      label: 'Active Barangays', 
      value: '6/8', 
      change: '+1', 
      icon: 'ri-map-pin-line', 
      color: 'bg-blue-500',
      trend: 'up'
    },
    { 
      label: 'Items Redistributed', 
      value: '401', 
      change: '+18%', 
      icon: 'ri-gift-line', 
      color: 'bg-purple-500',
      trend: 'up'
    },
    { 
      label: 'Success Rate', 
      value: '87%', 
      change: '+5%', 
      icon: 'ri-check-line', 
      color: 'bg-emerald-500',
      trend: 'up'
    }
  ];

  const notifications = [
    { id: 1, type: 'alert', message: '2 barangays need attention', time: '5 min ago', urgent: true },
    { id: 2, type: 'approval', message: '15 new donation requests', time: '1 hour ago', urgent: false },
    { id: 3, type: 'success', message: '12 donations completed today', time: '2 hours ago', urgent: false },
    { id: 4, type: 'info', message: 'Weekly report ready for download', time: '1 day ago', urgent: false }
  ];

  const quickActions = [
    { 
      title: 'User Management', 
      icon: 'ri-user-settings-line', 
      color: 'bg-blue-500', 
      link: '/admin/users',
      description: 'Manage user accounts and permissions'
    },
    { 
      title: 'Content Management', 
      icon: 'ri-file-text-line', 
      color: 'bg-green-500', 
      link: '/admin/content',
      description: 'Update facts, tips, and impact stories'
    },
    { 
      title: 'Donation Management', 
      icon: 'ri-gift-line', 
      color: 'bg-purple-500', 
      link: '/admin/donations',
      description: 'Review and process donations'
    },
    { 
      title: 'Analytics & Reports', 
      icon: 'ri-line-chart-line', 
      color: 'bg-orange-500', 
      link: '/admin/reports',
      description: 'View detailed analytics and reports'
    }
  ];

  const getActivityColor = (active: boolean, trend: string) => {
    if (!active) return 'bg-red-100 text-red-800';
    return trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  const handleApproveItem = (itemId: string, action: 'approve' | 'reject') => {
    console.log(`${action} item:`, itemId);
    // Add approval/rejection logic here
  };

  const handleSendAlert = () => {
    console.log('Sending push alert to barangays');
    // Add alert sending logic here
  };

  const handleExportData = (type: string) => {
    console.log(`Exporting ${type} data`);
    // Simulate data export
    const data = type === 'barangay' ? barangayData : itemTypesData;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-data.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getNotificationIcon = (type: string) => {
    const icons = {
      alert: 'ri-alert-line',
      approval: 'ri-time-line',
      success: 'ri-check-line',
      info: 'ri-information-line'
    };
    return icons[type as keyof typeof icons] || 'ri-notification-line';
  };

  const getNotificationColor = (type: string, urgent: boolean) => {
    if (urgent) return 'text-red-600';
    const colors = {
      alert: 'text-red-600',
      approval: 'text-yellow-600',
      success: 'text-green-600',
      info: 'text-blue-600'
    };
    return colors[type as keyof typeof colors] || 'text-gray-600';
  };

  const adminSections = [
    {
      id: 'overview',
      title: 'Dashboard Overview',
      icon: 'ri-dashboard-line',
      content: (
        <div className="space-y-4">
          {/* Period Selector */}
          <div className="flex gap-2 mb-4">
            {['week', 'month', 'quarter'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 rounded-lg text-sm capitalize ${
                  selectedPeriod === period
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                This {period}
              </button>
            ))}
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {keyMetrics.map((metric, index) => (
              <Card key={index} shadow="sm" className="text-center">
                <div className={`w-10 h-10 mx-auto mb-2 ${metric.color} rounded-full flex items-center justify-center text-white shadow-md`}>
                  <i className={`${metric.icon} text-lg`}></i>
                </div>
                <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                <div className="text-xs text-gray-600">{metric.label}</div>
                <div className={`text-xs mt-1 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  <i className={`ri-arrow-${metric.trend}-line mr-1`}></i>
                  {metric.change}
                </div>
              </Card>
            ))}
          </div>

          {/* Activity Chart */}
          <Card className="p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Collection Trends</h4>
            <div className="h-32 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
              <img 
                src="https://readdy.ai/api/search-image?query=Professional%20business%20analytics%20chart%20showing%20upward%20trend%2C%20green%20and%20blue%20color%20scheme%2C%20clean%20modern%20design%2C%20data%20visualization%20dashboard%20style%2C%20minimalist%20background%2C%20mobile%20friendly%20interface&width=280&height=120&seq=trends1&orientation=landscape"
                alt="Collection Trends Chart"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </Card>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(action.link)}
                className="w-full"
              >
                <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                  <div className={`w-10 h-10 mx-auto mb-2 ${action.color} rounded-full flex items-center justify-center text-white`}>
                    <i className={`${action.icon} text-lg`}></i>
                  </div>
                  <h5 className="font-medium text-gray-900 text-sm mb-1">{action.title}</h5>
                  <p className="text-xs text-gray-600">{action.description}</p>
                </Card>
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'barangays',
      title: 'Barangay Data Overview',
      icon: 'ri-map-pin-line',
      content: (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-gray-900">Barangay Performance</h4>
            <Button variant="ghost" size="sm" onClick={() => handleExportData('barangay')} className="hover:scale-105 active:scale-95 transition-all duration-200">
              <i className="ri-download-line"></i>
            </Button>
          </div>

          {barangayData.map((barangay, index) => (
            <Card key={index} className="relative">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-medium text-gray-900">{barangay.name}</h5>
                    <div className={`px-2 py-1 rounded-full text-xs ${getActivityColor(barangay.active, barangay.trend)}`}>
                      {barangay.active ? 'Active' : 'Needs Attention'}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{barangay.items} items collected</p>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-semibold ${barangay.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    <i className={`ri-arrow-${barangay.trend}-line mr-1`}></i>
                    {barangay.change}
                  </div>
                  <div className="w-16 h-2 bg-gray-200 rounded-full mt-1">
                    <div 
                      className={`h-full rounded-full ${barangay.active ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.min((barangay.items / 350) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )
    },
    {
      id: 'items',
      title: 'Item Types Breakdown',
      icon: 'ri-bar-chart-line',
      content: (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-gray-900">Collection by Item Type</h4>
            <Button variant="ghost" size="sm" onClick={() => handleExportData('items')} className="hover:scale-105 active:scale-95 transition-all duration-200">
              <i className="ri-download-line"></i>
            </Button>
          </div>

          {itemTypesData.map((item, index) => (
            <Card key={index}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded ${item.color}`}></div>
                  <span className="font-medium text-gray-900">{item.type}</span>
                </div>
                <span className="text-sm text-gray-600">{item.count} units</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className={`h-2 rounded-full ${item.color}`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-xs text-gray-600">
                <span>{item.percentage}% of total</span>
                <span className="text-green-600">
                  <i className="ri-check-line mr-1"></i>
                  {item.working} working
                </span>
              </div>
            </Card>
          ))}
        </div>
      )
    },
    {
      id: 'redistribution',
      title: 'Redistribution System',
      icon: 'ri-gift-line',
      content: (
        <div className="space-y-4">
          {/* Available for Donation */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-gray-900">Available for Donation</h4>
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                401 total items
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {redistributionData.available.map((item, index) => (
                <Card key={index} className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <i className={`${item.icon} text-green-600`}></i>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{item.item}</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">{item.count}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Verified Recipients */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-gray-900">Verified Recipients</h4>
              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                313 verified
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {redistributionData.recipients.map((recipient, index) => (
                <Card key={index} className="p-3 text-center">
                  <div className={`w-8 h-8 mx-auto mb-2 ${recipient.color} rounded-full flex items-center justify-center text-white`}>
                    <i className={`${recipient.icon} text-sm`}></i>
                  </div>
                  <div className="text-lg font-bold text-gray-900">{recipient.verified}</div>
                  <div className="text-xs text-gray-600">{recipient.category}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {recipient.verified}/{recipient.count} verified
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'analytics',
      title: 'Analytics Panel',
      icon: 'ri-line-chart-line',
      content: (
        <div className="space-y-4">
          {/* Performance Metrics */}
          <Card className="p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Performance Insights</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Most Active Barangay</span>
                <span className="font-semibold text-green-600">San Antonio</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Top Item Type</span>
                <span className="font-semibold text-blue-600">Smartphones</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Donation Success Rate</span>
                <span className="font-semibold text-purple-600">87%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average Processing Time</span>
                <span className="font-semibold text-orange-600">3.2 days</span>
              </div>
            </div>
          </Card>

          {/* Activity Heatmap */}
          <Card className="p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Collection Activity</h4>
            <div className="h-40 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
              <img 
                src="https://readdy.ai/api/search-image?query=Mobile%20dashboard%20analytics%20heatmap%20visualization%2C%20barangay%20activity%20levels%2C%20green%20red%20color%20coding%2C%20clean%20modern%20interface%2C%20data%20visualization%2C%20administrative%20dashboard%20style%2C%20professional%20design&width=280&height=150&seq=heatmap1&orientation=landscape"
                alt="Activity Heatmap"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </Card>

          {/* Recent Alerts */}
          <Card className="p-4">
            <h4 className="font-semibold text-gray-900 mb-3">System Alerts</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg">
                <i className="ri-alert-line text-red-600"></i>
                <span className="text-sm text-red-800">2 barangays need attention</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg">
                <i className="ri-time-line text-yellow-600"></i>
                <span className="text-sm text-yellow-800">45 items pending approval</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                <i className="ri-check-line text-green-600"></i>
                <span className="text-sm text-green-800">12 donations completed today</span>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      id: 'tools',
      title: 'LGU Management Tools',
      icon: 'ri-tools-line',
      content: (
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="primary" 
              className="h-16 flex-col !rounded-button transition-all duration-200 hover:scale-105 active:scale-95"
              onClick={() => handleNavigation('/admin/reports')}
            >
              <i className="ri-download-line text-xl"></i>
              <span className="text-sm">Export Reports</span>
            </Button>
            <Button 
              variant="secondary" 
              className="h-16 flex-col !rounded-button transition-all duration-200 hover:scale-105 active:scale-95"
              onClick={() => console.log('Approve donations')}
            >
              <i className="ri-check-double-line text-xl"></i>
              <span className="text-sm">Approve Items</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex-col !rounded-button transition-all duration-200 hover:scale-105 active:scale-95"
              onClick={handleSendAlert}
            >
              <i className="ri-notification-line text-xl"></i>
              <span className="text-sm">Send Alerts</span>
            </Button>
            <Button 
              variant="ghost" 
              className="h-16 flex-col !rounded-button transition-all duration-200 hover:scale-105 active:scale-95"
              onClick={() => handleNavigation('/admin/users')}
            >
              <i className="ri-user-settings-line text-xl"></i>
              <span className="text-sm">Manage Users</span>
            </Button>
          </div>

          {/* Pending Approvals */}
          <Card className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-gray-900">Pending Approvals</h4>
              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                45 items
              </span>
            </div>
            <div className="space-y-2">
              {[ 
                { id: '1', item: 'iPhone 12 Pro', barangay: 'San Antonio', status: 'verification' },
                { id: '2', item: 'MacBook Air', barangay: 'Lagundi', status: 'testing' },
                { id: '3', item: 'Samsung Tablet', barangay: 'Poblacion', status: 'approval' }
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.item}</p>
                    <p className="text-xs text-gray-600">{item.barangay}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleApproveItem(item.id, 'approve')}
                      className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-all duration-200 hover:scale-110 active:scale-95"
                    >
                      <i className="ri-check-line text-sm"></i>
                    </button>
                    <button 
                      onClick={() => handleApproveItem(item.id, 'reject')}
                      className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-200 hover:scale-110 active:scale-95"
                    >
                      <i className="ri-close-line text-sm"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pb-24">
      <Header 
        title="LGU Admin Dashboard" 
        showBack={true}
        backButtonStyle="close"
        onBack={() => handleNavigation('/')}
        rightAction={
          <div className="flex items-center gap-2 relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <i className="ri-notification-line"></i>
            </button>
            <div className="w-2 h-2 bg-red-500 rounded-full absolute -top-1 -right-1 animate-pulse"></div>
          </div>
        }
      />
      
      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="fixed top-16 right-4 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-lg border z-50">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              <button 
                onClick={() => setShowNotifications(false)}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-gray-600"
              >
                <i className="ri-close-line text-sm"></i>
              </button>
            </div>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-3 border-b last:border-b-0 hover:bg-gray-50">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center ${getNotificationColor(notification.type, notification.urgent)}`}>
                    <i className={`${getNotificationIcon(notification.type)} text-sm`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                  {notification.urgent && (
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t">
            <button className="w-full text-center text-sm text-green-600 hover:text-green-700">
              View All Notifications
            </button>
          </div>
        </div>
      )}
      
      <main className="pt-20 px-4">
        <div className="space-y-4">
          {adminSections.map((section) => (
            <Card key={section.id} shadow="lg" className="overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <i className={`${section.icon} text-blue-600 text-lg`}></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                </div>
                <i className={`ri-arrow-${expandedSections.includes(section.id) ? 'up' : 'down'}-s-line text-gray-400 transition-transform duration-200`}></i>
              </button>
              
              {expandedSections.includes(section.id) && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <div className="pt-4">
                    {section.content}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </main>

      <Navigation />
    </div>
  );
}
