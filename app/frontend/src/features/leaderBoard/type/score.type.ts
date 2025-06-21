import type { GameMode, GameTheme, GridSize } from "@/features/setting/type"

export type Score = {
  id: number
  moves: number
  duration: number
  theme: GameTheme
  grid_size: GridSize
  mode: GameMode
  player_count: number
  winner?: string
  created_at: string
}