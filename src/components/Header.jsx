import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FiSearch, FiUser, FiLogOut, FiMenu, FiX, FiPlusCircle, FiPhone, FiMail } from 'react-icons/fi';
import useAuthStore from '../store/authStore';

/**
 * Enhanced Header Component - Professional navigation with search and post ad functionality
 * Features: Responsive design, user authentication, admin access, post ad button
 * Can be modified: Add new navigation items, change styling, modify mobile menu behavior
 */
const Header = ({ searchTerm, setSearchTerm, onSearchClick }) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /**
   * Handle user logout and redirect to home
   * Clears current session and closes mobile menu
   */
  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  /**
   * Check if current path matches the given path
   * Used for active navigation styling
   * @param {string} path - Path to check against current location
   * @returns {boolean} Whether the path is active
   */
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  /**
   * Handle Post Ad button click
   * Redirects to login if not authenticated, shows permission message if no posting rights
   */
  const handlePostAdClick = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (!currentUser.canPostAd && currentUser.role !== 'admin') {
      alert('You need admin approval to post ads. Please contact the administrator.');
      return;
    }
    
    navigate('/post-ad');
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        {/* Main Header Bar */}
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo with Branding */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center transform transition-transform group-hover:scale-105 shadow-lg">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                A-Toy Services
              </span>
              <div className="text-xs text-gray-500">Professional Massage & Wellness</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* <Link
              to="/"
              className={`text-gray-700 hover:text-primary-600 transition-colors font-medium ${
                isActivePath('/') ? 'text-primary-600 border-b-2 border-primary-600' : ''
              }`}
            >
              Home
            </Link> */}
            {/* <Link
              to="/browse"
              className={`text-gray-700 hover:text-primary-600 transition-colors font-medium ${
                isActivePath('/browse') ? 'text-primary-600 border-b-2 border-primary-600' : ''
              }`}
            >
              Browse Services
            </Link> */}
            {/* <Link
              to="/about"
              className={`text-gray-700 hover:text-primary-600 transition-colors font-medium ${
                isActivePath('/about') ? 'text-primary-600 border-b-2 border-primary-600' : ''
              }`}
            >
              About Us
            </Link> */}
            {/* <Link
              to="/contact"
              className={`text-gray-700 hover:text-primary-600 transition-colors font-medium ${
                isActivePath('/contact') ? 'text-primary-600 border-b-2 border-primary-600' : ''
              }`}
            >
              Contact
            </Link> */}
            
            {/* Admin Dashboard Link - Only visible to admin users */}
            {currentUser?.role === 'admin' && (
              <Link
                to="/admin"
                className={`text-purple-600 hover:text-purple-700 transition-colors font-medium ${
                  isActivePath('/admin') ? 'text-purple-600 border-b-2 border-purple-600' : ''
                }`}
              >
                Admin Dashboard
              </Link>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={onSearchClick}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <FiSearch className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Search</span>
            </button>

            {/* Post Ad Button */}
            <button
              onClick={handlePostAdClick}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all transform hover:scale-105 shadow-md"
            >
              <FiPlusCircle className="w-5 h-5" />
              <span className="font-medium">Post Ad</span>
            </button>

            {/* User Actions */}
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
                >
                  <FiUser className="w-5 h-5" />
                  <span className="font-medium">{currentUser.name}</span>
                  {currentUser.role === 'admin' && (
                    <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">Admin</span>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
                >
                  <FiLogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                {/* <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-gray-100"
                >
                  Login
                </Link> */}
                <Link 
                  to="/signup" 
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-gray-200">
            {/* Mobile Search */}
            <div className="mb-6">
              <button
                onClick={() => {
                  onSearchClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <FiSearch className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 font-medium">Search Services</span>
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-2 mb-6">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium ${
                  isActivePath('/') ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600' : ''
                }`}
              >
                Home
              </Link>
              <Link
                to="/browse"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium ${
                  isActivePath('/browse') ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600' : ''
                }`}
              >
                Browse Services
              </Link>
              {/* <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium ${
                  isActivePath('/about') ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600' : ''
                }`}
              >
                About Us
              </Link> */}
              {/* <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium ${
                  isActivePath('/contact') ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600' : ''
                }`}
              >
                Contact
              </Link> */}
              
              {/* Admin Dashboard - Mobile */}
              {currentUser?.role === 'admin' && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-purple-600 hover:bg-purple-50 font-medium ${
                    isActivePath('/admin') ? 'bg-purple-50 border-l-4 border-purple-600' : ''
                  }`}
                >
                  Admin Dashboard
                </Link>
              )}
            </nav>

            {/* Mobile Post Ad Button */}
            <div className="mb-6">
              <button
                onClick={() => {
                  handlePostAdClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all"
              >
                <FiPlusCircle className="w-5 h-5" />
                <span className="font-medium">Post Ad</span>
              </button>
            </div>

            {/* Mobile User Actions */}
            <div className="border-t border-gray-200 pt-6">
              {currentUser ? (
                <div className="space-y-3">
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <FiUser className="w-5 h-5" />
                    <div>
                      <span className="font-medium">Profile</span>
                      <div className="text-sm text-gray-500">{currentUser.name}</div>
                      {currentUser.role === 'admin' && (
                        <div className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full inline-block mt-1">Admin</div>
                      )}
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-red-50 rounded-lg w-full"
                  >
                    <FiLogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-center text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
                  >
                    Login
                  </Link> */}
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-center bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
