import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../data/products.json';
import { FiArrowLeft, FiPhone, FiMessageSquare, FiAlertTriangle, FiAlertOctagon, FiExternalLink } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import useAuthStore from '../store/authStore';

// Format phone number for WhatsApp
const formatPhoneNumber = (phone) => {
  return phone.replace(/[^\d+]/g, '');
};

/**
 * Product Detail Page - Comprehensive service listing and booking interface
 * Features: Service details, image gallery, contact form, booking system
 * Can be modified: Add new service features, customize booking flow, enhance UI
 */
const ProductDetail = () => {
  // Get product ID from URL parameters
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Store user state
  const currentUser = useAuthStore((state) => state.currentUser);
  
  // Component state management
  const [product] = products.find(p => p.id === parseInt(id)) ? [products.find(p => p.id === parseInt(id))] : [null];
  const [selectedImage, setSelectedImage] = useState(0); // Track selected image in gallery

  // Handle call button click
  const handleCall = () => {
    if (product && product.phone) {
      window.location.href = `tel:${formatPhoneNumber(product.phone)}`;
    } else {
      alert('Phone number not available for this service');
    }
  };

  // Handle WhatsApp button click
  const handleWhatsApp = () => {
    if (product && product.phone) {
      const message = `Hi, I'm interested in your service: ${product.title}`;
      const whatsappUrl = `https://wa.me/${formatPhoneNumber(product.phone)}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      alert('WhatsApp number not available for this service');
    }
  };

  // Handle report fraud click
  const handleReportFraud = () => {
    window.location.href = 'mailto:report@adultservices.com?subject=Report%20Suspicious%20Activity';
  };


  // Handle case where product doesn't exist
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/browse')} className="btn-primary">
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  /**
   * Handle form submission for booking/contact request
   * @param {Object} data - Form data including contact details and preferences
   */
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Submit contact form with product ID and form data
    const result = submitContactForm({
      productId: product.id,
      ...data
    });

    // Show success message if submission was successful
    if (result.success) {
      setSubmitSuccess(true);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-6"
      >
        <FiArrowLeft className="w-5 h-5" />
        <span>Back to Products</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="mb-4">
            <img
              src={product.images.gallery[selectedImage]}
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.gallery.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-primary-600' : 'border-gray-200'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-3xl font-bold text-primary-600">${product.price}</span>
            <span className="text-gray-600">
              Ages {product.ageMin}-{product.ageMax}
            </span>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">{product.longDesc}</p>
          </div>

          {/* Safety Badges */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Safety Certifications</h3>
            <div className="flex flex-wrap gap-2">
              {product.safetyBadges.map(badge => (
                <span key={badge} className="badge-success">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Service  Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-primary-600 ">Available Now ! </span>
                <span className="ml-2 font-medium">{product.material}</span>
              </div>
              <div>
                <span className="text-primary-600">Category:</span>
                <span className="ml-2 font-medium">{product.tags.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Contact Options */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Contact Service Provider</h3>
            <p className="text-gray-600 mb-6">
              Get in touch directly with the service provider for more information or to book an appointment.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <button
                onClick={handleCall}
                className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                <FiPhone className="w-5 h-5" />
                <span>Call Now</span>
              </button>
              
              <button
                onClick={handleWhatsApp}
                className="flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                <FaWhatsapp className="w-5 h-5" />
                <span>WhatsApp</span>
              </button>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <FiMessageSquare className="w-4 h-4 mr-2" />
              <span>Response time: Usually within 1 hour</span>
            </div>
          </div>

          {/* Safety and Trust Section */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiAlertTriangle className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Safety First</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    • Always meet in public places for the first time<br />
                    • Never share personal financial information<br />
                    • Trust your instincts and report any suspicious activity
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Report Fraud Section */}
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiAlertOctagon className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Report Suspicious Activity</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p className="mb-2">
                    If you encounter any suspicious behavior or believe this listing violates our terms, please report it immediately.
                  </p>
                  <button
                    onClick={handleReportFraud}
                    className="inline-flex items-center text-red-700 hover:text-red-900 font-medium"
                  >
                    <span>Report to <b>Admin</b></span>
                    <FiExternalLink className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
