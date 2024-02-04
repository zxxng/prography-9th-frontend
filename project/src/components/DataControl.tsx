import React from 'react';
import styled from 'styled-components';
import useStore from 'store/store';
import type { Sort, View } from 'types/option';

const DataControl = () => {
  const { setSortOption, setViewcount } = useStore();
  const handleSortOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as Sort);
  };
  const handleViewCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setViewcount(e.target.value as View);
  };

  return (
    <Wrapper>
      <Count>11 / 200 개 조회</Count>
      <Select>
        <SelectForm>
          <select
            name="sortOption"
            defaultValue="latest"
            onChange={handleSortOptionChange}
          >
            <option value="latest">최신순</option>
            <option value="asc">이름 오름차순</option>
            <option value="desc">이름 내림차순</option>
          </select>
        </SelectForm>
        <SelectForm>
          <select
            name="viewCount"
            defaultValue="4"
            onChange={handleViewCountChange}
          >
            <option value="4">4개씩 보기</option>
            <option value="2">2개씩 보기</option>
          </select>
        </SelectForm>
      </Select>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Count = styled.p``;
const Select = styled.div`
  display: flex;
`;

const SelectForm = styled.form`
  display: flex;
  align-items: center;
  margin-right: 20px;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  select {
    cursor: pointer;
    border: none;
    background: transparent;
    outline: none;
  }
`;

export default DataControl;
