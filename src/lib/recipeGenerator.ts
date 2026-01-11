import type { Recipe, ArabCountry, InternationalCuisine } from './types';

export async function generateRecipes(): Promise<Recipe[]> {
  const arabCountries: ArabCountry[] = [
    'مصر', 'لبنان', 'سوريا', 'الأردن', 'فلسطين',
    'العراق', 'السعودية', 'الإمارات', 'الكويت', 'قطر',
    'البحرين', 'عمان', 'اليمن', 'المغرب', 'الجزائر',
    'تونس', 'ليبيا', 'السودان'
  ];

  const internationalCuisines: InternationalCuisine[] = [
    'إيطالي', 'صيني', 'هندي', 'فرنسي', 'ياباني'
  ];

  const recipes: Recipe[] = [];

  for (const country of arabCountries) {
    const prompt = spark.llmPrompt`أنت خبير طهي عربي. أنشئ وصفة طعام تقليدية واحدة من ${country}.

يجب أن تكون الوصفة بصيغة JSON مع الحقول التالية:
- name: اسم الطبق بالعربية
- mealType: نوع الوجبة (إفطار، غداء، عشاء، أو حلويات)
- difficulty: مستوى الصعوبة (سهل، متوسط، أو صعب)
- prepTime: وقت التحضير بالدقائق (رقم)
- cookTime: وقت الطهي بالدقائق (رقم)
- servings: عدد الحصص (رقم)
- ingredients: قائمة بالمقادير بالعربية (مصفوفة من النصوص)
- steps: خطوات التحضير بالعربية (مصفوفة من النصوص)
- calories: السعرات الحرارية للحصة الواحدة (رقم)
- protein: كمية البروتين بالجرام (رقم)
- sugar: كمية السكر بالجرام (رقم)
- fat: كمية الدهون بالجرام (رقم)
- carbs: كمية الكربوهيدرات بالجرام (رقم)

يجب أن يكون الناتج JSON صالح فقط، بدون أي نص إضافي.`;

    try {
      const response = await spark.llm(prompt, 'gpt-4o-mini', true);
      const data = JSON.parse(response);
      
      recipes.push({
        id: `recipe-${country}-${Date.now()}-${Math.random()}`,
        name: data.name,
        cuisine: country,
        cuisineCategory: 'عربي',
        mealType: data.mealType,
        difficulty: data.difficulty,
        prepTime: data.prepTime,
        cookTime: data.cookTime,
        totalTime: data.prepTime + data.cookTime,
        servings: data.servings,
        ingredients: data.ingredients,
        steps: data.steps,
        nutritionalInfo: {
          calories: data.calories,
          protein: data.protein,
          sugar: data.sugar,
          fat: data.fat,
          carbs: data.carbs,
        },
      });
    } catch (error) {
      console.error(`Error generating recipe for ${country}:`, error);
    }
  }

  for (const cuisine of internationalCuisines) {
    const prompt = spark.llmPrompt`أنت خبير طهي عالمي. أنشئ وصفة طعام شهيرة واحدة من المطبخ ${cuisine}.

يجب أن تكون الوصفة بصيغة JSON مع الحقول التالية (كل النصوص يجب أن تكون بالعربية):
- name: اسم الطبق بالعربية
- mealType: نوع الوجبة (إفطار، غداء، عشاء، أو حلويات)
- difficulty: مستوى الصعوبة (سهل، متوسط، أو صعب)
- prepTime: وقت التحضير بالدقائق (رقم)
- cookTime: وقت الطهي بالدقائق (رقم)
- servings: عدد الحصص (رقم)
- ingredients: قائمة بالمقادير بالعربية (مصفوفة من النصوص)
- steps: خطوات التحضير بالعربية (مصفوفة من النصوص)
- calories: السعرات الحرارية للحصة الواحدة (رقم)
- protein: كمية البروتين بالجرام (رقم)
- sugar: كمية السكر بالجرام (رقم)
- fat: كمية الدهون بالجرام (رقم)
- carbs: كمية الكربوهيدرات بالجرام (رقم)

يجب أن يكون الناتج JSON صالح فقط، بدون أي نص إضافي.`;

    try {
      const response = await spark.llm(prompt, 'gpt-4o-mini', true);
      const data = JSON.parse(response);
      
      recipes.push({
        id: `recipe-${cuisine}-${Date.now()}-${Math.random()}`,
        name: data.name,
        cuisine: cuisine,
        cuisineCategory: 'عالمي',
        mealType: data.mealType,
        difficulty: data.difficulty,
        prepTime: data.prepTime,
        cookTime: data.cookTime,
        totalTime: data.prepTime + data.cookTime,
        servings: data.servings,
        ingredients: data.ingredients,
        steps: data.steps,
        nutritionalInfo: {
          calories: data.calories,
          protein: data.protein,
          sugar: data.sugar,
          fat: data.fat,
          carbs: data.carbs,
        },
      });
    } catch (error) {
      console.error(`Error generating recipe for ${cuisine}:`, error);
    }
  }

  return recipes;
}
