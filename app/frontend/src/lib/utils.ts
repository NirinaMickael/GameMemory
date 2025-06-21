import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatMessage = (
  message: string,
  params?: Record<string, string | number>,
) => {
  if (!params) return message;

  return Object.entries(params).reduce((msg, [key, value]) => {
    // replace all  occurrences  {key}
    const regex = new RegExp(`{${key}}`, 'g');
    return msg.replace(regex, String(value));
  }, message);
};

// game utils
import type { CardType, GameTheme } from '@/features/setting/type';

export function generateCards(theme: GameTheme, grid_size: string): CardType[] {
  const totalCards = 16; // 4x4 grid
  const pairs = totalCards / 2;
  const cards: CardType[] = [];

  for (let i = 1; i <= pairs; i++) {
    // Create two identical cards for each value
    cards.push(
      {
        id: cards.length,
        value: i,
        type: theme === 'numbers' ? 'number' : 'icon',
      },
      {
        id: cards.length + 1,
        value: i,
        type: theme === 'numbers' ? 'number' : 'icon',
      },
    );
  }

  return cards;
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function calculateScore(moves: number, duration: number): number {
  // Lower moves and faster time = higher score
  const baseScore = 1000;
  const movePenalty = moves * 10;
  const timePenalty = Math.floor(duration / 10);
  return Math.max(0, baseScore - movePenalty - timePenalty);
}
