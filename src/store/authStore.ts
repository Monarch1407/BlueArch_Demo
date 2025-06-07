import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  institution_id: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  status: 'active' | 'inactive' | 'suspended';
  last_login?: string;
  preferences?: any;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      
      setUser: (user) => set({ 
        user, 
        isAuthenticated: true, 
        isLoading: false 
      }),
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false 
      }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      updateUser: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ 
            user: { 
              ...currentUser, 
              ...updates,
              updated_at: new Date().toISOString()
            } 
          });
        }
      }
    }),
    {
      name: 'bluearch-auth',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);