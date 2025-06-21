import z from 'zod';
export const gameSettingSchema = z.object({
  theme: z.enum(['numbers', 'icons']),
  gridSize: z.enum(['4x4']),
  playerCount: z.enum(['1', '2', '3', '4']),
  playerNames: z.array(z.string().min(1, 'Nom requis')).min(1),
});

export type gameSettingValues = z.infer<typeof gameSettingSchema>;
