import { PUBLIC_ROUTER } from '@/constants/common';
import { APIResponse } from '@/interfaces';
import { create } from 'zustand';

interface IAuth {
  isAuthenticated: boolean;
  authenticate: (isAuthenticated) => void;
  handleLogout: () => void;
  handleGetSession: (pathname) => void;
}

export const useAuthStore = create<IAuth>((set) => ({
  isAuthenticated: false,
  authenticate: (isAuthenticated) => set((state) => ({ ...state, isAuthenticated })),
  handleGetSession: async (pathname) => {
    try {
      const res: APIResponse = await new Promise((resolve) => resolve({ error: 'fasd', status: 400 }));

      if (res.error && !PUBLIC_ROUTER.includes(pathname)) {
        localStorage.removeItem('access_token');
        window.location.href = '/login';
      }

      const { access_token } = res?.data || {};

      if (access_token) {
        localStorage.setItem('token', access_token);
        set((state) => ({ ...state, isAuthenticated: true }));
        if (PUBLIC_ROUTER.includes(pathname)) window.location.href = '/';
        return;
      }
    } catch (_error) {
      if (PUBLIC_ROUTER.includes(pathname)) return;
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
  },
  handleLogout: () => {
    if (typeof window === 'undefined') return;
    set((state) => ({ ...state, isAuthenticated: false }));
    // window.location.href = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/logout`;
    window.location.href = `${process.env.NEXT_PUBLIC_APP_URL}/login`;
    localStorage.removeItem('access_token');
    localStorage.removeItem('identity');
    localStorage.removeItem('remember');
  },
}));
