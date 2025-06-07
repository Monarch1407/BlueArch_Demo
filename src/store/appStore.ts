import { create } from 'zustand';
import { Institution, DashboardStats } from '../types';

interface AppState {
  currentInstitution: Institution | null;
  dashboardStats: DashboardStats | null;
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  setInstitution: (institution: Institution) => void;
  setDashboardStats: (stats: DashboardStats) => void;
  toggleSidebar: () => void;
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentInstitution: null,
  dashboardStats: null,
  sidebarOpen: true,
  theme: 'light',
  setInstitution: (currentInstitution) => set({ currentInstitution }),
  setDashboardStats: (dashboardStats) => set({ dashboardStats }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));