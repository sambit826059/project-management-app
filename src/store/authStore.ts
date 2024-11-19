import { create } from 'zustand';
import { db } from '../db';
import { User } from '../types';

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInAsGuest: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  signIn: async (email) => {
    const user = await db.users.where('email').equals(email).first();
    if (!user) throw new Error('User not found');
    set({ user });
  },
  signUp: async (email) => {
    const id = await db.users.add({
      email,
      isGuest: false,
    });
    const user = await db.users.get(id);
    if (!user) throw new Error('Failed to create user');
    set({ user });
  },
  signOut: async () => {
    set({ user: null });
  },
  signInAsGuest: async () => {
    const id = await db.users.add({
      email: `guest_${Date.now()}@temp.com`,
      isGuest: true,
    });
    const user = await db.users.get(id);
    if (!user) throw new Error('Failed to create guest user');
    set({ user });
  },
  setUser: (user) => set({ user, loading: false }),
}));