import React from 'react';
import styled from 'styled-components';

const HorizontalScore = ({ label, score }) => {
  const Layout = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
  `;
  const Score = styled.div(({ theme }) => {
    const { font } = theme;
    return `
      font-weight: ${font.weight.body.black};
    `;
  });

  return (
    <Layout>
      <Score>{score}</Score>
      <div>{label}</div>
    </Layout>
  );
};

export default HorizontalScore;
