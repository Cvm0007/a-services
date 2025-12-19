import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../data/products.json';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiArrowLeft, FiCalendar, FiClock, FiUser, FiMail, FiPhone, FiMessageSquare } from 'react-icons/fi';
import useAuthStore from '../store/authStore';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  preferredDate: yup.string().required('Preferred date is required'),
  preferredTime: yup.string().required('Preferred time is required'),
  message: yup.string().required('Message is required'),
});

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const submitContactForm = useAuthStore((state) => state.submitContactForm);
  const currentUser = useAuthStore((state) => state.currentUser);
  
  const [product] = products.find(p => p.id === parseInt(id)) ? [products.find(p => p.id === parseInt(id))] : [null];
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
    }
  });

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

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    const result = submitContactForm({
      productId: product.id,
      ...data
    });

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
            <h3 className="font-semibold mb-3">Product Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-600">Material:</span>
                <span className="ml-2 font-medium">{product.material}</span>
              </div>
              <div>
                <span className="text-gray-600">Category:</span>
                <span className="ml-2 font-medium">{product.tags.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          {!submitSuccess ? (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Request More Information</h3>
              <p className="text-gray-600 mb-6">
                Fill out the form below to schedule an appointment or get more details about this product.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        {...register('name')}
                        type="text"
                        className="input-field pl-10"
                        placeholder="Your name"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        {...register('email')}
                        type="email"
                        className="input-field pl-10"
                        placeholder="Your email"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        {...register('phone')}
                        type="tel"
                        className="input-field pl-10"
                        placeholder="Your phone"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Date
                    </label>
                    <div className="relative">
                      <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        {...register('preferredDate')}
                        type="date"
                        className="input-field pl-10"
                      />
                    </div>
                    {errors.preferredDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.preferredDate.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Time
                  </label>
                  <div className="relative">
                    <FiClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      {...register('preferredTime')}
                      type="time"
                      className="input-field pl-10"
                    />
                  </div>
                  {errors.preferredTime && (
                    <p className="text-red-500 text-sm mt-1">{errors.preferredTime.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <div className="relative">
                    <FiMessageSquare className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      {...register('message')}
                      rows="4"
                      className="input-field pl-10 resize-none"
                      placeholder="Tell us what you'd like to know about this product..."
                    ></textarea>
                  </div>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-green-800 mb-2">Request Submitted!</h3>
              <p className="text-green-700 mb-4">
                Thank you for your interest. We'll contact you soon to schedule your appointment.
              </p>
              <button
                onClick={() => navigate('/profile')}
                className="btn-primary"
              >
                View My Requests
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
