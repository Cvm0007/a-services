import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      currentUser: null,
      users: [],
      submissions: [],
      
      // Actions
      login: (email, password) => {
        const { users } = get();
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          set({ currentUser: { ...user, password: undefined } });
          return { success: true, user: { ...user, password: undefined } };
        }
        
        return { success: false, error: 'Invalid email or password' };
      },
      
      signup: (userData) => {
        const { users } = get();
        
        // Check if user already exists
        if (users.find(u => u.email === userData.email)) {
          return { success: false, error: 'User with this email already exists' };
        }
        
        // Create new user
        const newUser = {
          id: Date.now().toString(),
          ...userData,
          createdAt: new Date().toISOString()
        };
        
        set({ users: [...users, newUser] });
        
        // Auto login after signup
        set({ currentUser: { ...newUser, password: undefined } });
        
        return { success: true, user: { ...newUser, password: undefined } };
      },
      
      logout: () => {
        set({ currentUser: null });
      },
      
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
      
      getUserSubmissions: () => {
        const { currentUser, submissions } = get();
        
        if (!currentUser) {
          return [];
        }
        
        return submissions.filter(s => s.userId === currentUser.id);
      },
      
      clearAllData: () => {
        set({ users: [], submissions: [], currentUser: null });
      }
    }),
    {
      name: 'etoy-storage',
      partialize: (state) => ({
        users: state.users,
        submissions: state.submissions,
        currentUser: state.currentUser
      })
    }
  )
);

export default useAuthStore;
