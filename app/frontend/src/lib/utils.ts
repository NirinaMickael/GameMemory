import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}




export const formatMessage = (message: string, params?: Record<string, string | number>) => {
  if (!params) return message;

  return Object.entries(params).reduce((msg, [key, value]) => {
    // replace all  occurrences  {key}
    const regex = new RegExp(`{${key}}`, 'g');
    return msg.replace(regex, String(value));
  }, message);
};
