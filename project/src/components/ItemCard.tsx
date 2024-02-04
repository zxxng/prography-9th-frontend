import React from 'react';
import styled from 'styled-components';
import type { IMeals } from 'types/apiResponse';

const ItemCard = ({ meals }: { meals: IMeals[] | undefined }) => {
  return (
    <>
      {meals?.map((e) => {
        return (
          <Item key={e.idMeal}>
            <Img src={e.strMealThumb}></Img>
            <ItemName>{e.strMeal}</ItemName>
          </Item>
        );
      })}
    </>
  );
};

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

export default ItemCard;
