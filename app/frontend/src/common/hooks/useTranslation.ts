import { useEffect } from 'react';
import { useI18nAction, useI18nState } from '@/common/store';
import { useTranslation as useI18N } from 'react-i18next';

export const useTranslation = () => {
  const { language } = useI18nState();
  const { setLanguage } = useI18nAction();
  const { t, i18n } = useI18N();
  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  return {
    language,
    setLanguage,
    t,
  };
};
