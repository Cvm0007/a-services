import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiCalendar, FiTrash2, FiLogOut, FiEdit, FiEye, FiDollarSign, FiCreditCard, FiSettings, FiPlus, FiCheck, FiX, FiClock, FiTrendingUp, FiShield, FiMapPin, FiStar, FiSmartphone } from 'react-icons/fi';
import useAuthStore from '../store/authStore';
import PaymentSystem from '../components/PaymentSystem';
import PaymentHistory from '../components/PaymentHistory';

/**
 * User Dashboard - Comprehensive profile and account management
 * Features: Account details, ad management, payment options, statistics, settings
 * Can be modified: Add new dashboard sections, modify layout, add new features
 */
const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useAuthStore((state) => state.currentUser);
  const getUserSubmissions = useAuthStore((state) => state.getUserSubmissions);
  const getUserPosts = useAuthStore((state) => state.getUserPosts);
  const updateUserProfile = useAuthStore((state) => state.updateUserProfile);
  const deletePost = useAuthStore((state) => state.deletePost);
  const logout = useAuthStore((state) => state.logout);
  const clearAllData = useAuthStore((state) => state.clearAllData);
  const payments = useAuthStore((state) => state.payments);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [submissions, setSubmissions] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [showPaymentSystem, setShowPaymentSystem] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    website: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      setTimeout(() => setSuccessMessage(''), 5000);
    }
  }, [location]);

  useEffect(() => {
    if (currentUser) {
      setSubmissions(getUserSubmissions());
      setUserPosts(getUserPosts());
      setProfileData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        bio: currentUser.bio || '',
        location: currentUser.location || '',
        website: currentUser.website || ''
      });
    }
  }, [currentUser, getUserSubmissions, getUserPosts]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Get user-specific payments
  const userPayments = payments.filter(payment => payment.userId === currentUser?.id);

  // Payment system handlers
  const handlePaymentSuccess = (payment) => {
    setSuccessMessage('Payment processed successfully!');
    setShowPaymentSystem(false);
    setPaymentData(null);
    // Refresh user posts to update payment status
    setUserPosts(getUserPosts());
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  const handlePaymentCancel = () => {
    setShowPaymentSystem(false);
    setPaymentData(null);
  };

  const initiatePayment = (amount, serviceDetails) => {
    setPaymentData({ amount, serviceDetails });
    setShowPaymentSystem(true);
  };

  const handleClearData = () => {
    clearAllData();
    navigate('/');
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const result = await updateUserProfile(profileData);
    if (result.success) {
      setEditingProfile(false);
      setSuccessMessage('Profile updated successfully!');
    } else {
      alert(result.error || 'Failed to update profile');
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      const result = await deletePost(postId);
      if (result.success) {
        setUserPosts(userPosts.filter(post => post.id !== postId));
        setSuccessMessage('Post deleted successfully!');
      } else {
        alert(result.error || 'Failed to delete post');
      }
    }
  };

  // Calculate statistics
  const stats = {
    totalPosts: userPosts.length,
    activePosts: userPosts.filter(post => post.status === 'approved').length,
    pendingPosts: userPosts.filter(post => post.status === 'pending').length,
    totalViews: userPosts.reduce((sum, post) => sum + (post.views || 0), 0),
    totalLikes: userPosts.reduce((sum, post) => sum + (post.likes || 0), 0),
    submissions: submissions.length
  };

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please Login</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to view your profile.</p>
          <Link to="/login" className="btn-primary">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
            {successMessage}
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Dashboard</h1>
          <p className="text-gray-600">Manage your profile, ads, and account settings</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {[
                { id: 'overview', label: 'Overview', icon: FiTrendingUp },
                { id: 'profile', label: 'Profile', icon: FiUser },
                { id: 'ads', label: 'My Ads', icon: FiEdit },
                { id: 'requests', label: 'Requests', icon: FiCalendar },
                { id: 'payments', label: 'Payments', icon: FiCreditCard },
                { id: 'settings', label: 'Settings', icon: FiSettings }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>
              
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <FiEdit className="w-8 h-8 opacity-80" />
                    <span className="text-2xl font-bold">{stats.totalPosts}</span>
                  </div>
                  <p className="text-blue-100">Total Ads</p>
                </div>
                
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <FiCheck className="w-8 h-8 opacity-80" />
                    <span className="text-2xl font-bold">{stats.activePosts}</span>
                  </div>
                  <p className="text-green-100">Active Ads</p>
                </div>
                
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <FiEye className="w-8 h-8 opacity-80" />
                    <span className="text-2xl font-bold">{stats.totalViews}</span>
                  </div>
                  <p className="text-yellow-100">Total Views</p>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <FiStar className="w-8 h-8 opacity-80" />
                    <span className="text-2xl font-bold">{stats.totalLikes}</span>
                  </div>
                  <p className="text-purple-100">Total Likes</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link
                      to="/post-ad"
                      className="flex items-center space-x-3 text-primary-600 hover:text-primary-700"
                    >
                      <FiPlus className="w-5 h-5" />
                      <span>Post New Ad</span>
                    </Link>
                    <button
                      onClick={() => setActiveTab('ads')}
                      className="flex items-center space-x-3 text-primary-600 hover:text-primary-700"
                    >
                      <FiEdit className="w-5 h-5" />
                      <span>Manage Ads</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('profile')}
                      className="flex items-center space-x-3 text-primary-600 hover:text-primary-700"
                    >
                      <FiUser className="w-5 h-5" />
                      <span>Edit Profile</span>
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm">
                      <FiClock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">No recent activity</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Profile Information</h2>
                <button
                  onClick={() => setEditingProfile(!editingProfile)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <FiEdit className="w-4 h-4" />
                  <span>{editingProfile ? 'Cancel' : 'Edit Profile'}</span>
                </button>
              </div>

              {editingProfile ? (
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingProfile(false)}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <FiUser className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-medium">{currentUser.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FiMail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{currentUser.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FiPhone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">{currentUser.phone || 'Not provided'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FiCalendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Member Since</p>
                        <p className="font-medium">
                          {new Date(currentUser.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  {currentUser.bio && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Bio</p>
                      <p className="text-gray-800">{currentUser.bio}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* My Ads Tab */}
          {activeTab === 'ads' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">My Ads</h2>
                <Link
                  to="/post-ad"
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  <FiPlus className="w-4 h-4" />
                  <span>Post New Ad</span>
                </Link>
              </div>

              {userPosts.length > 0 ? (
                <div className="space-y-4">
                  {userPosts.map(post => (
                    <div key={post.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold">{post.title}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              post.status === 'approved' ? 'bg-green-100 text-green-800' :
                              post.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {post.status}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">{post.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <FiDollarSign className="w-4 h-4" />
                              <span>${post.price}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <FiMapPin className="w-4 h-4" />
                              <span>{post.location}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <FiEye className="w-4 h-4" />
                              <span>{post.views || 0} views</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <FiStar className="w-4 h-4" />
                              <span>{post.likes || 0} likes</span>
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Link
                            to={`/product/${post.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <FiEye className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FiEdit className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No ads posted yet</h3>
                  <p className="text-gray-600 mb-6">Start by posting your first service ad</p>
                  <Link
                    to="/post-ad"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    <FiPlus className="w-5 h-5" />
                    <span>Post Your First Ad</span>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Requests Tab */}
          {activeTab === 'requests' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Service Requests</h2>
              {submissions.length > 0 ? (
                <div className="space-y-4">
                  {submissions.map(submission => (
                    <div key={submission.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-medium">Product ID: #{submission.productId}</p>
                          <p className="text-sm text-gray-600">
                            Requested: {new Date(submission.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="badge-warning">Pending</span>
                      </div>
                      <p className="text-gray-700 mb-4">{submission.message}</p>
                      <div className="text-sm text-gray-600">
                        <p>Preferred: {submission.preferredDate} at {submission.preferredTime}</p>
                        <p>Contact: {submission.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FiCalendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No service requests yet</h3>
                  <p className="text-gray-600 mb-6">Browse services and submit requests to get started</p>
                  <Link to="/browse" className="btn-primary">
                    Browse Services
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Payment Management</h2>
              
              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => initiatePayment(999, { title: 'Service Deposit', category: 'General' })}
                  className="bg-primary-600 text-white p-4 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <FiCreditCard className="w-6 h-6 mb-2 mx-auto" />
                  <div className="font-medium">Make Payment</div>
                  <div className="text-sm opacity-90">Pay for services</div>
                </button>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <FiDollarSign className="w-6 h-6 mb-2 text-gray-600 mx-auto" />
                  <div className="font-medium text-gray-800">Total Spent</div>
                  <div className="text-2xl font-bold text-primary-600">
                    ₹{userPayments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0}
                  </div>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <FiTrendingUp className="w-6 h-6 mb-2 text-gray-600 mx-auto" />
                  <div className="font-medium text-gray-800">Transactions</div>
                  <div className="text-2xl font-bold text-primary-600">
                    {userPayments?.length || 0}
                  </div>
                </div>
              </div>

              {/* Payment System Modal */}
              {showPaymentSystem && paymentData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
                    <PaymentSystem
                      amount={paymentData.amount}
                      serviceDetails={paymentData.serviceDetails}
                      onPaymentSuccess={handlePaymentSuccess}
                      onPaymentCancel={handlePaymentCancel}
                    />
                  </div>
                </div>
              )}

              {/* Payment History */}
              <PaymentHistory />
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-4">Account Actions</h3>
                  <div className="space-y-4">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
                    >
                      <FiLogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                    
                    <button
                      onClick={() => setShowClearConfirm(!showClearConfirm)}
                      className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
                    >
                      <FiTrash2 className="w-5 h-5" />
                      <span>Clear All Data (Testing)</span>
                    </button>
                    
                    {showClearConfirm && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-700 mb-4">
                          This will delete all users, submissions, and reset the application. 
                          This action cannot be undone.
                        </p>
                        <button
                          onClick={handleClearData}
                          className="btn-primary bg-red-600 hover:bg-red-700"
                        >
                          Clear All Data
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-4">Privacy & Security</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-600">Add an extra layer of security</p>
                      </div>
                      <button className="text-primary-600 hover:text-primary-700">
                        Enable
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive updates about your ads</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4 text-primary-600" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
