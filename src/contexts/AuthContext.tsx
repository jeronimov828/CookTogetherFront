import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Usuario } from '../services/authService';

interface AuthContextType {
  user: Usuario | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: Usuario) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cargar datos del localStorage al iniciar
    const storedToken = localStorage.getItem('token');
    const storedRol = localStorage.getItem('rol');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
        logout();
      }
    } else if (storedToken && storedRol) {
      // Compatibilidad con código anterior que solo guarda rol
      setToken(storedToken);
      setUser({
        id: '',
        name: '',
        email: '',
        role: storedRol,
      });
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string, newUser: Usuario) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('token', newToken);
    localStorage.setItem('rol', newUser.role);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

