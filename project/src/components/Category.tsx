import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ICategoryData, ICategory } from 'types/apiResponse';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
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

  const handleCategoryButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;

    const category = target.innerText;

    if (selectedCategory.includes(category)) {
      const updatedCategory = selectedCategory.filter(
        (item) => item !== category,
      );
      setSelectedCategory(updatedCategory);
      navigate(`?category=${updatedCategory.join(',')}`);
    } else {
      setSelectedCategory([...selectedCategory, category]);
      navigate(`?category=${[...selectedCategory, category].join(',')}`);
    }
  };

  return (
    <Wrapper>
      {categorys?.map((e) => {
        const isSelected = selectedCategory.includes(e.strCategory);
        return (
          <Button
            key={e.idCategory}
            onClick={(e) => handleCategoryButton(e)}
            selected={isSelected}
          >
            {e.strCategory}
          </Button>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 10px 0;
`;

const Button = styled.button<{ selected: boolean }>`
  cursor: pointer;
  background-color: ${(props) =>
    props.selected ? 'var(--color-main)' : 'var(--color-white)'};
  color: ${(props) =>
    props.selected ? 'var(--color-white)' : 'var(--color-black)'};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 50px;
  padding: 10px 15px;
  transition: background-color 0.3s;
  &:hover {
    color: var(--color-white);
    background-color: var(--color-main);
  }
`;

export default Category;
