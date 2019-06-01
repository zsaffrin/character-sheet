import React from 'react';
import styled from 'styled-components';

const ScoreRow = ({ score, label }) => {
  const OutsideWrap = styled.div(({ theme }) => {
    const { boxRadius, colors } = theme;
    return `
      border: 1px solid ${colors.orange[1]};
      border-radius: ${boxRadius};
      display: grid;
      grid-template-columns: auto 1fr;
    `;
  });
  const Score = styled.div(({ theme }) => {
    const { font, space } = theme;
    return `
      font-weight: ${font.weight.body.black};
    padding: ${space.sm} ${space.md};
    `;
  });
  const Label = styled.div(({ theme }) => {
    const { colors, font, space } = theme;
    return `
      background: ${colors.orange[1]};
      display: grid;
      align-items: center;
      font-weight: ${font.weight.body.bold}  
      padding: ${space.sm} ${space.md};
    `;
  });

  return (
    <OutsideWrap>
      <Score>{score}</Score>
      <Label>{label}</Label>
    </OutsideWrap>
  );
};

export default ScoreRow;
