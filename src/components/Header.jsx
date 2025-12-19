import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FiSearch, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import useAuthStore from '../store/authStore';

const Header = ({ searchTerm, setSearchTerm }) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.logout);
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Toy Services</span>
          </Link>

          {/* Search Bar - Desktop */}
          {/* <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
             <span> <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search toys..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div> */}

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-gray-700 hover:text-primary-600 transition-colors ${
                isActivePath('/') ? 'text-primary-600 font-semibold' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/browse"
              className={`text-gray-700 hover:text-primary-600 transition-colors ${
                isActivePath('/browse') ? 'text-primary-600 font-semibold' : ''
              }`}
            >
              Browse
            </Link>
            <Link
              to="/about"
              className={`text-gray-700 hover:text-primary-600 transition-colors ${
                isActivePath('/about') ? 'text-primary-600 font-semibold' : ''
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-gray-700 hover:text-primary-600 transition-colors ${
                isActivePath('/contact') ? 'text-primary-600 font-semibold' : ''
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* User Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <FiUser className="w-5 h-5" />
                  <span className="font-medium">{currentUser.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <FiLogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link to="/signup" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {/* Search Bar - Mobile */}
            <div className="mb-4">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search toys..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Navigation - Mobile */}
            <nav className="space-y-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 ${
                  isActivePath('/') ? 'bg-primary-50 text-primary-600 font-semibold' : ''
                }`}
              >
                Home
              </Link>
              <Link
                to="/browse"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 ${
                  isActivePath('/browse') ? 'bg-primary-50 text-primary-600 font-semibold' : ''
                }`}
              >
                Browse
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 ${
                  isActivePath('/about') ? 'bg-primary-50 text-primary-600 font-semibold' : ''
                }`}
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 ${
                  isActivePath('/contact') ? 'bg-primary-50 text-primary-600 font-semibold' : ''
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* User Actions - Mobile */}
            <div className="mt-4 pt-4 border-t">
              {currentUser ? (
                <div className="space-y-2">
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <FiUser className="w-5 h-5" />
                    <span>Profile ({currentUser.name})</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full"
                  >
                    <FiLogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-center text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-center btn-primary"
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
