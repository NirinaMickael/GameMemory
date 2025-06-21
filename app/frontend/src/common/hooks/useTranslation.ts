import { useEffect } from 'react';
import { useI18nAction, useI18nState } from '@/common/store';
import { useTranslation as useI18N } from 'react-i18next';
import { formatMessage } from '@/lib/utils';

export const useTranslation = () => {
  const { language } = useI18nState();
  const { setLanguage } = useI18nAction();
  const { t, i18n } = useI18N();
  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language]);
  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      const unit = days === 1 ? t('timeAgo.day') : t('timeAgo.days');
      return formatMessage(t('timeAgo.daysAgo'), { count: days, unit });
    }
    if (hours > 0) {
      const unit = hours === 1 ? t('timeAgo.hour') : t('timeAgo.hours');
      return formatMessage(t('timeAgo.hoursAgo'), { count: hours, unit });
    }
    if (minutes > 0) {
      const unit = minutes === 1 ? t('timeAgo.minute') : t('timeAgo.minutes');
      return formatMessage(t('timeAgo.minutesAgo'), { count: minutes, unit });
    }
    return t('timeAgo.justNow');
  };

  return {
    language,
    setLanguage,
    formatTimeAgo,
    t,
  };
};
