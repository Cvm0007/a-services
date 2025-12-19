import { Link } from 'react-router-dom';
import products from '../data/products.json';
import { FiStar, FiShoppingBag, FiShield, FiTruck } from 'react-icons/fi';
import hero from '../assets/hero-bg.webp';

const Home = () => {
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative text-white py-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${hero})`,
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover Amazing Massage Services..
            </h1>

            <p className="text-xl mb-8 text-primary-100">
              All sessions are conducted by certified therapists using premium quality oils and hygienic equipment.
              Ideal for stress relief, muscle relaxation, and overall wellness.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/browse"
                className="btn-primary text-primary-600 hover:bg-white hover:text-primary-600"
              >
                Browse Services
              </Link>

              <Link
                to="/signup"
                className="btn-outline border-white text-white hover:bg-white hover:text-primary-600"
              >
                Book Session
              </Link>
            </div>
          </div>
        </div>
      </section>


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
                  src={product.images.thumbnail} 
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-4">{product.shortDesc}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-primary-600">${product.price}</span>
                    <span className="text-sm text-gray-500">
                      Ages {product.ageMin}-{product.ageMax}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.safetyBadges.slice(0, 2).map(badge => (
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
