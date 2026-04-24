import { createContext, useContext, useState } from 'react';
import { authLogin, authSignup, authForgotPassword, authResetPassword } from '../Api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('kshetra-user');
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('kshetra-token') || null);

  const saveSession = (userData, accessToken) => {
    localStorage.setItem('kshetra-user', JSON.stringify(userData));
    localStorage.setItem('kshetra-token', accessToken);
    setUser(userData);
    setToken(accessToken);
  };

  const signup = async (name, email, password, mobile) => {
    try {
      const response = await authSignup(name, email || undefined, password, mobile || undefined);
      saveSession(response.data.user, response.data.access_token);
      return { success: true };
    } catch (error) {
      return { error: error.response?.data?.detail || 'Signup failed.' };
    }
  };

  const login = async (identifier, password) => {
    try {
      const response = await authLogin(identifier, password);
      saveSession(response.data.user, response.data.access_token);
      return { success: true };
    } catch (error) {
      return { error: error.response?.data?.detail || 'Invalid email/mobile or password.' };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await authForgotPassword(email);
      return {
        success: true,
        message: response.data.message,
        reset_code: response.data.reset_code,
      };
    } catch (error) {
      return { error: error.response?.data?.detail || 'Unable to generate reset code.' };
    }
  };

  const resetPassword = async (email, code, newPassword) => {
    try {
      const response = await authResetPassword(email, code, newPassword);
      return { success: true, message: response.data.message };
    } catch (error) {
      return { error: error.response?.data?.detail || 'Unable to reset password.' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('kshetra-user');
    localStorage.removeItem('kshetra-token');
  };

  return (
    <AuthContext.Provider value={{ user, token, signup, login, logout, forgotPassword, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);