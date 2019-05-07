import React from 'react';
import styled from 'styled-components';

const HorizontalScore = ({ label, score }) => {
  const Layout = styled.div(({ theme }) => {
    const { colors, space } = theme;
    return `
      align-items: center;
      display: grid;
      grid-template-columns: 1fr 3fr;
      justify-items: center;
    `;
  });
  const Score = styled.div(({ theme }) => {
    const { colors, font, space } = theme;
    return `
      border: 1px solid ${colors.orange[3]};
      border-radius: 4px;
      font-size: ${font.size.lg};
      font-weight: ${font.weight.body.black};
      padding: ${space.md} ${space.lg};
    `;
  });
  const Label = styled.div(({ theme }) => {
    const { colors, font, space } = theme;
    return `
      width: 100%;
    `;
  });

  return (
    <Layout>
      <Score>{score}</Score>
      <Label>{label}</Label>
    </Layout>
  );
};

export default HorizontalScore;
