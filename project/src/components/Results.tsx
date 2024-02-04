import React, { Suspense } from 'react';
import type { IMeals, IMealsData } from 'types/apiResponse';
import type { Sort } from 'types/option';
import axios from 'axios';
import useStore from 'store/store';
import { useQuery } from '@tanstack/react-query';
import Skeleton from 'components/Skeleton';
import DataControl from 'components/DataControl';

const ItemCard = React.lazy(() => import('components/ItemCard'));

const Results = () => {
  const { selectedCategory, sortOption } = useStore();

  const fetchMealList = async () => {
    const requests = selectedCategory.map(async (category) => {
      const response = await axios.get<IMealsData>(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      );
      return response.data.meals;
    });

    const results = await Promise.all(requests);
    return results.flat();
  };

  const sortData = (meals: IMeals[], sortOption: Sort): IMeals[] => {
    switch (sortOption) {
      case 'latest':
        return [...meals].sort((a, b) => b.idMeal - a.idMeal);
      case 'asc':
        return [...meals].sort((a, b) => a.strMeal.localeCompare(b.strMeal));
      case 'desc':
        return [...meals].sort((a, b) => b.strMeal.localeCompare(a.strMeal));
      default:
        return meals;
    }
  };

  const { data, isLoading, error, isError } = useQuery<IMeals[], Error>({
    queryKey: ['meals', selectedCategory],
    queryFn: () => fetchMealList(),
  });

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const sortedData = isLoading || !data ? [] : sortData(data, sortOption);

  return (
    <Suspense fallback={<Skeleton />}>
      <DataControl />
      {isLoading ? <Skeleton /> : <ItemCard meals={sortedData} />}
    </Suspense>
  );
};

export default Results;
