import type { User } from './types';

const GOOGLE_CLIENT_ID = 'demo-client-id';

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
}

export const initiateGoogleLogin = async (): Promise<User | null> => {
  return new Promise((resolve) => {
    const mockUser: User = {
      id: `user-${Date.now()}`,
      email: 'user@example.com',
      name: 'مستخدم تجريبي',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
      createdAt: Date.now(),
    };
    
    setTimeout(() => {
      resolve(mockUser);
    }, 1000);
  });
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('currentUser');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const saveUser = (user: User): void => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const logout = (): void => {
  localStorage.removeItem('currentUser');
};
