
import React, { createContext, useContext, useState, useEffect } from 'react';

// This is a mock version that will be replaced with Firebase Auth later
type User = {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role?: 'user' | 'owner';
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock authentication
  useEffect(() => {
    // Check for stored user in localStorage
    const storedUser = localStorage.getItem('dineflow_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock login (will be replaced with Firebase)
      // For demo purposes, we're just creating a mock user
      const mockUser = {
        uid: `user_${Date.now()}`,
        email,
        displayName: email.split('@')[0],
        photoURL: null,
        role: 'user' as const
      };
      
      setUser(mockUser);
      localStorage.setItem('dineflow_user', JSON.stringify(mockUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock signup (will be replaced with Firebase)
      const mockUser = {
        uid: `user_${Date.now()}`,
        email,
        displayName: name,
        photoURL: null,
        role: 'user' as const
      };
      
      setUser(mockUser);
      localStorage.setItem('dineflow_user', JSON.stringify(mockUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign up');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      
      // Clear the stored user
      localStorage.removeItem('dineflow_user');
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
