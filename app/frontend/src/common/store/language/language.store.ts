import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { I18nStore } from './language.state';

export const useI18nStore = create<I18nStore>()(
  persist(
    (set) => ({
      language: 'fr',
      setLanguage: (language) =>
        set({
          language,
        }),
    }),
    {
      name: 'memory-game-i18n',
    },
  ),
);
