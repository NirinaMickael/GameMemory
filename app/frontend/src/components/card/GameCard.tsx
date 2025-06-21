import { iconMap } from '@/features/setting/data/constant';
import type { CardType } from '@/features/setting/type';
import { cn } from '@/lib/utils';

type GameCardProps = {
  card: CardType;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
};

export function GameCard({
  card,
  isFlipped,
  isMatched,
  onClick,
}: GameCardProps) {
  const IconComponent = iconMap[card.value as keyof typeof iconMap];

  return (
    <div className="game-card-container">
      <button
        onClick={onClick}
        disabled={isMatched || isFlipped}
        className={cn(
          'game-card-button',
          'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1',
          'hover:scale-105 active:scale-95',
          'touch-manipulation',
          isMatched && 'cursor-default opacity-75',
          (isMatched || isFlipped) && 'cursor-default',
        )}
        aria-label={`Card ${card.value}`}
      >
        {/* Card Inner Container */}
        <div
          className={cn(
            'game-card-inner',
            (isFlipped || isMatched) && 'flipped',
          )}
        >
          {/* Card Back - Affiché par défaut */}
          <div className="game-card-face game-card-back">
            <div className="game-card-back-pattern">
              <div className="game-card-back-content">
                <div className="text-gray-800 dark:text-gray-200 text-4xl font-bold">
                  ?
                </div>
                <div className="game-card-back-shine"></div>
              </div>
            </div>
          </div>

          {/* Card Front - Affiché quand retourné */}
          <div
            className={cn(
              'game-card-face game-card-front',
              isMatched
                ? 'game-card-matched'
                : isFlipped
                  ? 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 border-gray-200 dark:border-gray-600'
                  : 'hidden',
            )}
          >
            <div className="game-card-front-content">
              {card.type === 'number' ? (
                <span
                  className={cn(
                    'text-2xl sm:text-3xl lg:text-4xl xl:text-5xl  font-bold transition-colors duration-300',
                    isMatched
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-800 dark:text-gray-200',
                  )}
                >
                  {card.value}
                </span>
              ) : (
                IconComponent && (
                  <IconComponent
                    className={cn(
                      'h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 xl:h-10 xl:w-10  transition-colors duration-300',
                      isMatched
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-800 dark:text-gray-200',
                    )}
                  />
                )
              )}
            </div>

            {/* Matched Effect Overlay */}
            {isMatched && (
              <div className="game-card-matched-overlay">
                <div className="game-card-matched-sparkle"></div>
              </div>
            )}
          </div>
        </div>

        {/* Hover Effect */}
        <div className="game-card-hover-effect"></div>
      </button>
    </div>
  );
}
