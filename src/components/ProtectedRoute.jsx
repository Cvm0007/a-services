import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const location = useLocation();

  // If no user is logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If admin access is required but user is not an admin
  if (adminOnly && currentUser.role !== 'admin') {
    return <Navigate to="/" state={{ error: 'Unauthorized access' }} replace />;
  }

  return children;
};

export default ProtectedRoute;