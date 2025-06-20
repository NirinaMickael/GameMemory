export type GameConfig = {
  level: number;
  theme: string;
};

export type GameState = {
  score: number;
  moves: number;
};

export type SavedGameState = {
  state: GameState;
  config: GameConfig;
  savedAt: number;
};
