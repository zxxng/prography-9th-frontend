import React from 'react';
import styled from 'styled-components';
import type { IMeals } from 'types/apiResponse';

const ItemCard = ({ meals }: { meals: IMeals[] | undefined }) => {
  return (
    <>
      <Count> 11 / {meals?.length} 개 조회</Count>
      <Container>
        {meals?.map((e) => {
          return (
            <Item key={e.idMeal}>
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

const Item = styled.article`
  flex: 1 0 calc(25% - 10px);
  max-width: calc(25% - 10px);

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
