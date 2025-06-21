export type Player = {
  id: number;
  name: string;
  score: number;
  color: string;
};
export type GameTheme = 'numbers' | 'icons';
export type GridSize = '4x4';
export type GameMode = 'solo' | 'multiplayer';
export type CardType = {
  id: number;
  value: number;
  type: 'number' | 'icon';
};

export type GameConfig = {
  theme: GameTheme;
  gridSize: GridSize;
  mode: GameMode;
  playerCount: number;
  players: Player[];
};

export type GameState =
  | 'playing'
  | 'completed'
  | {
      moves: number;
      duration: number;
      completed: boolean;
      currentPlayer: number;
      players: Player[];
      winner?: Player;
    };

export type SavedGameState = {
  gameConfig: GameConfig;
  cards: CardType[];
  flippedCards: number[];
  matchedCards: number[];
  moves: number;
  startTime: number;
  currentPlayer: number;
  players: Player[];
  savedAt: number;
};
