import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import products from '../data/products.json';
import { FiFilter, FiGrid, FiList } from 'react-icons/fi';

const Browse = ({ searchTerm }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Get filter values from URL
  const ageFilter = searchParams.get('age');
  const materialFilter = searchParams.get('material');
  const categoryFilter = searchParams.get('category');
  const sortBy = searchParams.get('sort') || 'relevance';

  useEffect(() => {
    let filtered = [...products];

    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply filters
    if (ageFilter) {
      const [minAge, maxAge] = ageFilter.split('-').map(Number);
      filtered = filtered.filter(product => product.ageMin >= minAge && product.ageMax <= maxAge);
    }

    if (materialFilter) {
      filtered = filtered.filter(product => 
        product.material.toLowerCase() === materialFilter.toLowerCase()
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(product =>
        product.tags.some(tag => tag.toLowerCase().includes(categoryFilter.toLowerCase()))
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
        filtered.sort((a, b) => a.ageMin - b.ageMin);
        break;
      case 'age-high':
        filtered.sort((a, b) => b.ageMin - a.ageMin);
        break;
      default:
        // relevance - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [searchTerm, ageFilter, materialFilter, categoryFilter, sortBy]);

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
        src={product.images.thumbnail} 
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.shortDesc}</p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-primary-600">${product.price}</span>
          <span className="text-sm text-gray-500">
            Ages {product.ageMin}-{product.ageMax}
          </span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {product.safetyBadges.slice(0, 2).map(badge => (
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
        <aside className="lg:w-64">
          <div className="bg-white rounded-lg shadow p-6">
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
              {/* Age Range */}
              <div>
                <h4 className="font-medium mb-3">Age Range</h4>
                <select 
                  value={ageFilter || ''}
                  onChange={(e) => updateFilter('age', e.target.value)}
                  className="input-field text-sm"
                >
                  <option value="">All Ages</option>
                  <option value="1-3">1-3 years</option>
                  <option value="4-6">4-6 years</option>
                  <option value="7-10">7-10 years</option>
                  <option value="11-16">11-16 years</option>
                </select>
              </div>

              {/* Material */}
              <div>
                <h4 className="font-medium mb-3">Material</h4>
                <select 
                  value={materialFilter || ''}
                  onChange={(e) => updateFilter('material', e.target.value)}
                  className="input-field text-sm"
                >
                  <option value="">All Materials</option>
                  <option value="Wood">Wood</option>
                  <option value="Plastic">Plastic</option>
                  <option value="Cardboard">Cardboard</option>
                  <option value="Plush">Plush</option>
                  <option value="Mixed">Mixed</option>
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
                  <option value="age-low">Age: Low to High</option>
                  <option value="age-high">Age: High to Low</option>
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
              <h1 className="text-2xl font-bold">Browse Products</h1>
              <p className="text-gray-600">
                {filteredProducts.length} products found
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
          {filteredProducts.length > 0 ? (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                : 'space-y-4'
            }>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No products found</p>
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
