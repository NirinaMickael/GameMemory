import { Suspense } from 'react';
import { ThemeProvider } from './ThemeProvider';
export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <ThemeProvider>{children}</ThemeProvider>
    </Suspense>
  );
}
