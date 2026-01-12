import { useState } from 'react';
import { ThumbsUp, Trash } from '@phosphor-icons/react';
import type { Review } from '@/lib/types';
import { RatingStars } from '@/components/RatingStars';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ReviewCardProps {
  review: Review;
  currentUserId?: string;
  onLike: (reviewId: string) => void;
  onDelete?: (reviewId: string) => void;
}

export function ReviewCard({ review, currentUserId, onLike, onDelete }: ReviewCardProps) {
  const [isLiked, setIsLiked] = useState(
    currentUserId ? review.likedBy.includes(currentUserId) : false
  );

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'اليوم';
    if (diffInDays === 1) return 'أمس';
    if (diffInDays < 7) return `منذ ${diffInDays} أيام`;
    if (diffInDays < 30) return `منذ ${Math.floor(diffInDays / 7)} أسابيع`;
    if (diffInDays < 365) return `منذ ${Math.floor(diffInDays / 30)} أشهر`;
    return `منذ ${Math.floor(diffInDays / 365)} سنة`;
  };

  const handleLike = () => {
    if (!currentUserId) return;
    setIsLiked(!isLiked);
    onLike(review.id);
  };

  const isOwner = currentUserId === review.userId;

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage src={review.userAvatar} alt={review.userName} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {review.userName.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h4 className="font-semibold text-foreground">{review.userName}</h4>
              <div className="flex items-center gap-2 mt-1">
                <RatingStars rating={review.rating} size={16} />
                <span className="text-xs text-muted-foreground">{formatDate(review.createdAt)}</span>
              </div>
            </div>

            {isOwner && onDelete && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(review.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
              >
                <Trash size={16} weight="duotone" />
              </Button>
            )}
          </div>

          <p className="text-foreground leading-relaxed mb-3">{review.comment}</p>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              disabled={!currentUserId}
              className={cn(
                'gap-2 h-8 px-3',
                isLiked && 'text-primary'
              )}
            >
              <ThumbsUp
                size={16}
                weight={isLiked ? 'fill' : 'regular'}
                className="transition-transform hover:scale-110"
              />
              <span className="text-xs">{review.likes}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
