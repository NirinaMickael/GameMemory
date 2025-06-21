import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Gamepad2, Settings } from 'lucide-react';
import { useGameActions, useGameState } from '@/common/store';
import { ControlledInput, ControlledSelect } from '@/components/form';
import { useRouter, useTranslation } from '@/common/hooks';
import { formatMessage } from '@/lib/utils';
import { SavedGameCard } from '@/components/card';
import type { Player } from '@/features/setting/type';
import {
  gameSettingSchema,
  type gameSettingValues,
} from '@/features/setting/data/gameSetting.schema';
import { PLAYER_COLORS } from '@/features/setting/data/constant';

export function HomePage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { savedGame } = useGameState();
  const { setGameConfig, clearSavedGame } = useGameActions();

  const form = useForm<gameSettingValues>({
    resolver: zodResolver(gameSettingSchema),
    mode: 'onChange',
    defaultValues: {
      theme: 'numbers',
      gridSize: '4x4',
      playerCount: '1',
      playerNames: [formatMessage('Joueur {number}', { number: 1 })],
    },
  });

  const playerCount = Number(form.watch('playerCount'));

  useEffect(() => {
    const names = form.getValues('playerNames');
    const newNames = Array.from({ length: playerCount }, (_, i) => {
      return names[i] || formatMessage('Joueur {number}', { number: i + 1 });
    });
    form.setValue('playerNames', newNames);
  }, [playerCount]);

  useEffect(() => {
    if (savedGame) {
      const hoursSinceLastSave =
        (Date.now() - savedGame.savedAt) / (1000 * 60 * 60);
      if (hoursSinceLastSave >= 24) {
        clearSavedGame();
      }
    }
  }, [savedGame, clearSavedGame]);

  const onSubmit = (data: gameSettingValues) => {
    const players: Player[] = data.playerNames
      .slice(0, playerCount)
      .map((name, index) => ({
        id: index,
        name,
        score: 0,
        color: PLAYER_COLORS[index],
      }));

    setGameConfig({
      theme: data.theme,
      gridSize: data.gridSize,
      mode: playerCount === 1 ? 'solo' : 'multiplayer',
      playerCount,
      players,
    });
    router.push('/game');
  };

  const handleResumeSavedGame = () => {
    if (savedGame) {
      setGameConfig(savedGame.gameConfig);
    }
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {t('game.gameTitle')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('game.gameSubtitle')}
          </p>
        </div>

        {savedGame && (
          <SavedGameCard
            savedGame={savedGame}
            onResume={handleResumeSavedGame}
            onDiscard={clearSavedGame}
          />
        )}

        <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>{t('game.gameConfiguration')}</span>
            </CardTitle>
            <CardDescription>{t('game.gameConfigurationDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    {t('game.cardTheme')}
                  </Label>
                  <RadioGroup
                    value={form.watch('theme')}
                    onValueChange={(val) =>
                      form.setValue('theme', val as gameSettingValues['theme'])
                    }
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="numbers" id="numbers" />
                      <Label
                        htmlFor="numbers"
                        className="cursor-pointer flex items-center space-x-2"
                      >
                        <span className="text-2xl">🔢</span>
                        <span>{t('game.numbers')}</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="icons" id="icons" />
                      <Label
                        htmlFor="icons"
                        className="cursor-pointer flex items-center space-x-2"
                      >
                        <span className="text-2xl">🎨</span>
                        <span>{t('game.icons')}</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <ControlledSelect
                  name="gridSize"
                  control={form.control}
                  label={t('game.gridSize')}
                  options={[{ value: '4x4', label: '4×4 (16 cartes)' }]}
                />

                <ControlledSelect
                  name="playerCount"
                  control={form.control}
                  label={t('game.playerCount')}
                  options={[
                    { value: '1', label: `1 ${t('game.solo').toLowerCase()}` },
                    { value: '2', label: `2 ${t('game.players')}` },
                    { value: '3', label: `3 ${t('game.players')}` },
                    { value: '4', label: `4 ${t('game.players')}` },
                  ]}
                />

                {playerCount > 1 && (
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">
                      {t('game.playerNames')}
                    </Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {Array.from({ length: playerCount }, (_, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div
                            className={`w-4 h-4 rounded-full ${PLAYER_COLORS[i]}`}
                          />
                          <ControlledInput
                            name={`playerNames.${i}`}
                            control={form.control}
                            placeholder={formatMessage('Joueur {number}', {
                              number: i + 1,
                            })}
                            className="flex-1"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
                >
                  <Gamepad2 className="mr-2 h-5 w-5" />
                  {t('game.startGame')}
                </Button>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
