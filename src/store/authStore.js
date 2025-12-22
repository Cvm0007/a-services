import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Authentication Store - Manages user authentication, roles, and data persistence
 * Features: User authentication, admin access, post management, payment tracking
 * Can be modified: Add new user roles, extend user data structure, add more authentication methods
 */
const useAuthStore = create(
  persist(
    (set, get) => ({
      // Core State Management
      currentUser: null,                    // Currently logged-in user
      users: [],                            // All registered users
      posts: [],                            // All service posts (user + admin)
      payments: [],                         // Payment transaction records
      submissions: [],                      // Contact form submissions
      
      // Admin Configuration
      adminCredentials: {
        email: 'admin@atoyservices.com',    // Default admin email
        adminId: 'ADMIN-ATOY-2024',         // Unique admin ID for security
        password: 'admin123'                // Default admin password (change in production)
      },
      
      /**
       * User Authentication - Login with email and password
       * Supports both regular users and admin authentication
       * @param {string} email - User email
       * @param {string} password - User password
       * @param {string} adminId - Optional admin ID for admin login
       * @returns {Object} Login result with success status and user data/error
       */
      login: (email, password, adminId = null) => {
        const { users, adminCredentials } = get();
        
        // Check for admin login first
        if (adminId) {
          if (email === adminCredentials.email && 
              password === adminCredentials.password && 
              adminId === adminCredentials.adminId) {
            const adminUser = {
              id: 'admin-001',
              name: 'Administrator',
              email: adminCredentials.email,
              role: 'admin',
              adminId: adminCredentials.adminId,
              permissions: ['user_management', 'post_management', 'payment_management', 'system_settings']
            };
            set({ currentUser: adminUser });
            return { success: true, user: adminUser, isAdmin: true };
          }
          return { success: false, error: 'Invalid admin credentials' };
        }
        
        // Regular user login
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          set({ currentUser: { ...user, password: undefined } });
          return { success: true, user: { ...user, password: undefined }, isAdmin: false };
        }
        
        return { success: false, error: 'Invalid email or password' };
      },
      
      /**
       * User Registration - Create new user account
       * Validates email uniqueness and sets default user permissions
       * @param {Object} userData - User registration data
       * @returns {Object} Registration result with success status and user data/error
       */
      signup: (userData) => {
        const { users } = get();
        
        // Check if user already exists
        if (users.find(u => u.email === userData.email)) {
          return { success: false, error: 'User with this email already exists' };
        }
        
        // Create new user with default permissions
        const newUser = {
          id: Date.now().toString(),
          ...userData,
          role: 'user',
          permissions: ['view_posts', 'create_post', 'edit_own_posts'],
          canPostAd: false,                    // Admin approval required
          isVerified: false,                   // Email verification status
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        set({ users: [...users, newUser] });
        
        // Auto login after signup
        set({ currentUser: { ...newUser, password: undefined } });
        
        return { success: true, user: { ...newUser, password: undefined } };
      },
      
      /**
       * User Logout - Clear current session
       * @param {boolean} redirect - Whether to redirect to home (handled by component)
       */
      logout: () => {
        set({ currentUser: null });
      },
      
      /**
       * Post Management - Create new service post
       * Requires authentication and posting permissions
       * @param {Object} postData - Service post data
       * @returns {Object} Post creation result
       */
      createPost: (postData) => {
        const { currentUser, posts } = get();
        
        if (!currentUser) {
          return { success: false, error: 'You must be logged in to create a post' };
        }
        
        if (!currentUser.canPostAd && currentUser.role !== 'admin') {
          return { success: false, error: 'You do not have permission to post ads. Please contact admin.' };
        }
        
        const newPost = {
          id: Date.now().toString(),
          ...postData,
          postedBy: currentUser.id,
          postedByName: currentUser.name,
          postedByEmail: currentUser.email,
          status: currentUser.role === 'admin' ? 'approved' : 'pending',
          featured: false,
          verified: currentUser.isVerified,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        set({ posts: [...posts, newPost] });
        
        return { success: true, post: newPost };
      },
      
      /**
       * Admin Post Approval - Approve or reject user posts
       * Only accessible by admin users
       * @param {string} postId - Post ID to approve/reject
       * @param {string} status - 'approved' or 'rejected'
       * @param {string} reason - Optional rejection reason
       * @returns {Object} Approval result
       */
      approvePost: (postId, status, reason = null) => {
        const { currentUser, posts } = get();
        
        if (!currentUser || currentUser.role !== 'admin') {
          return { success: false, error: 'Admin access required' };
        }
        
        const postIndex = posts.findIndex(p => p.id === postId);
        if (postIndex === -1) {
          return { success: false, error: 'Post not found' };
        }
        
        const updatedPosts = [...posts];
        updatedPosts[postIndex] = {
          ...updatedPosts[postIndex],
          status: status,
          adminNote: reason,
          updatedAt: new Date().toISOString()
        };
        
        set({ posts: updatedPosts });
        
        return { success: true, post: updatedPosts[postIndex] };
      },
      
      /**
       * User Permission Management - Grant posting permissions to users
       * Admin only function
       * @param {string} userId - User ID to update
       * @param {boolean} canPostAd - Permission status
       * @returns {Object} Update result
       */
      updateUserPermissions: (userId, canPostAd) => {
        const { currentUser, users } = get();
        
        if (!currentUser || currentUser.role !== 'admin') {
          return { success: false, error: 'Admin access required' };
        }
        
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex === -1) {
          return { success: false, error: 'User not found' };
        }
        
        const updatedUsers = [...users];
        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          canPostAd: canPostAd,
          updatedAt: new Date().toISOString()
        };
        
        set({ users: updatedUsers });
        
        return { success: true, user: updatedUsers[userIndex] };
      },
      
      /**
       * Payment Processing - Record payment transactions
       * @param {Object} paymentData - Payment information
       * @returns {Object} Payment result
       */
      processPayment: (paymentData) => {
        const { currentUser, payments } = get();
        
        if (!currentUser) {
          return { success: false, error: 'You must be logged in to make a payment' };
        }
        
        const newPayment = {
          id: Date.now().toString(),
          userId: currentUser.id,
          ...paymentData,
          status: 'completed',
          createdAt: new Date().toISOString()
        };
        
        set({ payments: [...payments, newPayment] });
        
        return { success: true, payment: newPayment };
      },
      
      /**
       * Contact Form Submission - Handle contact form submissions
       * @param {Object} formData - Contact form data
       * @returns {Object} Submission result
       */
      submitContactForm: (formData) => {
        const { currentUser, submissions } = get();
        
        if (!currentUser) {
          return { success: false, error: 'You must be logged in to submit a form' };
        }
        
        const newSubmission = {
          id: Date.now().toString(),
          userId: currentUser.id,
          productId: formData.productId,
          ...formData,
          createdAt: new Date().toISOString()
        };
        
        set({ submissions: [...submissions, newSubmission] });
        
        return { success: true, submission: newSubmission };
      },
      
      /**
       * Get User Submissions - Retrieve all submissions by current user
       * @returns {Array} User's submission history
       */
      getUserSubmissions: () => {
        const { currentUser, submissions } = get();
        
        if (!currentUser) {
          return [];
        }
        
        return submissions.filter(s => s.userId === currentUser.id);
      },
      
      /**
       * Get User Posts - Retrieve all posts by current user
       * @returns {Array} User's posts
       */
      getUserPosts: () => {
        const { currentUser, posts } = get();
        
        if (!currentUser) {
          return [];
        }
        
        return posts.filter(p => p.postedBy === currentUser.id);
      },
      
      /**
       * Get All Posts - Retrieve posts with optional filtering
       * @param {Object} filters - Filter options (status, featured, etc.)
       * @returns {Array} Filtered posts
       */
      getAllPosts: (filters = {}) => {
        const { posts } = get();
        
        let filteredPosts = [...posts];
        
        // Apply filters
        if (filters.status) {
          filteredPosts = filteredPosts.filter(p => p.status === filters.status);
        }
        
        if (filters.featured) {
          filteredPosts = filteredPosts.filter(p => p.featured);
        }
        
        if (filters.verified) {
          filteredPosts = filteredPosts.filter(p => p.verified);
        }
        
        return filteredPosts;
      },
      
      /**
       * Get User Statistics - Admin dashboard statistics
       * @returns {Object} System statistics
       */
      getSystemStats: () => {
        const { users, posts, payments } = get();
        
        return {
          totalUsers: users.length,
          totalPosts: posts.length,
          pendingPosts: posts.filter(p => p.status === 'pending').length,
          approvedPosts: posts.filter(p => p.status === 'approved').length,
          totalRevenue: payments.reduce((sum, p) => sum + (p.amount || 0), 0),
          totalPayments: payments.length
        };
      },
      
      /**
       * Clear All Data - Reset application to initial state
       * Development/testing function only
       */
      clearAllData: () => {
        set({ 
          users: [], 
          submissions: [], 
          posts: [], 
          payments: [],
          currentUser: null 
        });
      }
    }),
    {
      name: 'atoyservices-storage',
      partialize: (state) => ({
        users: state.users,
        submissions: state.submissions,
        posts: state.posts,
        payments: state.payments,
        currentUser: state.currentUser
      })
    }
  )
);

export default useAuthStore;
