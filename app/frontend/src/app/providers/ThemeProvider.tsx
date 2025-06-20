import { useThemeAction } from '@/common/store';
import { useEffect, type PropsWithChildren } from 'react';
export function ThemeProvider({ children }: PropsWithChildren) {
  const { initializeTheme } = useThemeAction();
  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);
  return children;
}
