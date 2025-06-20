export type Language = 'fr' | 'en';

export type I18State = {
  language: Language;
};

export type I18Action = {
  setLanguage: (language: Language) => void;
};

export type I18nStore = I18Action & I18State;
