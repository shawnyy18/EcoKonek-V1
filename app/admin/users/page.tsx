
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function AdminUsersPage() {
  const router = useRouter();
  const [isRouterReady, setIsRouterReady] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState('');
  const [usersData, setUsersData] = useState([
    {
      id: 1,
      name: 'Shawn Ashlee Guarin',
      email: 'sagguarin.student@ua.edu.ph',
      phone: '+63 912 345 6789',
      barangay: 'Lagundi',
      role: 'User',
      status: 'Active',
      joinDate: '2024-01-10',
      lastActive: '2024-01-15',
      donations: 5,
      points: 250,
      avatar: 'https://scontent.fcrk1-5.fna.fbcdn.net/v/t39.30808-6/495028313_24083384424602751_7351688264169458085_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=4ytaQE9qY2EQ7kNvwGwjfBo&_nc_oc=AdlsN0ZT2BowQ1jOmjHekDPS9kfj2Qe_2RFrvOPJkzUX3bHIjemPwANZeSSciWrJSys&_nc_zt=23&_nc_ht=scontent.fcrk1-5.fna&_nc_gid=9GDZ0O4P3sAtNlVaRs_YCw&oh=00_AfTETalnYSIm6lf0vLZPKQv6v6-sWTuxZzqHOoc61YvElg&oe=6882983F'
    },
    {
      id: 2,
      name: 'Juan dela Cruz',
      email: 'juan.cruz@email.com',
      phone: '+63 917 654 3210',
      barangay: 'Santa Maria',
      role: 'Moderator',
      status: 'Active',
      joinDate: '2024-01-08',
      lastActive: '2024-01-15',
      donations: 12,
      points: 680,
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Filipino%20man%20portrait%2C%20friendly%20smile%2C%20clean%20background%2C%20avatar%20style%2C%20modern%20professional%20headshot&width=100&height=100&seq=avatar2&orientation=squarish'
    },
    {
      id: 3,
      name: 'Anna Reyes',
      email: 'anna.reyes@email.com',
      phone: '+63 905 789 4561',
      barangay: 'Poblacion',
      role: 'User',
      status: 'Pending',
      joinDate: '2024-01-14',
      lastActive: '2024-01-14',
      donations: 2,
      points: 120,
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Filipino%20woman%20portrait%2C%20friendly%20smile%2C%20clean%20background%2C%20avatar%20style%2C%20modern%20professional%20headshot&width=100&height=100&seq=avatar3&orientation=squarish'
    },
    {
      id: 4,
      name: 'Carlos Mendoza',
      email: 'carlos.mendoza@email.com',
      phone: '+63 926 321 7890',
      barangay: 'San Jose',
      role: 'User',
      status: 'Inactive',
      joinDate: '2024-01-05',
      lastActive: '2024-01-10',
      donations: 8,
      points: 420,
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Filipino%20man%20portrait%2C%20friendly%20smile%2C%20clean%20background%2C%20avatar%20style%2C%20modern%20professional%20headshot&width=100&height=100&seq=avatar4&orientation=squarish'
    }
  ]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    barangay: 'San Antonio',
    role: 'User',
    status: 'Active'
  });

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

  const filteredUsers = usersData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.barangay.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || user.status.toLowerCase() === activeTab;
    return matchesSearch && matchesTab;
  });

  const showAlert = (message: string) => {
    setShowSuccessAlert(message);
    setTimeout(() => setShowSuccessAlert(''), 3000);
  };

  const generateId = () => {
    return Math.max(...usersData.map(user => user.id)) + 1;
  };

  const handleCreateUser = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      showAlert('Please fill in all required fields');
      return;
    }

    const newUser = {
      id: generateId(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      barangay: formData.barangay,
      role: formData.role,
      status: formData.status,
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0],
      donations: 0,
      points: 0,
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Filipino%20person%20portrait%2C%20friendly%20smile%2C%20clean%20background%2C%20avatar%20style%2C%20modern%20professional%20headshot&width=100&height=100&seq=newavatar&orientation=squarish'
    };

    setUsersData(prev => [...prev, newUser]);
    setFormData({ name: '', email: '', phone: '', barangay: 'San Antonio', role: 'User', status: 'Active' });
    setShowUserModal(false);
    showAlert('User created successfully!');
  };

  const handleUpdateUser = () => {
    if (!selectedUser || !formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      showAlert('Please fill in all required fields');
      return;
    }

    setUsersData(prev => 
      prev.map(user => 
        user.id === selectedUser.id 
          ? { ...user, name: formData.name, email: formData.email, phone: formData.phone, barangay: formData.barangay, role: formData.role, status: formData.status }
          : user
      )
    );

    setShowUserModal(false);
    setSelectedUser(null);
    showAlert('User updated successfully!');
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsersData(prev => prev.filter(user => user.id !== userId));
      showAlert('User deleted successfully!');
    }
  };

  const handleStatusChange = (userId: number, newStatus: string) => {
    setUsersData(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    showAlert(`User status changed to ${newStatus.toLowerCase()}!`);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      showAlert('Please enter a message');
      return;
    }

    console.log(`Sending message to ${selectedUser?.name}: ${messageText}`);
    setMessageText('');
    setShowMessageModal(false);
    showAlert('Message sent successfully!');
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setFormData({ name: '', email: '', phone: '', barangay: 'San Antonio', role: 'User', status: 'Active' });
    setIsEditing(true);
    setShowUserModal(true);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      barangay: user.barangay,
      role: user.role,
      status: user.status
    });
    setIsEditing(true);
    setShowUserModal(true);
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setIsEditing(false);
    setShowUserModal(true);
  };

  const handleMessageUser = (user: any) => {
    setSelectedUser(user);
    setShowMessageModal(true);
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Inactive': 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getRoleColor = (role: string) => {
    const colors = {
      'Admin': 'bg-red-100 text-red-800',
      'Moderator': 'bg-blue-100 text-blue-800',
      'User': 'bg-purple-100 text-purple-800'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTabStats = () => {
    return {
      all: usersData.length,
      active: usersData.filter(u => u.status === 'Active').length,
      pending: usersData.filter(u => u.status === 'Pending').length,
      inactive: usersData.filter(u => u.status === 'Inactive').length
    };
  };

  const stats = getTabStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pb-24">
      <Header
        title="User Management"
        showBack={true}
        onBack={handleBack}
        showCloseAdmin={true}
        onCloseAdmin={handleCloseAdmin}
        rightAction={
          <Button variant="ghost" size="sm" onClick={handleAddUser}>
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
          <div className="grid grid-cols-4 gap-1">
            {[
              { key: 'all', label: 'All', count: stats.all },
              { key: 'active', label: 'Active', count: stats.active },
              { key: 'pending', label: 'Pending', count: stats.pending },
              { key: 'inactive', label: 'Inactive', count: stats.inactive }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`p-3 rounded-lg text-center transition-colors ${
                  activeTab === tab.key
                    ? 'bg-green-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="font-medium capitalize">{tab.label}</div>
                <div className="text-xs mt-1">{tab.count}</div>
              </button>
            ))}
          </div>
        </Card>

        {/* Search */}
        <Card className="mb-6 p-4">
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </Card>

        {/* Users List */}
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="p-4">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-1">{user.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{user.email}</p>
                  <p className="text-xs text-gray-500">{user.barangay} • Joined {user.joinDate}</p>

                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                    <span><i className="ri-gift-line mr-1"></i>{user.donations} donations</span>
                    <span><i className="ri-star-line mr-1"></i>{user.points} points</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleViewUser(user)}
                  >
                    <i className="ri-eye-line"></i>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditUser(user)}
                  >
                    <i className="ri-edit-line"></i>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMessageUser(user)}
                  >
                    <i className="ri-message-line"></i>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <i className="ri-user-line text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-600">No users found</p>
          </div>
        )}

        {/* Add User FAB */}
        <button
          onClick={handleAddUser}
          className="fixed bottom-20 right-4 w-14 h-14 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-colors"
        >
          <i className="ri-add-line text-xl"></i>
        </button>
      </main>

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-sm max-h-[80vh] overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">
                  {isEditing ? (selectedUser ? 'Edit User' : 'Add User') : 'User Details'}
                </h3>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                  />

                  <Input
                    label="Email"
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                  />

                  <Input
                    label="Phone"
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) => handleFormChange('phone', e.target.value)}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Barangay</label>
                    <select 
                      value={formData.barangay}
                      onChange={(e) => handleFormChange('barangay', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="San Antonio">San Antonio</option>
                      <option value="Lagundi">Lagundi</option>
                      <option value="San Jose">San Jose</option>
                      <option value="Poblacion">Poblacion</option>
                      <option value="Maligaya">Maligaya</option>
                      <option value="Bagong Silang">Bagong Silang</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <select 
                      value={formData.role}
                      onChange={(e) => handleFormChange('role', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="User">User</option>
                      <option value="Moderator">Moderator</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => handleFormChange('status', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <Button 
                      variant="primary" 
                      className="flex-1"
                      onClick={selectedUser ? handleUpdateUser : handleCreateUser}
                    >
                      {selectedUser ? 'Update' : 'Create'}
                    </Button>
                    <Button variant="outline" onClick={() => setShowUserModal(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : selectedUser && (
                <div className="space-y-4">
                  <div className="text-center">
                    <img 
                      src={selectedUser.avatar} 
                      alt={selectedUser.name}
                      className="w-20 h-20 mx-auto rounded-full object-cover mb-3"
                    />
                    <h4 className="text-lg font-semibold text-gray-900">{selectedUser.name}</h4>
                    <div className="flex justify-center gap-2 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(selectedUser.role)}`}>
                        {selectedUser.role}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedUser.status)}`}>
                        {selectedUser.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Contact Information</label>
                      <p className="text-sm text-gray-600">{selectedUser.email}</p>
                      <p className="text-sm text-gray-600">{selectedUser.phone}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">Location</label>
                      <p className="text-sm text-gray-600">{selectedUser.barangay}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">Activity</label>
                      <p className="text-sm text-gray-600">Joined: {selectedUser.joinDate}</p>
                      <p className="text-sm text-gray-600">Last Active: {selectedUser.lastActive}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">Statistics</label>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold text-gray-900">{selectedUser.donations}</div>
                          <div className="text-xs text-gray-600">Donations</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold text-gray-900">{selectedUser.points}</div>
                          <div className="text-xs text-gray-600">Points</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <Button variant="primary" className="flex-1" onClick={() => setIsEditing(true)}>
                      Edit User
                    </Button>
                    <Button variant="outline" onClick={() => handleMessageUser(selectedUser)}>
                      Message
                    </Button>
                  </div>

                  {selectedUser.status === 'Pending' && (
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleStatusChange(selectedUser.id, 'Active')}
                      >
                        Approve
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleStatusChange(selectedUser.id, 'Inactive')}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-sm">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Send Message</h3>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600">To: {selectedUser.name}</p>
              </div>

              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-32 resize-none"
                placeholder="Enter your message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                maxLength={500}
              />
              <div className="text-xs text-gray-500 mt-1">{messageText.length}/500 characters</div>

              <div className="flex gap-2 mt-4">
                <Button variant="primary" className="flex-1" onClick={handleSendMessage}>
                  Send Message
                </Button>
                <Button variant="outline" onClick={() => setShowMessageModal(false)}>
                  Cancel
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