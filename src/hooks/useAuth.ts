import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { auth, db } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const { user, setUser, logout } = useAuthStore();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { user: authUser } = await auth.getCurrentUser();
        
        if (authUser) {
          // Get user profile from database
          const { data: userProfile, error } = await db.getUserByEmail(authUser.email!);
          
          if (userProfile && !error) {
            setUser(userProfile);
          } else {
            // User exists in auth but not in database, sign them out
            await auth.signOut();
          }
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: userProfile } = await db.getUserByEmail(session.user.email!);
        if (userProfile) {
          setUser(userProfile);
        }
      } else if (event === 'SIGNED_OUT') {
        logout();
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [setUser, logout]);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await auth.signIn(email, password);
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await auth.signOut();
    if (!error) {
      logout();
    }
    return { error };
  };

  return {
    user,
    loading,
    signIn,
    signOut,
    isAuthenticated: !!user
  };
};