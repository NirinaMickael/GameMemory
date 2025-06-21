'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { Player } from '@/features/setting/type';
import { Users, Crown } from 'lucide-react';

type PlayerScoredCardProps = {
  players: Player[];
  currentPlayer: number;
  totalPairs: number;
};

export function PlayerScoredCard({
  players,
  currentPlayer,
  totalPairs,
}: PlayerScoredCardProps) {
  const maxScore = Math.max(...players.map((p) => p.score));
  const leadingPlayers = players.filter(
    (p) => p.score === maxScore && maxScore > 0,
  );

  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-lg w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Users className="h-5 w-5" />
          <span>Tableau des scores</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {players.map((player, index) => {
          const isCurrentPlayer = index === currentPlayer;
          const isLeading = leadingPlayers.includes(player) && maxScore > 0;
          const progressPercentage =
            totalPairs > 0 ? (player.score / totalPairs) * 100 : 0;

          return (
            <div
              key={player.id}
              className={`p-3 rounded-lg transition-all ${
                isCurrentPlayer
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-700'
                  : 'bg-gray-50 dark:bg-gray-700/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${player.color}`} />
                  <span
                    className={`font-medium ${isCurrentPlayer ? 'text-blue-800 dark:text-blue-200' : ''}`}
                  >
                    {player.name}
                  </span>
                  {isLeading && <Crown className="h-4 w-4 text-yellow-500" />}
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-lg font-bold ${isCurrentPlayer ? 'text-blue-800 dark:text-blue-200' : ''}`}
                  >
                    {player.score}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    / {totalPairs}
                  </span>
                </div>
              </div>

              <Progress value={progressPercentage} className="h-2" />

              {isCurrentPlayer && (
                <div className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-medium">
                  À votre tour !
                </div>
              )}
            </div>
          );
        })}

        {/* Game Progress */}
        <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Progression</span>
            <span>
              {players.reduce((sum, p) => sum + p.score, 0)} / {totalPairs}{' '}
              paires
            </span>
          </div>
          <Progress
            value={
              totalPairs > 0
                ? (players.reduce((sum, p) => sum + p.score, 0) / totalPairs) *
                  100
                : 0
            }
            className="h-2 mt-1"
          />
        </div>
      </CardContent>
    </Card>
  );
}
