import React from 'react';
import { number } from 'prop-types';
import styled from 'styled-components';

import Box from '../shared/Box';

const HP = ({ maxHp }) => {
  const StyledSection = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      display: grid;
      grid-gap: ${space.thin};
      grid-template-columns: 1fr auto;
    `;
  });
  const Score = styled.div(({ theme }) => {
    const { font } = theme;
    return `
      font-weight: ${font.weight.body.black};
    `;
  });

  return (
    <StyledSection>
      <Box title="Current Hit Points">
        <Score>{maxHp}</Score>
      </Box>
      <Box title="Temp HP" />
    </StyledSection>
  );
};
HP.propTypes = {
  maxHp: number,
};
HP.defaultProps = {
  maxHp: 0,
};
export default HP;
