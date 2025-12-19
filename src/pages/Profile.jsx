import { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiCalendar, FiTrash2, FiLogOut } from 'react-icons/fi';
import useAuthStore from '../store/authStore';

const Profile = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const getUserSubmissions = useAuthStore((state) => state.getUserSubmissions);
  const logout = useAuthStore((state) => state.logout);
  const clearAllData = useAuthStore((state) => state.clearAllData);
  
  const [submissions, setSubmissions] = useState(getUserSubmissions());
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const handleClearData = () => {
    clearAllData();
    window.location.href = '/';
  };

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please Login</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to view your profile.</p>
          <a href="/login" className="btn-primary">
            Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        {/* User Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <FiUser className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{currentUser.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FiMail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{currentUser.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FiPhone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{currentUser.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FiCalendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="font-medium">
                  {new Date(currentUser.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Submissions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">My Requests</h2>
          {submissions.length > 0 ? (
            <div className="space-y-4">
              {submissions.map(submission => (
                <div key={submission.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">Product ID: #{submission.productId}</p>
                      <p className="text-sm text-gray-600">
                        Requested: {new Date(submission.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="badge-success">Pending</span>
                  </div>
                  <p className="text-gray-700 mb-2">{submission.message}</p>
                  <div className="text-sm text-gray-600">
                    <p>Preferred: {submission.preferredDate} at {submission.preferredTime}</p>
                    <p>Contact: {submission.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">You haven't submitted any requests yet.</p>
              <a href="/browse" className="btn-primary">
                Browse Products
              </a>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Account Actions</h2>
          <div className="space-y-4">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
            >
              <FiLogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
            
            <button
              onClick={() => setShowClearConfirm(!showClearConfirm)}
              className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
            >
              <FiTrash2 className="w-5 h-5" />
              <span>Clear All Data (Testing)</span>
            </button>
            
            {showClearConfirm && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 mb-4">
                  This will delete all users, submissions, and reset the application. 
                  This action cannot be undone.
                </p>
                <button
                  onClick={handleClearData}
                  className="btn-primary bg-red-600 hover:bg-red-700"
                >
                  Clear All Data
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
