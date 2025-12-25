import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiUsers, FiEdit, FiDollarSign, FiSettings, FiLogOut, FiEye, FiTrash2, FiCheck, FiX, FiTrendingUp, FiCalendar, FiShield, FiMail, FiPhone, FiMapPin, FiClock, FiAlertTriangle, FiBarChart2, FiUserPlus, FiFileText, FiCreditCard } from 'react-icons/fi';
import useAuthStore from '../store/authStore';

/**
 * Admin Dashboard - Comprehensive administrative interface
 * Features: User management, post approval, statistics, system settings
 * Can be modified: Add new admin features, modify layout, enhance permissions
 */
const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);
  
  // Store functions
  const getAllUsers = useAuthStore((state) => state.getAllUsers);
  const getAllPosts = useAuthStore((state) => state.getAllPosts);
  const approvePost = useAuthStore((state) => state.approvePost);
  const deleteUser = useAuthStore((state) => state.deleteUser);
  const updateUserPermissions = useAuthStore((state) => state.updateUserPermissions);
  const getSystemStats = useAuthStore((state) => state.getSystemStats);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetails, setShowUserDetails] = useState(false);

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      setTimeout(() => setSuccessMessage(''), 5000);
    }
  }, [location]);

  // useEffect(() => {
  //   if (currentUser?.role !== 'admin') {
  //     navigate('/admin/login');
  //     return;
  //   }

  //   // Load admin data
  //   setUsers(getAllUsers());
  //   setPosts(getAllPosts());
  //   setStats(getSystemStats());
  // }, [currentUser, navigate, getAllUsers, getAllPosts, getSystemStats]);

    useEffect(() => {
  // Check if user is admin
  if (currentUser?.role !== 'admin') {
    navigate('/login', { 
      state: { 
        from: '/admin/dashboard',
        message: 'Please login as admin to access the dashboard' 
      } 
    });
    return;
  }

  // Load admin data
  const loadData = async () => {
    try {
      const usersData = getAllUsers();
      const postsData = getAllPosts();
      const statsData = getSystemStats();
      
      setUsers(usersData);
      setPosts(postsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading admin data:', error);
    }
  };

  loadData();
}, [currentUser, navigate, getAllUsers, getAllPosts, getSystemStats]);


  /**
   * Handle admin logout
   */
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  /**
   * Handle post approval/rejection
   */
  const handlePostAction = async (postId, action, reason = null) => {
    const result = await approvePost(postId, action, reason);
    if (result.success) {
      setPosts(getAllPosts());
      setSuccessMessage(`Post ${action} successfully!`);
      setStats(getSystemStats());
    } else {
      alert(result.error || 'Failed to update post');
    }
  };

  /**
   * Handle user deletion
   */
  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      const result = await deleteUser(userId);
      if (result.success) {
        setUsers(getAllUsers());
        setStats(getSystemStats());
        setSuccessMessage('User deleted successfully!');
        setShowUserDetails(false);
        setSelectedUser(null);
      } else {
        alert(result.error || 'Failed to delete user');
      }
    }
  };

  /**
   * Handle user permission update
   */
  const handleUpdatePermissions = async (userId, permissions) => {
    const result = await updateUserPermissions(userId, permissions);
    if (result.success) {
      setUsers(getAllUsers());
      setSuccessMessage('User permissions updated successfully!');
    } else {
      alert(result.error || 'Failed to update permissions');
    }
  };

  // Filter posts by status
  const pendingPosts = posts.filter(post => post.status === 'pending');
  const approvedPosts = posts.filter(post => post.status === 'approved');
  const rejectedPosts = posts.filter(post => post.status === 'rejected');

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <FiShield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-400 mb-6">You don't have permission to access this page.</p>
          <Link
            to="/admin/login"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <FiShield className="w-5 h-5" />
            <span>Admin Login</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FiShield className="w-8 h-8 text-red-500" />
                <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
              </div>
              <span className="text-sm text-gray-400">
                Welcome, {currentUser.name}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">
                Admin ID: {currentUser.adminId}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FiLogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-900/50 border border-green-700 text-green-200 px-4 py-3 mx-4 mt-4 rounded-lg">
          {successMessage}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: FiBarChart2 },
              { id: 'users', label: 'Users', icon: FiUsers },
              { id: 'posts', label: 'Posts', icon: FiEdit },
              { id: 'approvals', label: 'Approvals', icon: FiCheck },
              { id: 'payments', label: 'Payments', icon: FiCreditCard },
              { id: 'settings', label: 'Settings', icon: FiSettings }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-red-500 text-white'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">System Overview</h2>
            
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <FiUsers className="w-8 h-8 text-blue-500" />
                  <span className="text-2xl font-bold text-white">{stats.totalUsers || 0}</span>
                </div>
                <p className="text-gray-400">Total Users</p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <FiEdit className="w-8 h-8 text-green-500" />
                  <span className="text-2xl font-bold text-white">{stats.totalPosts || 0}</span>
                </div>
                <p className="text-gray-400">Total Posts</p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <FiClock className="w-8 h-8 text-yellow-500" />
                  <span className="text-2xl font-bold text-white">{pendingPosts.length}</span>
                </div>
                <p className="text-gray-400">Pending Approvals</p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <FiDollarSign className="w-8 h-8 text-purple-500" />
                  <span className="text-2xl font-bold text-white">{stats.totalPayments || 0}</span>
                </div>
                <p className="text-gray-400">Total Payments</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Users</h3>
                <div className="space-y-3">
                  {users.slice(-5).reverse().map(user => (
                    <div key={user.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                          <FiUser className="w-4 h-4 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-gray-400">{user.email}</p>
                        </div>
                      </div>
                      <span className="text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Pending Posts</h3>
                <div className="space-y-3">
                  {pendingPosts.slice(0, 5).map(post => (
                    <div key={post.id} className="flex items-center justify-between text-sm">
                      <div>
                        <p className="text-white font-medium">{post.title}</p>
                        <p className="text-gray-400">by {post.postedBy}</p>
                      </div>
                      <button
                        onClick={() => setActiveTab('approvals')}
                        className="text-yellow-500 hover:text-yellow-400"
                      >
                        Review
                      </button>
                    </div>
                  ))}
                  {pendingPosts.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No pending posts</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">User Management</h2>
            
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {users.map(user => (
                      <tr key={user.id} className="hover:bg-gray-700/50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                              <FiUser className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">{user.name}</div>
                              <div className="text-sm text-gray-400">ID: {user.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{user.email}</div>
                          <div className="text-sm text-gray-400">{user.phone || 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role === 'admin' 
                              ? 'bg-red-900 text-red-200' 
                              : 'bg-gray-700 text-gray-300'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowUserDetails(true);
                            }}
                            className="text-blue-400 hover:text-blue-300 mr-3"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                          {user.role !== 'admin' && (
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">All Posts</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="text-white font-medium mb-2">Total Posts</h3>
                <p className="text-2xl font-bold text-blue-400">{posts.length}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="text-white font-medium mb-2">Approved</h3>
                <p className="text-2xl font-bold text-green-400">{approvedPosts.length}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="text-white font-medium mb-2">Rejected</h3>
                <p className="text-2xl font-bold text-red-400">{rejectedPosts.length}</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Post
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Author
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Posted
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {posts.map(post => (
                      <tr key={post.id} className="hover:bg-gray-700/50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-white">{post.title}</div>
                            <div className="text-sm text-gray-400">${post.price} • {post.location}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {post.postedBy}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            post.status === 'approved' 
                              ? 'bg-green-900 text-green-200'
                              : post.status === 'pending'
                              ? 'bg-yellow-900 text-yellow-200'
                              : 'bg-red-900 text-red-200'
                          }`}>
                            {post.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link
                            to={`/product/${post.id}`}
                            className="text-blue-400 hover:text-blue-300 mr-3"
                          >
                            <FiEye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Approvals Tab */}
        {activeTab === 'approvals' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Post Approvals</h2>
            
            {pendingPosts.length > 0 ? (
              <div className="space-y-6">
                {pendingPosts.map(post => (
                  <div key={post.id} className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">{post.title}</h3>
                        <p className="text-gray-400 mb-2">{post.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Price: ${post.price}</span>
                          <span>Location: {post.location}</span>
                          <span>Posted by: {post.postedBy}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-yellow-900 text-yellow-200 text-sm rounded-full">
                        Pending
                      </span>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handlePostAction(post.id, 'approved')}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        <FiCheck className="w-4 h-4" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => {
                          const reason = prompt('Reason for rejection:');
                          if (reason) {
                            handlePostAction(post.id, 'rejected', reason);
                          }
                        }}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        <FiX className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                      <Link
                        to={`/product/${post.id}`}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                      >
                        <FiEye className="w-4 h-4" />
                        <span>View Details</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FiCheck className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">All Caught Up!</h3>
                <p className="text-gray-400">No posts pending approval</p>
              </div>
            )}
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Payment Management</h2>
            <div className="text-center py-12">
              <FiCreditCard className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Payment System</h3>
              <p className="text-gray-400">Payment integration coming soon</p>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">System Settings</h2>
            <div className="text-center py-12">
              <FiSettings className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Settings Panel</h3>
              <p className="text-gray-400">System settings configuration coming soon</p>
            </div>
          </div>
        )}
      </main>

      {/* User Details Modal */}
      {showUserDetails && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-white">User Details</h3>
              <button
                onClick={() => setShowUserDetails(false)}
                className="text-gray-400 hover:text-white"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">Name</p>
                <p className="text-white">{selectedUser.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white">{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="text-white">{selectedUser.phone || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Role</p>
                <p className="text-white">{selectedUser.role}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Member Since</p>
                <p className="text-white">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
