import { useState, useEffect, useMemo } from 'react';
import { MagnifyingGlass, FunnelSimple, CookingPot } from '@phosphor-icons/react';
import { useKV } from '@github/spark/hooks';
import type { Recipe, FilterOptions } from '@/lib/types';
import { RecipeCard } from '@/components/RecipeCard';
import { RecipeDetail } from '@/components/RecipeDetail';
import { FilterPanel } from '@/components/FilterPanel';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { Toaster } from '@/components/ui/sonner';
import { sampleRecipes } from '@/lib/sampleRecipes';
import { useIsMobile } from '@/hooks/use-mobile';

function App() {
  const isMobile = useIsMobile();
  const [recipes, setRecipes] = useKV<Recipe[]>('recipes', []);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    cuisineCategory: 'الكل',
    cuisine: [],
    mealType: [],
    difficulty: [],
  });

  useEffect(() => {
    async function initializeRecipes() {
      if (!recipes || recipes.length === 0) {
        setIsLoading(true);
        try {
          setRecipes(sampleRecipes);
        } catch (error) {
          console.error('Error initializing recipes:', error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    initializeRecipes();
  }, []);

  const filteredRecipes = useMemo(() => {
    if (!recipes) return [];
    
    return recipes.filter((recipe) => {
      if (filters.search && !recipe.name.toLowerCase().includes(filters.search.toLowerCase()) &&
          !recipe.ingredients.some(ing => ing.toLowerCase().includes(filters.search.toLowerCase()))) {
        return false;
      }

      if (filters.cuisineCategory !== 'الكل' && recipe.cuisineCategory !== filters.cuisineCategory) {
        return false;
      }

      if (filters.cuisine.length > 0 && !filters.cuisine.includes(recipe.cuisine)) {
        return false;
      }

      if (filters.mealType.length > 0 && !filters.mealType.includes(recipe.mealType)) {
        return false;
      }

      if (filters.difficulty.length > 0 && !filters.difficulty.includes(recipe.difficulty)) {
        return false;
      }

      return true;
    });
  }, [recipes, filters]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-secondary border-b border-border shadow-md">
        <div className="container mx-auto px-4 md:px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <CookingPot size={28} weight="duotone" className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-secondary-foreground">
                  بنك الطعام العربي
                </h1>
                <p className="text-sm text-secondary-foreground/70">
                  وصفات عربية وعالمية أصيلة
                </p>
              </div>
            </div>

            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="bg-background">
                    <FunnelSimple size={20} weight="duotone" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 p-0">
                  <FilterPanel filters={filters} onFilterChange={setFilters} />
                </SheetContent>
              </Sheet>
            )}
          </div>

          <div className="relative">
            <MagnifyingGlass 
              size={20} 
              weight="duotone" 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="text"
              placeholder="ابحث عن وصفة أو مكون..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="pr-10 bg-background"
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 lg:px-12 py-8">
        <div className="flex gap-8">
          {!isMobile && (
            <aside className="w-80 flex-shrink-0">
              <div className="sticky top-32 bg-card border border-border rounded-lg shadow-sm overflow-hidden">
                <FilterPanel filters={filters} onFilterChange={setFilters} />
              </div>
            </aside>
          )}

          <main className="flex-1">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                {filteredRecipes.length} وصفة
              </h2>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-48 w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredRecipes.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <CookingPot size={48} weight="duotone" className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">لا توجد وصفات</h3>
                <p className="text-muted-foreground mb-4">
                  جرب تغيير معايير البحث أو التصفية
                </p>
                <Button
                  onClick={() => setFilters({
                    search: '',
                    cuisineCategory: 'الكل',
                    cuisine: [],
                    mealType: [],
                    difficulty: [],
                  })}
                >
                  مسح جميع المرشحات
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onClick={() => setSelectedRecipe(recipe)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <RecipeDetail
        recipe={selectedRecipe}
        open={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />

      <footer className="mt-16 border-t border-border bg-card">
        <div className="container mx-auto px-4 md:px-6 lg:px-12 py-8">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">
              بنك الطعام العربي - مجموعة شاملة من الوصفات العربية والعالمية
            </p>
            <p className="text-xs mt-2">
              جميع الوصفات مع معلومات غذائية تفصيلية
            </p>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  );
}

export default App;