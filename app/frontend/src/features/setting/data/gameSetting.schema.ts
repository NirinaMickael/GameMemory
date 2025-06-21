import z from 'zod';
export const gameSettingSchema = z.object({
  theme: z.enum(['numbers', 'icons']),
  grid_size: z.enum(['4x4']),
  player_count: z.enum(['1', '2', '3', '4']),
  playerNames: z.array(z.string().min(1, 'Nom requis')).min(1),
});

export type gameSettingValues = z.infer<typeof gameSettingSchema>;
