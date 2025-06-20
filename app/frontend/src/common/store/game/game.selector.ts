import { useShallow } from 'zustand/react/shallow';
import { useGameStore } from './game.store';
import type { GameStore } from './game.state';

// Actions
const actionSelector = (state: GameStore) => ({
  setGameConfig: state.setGameConfig,
  setGameState: state.setGameState,
  saveGameState: state.saveGameState,
  clearSavedGame: state.clearSavedGame,
  resetGame: state.resetGame,
});

export function useGameActions() {
  return useGameStore(useShallow(actionSelector));
}

// State
const stateSelector = (state: GameStore) => ({
  gameConfig: state.gameConfig,
  gameState: state.gameState,
  savedGame: state.savedGame,
});

export function useGameState() {
  return useGameStore(useShallow(stateSelector));
}
