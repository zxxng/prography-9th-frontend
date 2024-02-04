import styled from 'styled-components';
import type { IMeals, IMealsData } from 'types/apiResponse';
import axios from 'axios';
import useStore from 'store/store';
import { useQuery } from '@tanstack/react-query';
import Skeleton from 'components/Skeleton';
import DataControl from './DataControl';

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

  if (isLoading) {
    return <Skeleton />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <DataControl length={meals?.length} />
      <Wrapper>
        {isLoading ? (
          <Skeleton />
        ) : (
          meals?.map((e) => {
            return (
              <Item key={e.idMeal}>
                <Img src={e.strMealThumb}></Img>
                <ItemName>{e.strMeal}</ItemName>
              </Item>
            );
          })
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Item = styled.article`
  flex: 1 0 calc(25% - 10px);
  max-width: calc(25% - 10px);
`;

const Img = styled.img`
  border-radius: 20px;
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const ItemName = styled.p``;

export default Results;
