import { ArrowLeft, Home, Menu, RotateCcw, Save } from 'lucide-react';
import type { GameState } from '../type';
import { Button } from '@/components/ui/button';
import { useRouter, useTranslation } from '@/common/hooks';

type GameHeaderProps = {
  showMobileMenu: boolean;
  onShowMobile: () => void;
  autoSaveEnabled: boolean;
  gameStatus: GameState;
  handleManualSave: () => void;
  initializeGame: () => void;
};

export function GameHeader({
  showMobileMenu,
  onShowMobile,
  autoSaveEnabled,
  gameStatus,
  handleManualSave,
  initializeGame,
}: GameHeaderProps) {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <>
      <div className="lg:hidden sticky top-14 z-40 bg-background/95 backdrop-blur border-b px-4 py-2">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/')}
            className="flex items-center space-x-1"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden xs:inline">{t('back')}</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onShowMobile()}>
            <Menu className="h-4 w-4" />
          </Button>
        </div>
        {showMobileMenu && (
          <div className="absolute top-full left-0 right-0 bg-background border-b shadow-lg p-4 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleManualSave}
                disabled={!autoSaveEnabled || gameStatus !== 'playing'}
                className="text-xs"
              >
                <Save className="mr-1 h-3 w-3" />
                {t('save')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={initializeGame}
                className="text-xs"
              >
                <RotateCcw className="mr-1 h-3 w-3" />
                {t('restart')}
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/')}
              className="w-full text-xs"
            >
              <Home className="mr-1 h-3 w-3" />
              {t('home')}
            </Button>
          </div>
        )}
      </div>

      <div className="hidden lg:block p-4 pb-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => router.push('/')}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('back')}
          </Button>
          <div className="flex space-x-2">
            <div className="flex items-center justify-between text-xs lg:text-sm gap-3">
              <span className="text-gray-600 dark:text-gray-400">
                {t('autoSave')}
              </span>
              <div className="flex items-center space-x-1">
                <div
                  className={`w-1.5 lg:w-2 h-1.5 lg:h-2 rounded-full ${autoSaveEnabled ? 'bg-green-500' : 'bg-gray-400'}`}
                />
                {/* <span className="text-gray-500 dark:text-gray-400">
                  {autoSaveEnabled ? t("enabled") : t("saved")}
                </span> */}
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleManualSave}
              disabled={!autoSaveEnabled || gameStatus !== 'playing'}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            >
              <Save className="mr-2 h-4 w-4" />
              {t('save')}
            </Button>
            <Button
              variant="outline"
              onClick={initializeGame}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              {t('restart')}
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/')}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            >
              <Home className="mr-2 h-4 w-4" />
              {t('home')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
