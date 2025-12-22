import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiShield, FiKey, FiMail, FiLock, FiAlertCircle, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import useAuthStore from '../store/authStore';

/**
 * Admin Login Page - Secure admin authentication with unique ID requirement
 * Features: Admin ID validation, secure login, error handling, redirect protection
 * Can be modified: Add 2FA, change admin credentials, enhance security features
 */
const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);
  const currentUser = useAuthStore((state) => state.currentUser);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    adminId: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in as admin
  useEffect(() => {
    if (currentUser && currentUser.role === 'admin') {
      navigate('/admin/dashboard');
    }
  }, [currentUser, navigate]);

  // Redirect from login page if accessing regular login
  const from = location.state?.from;
  if (from === '/login') {
    navigate('/login');
  }

  /**
   * Handle form input changes
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Form validation
   */
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.adminId) {
      newErrors.adminId = 'Admin ID is required';
    } else if (formData.adminId.length < 8) {
      newErrors.adminId = 'Admin ID must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle admin login submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const result = login(formData.email, formData.password, formData.adminId);
      
      if (result.success) {
        // Successful admin login
        navigate('/admin/dashboard', { 
          state: { 
            message: 'Welcome back, Administrator!' 
          } 
        });
      } else {
        // Login failed
        setErrors({
          general: result.error || 'Invalid admin credentials'
        });
      }
    } catch (error) {
      setErrors({
        general: 'An error occurred during login. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg">
              <FiShield className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Admin Login</h2>
          <p className="text-gray-400">
            Secure access to administrative dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700">
          {/* Alert for general errors */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg flex items-center space-x-3">
              <FiAlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <span className="text-red-200 text-sm">{errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                <FiMail className="inline w-4 h-4 mr-2" />
                Admin Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="admin@atoyservices.com"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <FiAlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                <FiLock className="inline w-4 h-4 mr-2" />
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                    errors.password ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  disabled={isLoading}
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <FiAlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Admin ID Field */}
            <div>
              <label htmlFor="adminId" className="block text-sm font-medium text-gray-300 mb-2">
                <FiKey className="inline w-4 h-4 mr-2" />
                Admin ID (Required)
              </label>
              <input
                id="adminId"
                name="adminId"
                type="text"
                autoComplete="off"
                value={formData.adminId}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono ${
                  errors.adminId ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="ADMIN-ATOY-2024"
                disabled={isLoading}
              />
              {errors.adminId && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <FiAlertCircle className="w-4 h-4 mr-1" />
                  {errors.adminId}
                </p>
              )}
              <p className="mt-2 text-xs text-gray-500">
                Enter your unique administrator ID for secure access
              </p>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center space-x-2 px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all ${
                  isLoading
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <FiShield className="w-4 h-4" />
                    <span>Access Admin Dashboard</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
            <div className="flex items-start space-x-3">
              <FiAlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-yellow-400 mb-1">Security Notice</h4>
                <p className="text-xs text-yellow-300">
                  This is a secure administrative interface. Unauthorized access attempts are logged and monitored.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center space-y-4">
          <Link
            to="/login"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to User Login</span>
          </Link>
          
          <div className="text-xs text-gray-500">
            <p>Default credentials for testing:</p>
            <p className="font-mono mt-1">admin@atoyservices.com</p>
            <p className="font-mono">admin123</p>
            <p className="font-mono">ADMIN-ATOY-2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
