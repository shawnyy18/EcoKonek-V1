
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function AdminReportsPage() {
  const router = useRouter();
  const [isRouterReady, setIsRouterReady] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

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

  const handleExport = (format: 'pdf' | 'excel') => {
    console.log(`Exporting ${format} report for period: ${selectedPeriod}`);
    // Simulate export
    const data = { period: selectedPeriod, type: format, date: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report-${selectedPeriod}.${format === 'pdf' ? 'pdf' : 'xlsx'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const keyMetrics = [
    { 
      title: 'Total Collections', 
      value: '1,474', 
      change: '+12%', 
      icon: 'ri-recycle-line',
      color: 'bg-green-500'
    },
    { 
      title: 'Active Barangays', 
      value: '6/8', 
      change: '+1', 
      icon: 'ri-map-pin-line',
      color: 'bg-blue-500'
    },
    { 
      title: 'Redistributed Items', 
      value: '401', 
      change: '+18%', 
      icon: 'ri-gift-line',
      color: 'bg-purple-500'
    },
    { 
      title: 'Success Rate', 
      value: '87%', 
      change: '+5%', 
      icon: 'ri-check-line',
      color: 'bg-emerald-500'
    }
  ];

  const barangayPerformance = [
    { name: 'San Antonio', collections: 342, redistributed: 87, rate: '92%', trend: 'up' },
    { name: 'Santa Maria', collections: 289, redistributed: 76, rate: '89%', trend: 'up' },
    { name: 'San Jose', collections: 234, redistributed: 45, rate: '78%', trend: 'down' },
    { name: 'Poblacion', collections: 198, redistributed: 56, rate: '85%', trend: 'up' },
    { name: 'Maligaya', collections: 156, redistributed: 34, rate: '72%', trend: 'up' },
    { name: 'Bagong Silang', collections: 123, redistributed: 23, rate: '68%', trend: 'down' }
  ];

  const itemBreakdown = [
    { type: 'Smartphones', count: 456, percentage: 35, working: 234, redistributed: 187 },
    { type: 'Laptops', count: 234, percentage: 18, working: 87, redistributed: 65 },
    { type: 'Tablets', count: 189, percentage: 15, working: 45, redistributed: 34 },
    { type: 'Computers', count: 156, percentage: 12, working: 23, redistributed: 18 },
    { type: 'TVs', count: 134, percentage: 10, working: 12, redistributed: 8 },
    { type: 'Others', count: 131, percentage: 10, working: 34, redistributed: 21 }
  ];

  const impactInsights = [
    { 
      title: 'Environmental Impact', 
      value: '15.2 tons', 
      description: 'E-waste diverted from landfills',
      icon: 'ri-leaf-line',
      color: 'bg-green-500'
    },
    { 
      title: 'Community Benefit', 
      value: '313 families', 
      description: 'Received refurbished devices',
      icon: 'ri-home-heart-line',
      color: 'bg-blue-500'
    },
    { 
      title: 'Economic Value', 
      value: '₱2.1M', 
      description: 'Total estimated value redistributed',
      icon: 'ri-money-dollar-circle-line',
      color: 'bg-purple-500'
    },
    { 
      title: 'Carbon Footprint', 
      value: '8.4 tons CO2', 
      description: 'Emissions prevented through reuse',
      icon: 'ri-cloud-line',
      color: 'bg-emerald-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pb-24">
      <Header
        title="Analytics & Reports"
        showBack={true}
        onBack={handleBack}
        rightAction={
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => handleExport('excel')}>
              <i className="ri-file-excel-line"></i>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleExport('pdf')}>
              <i className="ri-file-pdf-line"></i>
            </Button>
          </div>
        }
      />

      <main className="pt-20 px-4">
        {/* Period Selector */}
        <Card className="mb-6 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Report Period</h3>
          <div className="grid grid-cols-4 gap-2">
            {['week', 'month', 'quarter', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`p-2 rounded-lg text-sm capitalize transition-colors ${
                  selectedPeriod === period
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                This {period}
              </button>
            ))}
          </div>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {keyMetrics.map((metric, index) => (
            <Card key={index} className="p-4 text-center">
              <div className={`w-10 h-10 mx-auto mb-2 ${metric.color} rounded-full flex items-center justify-center text-white`}>
                <i className={`${metric.icon} text-lg`}></i>
              </div>
              <div className="text-xl font-bold text-gray-900">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.title}</div>
              <div className="text-xs text-green-600 mt-1">
                <i className="ri-arrow-up-line"></i>
                {metric.change}
              </div>
            </Card>
          ))}
        </div>

        {/* Collection Trends Chart */}
        <Card className="mb-6 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Collection Trends</h3>
          <div className="h-48 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
            <img 
              src="https://readdy.ai/api/search-image?query=Professional%20business%20analytics%20chart%20showing%20collection%20trends%20over%20time%2C%20green%20and%20blue%20color%20scheme%2C%20line%20chart%20with%20upward%20trend%2C%20clean%20modern%20design%2C%20data%20visualization%20dashboard%20style%2C%20minimalist%20background&width=300&height=180&seq=trends2&orientation=landscape"
              alt="Collection Trends Chart"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </Card>

        {/* Barangay Performance */}
        <Card className="mb-6 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Barangay Performance</h3>
          <div className="space-y-3">
            {barangayPerformance.map((barangay, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900">{barangay.name}</h4>
                    <i className={`ri-arrow-${barangay.trend}-line text-sm ${barangay.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}></i>
                  </div>
                  <p className="text-sm text-gray-600">{barangay.collections} collected • {barangay.redistributed} redistributed</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{barangay.rate}</div>
                  <div className="text-xs text-gray-500">Success Rate</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Item Type Breakdown */}
        <Card className="mb-6 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Item Type Analysis</h3>
          <div className="space-y-3">
            {itemBreakdown.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{item.type}</span>
                  <span className="text-sm text-gray-600">{item.count} units</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{item.percentage}% of total</span>
                  <span>{item.working} working • {item.redistributed} redistributed</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Impact Insights */}
        <Card className="mb-6 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Impact Insights</h3>
          <div className="grid grid-cols-2 gap-3">
            {impactInsights.map((insight, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 mb-2 ${insight.color} rounded-full flex items-center justify-center text-white`}>
                  <i className={`${insight.icon} text-sm`}></i>
                </div>
                <div className="text-lg font-bold text-gray-900">{insight.value}</div>
                <div className="text-xs text-gray-600">{insight.description}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Export Options */}
        <Card className="mb-6 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Export Reports</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="primary" 
              className="flex-col h-16"
              onClick={() => handleExport('pdf')}
            >
              <i className="ri-file-pdf-line text-xl mb-1"></i>
              <span className="text-sm">Export PDF</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex-col h-16"
              onClick={() => handleExport('excel')}
            >
              <i className="ri-file-excel-line text-xl mb-1"></i>
              <span className="text-sm">Export Excel</span>
            </Button>
          </div>
        </Card>

        {/* Performance Summary */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Performance Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Most Active Barangay</span>
              <span className="font-semibold text-green-600">San Antonio</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Top Item Category</span>
              <span className="font-semibold text-blue-600">Smartphones</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Average Processing Time</span>
              <span className="font-semibold text-purple-600">3.2 days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Overall Success Rate</span>
              <span className="font-semibold text-emerald-600">87%</span>
            </div>
          </div>
        </Card>
      </main>

      <Navigation />
    </div>
  );
}