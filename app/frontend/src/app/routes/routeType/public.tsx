import type { RouteObject } from 'react-router-dom';
import { NotFound } from '../../pages/not-found';
import { HomePage } from '@/app/pages/home';
import { LeaderBoardPage } from '@/app/pages/leaderboard';
import { ResultPage } from '@/app/pages/results';
import { StatPage } from '@/app/pages/stats';
import { GamePage } from '@/app/pages/game';
export const publicRoutes: RouteObject[] = [
  {
    path: '',
    index: true,
    element: <HomePage />,
  },
  {
    path: 'game',
    element: <GamePage />,
  },
  {
    path: 'leaderboard',
    element: <LeaderBoardPage />,
  },
  {
    path: 'stats',
    element: <StatPage />,
  },
  {
    path: 'results',
    element: <ResultPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
