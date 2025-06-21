import { GameCard } from '@/components/card';
import type { CardType } from '../type';

export type GameGridProps = {
  cards: CardType[];
  flippedCards: number[];
  matchedCards: number[];
  handleCardClick: (id: number) => void;
};
export function GameGrid({
  cards,
  flippedCards,
  matchedCards,
  handleCardClick,
}: GameGridProps) {
  return (
    <div className="grid grid-cols-4 gap-2 lg:gap-3 xl:gap-4 max-w-xs md:max-w-sm xl:max-w-md mx-auto">
      {cards.map((card) => (
        <GameCard
          key={card.id}
          card={card}
          isFlipped={
            flippedCards.includes(card.id) || matchedCards.includes(card.id)
          }
          isMatched={matchedCards.includes(card.id)}
          onClick={() => handleCardClick(card.id)}
        />
      ))}
    </div>
  );
}
