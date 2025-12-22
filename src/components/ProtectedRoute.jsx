import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';

/**
 * Protected Route Component - Route protection for authenticated and admin-only pages
 * Features: User authentication check, admin role verification, redirect handling
 * Can be modified: Add role-based permissions, enhance redirect logic
 */
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const location = useLocation();

  // Check if user is authenticated
  if (!currentUser) {
    // Redirect to login page with the intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if admin-only access is required
  if (adminOnly && currentUser.role !== 'admin') {
    // Redirect to admin login for admin-only routes
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
