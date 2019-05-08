import React from 'react';
import styled from 'styled-components';

import Box from '../shared/Box';
import AbilityScore from './AbilityScore';
import AbilityMod from './AbilityMod';

const Abilities = ({ abilities }) => {
  const Layout = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      grid-area: abilities;
      display: grid;
      grid-gap: ${space.sm};
    `;
  });

  return (
    <Layout>
      {Object.keys(abilities).map((k) => {
        const { name, mod, score } = abilities[k];
        return (
          <Box title={name} titleSize="sm" key={k}>
            <AbilityScore score={score} />
            <AbilityMod score={mod} />
          </Box>
        );
      })}
    </Layout>
  );
};

export default Abilities;
