import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser, FiShield } from 'react-icons/fi';
import useAuthStore from '../store/authStore';

/**
 * Base validation schema for login form
 */
const baseSchema = {
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required')
};

/**
 * Admin-specific validation schema
 */
const adminSchema = {
  ...baseSchema,
  adminId: yup.string().required('Admin ID is required')
};

// Create the appropriate schema based on login type
const getSchema = (isAdmin) => {
  return yup.object().shape(isAdmin ? adminSchema : baseSchema);
};

/**
 * Login Page - User authentication interface with comprehensive validation
 * Features: Form validation, password visibility toggle, redirect handling, error management
 * Can be modified: Add remember me option, social login, enhanced security features
 */
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);
  
  // Component state management
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [isLoading, setIsLoading] = useState(false); // Loading state for form submission
  const [error, setError] = useState(''); // Error message state
  const [isAdminLogin, setIsAdminLogin] = useState(false); // Toggle between user and admin login

  // Redirect destination after successful login
  const from = location.state?.from?.pathname || '/';
  
  // Input field styling with error state
  const inputClasses = (hasError) => 
    `w-full px-4 py-3 border ${hasError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`;

  // React Hook Form configuration with validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(getSchema(isAdminLogin)),
    defaultValues: {
      email: '',
      password: '',
      adminId: ''
    }
  });

  // Toggle between admin and user login
  const toggleAdminLogin = () => {
    setIsAdminLogin(!isAdminLogin);
    setError('');
    reset({ email: '', password: '', adminId: '' });
  };

  // Update schema when isAdminLogin changes
  useEffect(() => {
    reset({ email: '', password: '', adminId: '' });
  }, [isAdminLogin, reset]);

  /**
 * Handle form submission for user authentication
 * @param {Object} data - Form data including email and password
 */
  // const onSubmit = async (formData) => {
  //   setIsLoading(true);
  //   setError(''); // Clear any previous errors

  //   try {
  //     // Prepare login data based on login type
  //     const loginData = {
  //       email: formData.email,
  //       password: formData.password,
  //       adminId: isAdminLogin ? formData.adminId : undefined
  //     };

  //     // Attempt to authenticate user with provided credentials
  //     const result = isAdminLogin 
  //       ? login(loginData.email, loginData.password, loginData.adminId)
  //       : login(loginData.email, loginData.password);

  //     // Handle authentication result
  //     if (result.success) {
  //       navigate(from, { replace: true }); // Redirect to intended destination
  //     } else {
  //       setError(result.error || 'Invalid credentials. Please try again.');
  //     }
  //   } catch (err) {
  //     console.error('Login error:', err);
  //     setError('An error occurred during login. Please try again.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

    const onSubmit = async (formData) => {
  setIsLoading(true);
  setError('');

  try {
    // Attempt to authenticate user with provided credentials
    const result = isAdminLogin 
      ? login(formData.email, formData.password, formData.adminId)
      : login(formData.email, formData.password);

    // Handle authentication result
    if (result.success) {
      // Redirect based on user type
      if (result.isAdmin) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } else {
      setError(result.error || 'Invalid credentials. Please try again.');
    }
  } catch (err) {
    console.error('Login error:', err);
    setError('An error occurred during login. Please try again.');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiLock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {isAdminLogin ? 'Admin Login' : 'Welcome Back'}
            </h2>
            <p className="text-gray-600 mt-2">
              {isAdminLogin ? 'Access the admin dashboard' : 'Sign in to your account'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Admin ID Field (Conditional) */}
            {isAdminLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin ID
                </label>
                <div className="relative">
                  <FiShield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    {...register('adminId')}
                    name="adminId"
                    type="text"
                    className={`${inputClasses(!!errors.adminId)} pl-10`}
                    placeholder="Enter admin ID"
                  />
                </div>
                {errors.adminId && (
                  <p className="text-red-500 text-sm mt-1">{errors.adminId.message}</p>
                )}
              </div>
            )}
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  {...register('email')}
                  name="email"
                  type="email"
                  className={`${inputClasses(!!errors.email)} pl-10`}
                  placeholder="Enter your email"
                  autoComplete="username"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  {...register('password')}
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`${inputClasses(!!errors.password)} pl-10 pr-10`}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a href="#" className="text-sm text-primary-600 hover:text-primary-700">
                Forgot your password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Signup Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="text-primary-600 hover:text-primary-700 font-medium">
                Sign up here
              </a>
            </p>
          </div>

          {/* Login Type Toggle */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={toggleAdminLogin}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center justify-center mx-auto"
            >
              {isAdminLogin ? (
                <>
                  <FiUser className="mr-1" /> Switch to User Login
                </>
              ) : (
                <>
                  <FiShield className="mr-1" /> Admin Login
                </>
              )}
            </button>
          </div>

          {/* Demo Account Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700 text-center">
              <strong>
                {isAdminLogin ? 'Admin Demo:' : 'User Demo:'}
              </strong> {isAdminLogin ? (
                'Use admin@atoyservices.com / admin123 / ADMIN-ATOY-2024'
              ) : (
                'Use any email and password "demo123"'
              )}
            </p>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 text-center">
              By signing in, you agree to our Terms of Service and Privacy Policy. 
              All appointment requests are handled manually offline.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
