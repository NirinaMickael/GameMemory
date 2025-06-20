import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeStore, ThemeType } from './theme.state';

// Helper function to apply theme to DOM
const applyThemeToDOM = (theme: ThemeType) => {
  const root = window.document.documentElement;
  root.classList.remove('light', 'dark');

  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
    root.classList.add(systemTheme);
    return;
  }

  root.classList.add(theme);
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'system',
      setTheme: (theme: ThemeType) => {
        set({ theme });
        applyThemeToDOM(theme);
      },
      initializeTheme: () => {
        const currentTheme = get().theme;
        applyThemeToDOM(currentTheme);
      },
    }),
    {
      name: 'vite-ui-theme', // localStorage key
      onRehydrateStorage: () => (state) => {
        // Apply theme to DOM after rehydration
        if (state) {
          applyThemeToDOM(state.theme);
        }
      },
    },
  ),
);
