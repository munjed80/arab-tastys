import { FunnelSimple, X } from '@phosphor-icons/react';
import type { FilterOptions, ArabCountry, InternationalCuisine, MealType, DifficultyLevel } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  const arabCountries: ArabCountry[] = [
    'مصر', 'لبنان', 'سوريا', 'الأردن', 'فلسطين',
    'العراق', 'السعودية', 'الإمارات', 'الكويت', 'قطر',
    'البحرين', 'عمان', 'اليمن', 'المغرب', 'الجزائر',
    'تونس', 'ليبيا', 'السودان', 'الصومال', 'جيبوتي',
    'موريتانيا', 'جزر القمر'
  ];

  const internationalCuisines: InternationalCuisine[] = [
    'إيطالي', 'صيني', 'هندي', 'فرنسي', 'ياباني'
  ];

  const mealTypes: MealType[] = ['إفطار', 'غداء', 'عشاء', 'حلويات'];
  const difficultyLevels: DifficultyLevel[] = ['سهل', 'متوسط', 'صعب'];

  const toggleCuisine = (cuisine: ArabCountry | InternationalCuisine) => {
    const newCuisines = filters.cuisine.includes(cuisine)
      ? filters.cuisine.filter(c => c !== cuisine)
      : [...filters.cuisine, cuisine];
    onFilterChange({ ...filters, cuisine: newCuisines });
  };

  const toggleMealType = (mealType: MealType) => {
    const newMealTypes = filters.mealType.includes(mealType)
      ? filters.mealType.filter(m => m !== mealType)
      : [...filters.mealType, mealType];
    onFilterChange({ ...filters, mealType: newMealTypes });
  };

  const toggleDifficulty = (difficulty: DifficultyLevel) => {
    const newDifficulties = filters.difficulty.includes(difficulty)
      ? filters.difficulty.filter(d => d !== difficulty)
      : [...filters.difficulty, difficulty];
    onFilterChange({ ...filters, difficulty: newDifficulties });
  };

  const clearFilters = () => {
    onFilterChange({
      search: '',
      cuisineCategory: 'الكل',
      cuisine: [],
      mealType: [],
      difficulty: [],
    });
  };

  const hasActiveFilters = filters.cuisine.length > 0 || 
                          filters.mealType.length > 0 || 
                          filters.difficulty.length > 0 ||
                          filters.cuisineCategory !== 'الكل';

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <FunnelSimple size={20} weight="duotone" className="text-primary" />
            التصنيفات
          </h2>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <X size={16} weight="bold" className="ml-1" />
              مسح الكل
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <div>
            <h3 className="font-semibold mb-3 text-secondary">نوع المطبخ</h3>
            <div className="flex flex-col gap-2">
              {(['الكل', 'عربي', 'عالمي'] as const).map((category) => (
                <Button
                  key={category}
                  variant={filters.cuisineCategory === category ? 'default' : 'outline'}
                  className="justify-start"
                  onClick={() => onFilterChange({ ...filters, cuisineCategory: category, cuisine: [] })}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {(filters.cuisineCategory === 'الكل' || filters.cuisineCategory === 'عربي') && (
            <>
              <div>
                <h3 className="font-semibold mb-3 text-secondary">الدولة العربية</h3>
                <div className="flex flex-wrap gap-2">
                  {arabCountries.map((country) => (
                    <Badge
                      key={country}
                      variant={filters.cuisine.includes(country) ? 'default' : 'outline'}
                      className="cursor-pointer hover:bg-primary/20 transition-colors"
                      onClick={() => toggleCuisine(country)}
                    >
                      {country}
                    </Badge>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          {(filters.cuisineCategory === 'الكل' || filters.cuisineCategory === 'عالمي') && (
            <>
              <div>
                <h3 className="font-semibold mb-3 text-secondary">المطبخ العالمي</h3>
                <div className="flex flex-wrap gap-2">
                  {internationalCuisines.map((cuisine) => (
                    <Badge
                      key={cuisine}
                      variant={filters.cuisine.includes(cuisine) ? 'default' : 'outline'}
                      className="cursor-pointer hover:bg-primary/20 transition-colors"
                      onClick={() => toggleCuisine(cuisine)}
                    >
                      {cuisine}
                    </Badge>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          <div>
            <h3 className="font-semibold mb-3 text-secondary">نوع الوجبة</h3>
            <div className="flex flex-wrap gap-2">
              {mealTypes.map((mealType) => (
                <Badge
                  key={mealType}
                  variant={filters.mealType.includes(mealType) ? 'default' : 'outline'}
                  className="cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={() => toggleMealType(mealType)}
                >
                  {mealType}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-3 text-secondary">مستوى الصعوبة</h3>
            <div className="flex flex-wrap gap-2">
              {difficultyLevels.map((difficulty) => (
                <Badge
                  key={difficulty}
                  variant={filters.difficulty.includes(difficulty) ? 'default' : 'outline'}
                  className="cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={() => toggleDifficulty(difficulty)}
                >
                  {difficulty}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
