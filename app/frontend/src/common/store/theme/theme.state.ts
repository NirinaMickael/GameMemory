export type ThemeType = 'dark' | 'light' | 'system';
export type ThemeState = {
  theme: ThemeType;
};

export type ThemeAction = {
  setTheme: (theme: ThemeType) => void;
  initializeTheme: () => void;
};

export type ThemeStore = ThemeState & ThemeAction;
