import { Clock, ChefHat, Users, ShareNetwork, Star, ChatCircleDots } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { useKV } from '@github/spark/hooks';
import type { Recipe, RecipeRating } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ShareButton } from '@/components/ShareButton';
import { Button } from '@/components/ui/button';
import { RatingStars } from '@/components/RatingStars';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

export function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  const [ratings] = useKV<Record<string, RecipeRating>>('recipe-ratings', {});
  const recipeRating = (ratings && ratings[recipe.id]) || null;

  const difficultyColors = {
    'سهل': 'bg-accent/20 text-accent-foreground',
    'متوسط': 'bg-primary/20 text-primary',
    'صعب': 'bg-destructive/20 text-destructive',
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card 
      className="group cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="relative h-48 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 overflow-hidden">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,oklch(0.45_0.15_35_/_0.05)_10px,oklch(0.45_0.15_35_/_0.05)_20px)]" />
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <Badge className={difficultyColors[recipe.difficulty]}>
            {recipe.difficulty}
          </Badge>
        </div>
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity" onClick={handleShareClick}>
          <ShareButton recipe={recipe} variant="ghost" size="icon" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-white font-bold text-xl line-clamp-2">
            {recipe.name}
          </h3>
        </div>
      </div>
      
      <CardContent className="p-4 space-y-3">
        {recipeRating && recipeRating.totalReviews > 0 && (
          <div className="flex items-center gap-2">
            <RatingStars rating={recipeRating.averageRating} size={16} />
            <span className="text-sm font-semibold text-foreground">
              {recipeRating.averageRating.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground">
              ({recipeRating.totalReviews} تقييم)
            </span>
          </div>
        )}

        <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock size={16} weight="duotone" className="text-primary" />
            <span>{recipe.totalTime} دقيقة</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={16} weight="duotone" className="text-primary" />
            <span>{recipe.servings} أشخاص</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {recipe.cuisine}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {recipe.mealType}
          </Badge>
        </div>

        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{recipe.nutritionalInfo.calories} سعرة</span>
            <span>بروتين {recipe.nutritionalInfo.protein}غ</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
