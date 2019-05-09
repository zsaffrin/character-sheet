import React from 'react';
import styled from 'styled-components';

import Box from '../shared/Box';
import AbilityTile from './AbilityTile';

const Abilities = ({ abilities }) => {
  const Layout = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      grid-area: abilities;
      display: grid;
      grid-gap: ${space.md};
    `;
  });

  return (
    <Layout>
      {Object.keys(abilities).map((k) => {
        const { name, mod, score } = abilities[k];
        return (
          <Box title={name} titleSize="sm" key={k}>
            <AbilityTile mod={mod} score={score} />
          </Box>
        );
      })}
    </Layout>
  );
};

export default Abilities;
