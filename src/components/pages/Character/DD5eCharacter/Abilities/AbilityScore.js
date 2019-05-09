import React from 'react';
import { number } from 'prop-types';
import styled from 'styled-components';

const AbilityScore = ({ score }) => {
  const StyledScore = styled.div(({ theme }) => {
    const { font } = theme;
    return `
      font-size: ${font.size.lg};
      font-weight: ${font.weight.body.black};
      text-align: center;
    `;
  });

  return <StyledScore>{score}</StyledScore>;
};
AbilityScore.propTypes = {
  score: number,
};
AbilityScore.defaultProps = {
  score: 0,
};
export default AbilityScore;
