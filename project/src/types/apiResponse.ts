export interface Categorys {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface CategoryData {
  categories: Categorys[];
}

export interface Meals {
  strMeal: string;
  strMealThumb: string;
  idMeal: number;
}

export interface MealsData {
  meals: Meals[];
}
