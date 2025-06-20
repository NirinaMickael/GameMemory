import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameStore } from './game.state';

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      gameConfig: null,
      gameState: null,
      savedGame: null,
      setGameConfig: (config) => set({ gameConfig: config }),
      setGameState: (state) => set({ gameState: state }),
      saveGameState: (savedState) => {
        set({
          savedGame: {
            ...savedState,
            savedAt: Date.now(),
          },
        });
      },
      clearSavedGame: () => set({ savedGame: null }),
      resetGame: () =>
        set({
          gameConfig: null,
          gameState: null,
          savedGame: null,
        }),
    }),
    {
      name: 'memory-game-storage',
      partialize: (state) => ({
        savedGame: state.savedGame,
      }),
    },
  ),
);
