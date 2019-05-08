import React from 'react';
import { shape } from 'prop-types';
import styled from 'styled-components';

import game from '../../../../data/game_dd5e.json';
import useAbilities from './utils/useAbilities';
import useSavingThrows from './utils/useSavingThrows';
import { prepareSkills } from './utils/characterUtils';
import Info from './Info/Info';
import Abilities from './Abilities/Abilities';
import Mechanics from './Mechanics/Mechanics';

const DD5eCharacter = ({ character }) => {
  const abilities = useAbilities(character, game);
  const saves = useSavingThrows(character, game, abilities);

  const skills = prepareSkills(game.skills, character.proficiencies, abilities);

  const Layout = styled.div(({ theme }) => {
    const { colors, space } = theme;
    return `
      color: ${colors.orange[8]};
      display: grid;
      grid-gap: ${space.md};
      grid-template-columns: auto 1fr 1fr 1fr;
      grid-template-rows: auto repeat(auto-fit, 1fr);
      grid-template-areas:
        'info info info info'
        'abilities mechanics combat characteristics'
        'abilities mechanics actions features'
        'proficiencies proficiencies equipment features';
    `;
  });

  return (
    <Layout>
      <Info character={character} game={game} />
      <Abilities abilities={abilities} />
      <Mechanics saves={saves} skills={skills} />
      <div style={{ gridArea: 'combat' }}>combat</div>
      <div style={{ gridArea: 'actions' }}>actions</div>
      <div style={{ gridArea: 'characteristics' }}>characteristics</div>
      <div style={{ gridArea: 'features' }}>features</div>
      <div style={{ gridArea: 'equipment' }}>equipment</div>
      <div style={{ gridArea: 'proficiencies' }}>proficiencies</div>
    </Layout>
  );
};
DD5eCharacter.propTypes = {
  character: shape({}).isRequired,
};

export default DD5eCharacter;
