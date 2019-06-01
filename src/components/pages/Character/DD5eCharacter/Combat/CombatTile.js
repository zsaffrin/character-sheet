import React from 'react';
import {
  bool, number, oneOfType, string,
} from 'prop-types';
import styled from 'styled-components';

import { modFormat } from '../utils/characterUtils';
import Box from '../shared/Box';

const CombatTile = ({ mod, name, score }) => {
  const InnerLayout = styled.div`
    display: grid;
    align-items: center;
  `;
  const Score = styled.div(({ theme }) => {
    const { font } = theme;
    return `
      font-size: ${font.size.lg};
      font-weight: ${font.weight.body.black};
    `;
  });

  return (
    <Box textAlign="center" title={name} titleTop>
      <InnerLayout>
        <Score>{mod ? modFormat(score) : score}</Score>
      </InnerLayout>
    </Box>
  );
};
CombatTile.propTypes = { mod: bool, name: string, score: oneOfType([number, string]) };
CombatTile.defaultProps = { mod: false, name: '', score: 0 };

export default CombatTile;
