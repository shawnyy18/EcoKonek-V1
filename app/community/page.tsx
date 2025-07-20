
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function CommunityPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const filters = [
    { id: 'all', label: 'All Users', icon: 'ri-group-line' },
    { id: 'nearby', label: 'Nearby', icon: 'ri-map-pin-line' },
    { id: 'active', label: 'Most Active', icon: 'ri-fire-line' },
    { id: 'champions', label: 'Eco Champions', icon: 'ri-award-line' },
    { id: 'recent', label: 'New Members', icon: 'ri-user-add-line' }
  ];

  const users = [
    {
      id: 1,
      name: 'Juan Dela Cruz',
      location: 'Quezon City',
      distance: '2.3 km',
      points: 1450,
      donations: 18,
      joinedDate: '2024-01-15',
      badges: ['Eco Warrior', 'Green Champion'],
      bio: 'Passionate about reducing e-waste and helping communities access technology.',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Filipino%20man%20headshot%2C%20friendly%20smile%2C%20casual%20green%20shirt%2C%20clean%20background%2C%20environmental%20enthusiast%2C%20natural%20lighting%2C%20high%20quality&width=80&height=80&seq=community1&orientation=squarish',
      isOnline: true,
      lastActive: 'Active now'
    },
    {
      id: 2,
      name: 'Ana Reyes',
      location: 'Makati City',
      distance: '4.1 km',
      points: 2340,
      donations: 25,
      joinedDate: '2023-12-08',
      badges: ['Community Helper', 'Sustainability Expert', 'Green Champion'],
      bio: 'Environmental educator helping schools understand e-waste management.',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Filipina%20woman%20headshot%2C%20warm%20smile%2C%20eco-friendly%20clothing%2C%20clean%20background%2C%20environmental%20advocate%2C%20natural%20lighting%2C%20high%20quality&width=80&height=80&seq=community2&orientation=squarish',
      isOnline: false,
      lastActive: '2 hours ago'
    },
    {
      id: 3,
      name: 'Carlos Mendoza',
      location: 'Pasig City',
      distance: '5.7 km',
      points: 890,
      donations: 12,
      joinedDate: '2024-02-20',
      badges: ['Eco Warrior'],
      bio: 'Tech professional who loves giving old devices new life.',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Filipino%20man%20headshot%2C%20friendly%20expression%2C%20modern%20casual%20attire%2C%20clean%20background%2C%20tech%20professional%2C%20natural%20lighting%2C%20high%20quality&width=80&height=80&seq=community3&orientation=squarish',
      isOnline: true,
      lastActive: 'Active now'
    },
    {
      id: 4,
      name: 'Lisa Garcia',
      location: 'Taguig City',
      distance: '3.2 km',
      points: 1650,
      donations: 22,
      joinedDate: '2024-01-03',
      badges: ['Community Helper', 'Eco Warrior'],
      bio: 'Mother of two, teaching kids about environmental responsibility.',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Filipina%20woman%20headshot%2C%20motherly%20smile%2C%20casual%20sustainable%20fashion%2C%20clean%20background%2C%20family%20oriented%2C%20natural%20lighting%2C%20high%20quality&width=80&height=80&seq=community4&orientation=squarish',
      isOnline: false,
      lastActive: '1 day ago'
    },
    {
      id: 5,
      name: 'Miguel Santos',
      location: 'Mandaluyong',
      distance: '6.8 km',
      points: 3200,
      donations: 45,
      joinedDate: '2023-10-12',
      badges: ['Eco Champion', 'Sustainability Expert', 'Community Helper', 'Green Champion'],
      bio: 'Environmental engineer working on sustainable waste solutions.',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Filipino%20man%20headshot%2C%20confident%20smile%2C%20engineering%20attire%2C%20clean%20background%2C%20environmental%20engineer%2C%20natural%20lighting%2C%20high%20quality&width=80&height=80&seq=community5&orientation=squarish',
      isOnline: true,
      lastActive: 'Active now'
    },
    {
      id: 6,
      name: 'Rosa Fernandez',
      location: 'San Juan City',
      distance: '1.8 km',
      points: 560,
      donations: 8,
      joinedDate: '2024-03-01',
      badges: ['New Member'],
      bio: 'Just started my eco journey and excited to make a difference!',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Filipina%20woman%20headshot%2C%20enthusiastic%20smile%2C%20youthful%20appearance%2C%20clean%20background%2C%20new%20environmental%20enthusiast%2C%20natural%20lighting%2C%20high%20quality&width=80&height=80&seq=community6&orientation=squarish',
      isOnline: false,
      lastActive: '30 minutes ago'
    }
  ];

  const topContributors = [
    { name: 'Miguel Santos', points: 3200, avatar: users[4].avatar },
    { name: 'Ana Reyes', points: 2340, avatar: users[1].avatar },
    { name: 'Lisa Garcia', points: 1650, avatar: users[3].avatar }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.bio.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    switch (selectedFilter) {
      case 'nearby':
        return parseFloat(user.distance) <= 5.0;
      case 'active':
        return user.points >= 1500;
      case 'champions':
        return user.badges.some(badge => badge.includes('Champion') || badge.includes('Expert'));
      case 'recent':
        return new Date(user.joinedDate) > new Date('2024-02-01');
      default:
        return true;
    }
  });

  const handleUserClick = (user: any) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleConnect = (userId: number) => {
    console.log('Connecting to user:', userId);
    // Connect logic here
  };

  const handleMessage = (userId: number) => {
    console.log('Messaging user:', userId);
    // Message logic here
  };

  const getBadgeColor = (badge: string) => {
    const colors = {
      'Eco Warrior': 'bg-green-100 text-green-800',
      'Green Champion': 'bg-emerald-100 text-emerald-800',
      'Community Helper': 'bg-blue-100 text-blue-800',
      'Sustainability Expert': 'bg-purple-100 text-purple-800',
      'Eco Champion': 'bg-yellow-100 text-yellow-800',
      'New Member': 'bg-pink-100 text-pink-800'
    };
    return colors[badge as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pb-24">
      <Header 
        title="Community" 
        rightAction={
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 text-gray-600 hover:bg-white transition-colors"
          >
            <i className="ri-filter-line"></i>
          </button>
        }
      />

      <main className="pt-20 px-4">
        {/* Search */}
        <Card className="mb-6 p-4 bg-white/80 backdrop-blur-sm">
          <Input
            placeholder="Search eco-warriors by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </Card>

        {/* Filters */}
        {showFilters && (
          <Card className="mb-6 p-4 bg-white/80 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`p-3 rounded-xl text-left transition-colors ${
                    selectedFilter === filter.id
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <i className={`${filter.icon} text-lg`}></i>
                    <span className="text-sm font-medium">{filter.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Top Contributors */}
        <Card className="mb-6 p-4 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">🏆 Top Eco Champions</h3>
            <Button variant="ghost" size="sm">
              <i className="ri-trophy-line text-yellow-500"></i>
            </Button>
          </div>
          <div className="flex justify-between">
            {topContributors.map((contributor, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden mx-auto mb-2">
                    <img 
                      src={contributor.avatar} 
                      alt={contributor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === 0 ? 'bg-yellow-500 text-white' : 
                    index === 1 ? 'bg-gray-400 text-white' : 
                    'bg-orange-500 text-white'
                  }`}>
                    {index + 1}
                  </div>
                </div>
                <p className="text-xs font-medium text-gray-900 truncate">{contributor.name.split(' ')[0]}</p>
                <p className="text-xs text-green-600">{contributor.points}pts</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Community Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-3 text-center bg-white/80 backdrop-blur-sm">
            <div className="text-lg font-bold text-green-600">{users.length}</div>
            <div className="text-xs text-gray-600">Active Members</div>
          </Card>
          <Card className="p-3 text-center bg-white/80 backdrop-blur-sm">
            <div className="text-lg font-bold text-blue-600">
              {users.filter(u => u.isOnline).length}
            </div>
            <div className="text-xs text-gray-600">Online Now</div>
          </Card>
          <Card className="p-3 text-center bg-white/80 backdrop-blur-sm">
            <div className="text-lg font-bold text-purple-600">
              {users.reduce((sum, u) => sum + u.donations, 0)}
            </div>
            <div className="text-xs text-gray-600">Total Donations</div>
          </Card>
        </div>

        {/* Users List */}
        <div className="space-y-3">
          {filteredUsers.map((user) => (
            <Card 
              key={user.id} 
              className="p-4 cursor-pointer hover:shadow-lg transition-all bg-white/80 backdrop-blur-sm"
              onClick={() => handleUserClick(user)}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden">
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {user.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
                    {user.badges.slice(0, 1).map((badge, index) => (
                      <span key={index} className={`px-2 py-0.5 rounded-full text-xs ${getBadgeColor(badge)}`}>
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                    <span className="flex items-center gap-1">
                      <i className="ri-map-pin-line text-xs"></i>
                      {user.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="ri-navigation-line text-xs"></i>
                      {user.distance}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-2 mb-2">{user.bio}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-green-600 font-semibold">{user.points} pts</span>
                      <span className="text-gray-500">{user.donations} donations</span>
                    </div>
                    <span className="text-xs text-gray-500">{user.lastActive}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-user-search-line text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No eco-warriors found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <Button variant="primary" onClick={() => {setSearchQuery(''); setSelectedFilter('all');}}>
              Clear Filters
            </Button>
          </div>
        )}
      </main>

      {/* User Profile Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-sm max-h-[85vh] overflow-y-auto bg-white">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Profile</h3>
                <button 
                  onClick={() => setShowUserModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>

              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3">
                    <img 
                      src={selectedUser.avatar} 
                      alt={selectedUser.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {selectedUser.isOnline && (
                    <div className="absolute bottom-3 right-0 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">{selectedUser.name}</h4>
                <p className="text-gray-600 mb-2">{selectedUser.location} • {selectedUser.distance}</p>
                <p className="text-sm text-gray-500 mb-4">{selectedUser.bio}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="text-center p-3 bg-green-50 rounded-xl">
                  <div className="text-lg font-bold text-green-600">{selectedUser.points}</div>
                  <div className="text-xs text-gray-600">Eco Points</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-xl">
                  <div className="text-lg font-bold text-blue-600">{selectedUser.donations}</div>
                  <div className="text-xs text-gray-600">Donations</div>
                </div>
              </div>

              {/* Badges */}
              <div className="mb-6">
                <h5 className="font-semibold text-gray-900 mb-3">Achievements</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.badges.map((badge: string, index: number) => (
                    <span key={index} className={`px-3 py-1 rounded-full text-xs ${getBadgeColor(badge)}`}>
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Member Since */}
              <div className="mb-6 p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <i className="ri-calendar-line"></i>
                  <span>Member since {new Date(selectedUser.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mt-6">
                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={() => {
                    handleConnect(selectedUser.id);
                    setShowUserModal(false);
                  }}
                >
                  <i className="ri-user-add-line"></i>
                  Connect
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    handleMessage(selectedUser.id);
                    setShowUserModal(false);
                  }}
                >
                  <i className="ri-message-line"></i>
                  Message
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <Navigation />
    </div>
  );
}
