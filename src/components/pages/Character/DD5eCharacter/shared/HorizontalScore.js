import React from 'react';
import { bool, number, string } from 'prop-types';
import styled from 'styled-components';

import Box from './Box';
import { modFormat } from '../utils/characterUtils';

const HorizontalScore = ({ mod, score, title }) => {
  const StyledScore = styled.div(({ theme }) => {
    const { font, space } = theme;
    return `
      font-weight: ${font.weight.body.black};
      padding: ${space.sm} ${space.lg};
    `;
  });
  return (
    <Box title={title} compact>
      <StyledScore>{mod ? modFormat(score) : score}</StyledScore>
    </Box>
  );
};
HorizontalScore.propTypes = {
  mod: bool,
  score: number,
  title: string,
};
HorizontalScore.defaultProps = {
  mod: false,
  score: 0,
  title: '',
};

export default HorizontalScore;
