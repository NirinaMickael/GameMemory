import { Suspense } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { TranslationProvider } from './TranslationProvider';
export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <TranslationProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </TranslationProvider>
    </Suspense>
  );
}
