import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ICategoryData, ICategory } from 'types/apiResponse';
import axios from 'axios';

const Category = () => {
  const [categorys, setCategorys] = useState<ICategory[]>();

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await axios.get<ICategoryData>(
        'https://www.themealdb.com/api/json/v1/1/categories.php',
      );
      setCategorys(response.data.categories);
    };
    fetchCategory();
  }, []);

  return (
    <Wrapper>
      {categorys?.map((e) => {
        return <Button key={e.idCategory}>{e.strCategory}</Button>;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  margin: 10px 0;
`;

const Button = styled.button`
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 50px;
  padding: 10px 15px;
  margin-right: 10px;
  margin-bottom: 10px;
  transition: background-color 0.3s;
  &:hover {
    background-color: royalblue;
  }
`;

export default Category;
