import React from 'react';
import './App.css';
import logo from 'assets/logo.png';
import Category from 'components/Category';
import styled from 'styled-components';

function App() {
  return (
    <>
      <Header>
        <h1 className="a11y-hidden">프로그라피 9기 FE 사전 과제</h1>
        <img src={logo} />
      </Header>
      <Section>
        <h2 className="a11y-hidden">음식 목록 조회</h2>
        <Category />
      </Section>
    </>
  );
}

const Header = styled.header`
  margin-bottom: 30px;
`;

const Section = styled.section`
  width: 70%;
  margin: 0 auto;
`;

export default App;
