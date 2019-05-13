import React from 'react';
import { number } from 'prop-types';
import styled from 'styled-components';

import AbilityScore from './AbilityScore';
import AbilityMod from './AbilityMod';

const AbilityTile = ({ mod, score }) => {
  const Layout = styled.div`
    align-items: center;
    display: grid;
    height: 100%;
  `;

  return (
    <Layout>
      <AbilityScore score={score} />
      <AbilityMod score={mod} />
    </Layout>
  );
};
AbilityTile.propTypes = {
  mod: number,
  score: number,
};
AbilityTile.defaultProps = {
  mod: 0,
  score: 0,
};

export default AbilityTile;
