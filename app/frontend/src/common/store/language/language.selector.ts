import { useShallow } from 'zustand/react/shallow';
import { useI18nStore } from './language.store';
import type { I18nStore } from './language.state';

const acitonSelector = (state: I18nStore) => ({
  setLanguage: state.setLanguage,
});

export function useI18nAction() {
  return useI18nStore(useShallow(acitonSelector));
}
const stateSelector = (state: I18nStore) => ({
  language: state.language,
});

export function useI18nState() {
  return useI18nStore(useShallow(stateSelector));
}
