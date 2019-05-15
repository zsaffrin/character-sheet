import React from 'react';
import { number, shape } from 'prop-types';
import styled from 'styled-components';

import Box from '../shared/Box';
import ToggleSelect from '../shared/ToggleSelect';
import CombatTile from './CombatTile';
import DeathSaves from './DeathSaves';
import HP from './HP';

const Combat = ({ data }) => {
  const SectionLayout = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      display: grid;
      grid-gap: ${space.md};
    `;
  });
  const Section = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      display: grid;
      grid-gap: ${space.md};
    `;
  });
  const Tiles = styled(Section)`
    grid-template-columns: repeat(3, 1fr);
  `;
  const Saves = styled(Section)`
    grid-template-columns: repeat(2, 1fr);
  `;

  return (
    <Box gridArea="combat" title="Combat">
      <SectionLayout>
        <Tiles>
          <CombatTile name="AC" score={data.ac} />
          <CombatTile name="Initiative" score={data.initiative} mod />
          <CombatTile name="Speed" score={data.speed && `${data.speed} ft`} />
        </Tiles>
        <HP maxHp={data.maxHp} />
        <Saves>
          <Box title="Hit Dice">
            <ToggleSelect />
          </Box>
          <DeathSaves />
        </Saves>
      </SectionLayout>
    </Box>
  );
};
Combat.propTypes = {
  data: shape({
    ac: number,
    initiative: number,
    speed: number,
  }),
};
Combat.defaultProps = {
  data: {
    ac: 0,
    initiative: 0,
    speed: 0,
  },
};

export default Combat;
