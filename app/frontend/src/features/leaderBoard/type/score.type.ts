import type { GameMode, GameTheme, GridSize } from "@/features/setting/type"

export type Score = {
  id: number
  moves: number
  duration: number
  theme: GameTheme
  gridSize: GridSize
  mode: GameMode
  playerCount: number
  winner?: string
  createdAt: string
}