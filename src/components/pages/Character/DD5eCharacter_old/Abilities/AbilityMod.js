import React from 'react';
import { number } from 'prop-types';
import styled from 'styled-components';

import { modFormat } from '../utils/characterUtils';

const AbilityMod = ({ score }) => {
  const StyledScore = styled.div(({ theme }) => {
    const { font } = theme;
    return `
      font-size: ${font.size.lg};
      font-weight: ${font.weight.body.black};
      text-align: center;
    `;
  });

  return <StyledScore>{modFormat(score)}</StyledScore>;
};
AbilityMod.propTypes = {
  score: number,
};
AbilityMod.defaultProps = {
  score: 0,
};

export default AbilityMod;
