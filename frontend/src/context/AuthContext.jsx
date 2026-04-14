import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ls-user');
    return saved ? JSON.parse(saved) : null;
  });

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('ls-users') || '[]');
    if (users.find(u => u.email === email)) return { error: 'Email already registered.' };
    const newUser = { name, email, password, createdAt: Date.now() };
    users.push(newUser);
    localStorage.setItem('ls-users', JSON.stringify(users));
    const { password: _, ...safe } = newUser;
    setUser(safe);
    localStorage.setItem('ls-user', JSON.stringify(safe));
    return { success: true };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('ls-users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return { error: 'Invalid email or password.' };
    const { password: _, ...safe } = found;
    setUser(safe);
    localStorage.setItem('ls-user', JSON.stringify(safe));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ls-user');
  };

  return <AuthContext.Provider value={{ user, signup, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);