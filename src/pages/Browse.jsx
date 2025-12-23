import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import products from '../data/products.json';
import { FiFilter, FiGrid, FiList, FiChevronLeft, FiChevronRight, FiSearch, FiMapPin } from 'react-icons/fi';
import useAuthStore from '../store/authStore';

// Pagination component extracted outside
const PaginationComponent = ({ currentPage, totalPages, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg border ${
          currentPage === 1 
            ? 'border-gray-200 text-gray-400 cursor-not-allowed'
            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
      >
        <FiChevronLeft className="w-4 h-4" />
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => setCurrentPage(1)}
            className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            1
          </button>
          {startPage > 2 && <span className="px-2 text-gray-500">...</span>}
        </>
      )}

      {pages.map(page => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-2 rounded-lg border ${
            page === currentPage
              ? 'border-primary-500 bg-primary-500 text-white'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2 text-gray-500">...</span>}
          <button
            onClick={() => setCurrentPage(totalPages)}
            className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg border ${
          currentPage === totalPages 
            ? 'border-gray-200 text-gray-400 cursor-not-allowed'
            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
      >
        <FiChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

/**
 * Browse Page - Enhanced with pagination and advanced filtering
 * Features: Pagination (20 items per page), search integration, filtering, sorting
 * Can be modified: Change page size, add filters, modify layout
 */
const Browse = ({ searchTerm }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const getAllPosts = useAuthStore((state) => state.getAllPosts);
  
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const ITEMS_PER_PAGE = 20;

  // Get filter values from URL
  const searchTermFilter = searchParams.get('searchTerm') || searchTerm || '';
  const categoryFilter = searchParams.get('category');
  const locationFilter = searchParams.get('location');
  const priceMinFilter = searchParams.get('minPrice');
  const priceMaxFilter = searchParams.get('maxPrice');
  const genderFilter = searchParams.get('gender');
  const ageMinFilter = searchParams.get('minAge');
  const ageMaxFilter = searchParams.get('maxAge');
  const verifiedFilter = searchParams.get('verifiedOnly');
  const sortBy = searchParams.get('sort') || 'relevance';

  // Initialize all products with posts from store
  useEffect(() => {
    const approvedPosts = getAllPosts({ status: 'approved' });
    const combinedProducts = [...products, ...approvedPosts.filter(post => !products.find(p => p.id === post.id))];
    setAllProducts(combinedProducts);
  }, [getAllPosts]);

  // Apply filters and pagination
  useEffect(() => {
    let filtered = [...allProducts];

    // Apply search term
    if (searchTermFilter) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTermFilter.toLowerCase()) ||
        (product.shortDesc || product.description || '').toLowerCase().includes(searchTermFilter.toLowerCase()) ||
        (product.tags || []).some(tag => tag.toLowerCase().includes(searchTermFilter.toLowerCase()))
      );
    }

    // Apply category filter
    if (categoryFilter) {
      filtered = filtered.filter(product =>
        (product.category || '').toLowerCase().includes(categoryFilter.toLowerCase()) ||
        (product.tags || []).some(tag => tag.toLowerCase().includes(categoryFilter.toLowerCase()))
      );
    }

    // Apply location filter
    if (locationFilter) {
      filtered = filtered.filter(product =>
        (product.location || '').toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Apply price filters
    if (priceMinFilter) {
      filtered = filtered.filter(product => product.price >= parseFloat(priceMinFilter));
    }
    if (priceMaxFilter) {
      filtered = filtered.filter(product => product.price <= parseFloat(priceMaxFilter));
    }

    // Apply gender filter
    if (genderFilter) {
      filtered = filtered.filter(product =>
        (product.gender || '').toLowerCase() === genderFilter.toLowerCase()
      );
    }

    // Apply age filters
    if (ageMinFilter) {
      filtered = filtered.filter(product => (product.ageMax || 65) >= parseInt(ageMinFilter));
    }
    if (ageMaxFilter) {
      filtered = filtered.filter(product => (product.ageMin || 18) <= parseInt(ageMaxFilter));
    }

    // Apply verified filter
    if (verifiedFilter === 'true') {
      filtered = filtered.filter(product =>
        (product.safetyBadges || []).some(badge => badge.toLowerCase().includes('verified'))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'age-low':
        filtered.sort((a, b) => (a.ageMin || 18) - (b.ageMin || 18));
        break;
      case 'age-high':
        filtered.sort((a, b) => (b.ageMin || 18) - (a.ageMin || 18));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      default:
        // relevance - keep original order
        break;
    }

    setFilteredProducts(filtered);
    
    // Calculate pagination
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    setTotalPages(totalPages);
    
    // Reset to page 1 if current page is out of bounds
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [allProducts, searchTermFilter, categoryFilter, locationFilter, priceMinFilter, priceMaxFilter, genderFilter, ageMinFilter, ageMaxFilter, verifiedFilter, sortBy]);

  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const updateFilter = (key, value) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    setSearchParams(searchParams);
  };

  const ProductCard = ({ product }) => (
    <div className="card overflow-hidden">
      <img 
        src={product.images?.thumbnail || product.image || '/placeholder-service.jpg'} 
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.shortDesc || product.description}</p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-primary-600">${product.price}</span>
          <span className="text-sm text-gray-500">
            Ages {product.ageMin || 18}-{product.ageMax || 65}
          </span>
        </div>
        {product.location && (
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <FiMapPin className="w-4 h-4 mr-1" />
            {product.location}
          </div>
        )}
        <div className="flex flex-wrap gap-1 mb-3">
          {(product.safetyBadges || []).slice(0, 2).map(badge => (
            <span key={badge} className="badge-success text-xs">
              {badge}
            </span>
          ))}
        </div>
        <Link 
          to={`/product/${product.id}`}
          className="btn-primary w-full text-center text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <FiFilter className="w-5 h-5" />
              </button>
            </div>

            <div className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-6`}>
              {/* Category */}
              <div>
                <h4 className="font-medium mb-3">Category</h4>
                <select 
                  value={categoryFilter || ''}
                  onChange={(e) => updateFilter('category', e.target.value)}
                  className="input-field text-sm"
                >
                  <option value="">All Categories</option>
                  <option value="massage">Massage</option>
                  <option value="body massage">Body Massage</option>
                  <option value="corporate">Corporate</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <h4 className="font-medium mb-3">Location</h4>
                <select 
                  value={locationFilter || ''}
                  onChange={(e) => updateFilter('location', e.target.value)}
                  className="input-field text-sm"
                >
                  <option value="">All Locations</option>
                  <option value="delhi">Delhi</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="bengaluru">Bengaluru</option>
                  <option value="hyderabad">Hyderabad</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="space-y-2">
                  <input
                    type="number"
                    placeholder="Min Price"
                    value={priceMinFilter || ''}
                    onChange={(e) => updateFilter('minPrice', e.target.value)}
                    className="input-field text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={priceMaxFilter || ''}
                    onChange={(e) => updateFilter('maxPrice', e.target.value)}
                    className="input-field text-sm"
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <h4 className="font-medium mb-3">Gender</h4>
                <select 
                  value={genderFilter || ''}
                  onChange={(e) => updateFilter('gender', e.target.value)}
                  className="input-field text-sm"
                >
                  <option value="">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="both">Both</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <h4 className="font-medium mb-3">Sort By</h4>
                <select 
                  value={sortBy}
                  onChange={(e) => updateFilter('sort', e.target.value)}
                  className="input-field text-sm"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => setSearchParams({})}
                className="btn-outline w-full text-sm"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold">Browse Services</h1>
              <p className="text-gray-600">
                {filteredProducts.length} services found
                {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
              >
                <FiGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
              >
                <FiList className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Products */}
          {getCurrentPageItems().length > 0 ? (
            <>
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {getCurrentPageItems().map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <PaginationComponent 
                currentPage={currentPage} 
                totalPages={totalPages} 
                setCurrentPage={setCurrentPage} 
              />
            </>
          ) : (
            <div className="text-center py-12">
              <FiSearch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-4">No services found</p>
              <button
                onClick={() => setSearchParams({})}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Browse;