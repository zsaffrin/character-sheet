import React from 'react';
import styled from 'styled-components';

import Abilities from './Abilities';
import HorizontalScore from './HorizontalScore';

const Mechanics = ({ character: C, game: G }) => {
  const Layout = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      grid-area: info;
      display: grid;
      grid-gap: ${space.md};
      grid-template-columns: auto 1fr;
    `;
  });
  const RightColumn = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      display: grid;
      grid-gap: ${space.md};
      grid-auto-rows: min-content;
    `;
  });

  return (
    <Layout>
      <Abilities charAbilities={C.abilityScores} gameAbilities={G.abilities} />
      <RightColumn>
        <HorizontalScore label="Inspiration" score="0" />
        <HorizontalScore label="Proficiency" score="0" />
        <div>Saving Throws</div>
        <div>Skills</div>
      </RightColumn>
    </Layout>
  );
};

export default Mechanics;
