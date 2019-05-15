import React from 'react';
import { shape } from 'prop-types';
import styled from 'styled-components';

import Box from '../shared/Box';
import AbilityTile from './AbilityTile';

const Abilities = ({ data }) => {
  const SectionLayout = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      display: grid;
      grid-gap: ${space.md};
    `;
  });

  return (
    <Box gridArea="abilities" title="Abilities">
      <SectionLayout>
        {Object.keys(data).map(key => (
          <AbilityTile ability={data[key]} key={key} />
        ))}
      </SectionLayout>
    </Box>
  );
};
Abilities.propTypes = { data: shape({}) };
Abilities.defaultProps = { data: {} };

export default Abilities;
