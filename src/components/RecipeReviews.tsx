import { useState, useEffect, useMemo } from 'react';
import { ChatCircleDots, SortAscending } from '@phosphor-icons/react';
import { useKV } from '@github/spark/hooks';
import type { Review, RecipeRating } from '@/lib/types';
import { RatingStars } from '@/components/RatingStars';
import { ReviewCard } from '@/components/ReviewCard';
import { ReviewForm } from '@/components/ReviewForm';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface RecipeReviewsProps {
  recipeId: string;
  recipeName: string;
  currentUserId?: string;
  currentUserName?: string;
  currentUserAvatar?: string;
  onLoginRequired: () => void;
}

type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest' | 'most-liked';

export function RecipeReviews({
  recipeId,
  recipeName,
  currentUserId,
  currentUserName,
  currentUserAvatar,
  onLoginRequired,
}: RecipeReviewsProps) {
  const [reviews, setReviews] = useKV<Review[]>('recipe-reviews', []);
  const [ratings, setRatings] = useKV<Record<string, RecipeRating>>('recipe-ratings', {});
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const recipeReviews = useMemo(() => {
    if (!reviews) return [];
    const filtered = reviews.filter((r) => r.recipeId === recipeId);
    
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.createdAt - a.createdAt;
        case 'oldest':
          return a.createdAt - b.createdAt;
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        case 'most-liked':
          return b.likes - a.likes;
        default:
          return 0;
      }
    });

    return sorted;
  }, [reviews, recipeId, sortBy]);

  const recipeRating = (ratings && ratings[recipeId]) || {
    recipeId,
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  };

  const updateRatings = (newReviews: Review[]) => {
    const recipeReviewsList = newReviews.filter((r) => r.recipeId === recipeId);
    
    if (recipeReviewsList.length === 0) {
      setRatings((current) => {
        const updated = { ...current };
        delete updated[recipeId];
        return updated;
      });
      return;
    }

    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let totalRating = 0;

    recipeReviewsList.forEach((review) => {
      distribution[review.rating as keyof typeof distribution]++;
      totalRating += review.rating;
    });

    const newRating: RecipeRating = {
      recipeId,
      averageRating: totalRating / recipeReviewsList.length,
      totalReviews: recipeReviewsList.length,
      ratingDistribution: distribution,
    };

    setRatings((current) => ({
      ...current,
      [recipeId]: newRating,
    }));
  };

  const handleSubmitReview = async (rating: number, comment: string) => {
    if (!currentUserId || !currentUserName) {
      toast.error('يجب تسجيل الدخول لإضافة تقييم');
      return;
    }

    setIsSubmitting(true);

    const newReview: Review = {
      id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      recipeId,
      userId: currentUserId,
      userName: currentUserName,
      userAvatar: currentUserAvatar,
      rating,
      comment,
      createdAt: Date.now(),
      likes: 0,
      likedBy: [],
    };

    setReviews((current) => {
      const updated = [...(current || []), newReview];
      updateRatings(updated);
      return updated;
    });

    toast.success('تم إضافة تقييمك بنجاح!');
    setIsSubmitting(false);
  };

  const handleLikeReview = (reviewId: string) => {
    if (!currentUserId) {
      toast.error('يجب تسجيل الدخول للإعجاب بالتقييمات');
      return;
    }

    setReviews((current) =>
      (current || []).map((review) => {
        if (review.id === reviewId) {
          const isLiked = review.likedBy.includes(currentUserId);
          return {
            ...review,
            likes: isLiked ? review.likes - 1 : review.likes + 1,
            likedBy: isLiked
              ? review.likedBy.filter((id) => id !== currentUserId)
              : [...review.likedBy, currentUserId],
          };
        }
        return review;
      })
    );
  };

  const handleDeleteReview = (reviewId: string) => {
    setReviews((current) => {
      const updated = (current || []).filter((r) => r.id !== reviewId);
      updateRatings(updated);
      return updated;
    });
    toast.success('تم حذف التقييم');
  };

  const userHasReviewed = currentUserId
    ? recipeReviews.some((r) => r.userId === currentUserId)
    : false;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 rounded-xl p-6 border border-border">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center justify-center p-6 bg-card rounded-lg border border-border min-w-[200px]">
            <div className="text-5xl font-bold text-primary mb-2">
              {recipeRating.averageRating.toFixed(1)}
            </div>
            <RatingStars rating={recipeRating.averageRating} size={24} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              {recipeRating.totalReviews} تقييم
            </p>
          </div>

          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = recipeRating.ratingDistribution[star as keyof typeof recipeRating.ratingDistribution];
              const percentage = recipeRating.totalReviews > 0
                ? (count / recipeRating.totalReviews) * 100
                : 0;

              return (
                <div key={star} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-medium text-foreground">{star}</span>
                    <RatingStars rating={1} maxRating={1} size={14} />
                  </div>
                  <Progress value={percentage} className="flex-1 h-2" />
                  <span className="text-xs text-muted-foreground w-8 text-left">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Separator />

      {currentUserId && currentUserName && !userHasReviewed ? (
        <>
          <ReviewForm
            recipeId={recipeId}
            userName={currentUserName}
            userAvatar={currentUserAvatar}
            onSubmit={handleSubmitReview}
            isSubmitting={isSubmitting}
          />
          <Separator />
        </>
      ) : !currentUserId && (
        <div className="bg-muted/50 rounded-lg p-6 text-center">
          <p className="text-muted-foreground mb-3">سجل دخولك لإضافة تقييمك ومشاركة تجربتك</p>
          <button
            onClick={onLoginRequired}
            className="text-primary hover:underline font-semibold"
          >
            تسجيل الدخول
          </button>
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
          <ChatCircleDots size={24} weight="duotone" className="text-primary" />
          التقييمات ({recipeReviews.length})
        </h3>

        {recipeReviews.length > 0 && (
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-40">
              <SortAscending size={16} weight="duotone" className="ml-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">الأحدث</SelectItem>
              <SelectItem value="oldest">الأقدم</SelectItem>
              <SelectItem value="highest">الأعلى تقييماً</SelectItem>
              <SelectItem value="lowest">الأقل تقييماً</SelectItem>
              <SelectItem value="most-liked">الأكثر إعجاباً</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {recipeReviews.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed border-border">
          <ChatCircleDots size={48} weight="duotone" className="text-muted-foreground mx-auto mb-3" />
          <h4 className="text-lg font-semibold text-foreground mb-2">
            لا توجد تقييمات بعد
          </h4>
          <p className="text-muted-foreground">
            كن أول من يقيّم هذه الوصفة!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {recipeReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              currentUserId={currentUserId}
              onLike={handleLikeReview}
              onDelete={currentUserId === review.userId ? handleDeleteReview : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
