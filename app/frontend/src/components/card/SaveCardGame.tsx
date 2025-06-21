import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Trash2, Clock, Users, User, MousePointer } from 'lucide-react';
import type { SavedGameState } from '@/features/setting/type';
import { useTranslation } from '@/common/hooks';

type SavedGameCardProps = {
  savedGame: SavedGameState;
  onResume: () => void;
  onDiscard: () => void;
};

export function SavedGameCard({
  savedGame,
  onResume,
  onDiscard,
}: SavedGameCardProps) {
  const { t, formatTimeAgo } = useTranslation();
  const progress =
    (savedGame.matchedCards.length / savedGame.cards.length) * 100;
  const currentPlayerName =
    savedGame.players[savedGame.currentPlayer]?.name || t('game.players');

  return (
    <Card className="backdrop-blur-sm bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-700 shadow-xl">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <span className="text-amber-800 dark:text-amber-200">
              {t('savedGame.gameInProgress')}
            </span>
          </div>
          <Badge
            variant="secondary"
            className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200"
          >
            {formatTimeAgo(savedGame.savedAt)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {savedGame.gameConfig.mode === 'solo' ? (
                <>
                  <User className="h-3 w-3 mr-1" />
                  {t('game.solo')}
                </>
              ) : (
                <>
                  <Users className="h-3 w-3 mr-1" />
                  {savedGame.gameConfig.playerCount} {t('game.players')}
                </>
              )}
            </Badge>
          </div>
          <div className="flex items-center space-x-1">
            <MousePointer className="h-3 w-3 text-gray-500" />
            <span className="text-gray-600 dark:text-gray-400">
              {savedGame.moves} {t('game.moves').toLowerCase()}
            </span>
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            {savedGame.gameConfig.theme === 'numbers'
              ? `🔢 ${t('game.numbers')}`
              : `🎨 ${t('game.icons')}`}
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            {savedGame.gameConfig.gridSize}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {t('savedGame.progress')}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {savedGame.matchedCards.length / 2} / {savedGame.cards.length / 2}{' '}
              {t('game.pairs')}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {savedGame.gameConfig.mode === 'multiplayer' && (
          <>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                {t('game.currentTurn')} :
              </span>
              <div className="flex items-center space-x-1">
                <div
                  className={`w-3 h-3 rounded-full ${savedGame.players[savedGame.currentPlayer]?.color}`}
                />
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {currentPlayerName}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {savedGame.players.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-2 bg-white/50 dark:bg-gray-800/50 rounded"
                >
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${player.color}`} />
                    <span className="truncate">{player.name}</span>
                  </div>
                  <span className="font-medium">{player.score}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="flex space-x-3 pt-2">
          <Button
            onClick={onResume}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            <Play className="mr-2 h-4 w-4" />
            {t('savedGame.resume')}
          </Button>
          <Button
            onClick={onDiscard}
            variant="outline"
            className="px-4 border-red-200 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
