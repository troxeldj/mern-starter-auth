import { useState, useEffect, createContext, useContext } from 'react';
import apiClient from '../util/api';

const AuthContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await apiClient.get('/auth/verify');
      if (response.data.status === "SUCCESS") { // Change from "success" to "status"
        setUser(response.data.message);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      if (response.data.status === "SUCCESS") { // Change from "success" to "status"
        setUser(response.data.message);
        return { status: 'SUCCESS', message: response.data.message };
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      return { status: 'ERROR', message: error.response ? error.response.data.message : 'Login failed' };
    }
  }

  const register = async (username, email, password) => {
    try {
      const response = await apiClient.post('/auth/register', { username, email, password });
      if (response.data.status === "SUCCESS") { // Change from "success" to "status"
        setUser(response.data.message);
        return { status: 'SUCCESS', message: response.data.message };
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      return { status: 'ERROR', message: error.response ? error.response.data.message : 'Registration failed' };
    }
  };

  const logout = async () => {
    try {
      await apiClient.get('/auth/logout'); // Change from GET to POST
      setUser(null);
    } catch (error) {
      setUser(null); // Still set user to null even if logout fails
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    checkAuth,
    loading,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export {
  AuthProvider,
  useAuth
};
