import { useState, useEffect } from 'react';
import type { User } from '@/lib/types';
import { getCurrentUser, logout as logoutUser } from '@/lib/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const updateUser = (newUser: User | null) => {
    setUser(newUser);
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return { user, isLoading, updateUser, logout };
}
