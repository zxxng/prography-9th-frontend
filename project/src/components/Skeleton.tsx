import React from 'react';
import styled, { keyframes } from 'styled-components';

const Skeleton = () => {
  return (
    <>
      {Array(12)
        .fill(0)
        .map((_, i) => (
          <SkeletonItem key={i} />
        ))}
    </>
  );
};

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const SkeletonItem = styled.div`
  flex: 1 0 calc(25% - 10px);
  max-width: calc(25% - 10px);
  height: 200px;
  background: var(--color-white);
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
  position: relative;
  animation: ${shimmer} 1s infinite;
  border-radius: 10px;
`;

export default Skeleton;
