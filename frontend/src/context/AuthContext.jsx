import { createContext, useContext, useState, useEffect } from 'react';
import { auth as authApi, setAuthToken } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore user and token from localStorage
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('auth_token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setAuthToken(storedToken);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email, password) => {
    const response = await authApi.login(email, password);
    const resData = response.data;

    // Backend returns { success, data: { user, token } }
    const userData = resData.data?.user || resData.user || resData;
    const token = resData.data?.token || resData.token;

    setUser(userData);

    if (token) {
      setAuthToken(token);
    }

    return resData;
  };

  const register = async (data) => {
    const payload = { ...data };
    // Stop deleting first_name/last_name here, let them reach the API which validates them
    const response = await authApi.register(payload);
    const resData = response.data;

    // Backend returns { success, data: { user, token } }
    const userData = resData.data?.user || resData.user || resData;
    const token = resData.data?.token || resData.token;

    setUser(userData);

    if (token) {
      setAuthToken(token);
    }

    return resData;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (e) {
      // Ignore logout errors
    }
    setUser(null);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}