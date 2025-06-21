import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, Medal, Award, Users, User } from 'lucide-react';
import type { Score } from '@/features/leaderBoard/type/score.type';
import { useRouter } from '@/common/hooks';
import { WrapperLayout } from '@/components/layout/WrapperLayout';
import { getAllScores } from '@/features/leaderBoard/services/api/score.api';

export function LeaderBoardPage() {
  const router = useRouter();
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      const response = await getAllScores();
      setScores(response.data);
    } catch (error) {
      console.error('Failed to fetch scores:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 1:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 2:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return (
          <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
        );
    }
  };

  return (
    <WrapperLayout>
      <div className="max-w-4xl mx-auto space-y-6 ">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => router.push('/')}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Classement
          </h1>
          <div className="w-20" /> {/* Spacer */}
        </div>

        {/* Leaderboard */}
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center space-x-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              <span>Top 10 des meilleurs scores</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Chargement...
                </p>
              </div>
            ) : scores.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">
                  Aucun score enregistré pour le moment.
                </p>
                <Button
                  onClick={() => router.push('/')}
                  className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600"
                >
                  Jouer maintenant
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {scores.map((score, index) => (
                  <div
                    key={score.id}
                    className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                      index < 3
                        ? 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 dark:border-yellow-700'
                        : 'bg-gray-50 dark:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      {getRankIcon(index)}
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-semibold">{score.moves} coups</p>
                          <Badge
                            variant={
                              score.mode === 'solo' ? 'secondary' : 'default'
                            }
                            className="text-xs"
                          >
                            {score.mode === 'solo' ? (
                              <>
                                <User className="h-3 w-3 mr-1" />
                                Solo
                              </>
                            ) : (
                              <>
                                <Users className="h-3 w-3 mr-1" />
                                {score.player_count}J
                              </>
                            )}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {formatTime(score.duration)} • {score.theme} •{' '}
                          {score.grid_size}
                          {score.winner && ` • Gagnant: ${score.winner}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(score.created_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </WrapperLayout>
  );
}
