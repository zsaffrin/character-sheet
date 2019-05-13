import React from 'react';
import { number, shape, string } from 'prop-types';
import styled from 'styled-components';

import { modFormat } from '../utils/characterUtils';
import Box from '../shared/Box';

const AbilityTile = ({ ability }) => {
  const { name, mod, score = {} } = ability;

  const Score = styled.div(({ theme }) => {
    const { font } = theme;
    return `
      font-size: ${font.size.xl};
      font-weight: ${font.weight.body.black};
    `;
  });
  const Mod = styled.div(({ theme }) => {
    const { font } = theme;
    return `
      font-size: ${font.size.lg};
      font-weight: ${font.weight.body.bold};
    `;
  });

  return (
    <Box textAlign="center" title={name} titleTop>
      <Score>{score.total || 0}</Score>
      <Mod>{modFormat(mod)}</Mod>
    </Box>
  );
};
AbilityTile.propTypes = {
  ability: shape({
    name: string,
    score: shape({
      total: number,
    }),
  }),
};
AbilityTile.defaultProps = {
  ability: {
    name: '',
    score: { total: 0 },
  },
};

export default AbilityTile;
