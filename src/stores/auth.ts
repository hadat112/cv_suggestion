import { toQueryParams } from '@/configs/Auth/utils/functions';
import axios from 'axios';
import { create } from 'zustand';

interface IAuth {
  userInfo: any;
  setUserInfo: any;
  isAuthenticated: boolean;
  authenticate: (isAuthenticated) => void;
  handleLogout: () => void;
  handleGetSession: (pathname) => void;
}

export const useAuthStore = create<IAuth>((set) => ({
  userInfo: {},
  setUserInfo: (userInfo) => set({ userInfo }),
  isAuthenticated: false,
  authenticate: (isAuthenticated) => set({ isAuthenticated }),
  handleGetSession: async (pathname) => {
    try {
      const res = await axios(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/session`);

      const { access_token } = res.data.data;

      localStorage.setItem('token', access_token);
      set((state) => ({ ...state, isAuthenticated: true }));
    } catch (_error) {
      localStorage.removeItem('access_token');
      const params = toQueryParams({ current: pathname });
      window.location.href = `/api/auth/login${params}`;
    }
  },
  handleLogout: () => {
    if (typeof window === 'undefined') return;
    set((state) => ({ ...state, isAuthenticated: false }));
    window.location.href = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/logout`;
    localStorage.removeItem('access_token');
  },
}));
