'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../lib/types';
import { db } from '../lib/database';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      db.seed();
      return db.getLoggedUser();
    }
    return null;
  });

  useEffect(() => {
    // Apenas garante que o seed rode se não rodou no initializer
    db.seed();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    db.setLoggedUser(userData);
  };

  const logout = () => {
    setUser(null);
    db.setLoggedUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
