export interface ICategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface ICategoryData {
  categories: ICategory[];
}

export interface IMeals {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

export interface IMealsData {
  meals: IMeals[];
}
