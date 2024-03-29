import React from 'react';
import styled, { keyframes } from 'styled-components';
import useStore from 'store/store';

const Skeleton = () => {
  const { viewCount } = useStore();

  return (
    <Wrapper>
      {Array(12)
        .fill(0)
        .map((_, i) => (
          <SkeletonItem key={i} $viewCount={viewCount} />
        ))}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const SkeletonItem = styled.div<{ $viewCount: number }>`
  flex: 1 0 calc(${(props) => 100 / props.$viewCount}% - 10px);
  max-width: calc(${(props) => 100 / props.$viewCount}% - 10px);
  height: 200px;
  background: var(--color-white);
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
  position: relative;
  animation: ${shimmer} 1s infinite;
  border-radius: 10px;
`;

export default Skeleton;
