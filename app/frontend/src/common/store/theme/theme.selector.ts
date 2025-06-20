import { useShallow } from 'zustand/react/shallow';
import { useThemeStore } from './theme.store';
import type { ThemeStore } from './theme.state';

const acitonSelector = (state: ThemeStore) => ({
  setTheme: state.setTheme,
  initializeTheme: state.initializeTheme,
});

export function useThemeAction() {
  return useThemeStore(useShallow(acitonSelector));
}
const stateSelector = (state: ThemeStore) => ({
  theme: state.theme,
});

export function useThemeState() {
  return useThemeStore(useShallow(stateSelector));
}
