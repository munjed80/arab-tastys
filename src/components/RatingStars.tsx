import { Star } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  className?: string;
}

export function RatingStars({
  rating,
  maxRating = 5,
  size = 20,
  interactive = false,
  onRatingChange,
  className,
}: RatingStarsProps) {
  const handleClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: maxRating }, (_, i) => {
        const isFilled = i < Math.floor(rating);
        const isHalf = i < rating && i >= Math.floor(rating);

        return (
          <button
            key={i}
            type="button"
            onClick={() => handleClick(i)}
            disabled={!interactive}
            className={cn(
              'transition-all duration-150',
              interactive && 'hover:scale-110 cursor-pointer',
              !interactive && 'cursor-default'
            )}
          >
            <Star
              size={size}
              weight={isFilled ? 'fill' : isHalf ? 'duotone' : 'regular'}
              className={cn(
                'transition-colors',
                isFilled && 'text-yellow-500',
                isHalf && 'text-yellow-400',
                !isFilled && !isHalf && 'text-muted-foreground/30'
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
