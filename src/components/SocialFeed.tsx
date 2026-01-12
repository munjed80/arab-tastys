import { useMemo } from 'react';
import { Clock, Star, Image, ChatCircleDots } from '@phosphor-icons/react';
import { useKV } from '@github/spark/hooks';
import type { Activity, Review, UserRecipePhoto, Recipe } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface SocialFeedProps {
  recipes: Recipe[];
  onRecipeClick: (recipe: Recipe) => void;
}

export function SocialFeed({ recipes, onRecipeClick }: SocialFeedProps) {
  const [reviews] = useKV<Review[]>('recipe-reviews', []);
  const [photos] = useKV<UserRecipePhoto[]>('recipe-photos', []);

  const activities = useMemo(() => {
    const acts: Activity[] = [];

    reviews?.forEach(review => {
      const recipe = recipes.find(r => r.id === review.recipeId);
      if (recipe) {
        acts.push({
          id: review.id,
          type: 'review',
          userId: review.userId,
          userName: review.userName,
          userAvatar: review.userAvatar || '',
          recipeId: review.recipeId,
          recipeName: recipe.name,
          content: review.comment,
          rating: review.rating,
          createdAt: review.createdAt,
        });
      }
    });

    photos?.forEach(photo => {
      const recipe = recipes.find(r => r.id === photo.recipeId);
      if (recipe) {
        acts.push({
          id: photo.id,
          type: 'photo',
          userId: photo.userId,
          userName: photo.userName,
          userAvatar: photo.userAvatar || '',
          recipeId: photo.recipeId,
          recipeName: recipe.name,
          content: photo.caption,
          photoUrl: photo.photoDataUrl,
          createdAt: photo.createdAt,
        });
      }
    });

    return acts.sort((a, b) => b.createdAt - a.createdAt);
  }, [reviews, photos, recipes]);

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'الآن';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `منذ ${hours} ساعة`;
    const days = Math.floor(hours / 24);
    return `منذ ${days} يوم`;
  };

  if (activities.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <ChatCircleDots size={48} weight="duotone" className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">مرحباً بك في المجتمع!</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          استكشف الوصفات، جرب أطباق جديدة، وشارك تجربتك مع المجتمع
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const recipe = recipes.find(r => r.id === activity.recipeId);
        
        return (
          <Card key={activity.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex gap-3">
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarImage src={activity.userAvatar} alt={activity.userName} />
                <AvatarFallback>{activity.userName[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="font-semibold text-sm">{activity.userName}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatTimeAgo(activity.createdAt)}
                    </p>
                  </div>
                  <Badge variant="secondary" className="flex-shrink-0">
                    {activity.type === 'review' && (
                      <>
                        <Star size={12} weight="fill" className="ml-1" />
                        تقييم
                      </>
                    )}
                    {activity.type === 'photo' && (
                      <>
                        <Image size={12} weight="fill" className="ml-1" />
                        صورة
                      </>
                    )}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <p className="text-sm">
                    {activity.type === 'review' && (
                      <>
                        قام بتقييم وصفة{' '}
                        <button
                          onClick={() => recipe && onRecipeClick(recipe)}
                          className="font-semibold text-primary hover:underline"
                        >
                          {activity.recipeName}
                        </button>
                      </>
                    )}
                    {activity.type === 'photo' && (
                      <>
                        شارك صورة لوصفة{' '}
                        <button
                          onClick={() => recipe && onRecipeClick(recipe)}
                          className="font-semibold text-primary hover:underline"
                        >
                          {activity.recipeName}
                        </button>
                      </>
                    )}
                  </p>

                  {activity.type === 'review' && activity.rating && (
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          weight={i < activity.rating! ? 'fill' : 'regular'}
                          className={i < activity.rating! ? 'text-accent fill-accent' : 'text-muted-foreground'}
                        />
                      ))}
                    </div>
                  )}

                  {activity.content && (
                    <p className="text-sm text-foreground bg-muted/50 p-3 rounded-lg">
                      {activity.content}
                    </p>
                  )}

                  {activity.type === 'photo' && activity.photoUrl && (
                    <div className="mt-2">
                      <img
                        src={activity.photoUrl}
                        alt="صورة المستخدم"
                        className="rounded-lg max-h-64 w-auto object-cover cursor-pointer"
                        onClick={() => recipe && onRecipeClick(recipe)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
