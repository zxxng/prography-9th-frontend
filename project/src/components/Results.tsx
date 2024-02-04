import React, { Suspense } from 'react';
import styled from 'styled-components';
import type { IMeals, IMealsData } from 'types/apiResponse';
import axios from 'axios';
import useStore from 'store/store';
import { useQuery } from '@tanstack/react-query';
import Skeleton from 'components/Skeleton';
import DataControl from 'components/DataControl';

const ItemCard = React.lazy(() => import('components/ItemCard'));

const Results = () => {
  const { selectedCategory } = useStore();

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

  const {
    data: meals,
    isLoading,
    error,
    isError,
  } = useQuery<IMeals[], Error>({
    queryKey: ['meals', selectedCategory],
    queryFn: () => fetchMealList(),
  });

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Suspense fallback={<Skeleton />}>
      <DataControl length={meals?.length} />
      <Wrapper>{isLoading ? <Skeleton /> : <ItemCard meals={meals} />}</Wrapper>
    </Suspense>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export default Results;
