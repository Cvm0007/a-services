import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

/**
 * Footer Component - Comprehensive site footer with navigation and information
 * Features: Company info, quick links, service categories, contact details, legal links
 * Can be modified: Add new sections, update links, customize layout, add social media
 */
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl text-primary-400 font-bold">Adult Services</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted platform for professional wellness and therapeutic services. 
              Connecting qualified service providers with customers seeking quality care and relaxation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-400 hover:text-white transition-colors">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-400 hover:text-white transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-primary-400 hover:text-white transition-colors">
                <FiInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg text-primary-400 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-gray-300 hover:text-white transition-colors">
                  Browse Services
                </Link>
              </li>
              <li>
                <Link to="/post-ad" className="text-gray-300 hover:text-white transition-colors">
                  Post Service
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg text-primary-400 font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/browse?category=massage" className="text-gray-300 hover:text-white transition-colors">
                  Massage Therapy
                </Link>
              </li>
              <li>
                <Link to="/browse?category=wellness" className="text-gray-300 hover:text-white transition-colors">
                  Wellness Services
                </Link>
              </li>
              <li>
                <Link to="/browse?category=relaxation" className="text-gray-300 hover:text-white transition-colors">
                  Relaxation Therapy
                </Link>
              </li>
              <li>
                <Link to="/browse?category=spa" className="text-gray-300 hover:text-white transition-colors">
                  Spa Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg text-primary-400 font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FiMail className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">info@adultservices.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">+1 (987) 765-4321</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiMapPin className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">121 Adult Street, Fun City, FC 323045</span>
              </div>
              
              {/* Back to Top Button */}
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="mt-6 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:from-primary-700 hover:to-secondary-700 transition-all transform hover:scale-105 shadow-lg"
                aria-label="Back to top"
                title="Back to top"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2025 Adult  Services. All rights reserved.
            </div>
            <div className="flex flex-wrap space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/disclaimer" className="text-gray-300 hover:text-white transition-colors">
                Disclaimer
              </Link>
              <Link to="/refund-policy" className="text-gray-300 hover:text-white transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <p className="text-primary-400 text-sm text-center">
            <strong>Important Notice:</strong> All appointment requests are handled manually offline. 
            No payments are processed online through this website. For product inquiries and appointments, 
            please use our contact forms or call us directly.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
