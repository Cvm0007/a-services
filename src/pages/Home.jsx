import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import products from '../data/products.json';
import { FiStar, FiShoppingBag, FiShield, FiTruck, FiSearch, FiMapPin, FiFilter, FiDollarSign } from 'react-icons/fi';
import hero from '../assets/hero-bg.webp';
import SearchModal from '../components/SearchModal';
import useAuthStore from '../store/authStore';

/**
 * Home Page - Enhanced with improved Hero section and advanced search functionality
 * Features: Larger hero section, integrated search modal, featured services, categories
 * Can be modified: Add new sections, change hero content, modify search behavior
 */
const Home = () => {
  const navigate = useNavigate();
  const getAllPosts = useAuthStore((state) => state.getAllPosts);
  const currentUser = useAuthStore((state) => state.currentUser);
  
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchFilters, setSearchFilters] = useState({});
  const [featuredProducts, setFeaturedProducts] = useState([]);
  
  // Get approved posts from store
  const approvedPosts = getAllPosts({ status: 'approved' });
  
  useEffect(() => {
    // Combine products.json data with approved posts from store
    const combinedProducts = [...products, ...approvedPosts.filter(post => !products.find(p => p.id === post.id))];
    setFeaturedProducts(combinedProducts.slice(0, 6));
  }, [approvedPosts]);

  /**
   * Handle search from modal - navigate to browse page with filters
   */
  const handleSearch = (filters) => {
    setSearchFilters(filters);
    
    // Build query string from filters
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '') {
        queryParams.append(key, value);
      }
    });
    
    // Navigate to browse page with search parameters
    navigate(`/browse?${queryParams.toString()}`);
  };

  /**
   * Quick search handler for hero section
   */
  const handleQuickSearch = (term) => {
    handleSearch({ searchTerm: term });
  };

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section with increased height and search functionality */}
      <section
        className="relative text-white py-32 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${hero})`,
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Discover Amazing
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-secondary-300">
                {" "}Massage Services
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-12 text-primary-100 max-w-3xl mx-auto leading-relaxed">
              All sessions are conducted by certified therapists using premium quality oils and hygienic equipment.
              Ideal for stress relief, muscle relaxation, and overall wellness.
            </p>

            {/* Enhanced Search Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8">
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search for services, locations, or keywords..."
                      className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleQuickSearch(e.target.value);
                        }
                      }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => setIsSearchModalOpen(true)}
                  className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all flex items-center justify-center space-x-2 font-semibold shadow-lg"
                >
                  <FiFilter className="w-5 h-5" />
                  <span>Advanced Search</span>
                </button>
              </div>
              
              {/* Quick Search Tags */}
              <div className="flex flex-wrap gap-2 justify-center">
                {['Massage Therapy', 'Body Massage', 'Delhi', 'Mumbai', 'Luxury Spa', 'Corporate Wellness'].map(term => (
                  <button
                    key={term}
                    onClick={() => handleQuickSearch(term)}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur border border-white/30 rounded-full text-white text-sm transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/browse"
                className="px-8 py-4 bg-white text-primary-600 hover:bg-gray-100 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2"
              >
                <FiSearch className="w-5 h-5" />
                <span>Browse All Services</span>
              </Link>

              {currentUser ? (
                <Link
                  to="/post-ad"
                  className="px-8 py-4 bg-gradient-to-r from-secondary-600 to-secondary-700 text-white hover:from-secondary-700 hover:to-secondary-800 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2"
                >
                  <FiShoppingBag className="w-5 h-5" />
                  <span>Post Your Ad</span>
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-600 rounded-xl font-semibold transition-all"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSearch={handleSearch}
        initialFilters={searchFilters}
      />

      {/* Trust Badges */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <FiShield className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Safety Certified</h3>
              <p className="text-gray-600 text-sm">All Services meet safety standards</p>
            </div>
            <div className="text-center">
              <FiTruck className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Fast Booking</h3>
              <p className="text-gray-600 text-sm">Quick and Reliable Services</p>
            </div>
            <div className="text-center">
              <FiStar className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Top Rated</h3>
              <p className="text-gray-600 text-sm">Trained Staff : Premium Services</p>
            </div>
            <div className="text-center">
              <FiShoppingBag className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Curated Selection</h3>
              <p className="text-gray-600 text-sm">Professional grade safe practice</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Most Booked Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Check out our most popular services that you and your body love!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <div key={product.id} className="card overflow-hidden">
                <img 
                  src={product.images?.thumbnail || product.image || '/placeholder-service.jpg'} 
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-4">{product.shortDesc || product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-primary-600">${product.price}</span>
                    <span className="text-sm text-gray-500">
                      Ages {product.ageMin || 18}-{product.ageMax || 65}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(product.safetyBadges || []).slice(0, 2).map(badge => (
                      <span key={badge} className="badge-success">
                        {badge}
                      </span>
                    ))}
                  </div>
                  <Link 
                    to={`/product/${product.id}`}
                    className="btn-primary w-full text-center"
                  >
                    Book Now!
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/browse" className="btn-outline">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Book by Category</h2>
            <p className="text-gray-600">Find the perfect service by category</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Massage', 'Body Massage', 'Corporate', 'Luxury', 'Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad'].map(category => (
              <Link 
                key={category}
                to={`/browse?category=${category.toLowerCase().replace(' & ', '-')}`}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 text-2xl font-bold">
                    {category.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find the Perfect Service?</h2>
          <p className="text-xl mb-8 text-secondary-100">
            Sign up for exclusive access to service details and special offers
          </p>
          <Link to="/signup" className="btn-primary bg-white text-secondary-600 hover:bg-gray-100">
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;