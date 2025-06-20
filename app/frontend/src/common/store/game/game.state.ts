import type {
  GameConfig,
  GameState,
  SavedGameState,
} from '@/features/setting/type';

export type GameStoreState = {
  gameConfig: GameConfig | null;
  gameState: GameState | null;
  savedGame: SavedGameState | null;
};

export type GameStoreActions = {
  setGameConfig: (config: GameConfig) => void;
  setGameState: (state: GameState) => void;
  saveGameState: (savedState: Omit<SavedGameState, 'savedAt'>) => void;
  clearSavedGame: () => void;
  resetGame: () => void;
};

export type GameStore = GameStoreState & GameStoreActions;
