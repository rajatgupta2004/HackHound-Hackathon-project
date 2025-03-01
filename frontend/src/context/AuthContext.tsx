import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from './types';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string, role: 'doctor' | 'patient') => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'doctor' | 'patient', additionalInfo?: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. prakash joshi',
    email: 'doctor@example.com',
    role: 'doctor',
    specialty: 'Cardiology'
  },
  {
    id: '2',
    name: 'Rajat',
    email: 'patient@example.com',
    role: 'patient',
    medicalHistory: 'Hypertension, Diabetes'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'doctor' | 'patient') => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = mockUsers.find(u => u.email === email && u.role === role);
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, role: 'doctor' | 'patient', additionalInfo?: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: `${mockUsers.length + 1}`,
        name,
        email,
        role,
        ...(role === 'doctor' ? { specialty: additionalInfo?.specialty } : {}),
        ...(role === 'patient' ? { medicalHistory: additionalInfo?.medicalHistory } : {})
      };
      
      // In a real app, you would save this to a database
      mockUsers.push(newUser);
      
      setCurrentUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};