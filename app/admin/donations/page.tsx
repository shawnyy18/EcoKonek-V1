
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function AdminDonationsPage() {
  const router = useRouter();
  const [isRouterReady, setIsRouterReady] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState('');
  const [donationsData, setDonationsData] = useState([
    {
      id: 1,
      donorName: 'Maria Santos',
      donorEmail: 'maria.santos@email.com',
      donorPhone: '+63 912 345 6789',
      deviceType: 'Smartphone',
      deviceModel: 'iPhone 12 Pro',
      deviceCondition: 'Good',
      estimatedValue: '₱25,000',
      status: 'Pending',
      dateSubmitted: '2024-01-15',
      barangay: 'San Antonio',
      images: ['https://readdy.ai/api/search-image?query=iPhone%2012%20Pro%20smartphone%2C%20clean%20product%20shot%2C%20white%20background%2C%20high%20quality%2C%20professional%20photography%2C%20mobile%20device&width=200&height=200&seq=iphone1&orientation=squarish'],
      notes: 'Minor scratches on back, screen protector included'
    },
    {
      id: 2,
      donorName: 'Juan dela Cruz',
      donorEmail: 'juan.cruz@email.com',
      donorPhone: '+63 917 654 3210',
      deviceType: 'Laptop',
      deviceModel: 'MacBook Air M1',
      deviceCondition: 'Excellent',
      estimatedValue: '₱45,000',
      status: 'Approved',
      dateSubmitted: '2024-01-14',
      barangay: 'Santa Maria',
      images: ['https://readdy.ai/api/search-image?query=MacBook%20Air%20laptop%20computer%2C%20silver%20color%2C%20clean%20product%20photography%2C%20white%20background%2C%20professional%20shot%2C%20technology%20device&width=200&height=200&seq=macbook1&orientation=squarish'],
      notes: 'Like new condition, includes charger and original box'
    },
    {
      id: 3,
      donorName: 'Anna Reyes',
      donorEmail: 'anna.reyes@email.com',
      donorPhone: '+63 905 789 4561',
      deviceType: 'Tablet',
      deviceModel: 'iPad Air 4th Gen',
      deviceCondition: 'Good',
      estimatedValue: '₱18,000',
      status: 'Collected',
      dateSubmitted: '2024-01-13',
      barangay: 'Poblacion',
      images: ['https://readdy.ai/api/search-image?query=iPad%20tablet%20device%2C%20space%20gray%20color%2C%20clean%20product%20shot%2C%20white%20background%2C%20professional%20photography%2C%20mobile%20technology&width=200&height=200&seq=ipad1&orientation=squarish'],
      notes: 'Small crack on corner, fully functional'
    },
    {
      id: 4,
      donorName: 'Carlos Mendoza',
      donorEmail: 'carlos.mendoza@email.com',
      donorPhone: '+63 926 321 7890',
      deviceType: 'Desktop',
      deviceModel: 'Dell Inspiron Desktop',
      deviceCondition: 'Fair',
      estimatedValue: '₱15,000',
      status: 'Redistributed',
      dateSubmitted: '2024-01-12',
      barangay: 'San Jose',
      images: ['https://readdy.ai/api/search-image?query=Dell%20desktop%20computer%20tower%2C%20black%20color%2C%20clean%20product%20photography%2C%20white%20background%2C%20professional%20shot%2C%20PC%20hardware&width=200&height=200&seq=desktop1&orientation=squarish'],
      notes: 'Older model but works well, includes monitor and keyboard'
    }
  ]);

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

  const handleCloseAdmin = () => {
    if (isRouterReady) {
      try {
        router.push('/');
      } catch (error) {
        console.error('Navigation error:', error);
        window.location.href = '/';
      }
    } else {
      window.location.href = '/';
    }
  };

  const filteredDonations = donationsData.filter(donation => {
    const matchesSearch = donation.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         donation.deviceModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         donation.barangay.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || donation.status.toLowerCase() === activeTab;
    return matchesSearch && matchesTab;
  });

  const showAlert = (message: string) => {
    setShowSuccessAlert(message);
    setTimeout(() => setShowSuccessAlert(''), 3000);
  };

  const handleStatusChange = (donationId: number, newStatus: string) => {
    setDonationsData(prev => 
      prev.map(donation => 
        donation.id === donationId ? { ...donation, status: newStatus } : donation
      )
    );
    showAlert(`Donation ${newStatus.toLowerCase()} successfully!`);
  };

  const handleDeleteDonation = (donationId: number) => {
    if (confirm('Are you sure you want to delete this donation?')) {
      setDonationsData(prev => prev.filter(donation => donation.id !== donationId));
      showAlert('Donation deleted successfully!');
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Approved': 'bg-green-100 text-green-800',
      'Collected': 'bg-blue-100 text-blue-800',
      'Redistributed': 'bg-purple-100 text-purple-800',
      'Rejected': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getConditionColor = (condition: string) => {
    const colors = {
      'Excellent': 'bg-green-100 text-green-800',
      'Good': 'bg-blue-100 text-blue-800',
      'Fair': 'bg-yellow-100 text-yellow-800',
      'Poor': 'bg-red-100 text-red-800'
    };
    return colors[condition as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTabStats = () => {
    return {
      all: donationsData.length,
      pending: donationsData.filter(d => d.status === 'Pending').length,
      approved: donationsData.filter(d => d.status === 'Approved').length,
      collected: donationsData.filter(d => d.status === 'Collected').length,
      redistributed: donationsData.filter(d => d.status === 'Redistributed').length
    };
  };

  const stats = getTabStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pb-24">
      <Header
        title="Donation Management"
        showBack={true}
        onBack={handleBack}
        showCloseAdmin={true}
        onCloseAdmin={handleCloseAdmin}
        rightAction={
          <Button variant="ghost" size="sm" onClick={() => console.log('Export donations')}>
            <i className="ri-download-line"></i>
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
          <div className="grid grid-cols-5 gap-1 text-xs">
            {[
              { key: 'all', label: 'All', count: stats.all },
              { key: 'pending', label: 'Pending', count: stats.pending },
              { key: 'approved', label: 'Approved', count: stats.approved },
              { key: 'collected', label: 'Collected', count: stats.collected },
              { key: 'redistributed', label: 'Done', count: stats.redistributed }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`p-2 rounded-lg text-center transition-colors ${
                  activeTab === tab.key
                    ? 'bg-green-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="font-medium">{tab.label}</div>
                <div className="text-xs mt-1">{tab.count}</div>
              </button>
            ))}
          </div>
        </Card>

        {/* Search */}
        <Card className="mb-6 p-4">
          <Input
            placeholder="Search by donor, device, or barangay..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </Card>

        {/* Donations List */}
        <div className="space-y-4">
          {filteredDonations.map((donation) => (
            <Card key={donation.id} className="p-4">
              <div className="flex items-start gap-4">
                {/* Device Image */}
                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={donation.images[0]} 
                    alt={donation.deviceModel}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Donation Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(donation.status)}`}>
                      {donation.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getConditionColor(donation.deviceCondition)}`}>
                      {donation.deviceCondition}
                    </span>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-1">{donation.deviceModel}</h3>
                  <p className="text-sm text-gray-600 mb-1">{donation.donorName}</p>
                  <p className="text-xs text-gray-500 mb-2">{donation.barangay} • {donation.dateSubmitted}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-green-600">{donation.estimatedValue}</span>
                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setSelectedDonation(donation);
                          setShowDonationModal(true);
                        }}
                      >
                        <i className="ri-eye-line"></i>
                      </Button>
                      
                      {donation.status === 'Pending' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(donation.id, 'Approved')}
                            className="text-green-600 border-green-600"
                          >
                            <i className="ri-check-line"></i>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(donation.id, 'Rejected')}
                            className="text-red-600 border-red-600"
                          >
                            <i className="ri-close-line"></i>
                          </Button>
                        </>
                      )}
                      
                      {donation.status === 'Approved' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(donation.id, 'Collected')}
                          className="text-blue-600 border-blue-600"
                        >
                          <i className="ri-truck-line"></i>
                        </Button>
                      )}
                      
                      {donation.status === 'Collected' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(donation.id, 'Redistributed')}
                          className="text-purple-600 border-purple-600"
                        >
                          <i className="ri-gift-line"></i>
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteDonation(donation.id)}
                        className="text-red-600"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredDonations.length === 0 && (
          <div className="text-center py-8">
            <i className="ri-gift-line text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-600">No donations found</p>
          </div>
        )}
      </main>

      {/* Donation Details Modal */}
      {showDonationModal && selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-sm max-h-[80vh] overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Donation Details</h3>
                <button
                  onClick={() => setShowDonationModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>

              <div className="space-y-4">
                {/* Device Image */}
                <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={selectedDonation.images[0]} 
                    alt={selectedDonation.deviceModel}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Status and Condition */}
                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedDonation.status)}`}>
                    {selectedDonation.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getConditionColor(selectedDonation.deviceCondition)}`}>
                    {selectedDonation.deviceCondition}
                  </span>
                </div>

                {/* Device Info */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{selectedDonation.deviceModel}</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-600">Type:</span> {selectedDonation.deviceType}</p>
                    <p><span className="text-gray-600">Estimated Value:</span> <span className="font-semibold text-green-600">{selectedDonation.estimatedValue}</span></p>
                    <p><span className="text-gray-600">Submitted:</span> {selectedDonation.dateSubmitted}</p>
                  </div>
                </div>

                {/* Donor Info */}
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Donor Information</h5>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-600">Name:</span> {selectedDonation.donorName}</p>
                    <p><span className="text-gray-600">Email:</span> {selectedDonation.donorEmail}</p>
                    <p><span className="text-gray-600">Phone:</span> {selectedDonation.donorPhone}</p>
                    <p><span className="text-gray-600">Barangay:</span> {selectedDonation.barangay}</p>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Notes</h5>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedDonation.notes}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-6">
                  {selectedDonation.status === 'Pending' && (
                    <>
                      <Button 
                        variant="primary" 
                        className="flex-1"
                        onClick={() => {
                          handleStatusChange(selectedDonation.id, 'Approved');
                          setShowDonationModal(false);
                        }}
                      >
                        Approve
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => {
                          handleStatusChange(selectedDonation.id, 'Rejected');
                          setShowDonationModal(false);
                        }}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  
                  {selectedDonation.status === 'Approved' && (
                    <Button 
                      variant="primary" 
                      className="flex-1"
                      onClick={() => {
                        handleStatusChange(selectedDonation.id, 'Collected');
                        setShowDonationModal(false);
                      }}
                    >
                      Mark as Collected
                    </Button>
                  )}
                  
                  {selectedDonation.status === 'Collected' && (
                    <Button 
                      variant="primary" 
                      className="flex-1"
                      onClick={() => {
                        handleStatusChange(selectedDonation.id, 'Redistributed');
                        setShowDonationModal(false);
                      }}
                    >
                      Mark as Redistributed
                    </Button>
                  )}
                  
                  <Button variant="outline" onClick={() => setShowDonationModal(false)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      <Navigation />
    </div>
  );
}