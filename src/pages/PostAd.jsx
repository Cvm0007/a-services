import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiX, FiSave, FiArrowLeft, FiImage, FiMapPin, FiDollarSign, FiUser, FiCalendar, FiPhone, FiMail, FiGlobe, FiCheck } from 'react-icons/fi';
import useAuthStore from '../store/authStore';

/**
 * Post Ad Page - Comprehensive form for users to post service advertisements
 * Features: Multi-step form, image upload, service details, pricing, location, contact info
 * Can be modified: Add new form fields, change validation rules, modify upload behavior
 */
const PostAd = () => {
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.currentUser);
  const createPost = useAuthStore((state) => state.createPost);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [formData, setFormData] = useState({
    // Basic Information
    title: '',
    category: '',
    description: '',
    longDescription: '',
    
    // Service Details
    services: [],
    ageMin: 18,
    ageMax: 65,
    gender: '',
    experience: '',
    
    // Location & Pricing
    location: '',
    city: '',
    price: '',
    priceType: 'hourly', // hourly, session, package
    
    // Contact Information
    phone: '',
    email: '',
    whatsapp: '',
    website: '',
    
    // Additional Details
    availability: '',
    languages: [],
    safetyBadges: [],
    tags: [],
    
    // Verification
    verified: false,
    idProof: null,
  });

  // Categories and options
  const categories = [
    'Massage Therapy', 'Body Massage', 'Corporate Wellness', 
    'Luxury Spa', 'Sports Massage', 'Wellness Center'
  ];
  
  const cities = ['Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Jaipur'];
  const genders = ['Male', 'Female', 'Any'];
  const languages = ['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Punjabi'];
  const safetyBadges = ['Verified', 'Insured', 'Certified', 'Background Checked', 'Health Screened'];
  const serviceTypes = ['Swedish Massage', 'Deep Tissue', 'Hot Stone', 'Aromatherapy', 'Thai Massage', 'Reflexology'];

  useEffect(() => {
    // Pre-fill user contact information
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        email: currentUser.email || '',
        phone: currentUser.phone || '',
      }));
    }
  }, [currentUser]);

  /**
   * Handle form field changes
   */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  /**
   * Handle multi-select fields (services, languages, safety badges)
   */
  const handleMultiSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  /**
   * Handle image upload simulation
   */
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    }));
    setUploadedImages(prev => [...prev, ...newImages].slice(0, 5)); // Max 5 images
  };

  /**
   * Remove uploaded image
   */
  const removeImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  /**
   * Form validation
   */
  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.title && formData.category && formData.description;
      case 2:
        return formData.services.length > 0 && formData.location && formData.price;
      case 3:
        return formData.phone && formData.email;
      default:
        return true;
    }
  };

  /**
   * Navigate to next step
   */
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  /**
   * Navigate to previous step
   */
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  /**
   * Submit the ad
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Prepare post data
      const postData = {
        ...formData,
        postedBy: currentUser.id,
        status: 'pending', // Requires admin approval
        createdAt: new Date().toISOString(),
        images: uploadedImages.map(img => img.preview),
        views: 0,
        likes: 0,
      };

      // Create post in store
      const result = await createPost(postData);
      
      if (result.success) {
        // Redirect to user dashboard or success page
        navigate('/profile', { 
          state: { 
            message: 'Your ad has been submitted successfully! It will be reviewed and approved within 24 hours.' 
          } 
        });
      } else {
        alert(result.error || 'Failed to submit ad. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting ad:', error);
      alert('An error occurred while submitting your ad. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-4"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post Your Service Ad</h1>
          <p className="text-gray-600">
            Reach thousands of potential clients by listing your professional services
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step ? <FiCheck className="w-5 h-5" /> : step}
                </div>
                <div className={`flex-1 h-1 mx-2 ${
                  currentStep > step ? 'bg-primary-600' : 'bg-gray-200'
                }`} />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-600">Basic Info</span>
            <span className="text-sm text-gray-600">Service Details</span>
            <span className="text-sm text-gray-600">Contact Info</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Professional Swedish Massage Therapy"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of your service (max 200 characters)"
                  maxLength="200"
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              {/* Long Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Description
                </label>
                <textarea
                  name="longDescription"
                  value={formData.longDescription}
                  onChange={handleInputChange}
                  placeholder="Detailed description of your services, experience, and what clients can expect..."
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Images Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Images (Max 5)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <FiUpload className="w-12 h-12 text-gray-400 mb-2" />
                    <span className="text-gray-600">Click to upload images</span>
                    <span className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB each</span>
                  </label>
                </div>
                
                {/* Uploaded Images Preview */}
                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image.preview}
                          alt={image.name}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Service Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Service Details</h2>
              
              {/* Services Offered */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Services Offered *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {serviceTypes.map(service => (
                    <label key={service} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={() => handleMultiSelect('services', service)}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Age Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiCalendar className="inline w-4 h-4 mr-1" />
                    Minimum Age
                  </label>
                  <input
                    type="number"
                    name="ageMin"
                    value={formData.ageMin}
                    onChange={handleInputChange}
                    min="18"
                    max="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Age
                  </label>
                  <input
                    type="number"
                    name="ageMax"
                    value={formData.ageMax}
                    onChange={handleInputChange}
                    min="18"
                    max="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiUser className="inline w-4 h-4 mr-1" />
                  Service For
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select gender preference</option>
                  {genders.map(gender => (
                    <option key={gender} value={gender.toLowerCase()}>{gender}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiMapPin className="inline w-4 h-4 mr-1" />
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Full address or area"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Select city</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiDollarSign className="inline w-4 h-4 mr-1" />
                    Price *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Type
                  </label>
                  <select
                    name="priceType"
                    value={formData.priceType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="hourly">Per Hour</option>
                    <option value="session">Per Session</option>
                    <option value="package">Package</option>
                  </select>
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="e.g., 5+ years of professional experience"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Languages */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Languages Spoken
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {languages.map(lang => (
                    <label key={lang} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.languages.includes(lang)}
                        onChange={() => handleMultiSelect('languages', lang)}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm">{lang}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Safety Badges */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Safety Certifications
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {safetyBadges.map(badge => (
                    <label key={badge} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.safetyBadges.includes(badge)}
                        onChange={() => handleMultiSelect('safetyBadges', badge)}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm">{badge}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Contact Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiPhone className="inline w-4 h-4 mr-1" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiMail className="inline w-4 h-4 mr-1" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiGlobe className="inline w-4 h-4 mr-1" />
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://yourwebsite.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <textarea
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  placeholder="e.g., Monday-Friday 9AM-8PM, Weekends 10AM-6PM"
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Terms Agreement */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="verified"
                    checked={formData.verified}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-1"
                    required
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the Terms of Service and Community Guidelines. 
                    I confirm that all information provided is accurate and I have the necessary 
                    qualifications and licenses to offer these services.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!validateStep(currentStep)}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                disabled={!validateStep(currentStep) || isSubmitting}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <FiSave className="w-4 h-4" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Ad'}</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostAd;
