import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../api';

interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      if (localStorage.getItem('token')) {
        try {
          const response = await authService.getCurrentUser();
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Authentication error:', error);
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await authService.login(username, password);
      localStorage.setItem('token', response.data.auth_token);
      setIsAuthenticated(true);
      
      // Get user data
      const userResponse = await authService.getCurrentUser();
      setUser(userResponse.data);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      // First attempt to register
      const registerResponse = await authService.register(username, email, password);
      console.log('Registration successful:', registerResponse.data);
      
      // Return the registration response
      return registerResponse;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 