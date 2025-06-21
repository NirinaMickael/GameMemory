import { useRouter } from '@/common/hooks';
import { useGameActions, useGameState } from '@/common/store';
import { useEffect, useState } from 'react';
import type { CardType, GameState, Player } from '../type';
import { generateCards, shuffleArray } from '@/lib/utils';

export function useGameLogic(isResuming: boolean) {
  const router = useRouter();
  const { setGameState, saveGameState, clearSavedGame } = useGameActions();
  const { gameConfig, savedGame } = useGameState();

  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [gameStatus, setGameStatus] = useState<GameState>('playing');
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [players, setPlayers] = useState<Player[]>([]);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  useEffect(() => {
    if (!gameConfig) {
      router.push('/');
      return;
    }

    if (isResuming && savedGame) {
      resumeSavedGame();
    } else {
      initializeGame();
    }
  }, [gameConfig, isResuming, savedGame]);

  useEffect(() => {
    if (!autoSaveEnabled || gameStatus !== 'playing' || !gameConfig) return;

    const interval = setInterval(() => {
      if (moves > 0 && matchedCards.length < cards.length) {
        saveCurrentGameState();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [
    autoSaveEnabled,
    gameStatus,
    moves,
    matchedCards.length,
    cards.length,
    gameConfig,
  ]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (
        gameStatus === 'playing' &&
        moves > 0 &&
        matchedCards.length < cards.length
      ) {
        saveCurrentGameState();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [gameStatus, moves, matchedCards.length, cards.length]);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      const duration = Math.floor((Date.now() - startTime) / 1000);
      let winner: Player | undefined = undefined;

      if (gameConfig?.mode === 'multiplayer') {
        winner = players.reduce((prev, curr) =>
          prev.score > curr.score ? prev : curr,
        );
      }

      setGameStatus('completed');
      setGameState({
        moves,
        duration,
        completed: true,
        currentPlayer,
        players,
        winner,
      });

      clearSavedGame();
      saveScore(moves, duration, winner);

      setTimeout(() => router.push('/results'), 2000);
    }
  }, [matchedCards, cards.length]);

  const initializeGame = () => {
    if (!gameConfig) return;

    const newCards = generateCards(gameConfig.theme, gameConfig.gridSize);
    setCards(shuffleArray(newCards));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setStartTime(Date.now());
    setGameStatus('playing');
    setCurrentPlayer(0);
    setPlayers(gameConfig.players.map((p) => ({ ...p, score: 0 })));

    clearSavedGame();
  };

  const resumeSavedGame = () => {
    if (!savedGame || !gameConfig) return;

    setCards(savedGame.cards);
    setFlippedCards(savedGame.flippedCards);
    setMatchedCards(savedGame.matchedCards);
    setMoves(savedGame.moves);
    setStartTime(savedGame.startTime);
    setCurrentPlayer(savedGame.currentPlayer);
    setPlayers(savedGame.players);
    setGameStatus('playing');
  };

  const saveCurrentGameState = () => {
    if (!gameConfig) return;

    saveGameState({
      gameConfig,
      cards,
      flippedCards,
      matchedCards,
      moves,
      startTime,
      currentPlayer,
      players,
      //   savedAt: Date.now(),
    });
  };

  const handleManualSave = () => {
    saveCurrentGameState();
    setAutoSaveEnabled(false);
    setTimeout(() => setAutoSaveEnabled(true), 2000);
  };

  const handleCardClick = (cardId: number) => {
    if (
      flippedCards.length >= 2 ||
      flippedCards.includes(cardId) ||
      matchedCards.includes(cardId) ||
      gameStatus !== 'playing'
    ) {
      return;
    }

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [c1, c2] = newFlipped.map((id) => cards.find((c) => c.id === id));

      if (c1 && c2 && c1.value === c2.value) {
        setTimeout(() => {
          setMatchedCards((prev) => [...prev, ...newFlipped]);
          setFlippedCards([]);

          if (gameConfig && gameConfig.mode === 'multiplayer') {
            setPlayers((prev) =>
              prev.map((p, idx) =>
                idx === currentPlayer ? { ...p, score: p.score + 1 } : p,
              ),
            );
          }
        }, 1000);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          if (gameConfig && gameConfig.mode === 'multiplayer') {
            setCurrentPlayer((p) => (p + 1) % gameConfig.playerCount);
          }
        }, 1500);
      }
    }
  };

  // const saveScore = async (
  //   finalMoves: number,
  //   duration: number,
  //   winner?: Player,
  // ) => {
  //   try {
  //     await fetch('/api/scores', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         moves: finalMoves,
  //         duration,
  //         theme: gameConfig?.theme,
  //         gridSize: gameConfig?.gridSize,
  //         mode: gameConfig?.mode,
  //         playerCount: gameConfig?.playerCount,
  //         winner: winner?.name,
  //       }),
  //     });
  //   } catch (err) {
  //     console.error('Failed to save score', err);
  //   }
  // };

  return {
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
    saveCurrentGameState,
  };
}
