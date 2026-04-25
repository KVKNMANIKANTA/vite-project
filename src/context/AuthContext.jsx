import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { name: '...', role: 'customer' | 'employee' }

  const login = (role) => {
    // Simulate login
    if (role === 'customer') {
      setUser({ id: 101, name: 'Customer User', role: 'customer' });
    } else if (role === 'employee') {
      setUser({ id: 999, name: 'Admin Employee', role: 'employee' }); // Admin
    } else if (role === 'staff') {
      setUser({ id: 1, name: 'John Doe', role: 'staff' }); // Matches mock employee ID 1
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
