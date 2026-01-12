import { Clock, ChefHat, Users, Flame, X } from '@phosphor-icons/react';
import { useState } from 'react';
import type { Recipe, User } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShareButton } from '@/components/ShareButton';
import { RecipeReviews } from '@/components/RecipeReviews';
import { PhotoGallery } from '@/components/PhotoGallery';
import { PhotoUploadForm } from '@/components/PhotoUploadForm';

interface RecipeDetailProps {
  recipe: Recipe | null;
  open: boolean;
  onClose: () => void;
  currentUser: User | null;
  onLoginRequired: () => void;
}

export function RecipeDetail({ recipe, open, onClose, currentUser, onLoginRequired }: RecipeDetailProps) {
  const [photosKey, setPhotosKey] = useState(0);

  const handlePhotoUploaded = () => {
    setPhotosKey(prev => prev + 1);
  };

  if (!recipe) return null;

  const difficultyColors = {
    'سهل': 'bg-accent/20 text-accent-foreground',
    'متوسط': 'bg-primary/20 text-primary',
    'صعب': 'bg-destructive/20 text-destructive',
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <div className="relative h-64 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 overflow-hidden">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_15px,oklch(0.45_0.15_35_/_0.08)_15px,oklch(0.45_0.15_35_/_0.08)_30px)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors z-10"
          >
            <X size={20} weight="bold" />
          </button>

          <div className="absolute top-4 right-4 z-10">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg">
              <ShareButton recipe={recipe} variant="ghost" size="default" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <DialogHeader>
              <DialogTitle className="text-white text-3xl font-bold mb-3">
                {recipe.name}
              </DialogTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={difficultyColors[recipe.difficulty]}>
                  {recipe.difficulty}
                </Badge>
                <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                  {recipe.cuisine}
                </Badge>
                <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                  {recipe.mealType}
                </Badge>
              </div>
            </DialogHeader>
          </div>
        </div>

        <ScrollArea className="max-h-[calc(90vh-16rem)] px-6 pb-6">
          <Tabs defaultValue="recipe" dir="rtl" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="recipe">الوصفة</TabsTrigger>
              <TabsTrigger value="reviews">التقييمات</TabsTrigger>
              <TabsTrigger value="photos">صور المستخدمين</TabsTrigger>
            </TabsList>

            <TabsContent value="recipe" className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Clock size={24} weight="duotone" className="text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">وقت التحضير</div>
                    <div className="font-semibold">{recipe.prepTime} دقيقة</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Flame size={24} weight="duotone" className="text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">وقت الطهي</div>
                    <div className="font-semibold">{recipe.cookTime} دقيقة</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Clock size={24} weight="duotone" className="text-accent" />
                  <div>
                    <div className="text-xs text-muted-foreground">الوقت الكلي</div>
                    <div className="font-semibold">{recipe.totalTime} دقيقة</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Users size={24} weight="duotone" className="text-accent" />
                  <div>
                    <div className="text-xs text-muted-foreground">عدد الحصص</div>
                    <div className="font-semibold">{recipe.servings} أشخاص</div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full" />
                  القيم الغذائية (لكل حصة)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">{recipe.nutritionalInfo.calories}</div>
                    <div className="text-xs text-muted-foreground mt-1">سعرة حرارية</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-accent">{recipe.nutritionalInfo.protein}غ</div>
                    <div className="text-xs text-muted-foreground mt-1">بروتين</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-accent">{recipe.nutritionalInfo.carbs}غ</div>
                    <div className="text-xs text-muted-foreground mt-1">كربوهيدرات</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-accent">{recipe.nutritionalInfo.fat}غ</div>
                    <div className="text-xs text-muted-foreground mt-1">دهون</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-accent">{recipe.nutritionalInfo.sugar}غ</div>
                    <div className="text-xs text-muted-foreground mt-1">سكر</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full" />
                  المقادير
                </h3>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="flex-1">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full" />
                  طريقة التحضير
                </h3>
                <ol className="space-y-4">
                  {recipe.steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-base font-bold">
                        {index + 1}
                      </span>
                      <div className="flex-1 pt-1">
                        <p className="leading-relaxed">{step}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <RecipeReviews
                recipeId={recipe.id}
                recipeName={recipe.name}
                currentUserId={currentUser?.id}
                currentUserName={currentUser?.name}
                currentUserAvatar={currentUser?.avatar}
                onLoginRequired={onLoginRequired}
              />
            </TabsContent>

            <TabsContent value="photos" className="space-y-6">
              {currentUser ? (
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-4">شارك صورتك لهذه الوصفة</h3>
                  <PhotoUploadForm
                    recipeId={recipe.id}
                    recipeName={recipe.name}
                    userId={currentUser.id}
                    userName={currentUser.name}
                    userAvatar={currentUser.avatar}
                    onPhotoUploaded={handlePhotoUploaded}
                  />
                </div>
              ) : (
                <div className="bg-muted/50 rounded-lg p-6 text-center">
                  <p className="text-muted-foreground mb-3">سجل دخولك لمشاركة صورتك</p>
                  <button
                    onClick={onLoginRequired}
                    className="text-primary hover:underline font-semibold"
                  >
                    تسجيل الدخول
                  </button>
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold mb-4">تجارب المستخدمين</h3>
                <PhotoGallery 
                  key={photosKey}
                  recipeId={recipe.id} 
                  currentUserId={currentUser?.id}
                />
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
