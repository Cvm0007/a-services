import { useState } from 'react';
import { FiX, FiSearch, FiFilter, FiMapPin, FiDollarSign, FiUser, FiCalendar } from 'react-icons/fi';
import useAuthStore from '../store/authStore';

/**
 * Advanced Search Modal Component - Comprehensive search with filters
 * Features: Location, category, price range, gender, age filters, real-time search
 * Can be modified: Add new filter options, change styling, modify search logic
 */
const SearchModal = ({ isOpen, onClose, onSearch, initialFilters = {} }) => {
  const getAllPosts = useAuthStore((state) => state.getAllPosts);
  const allPosts = getAllPosts({ status: 'approved' });
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm || '');
  const [selectedLocation, setSelectedLocation] = useState(initialFilters.location || '');
  const [selectedCategory, setSelectedCategory] = useState(initialFilters.category || '');
  const [priceRange, setPriceRange] = useState({
    min: initialFilters.minPrice || '',
    max: initialFilters.maxPrice || ''
  });
  const [selectedGender, setSelectedGender] = useState(initialFilters.gender || '');
  const [ageRange, setAgeRange] = useState({
    min: initialFilters.minAge || '',
    max: initialFilters.maxAge || ''
  });
  const [verifiedOnly, setVerifiedOnly] = useState(initialFilters.verifiedOnly || false);

  // Available options based on current data
  const locations = [...new Set(allPosts.map(post => post.location).filter(Boolean))];
  const categories = [...new Set(allPosts.map(post => post.category).filter(Boolean))];
  const genders = [...new Set(allPosts.map(post => post.gender).filter(Boolean))];

  /**
   * Apply search filters and close modal
   * Combines all filter criteria into search parameters
   */
  const handleSearch = () => {
    const filters = {
      searchTerm: searchTerm.trim(),
      location: selectedLocation,
      category: selectedCategory,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      gender: selectedGender,
      minAge: ageRange.min,
      maxAge: ageRange.max,
      verifiedOnly
    };
    
    onSearch(filters);
    onClose();
  };

  /**
   * Clear all filters and reset to default state
   */
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLocation('');
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setSelectedGender('');
    setAgeRange({ min: '', max: '' });
    setVerifiedOnly(false);
  };

  /**
   * Close modal on backdrop click
   */
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FiSearch className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Advanced Search</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
          <p className="text-primary-100 mt-2">
            Find the perfect service with our advanced search filters
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Search Term */}
            <div className="lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiSearch className="inline w-4 h-4 mr-1" />
                Search Keywords
              </label>
              <input
                type="text"
                placeholder="Search by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiMapPin className="inline w-4 h-4 mr-1" />
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiFilter className="inline w-4 h-4 mr-1" />
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiUser className="inline w-4 h-4 mr-1" />
                Gender
              </label>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Genders</option>
                {genders.map(gender => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiDollarSign className="inline w-4 h-4 mr-1" />
                Price Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Age Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiCalendar className="inline w-4 h-4 mr-1" />
                Age Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min Age"
                  value={ageRange.min}
                  onChange={(e) => setAgeRange(prev => ({ ...prev, min: e.target.value }))}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <input
                  type="number"
                  placeholder="Max Age"
                  value={ageRange.max}
                  onChange={(e) => setAgeRange(prev => ({ ...prev, max: e.target.value }))}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Verified Only */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="verifiedOnly"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="verifiedOnly" className="ml-2 text-sm text-gray-700">
                Verified services only
              </label>
            </div>

          </div>

          {/* Popular Searches */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Searches</h3>
            <div className="flex flex-wrap gap-2">
              {['Massage Therapy', 'Body Massage', 'Corporate Wellness', 'Luxury Spa', 'Delhi', 'Mumbai'].map(term => (
                <button
                  key={term}
                  onClick={() => setSearchTerm(term)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSearch}
                className="px-6 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all flex items-center space-x-2"
              >
                <FiSearch className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
