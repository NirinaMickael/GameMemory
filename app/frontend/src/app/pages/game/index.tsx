import { useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';

import { GameStatsCard, PlayerScoredCard } from '@/components/card';
import { useGameState } from '@/common/store';
import { useGameLogic } from '@/features/setting/hooks';
import { useTranslation } from '@/common/hooks';
import { useState } from 'react';
import { formatMessage } from '@/lib/utils';
import { GameGrid, GameHeader } from '@/features/setting/component';
import { WrapperLayout } from '@/components/layout/WrapperLayout';

export function GamePage() {
  const location = useLocation();
  const { t } = useTranslation();
  const searchParams = new URLSearchParams(location.search);
  const isResuming = searchParams.get('resume') === 'true';

  const { gameConfig } = useGameState();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const {
    cards,
    flippedCards,
    matchedCards,
    moves,
    startTime,
    gameStatus,
    currentPlayer,
    players,
    autoSaveEnabled,
    handleCardClick,
    initializeGame,
    handleManualSave,
  } = useGameLogic(isResuming);
  const handleShowMobile = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  console.log('players', players, currentPlayer);

  if (!gameConfig)
    return <p className="text-center mt-10">Configuration manquante</p>;

  return (
    <WrapperLayout>
      <GameHeader
        showMobileMenu={showMobileMenu}
        onShowMobile={handleShowMobile}
        autoSaveEnabled={autoSaveEnabled}
        gameStatus={gameStatus}
        handleManualSave={handleManualSave}
        initializeGame={initializeGame}
      />

      <div className="p-4 pt-2 lg:pt-6">
        <div className="max-w-7xl mx-auto space-y-4 lg:space-y-6">
          {isResuming && (
            <Card className="p-3 lg:p-4 text-center backdrop-blur-sm bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700">
              <p className="text-sm lg:text-base text-blue-800 dark:text-blue-200 font-medium">
                🎮 {t('gameResumed')} {t('resumedMessage')}
              </p>
            </Card>
          )}

          <GameStatsCard moves={moves} startTime={startTime} />
          <CurrentPlayerIndicator
            gameConfig={gameConfig}
            gameStatus={gameStatus}
            players={players}
            currentPlayer={currentPlayer}
          />
          <div className="grid grid-cols-2  lg:grid-cols-6  gap-4">
            {gameConfig.mode === 'multiplayer' && (
              <div className="col-span-2 order-2 lg:order-1 lg:col-span-2">
                <PlayerScoredCard
                  players={players}
                  currentPlayer={currentPlayer}
                  totalPairs={cards.length / 2}
                />
              </div>
            )}
            <div className="p-4 lg:p-6 xl:p-8 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl col-span-2  lg:col-span-4 ">
              <GameGrid
                cards={cards}
                flippedCards={flippedCards}
                matchedCards={matchedCards}
                handleCardClick={handleCardClick}
              />
            </div>
          </div>

          {gameStatus === 'completed' && (
            <Card className="p-4 lg:p-6 text-center backdrop-blur-sm bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700">
              <h2 className="text-xl lg:text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
                🎉 {t('game.gameCompleted')}
              </h2>
              {gameConfig.mode === 'solo' ? (
                <p className="text-sm lg:text-base text-green-700 dark:text-green-300">
                  {formatMessage(t('game.completedInMoves'), { moves })}
                </p>
              ) : (
                <p className="text-sm lg:text-base text-green-700 dark:text-green-300">
                  {formatMessage(t('game.winnerIs'), {
                    winner:
                      players.find(
                        (p) =>
                          p.score === Math.max(...players.map((p) => p.score)),
                      )?.name || '',
                  })}
                </p>
              )}
            </Card>
          )}
        </div>
      </div>
    </WrapperLayout>
  );
}

function CurrentPlayerIndicator({
  gameConfig,
  gameStatus,
  players,
  currentPlayer,
}: any) {
  const { t } = useTranslation();
  if (gameConfig.mode !== 'multiplayer' || gameStatus !== 'playing')
    return null;

  return (
    <div className="text-center mb-4">
      <div className="flex items-center justify-center space-x-2">
        <div
          className={`w-3 lg:w-4 h-3 lg:h-4 rounded-full ${players[currentPlayer]?.color}`}
        />
        <span className="text-sm lg:text-lg font-semibold">
          {formatMessage(t('game.currentTurn'), {
            player: players[currentPlayer]?.name || '',
          })}
        </span>
      </div>
    </div>
  );
}
