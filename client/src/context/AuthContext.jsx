import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const checkIsAdmin = (email) => {
    return email === 'hesbonomondi66@gmail.com'; //
  };

  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });
    const { token, ...userData } = res.data;
    const isAdmin = checkIsAdmin(email);
    const userWithRole = { ...userData, isAdmin };
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userWithRole);
    return userWithRole;
  };

  const register = async (email, password) => {
    const res = await axios.post('/api/auth/register', { email, password });
    const { token, ...userData } = res.data;
    const isAdmin = checkIsAdmin(email);
    const userWithRole = { ...userData, isAdmin };
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userWithRole);
    return userWithRole;
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};