'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Clock, MousePointer } from 'lucide-react';
import { useTranslation } from '@/common/hooks';

type GameStatsCardProps = {
  moves: number;
  startTime: number;
};

export function GameStatsCard({ moves, startTime }: GameStatsCardProps) {
  const { t } = useTranslation();
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-3 lg:p-4 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg  !w-fit mx-auto">
      <div className="flex items-center justify-center space-x-6 xl:space-x-8">
        <div className="flex items-center space-x-2">
          <MousePointer className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
              {moves}
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              {t('game.moves')}
            </p>
          </div>
        </div>

        <div className="h-8 w-px bg-gray-300 dark:bg-gray-600" />

        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
          <div className="text-center">
            <p className="text-2xl font-bold text-green-800 dark:text-green-200">
              {formatTime(elapsedTime)}
            </p>
            <p className="text-sm text-green-600 dark:text-green-400">
              {t('game.time')}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
