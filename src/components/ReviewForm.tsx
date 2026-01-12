import { useState } from 'react';
import { PaperPlaneRight } from '@phosphor-icons/react';
import { RatingStars } from '@/components/RatingStars';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ReviewFormProps {
  recipeId: string;
  userName: string;
  userAvatar?: string;
  onSubmit: (rating: number, comment: string) => void;
  isSubmitting?: boolean;
}

export function ReviewForm({
  recipeId,
  userName,
  userAvatar,
  onSubmit,
  isSubmitting = false,
}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0 || comment.trim() === '') {
      return;
    }

    onSubmit(rating, comment);
    setRating(0);
    setComment('');
  };

  const isValid = rating > 0 && comment.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-start gap-4">
        <Avatar className="w-12 h-12 flex-shrink-0">
          <AvatarImage src={userAvatar} alt={userName} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {userName.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              تقييمك للوصفة
            </label>
            <RatingStars
              rating={rating}
              interactive
              onRatingChange={setRating}
              size={28}
              className="gap-1"
            />
            {rating > 0 && (
              <p className="text-xs text-muted-foreground mt-2">
                {rating === 1 && 'ضعيف جداً'}
                {rating === 2 && 'ضعيف'}
                {rating === 3 && 'جيد'}
                {rating === 4 && 'جيد جداً'}
                {rating === 5 && 'ممتاز'}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-semibold text-foreground mb-2">
              تعليقك
            </label>
            <Textarea
              id="comment"
              placeholder="شاركنا رأيك في هذه الوصفة..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-24 resize-none"
              disabled={isSubmitting}
            />
            <p className="text-xs text-muted-foreground mt-2">
              {comment.length} / 500 حرف
            </p>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  جاري الإرسال...
                </>
              ) : (
                <>
                  <PaperPlaneRight size={18} weight="duotone" />
                  نشر التقييم
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
