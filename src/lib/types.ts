export type ArabCountry = 
  | 'مصر' | 'لبنان' | 'سوريا' | 'الأردن' | 'فلسطين'
  | 'العراق' | 'السعودية' | 'الإمارات' | 'الكويت' | 'قطر'
  | 'البحرين' | 'عمان' | 'اليمن' | 'المغرب' | 'الجزائر'
  | 'تونس' | 'ليبيا' | 'السودان' | 'الصومال' | 'جيبوتي'
  | 'موريتانيا' | 'جزر القمر';

export type InternationalCuisine = 
  | 'إيطالي' | 'صيني' | 'هندي' | 'فرنسي' | 'ياباني';

export type MealType = 'إفطار' | 'غداء' | 'عشاء' | 'حلويات';

export type DifficultyLevel = 'سهل' | 'متوسط' | 'صعب';

export type CuisineCategory = 'عربي' | 'عالمي';

export interface NutritionalInfo {
  calories: number;
  protein: number;
  sugar: number;
  fat: number;
  carbs: number;
}

export interface Review {
  id: string;
  recipeId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: number;
  likes: number;
  likedBy: string[];
}

export interface UserRecipePhoto {
  id: string;
  recipeId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  photoDataUrl: string;
  caption?: string;
  createdAt: number;
  likes: number;
  likedBy: string[];
}

export interface RecipeRating {
  recipeId: string;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export interface Recipe {
  id: string;
  name: string;
  cuisine: ArabCountry | InternationalCuisine;
  cuisineCategory: CuisineCategory;
  mealType: MealType;
  difficulty: DifficultyLevel;
  prepTime: number;
  cookTime: number;
  totalTime: number;
  servings: number;
  ingredients: string[];
  steps: string[];
  nutritionalInfo: NutritionalInfo;
  imageUrl?: string;
}

export interface FilterOptions {
  search: string;
  cuisineCategory: CuisineCategory | 'الكل';
  cuisine: (ArabCountry | InternationalCuisine)[];
  mealType: MealType[];
  difficulty: DifficultyLevel[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  bio?: string;
  createdAt: number;
}

export type ActivityType = 'recipe' | 'review' | 'photo' | 'rating';

export interface Activity {
  id: string;
  type: ActivityType;
  userId: string;
  userName: string;
  userAvatar: string;
  recipeId: string;
  recipeName: string;
  content?: string;
  rating?: number;
  photoUrl?: string;
  createdAt: number;
}
