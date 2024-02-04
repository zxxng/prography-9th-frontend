import { useState, useEffect } from 'react';
import styled from 'styled-components';
import type { Meals } from 'types/apiResponse';
import useStore from 'store/store';

const ItemCard = ({ meals }: { meals: Meals[] | undefined }) => {
  const [itemCount, setItemCount] = useState<number>(
    meals && meals.length < 20 ? meals.length : 20,
  );
  const { viewCount } = useStore();

  useEffect(() => {
    if (meals) setItemCount(meals.length < 20 ? meals.length : 20);
  }, [meals]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop <
        document.documentElement.offsetHeight - 100
      )
        return;

      setItemCount((prevCount) => {
        const maxCount = meals ? meals.length : 0;
        return prevCount + 20 > maxCount ? maxCount : prevCount + 20;
      });
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [itemCount]);

  return (
    <>
      <Count>
        {itemCount} / {meals?.length} 개 조회
      </Count>
      <Container>
        {meals?.slice(0, itemCount).map((e) => {
          if (!e) return;
          return (
            <Item key={e.idMeal} $viewCount={viewCount}>
              <Img src={e.strMealThumb}></Img>
              <ItemName>{e.strMeal}</ItemName>
            </Item>
          );
        })}
      </Container>
    </>
  );
};

const Count = styled.p`
  position: absolute;
  margin-top: -35px;
`;

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 390px) {
    display: block;
  }
`;

const Item = styled.article<{ $viewCount: number }>`
  flex: 1 0 calc(${(props) => 100 / props.$viewCount}% - 10px);
  max-width: calc(${(props) => 100 / props.$viewCount}% - 10px);

  @media (max-width: 390px) {
    flex: 1;
    max-width: 100%;
  }
`;

const Img = styled.img`
  border-radius: 20px;
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const ItemName = styled.p``;

export default ItemCard;
