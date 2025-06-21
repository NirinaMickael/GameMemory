import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Trophy,
  Clock,
  MousePointer,
  RotateCcw,
  Home,
  Star,
  Crown,
  Users,
} from 'lucide-react';
import { WrapperLayout } from '@/components/layout/WrapperLayout';
import { useRouter } from '@/common/hooks';
import { useGameState } from '@/common/store';

type ScoreStats = {
  averageMoves: number;
  totalGames: number;
  bestScore: number;
};

export function ResultPage() {
  const router = useRouter();
  const { gameState, gameConfig } = useGameState();
  const [stats, setStats] = useState<ScoreStats | null>(null);
  useEffect(() => {
    if (!gameState.completed) {
      router.push('/');
      return;
    }
  }, []);

  const getPerformanceRating = (moves: number) => {
    if (moves <= 12)
      return { rating: 'Excellent', stars: 5, color: 'text-yellow-500' };
    if (moves <= 16)
      return { rating: 'Très bien', stars: 4, color: 'text-blue-500' };
    if (moves <= 20)
      return { rating: 'Bien', stars: 3, color: 'text-green-500' };
    if (moves <= 25)
      return { rating: 'Correct', stars: 2, color: 'text-orange-500' };
    return { rating: 'À améliorer', stars: 1, color: 'text-red-500' };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayAgain = () => {
    router.push('/game');
  };

  const handleNewGame = () => {
    router.push('/');
  };

  if (!gameState.completed) {
    return null;
  }

  const performance = getPerformanceRating(gameState.moves);
  const isMultiplayer = gameConfig?.mode === 'multiplayer';
  const winner = gameState.winner;
  const players = gameState.players || [];

  return (
    <WrapperLayout>
      <div className="w-full max-w-4xl space-y-6 mx-auto">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <Trophy className="h-16 w-16 text-yellow-500" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Partie terminée !
          </h1>
          {isMultiplayer && winner && (
            <div className="flex items-center justify-center space-x-2">
              <Crown className="h-6 w-6 text-yellow-500" />
              <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Victoire de {winner.name} !
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Results Card */}
          <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {isMultiplayer ? 'Résultats de la partie' : 'Vos résultats'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isMultiplayer && (
                <>
                  {/* Performance Rating */}
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center space-x-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-6 w-6 ${
                            i < performance.stars
                              ? `${performance.color} fill-current`
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <p className={`text-xl font-semibold ${performance.color}`}>
                      {performance.rating}
                    </p>
                  </div>
                </>
              )}

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                  <MousePointer className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                    {gameState.moves}
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Coups total
                  </p>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                  <Clock className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                    {formatTime(gameState.duration)}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Temps
                  </p>
                </div>
              </div>

              {/* Global Stats */}
              {stats && (
                <div className="border-t pt-4 space-y-3">
                  <h3 className="font-semibold text-center">
                    Statistiques globales
                  </h3>
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                      <p className="font-bold text-lg">{stats.totalGames}</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Parties
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-lg">
                        {Math.round(stats.averageMoves)}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Coups moy.
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-lg">{stats.bestScore}</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Meilleur
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Player Results (Multiplayer) */}
          {isMultiplayer && players.length > 0 && (
            <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Classement des joueurs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {players
                    .sort((a, b) => b.score - a.score)
                    .map((player, index) => (
                      <div
                        key={player.id}
                        className={`flex items-center justify-between p-4 rounded-lg ${
                          index === 0
                            ? 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 dark:border-yellow-700'
                            : 'bg-gray-50 dark:bg-gray-700/50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {index === 0 ? (
                            <Crown className="h-6 w-6 text-yellow-500" />
                          ) : (
                            <span className="text-lg font-bold text-gray-500 w-6 text-center">
                              #{index + 1}
                            </span>
                          )}
                          <div
                            className={`w-4 h-4 rounded-full ${player.color}`}
                          />
                          <span className="font-semibold">{player.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">{player.score}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {player.score === 1 ? 'paire' : 'paires'}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            onClick={handlePlayAgain}
            className="h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Rejouer
          </Button>
          <Button
            onClick={handleNewGame}
            variant="outline"
            className="h-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
          >
            <Home className="mr-2 h-4 w-4" />
            Nouvelle partie
          </Button>
        </div>
      </div>
    </WrapperLayout>
  );
}
