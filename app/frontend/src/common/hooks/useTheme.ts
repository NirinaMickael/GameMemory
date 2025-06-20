import { useThemeAction, useThemeState } from '@/common/store';

export const useTheme = () => {
  const { theme } = useThemeState();
  const { initializeTheme, setTheme } = useThemeAction();
  return {
    theme,
    setTheme,
    initializeTheme,
  };
};
