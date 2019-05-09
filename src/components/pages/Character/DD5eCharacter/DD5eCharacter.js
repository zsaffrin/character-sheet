import React from 'react';
import { shape } from 'prop-types';
import styled from 'styled-components';

import game from '../../../../data/game_dd5e.json';
import {
  useAbilities,
  useProficiency,
  useSavingThrows,
  useSkills,
  useFeatures,
  useGear,
} from './utils/hooks';
import { ListSection } from './shared';
import Info from './Info/Info';
import Abilities from './Abilities/Abilities';
import Mechanics from './Mechanics/Mechanics';
import Actions from './Actions/Actions';
import Characteristics from './Characteristics/Characteristics';
import Equipment from './Equipment/Equipment';
import Proficiencies from './Proficiencies/Proficiencies';

const DD5eCharacter = ({ character }) => {
  const abilities = useAbilities(character, game);
  const saves = useSavingThrows(character, game, abilities);
  const proficiencyBonus = useProficiency(character, game);
  const skills = useSkills(character, game, abilities, proficiencyBonus);
  const features = useFeatures(character, game);
  const gear = useGear(character.gear, game.items);

  const Layout = styled.div(({ theme }) => {
    const { colors, font, space } = theme;
    return `
      color: ${colors.orange[8]};
      display: grid;
      font-size: ${font.size.normal};
      grid-gap: ${space.md};
      grid-template-columns: repeat(2, auto) repeat(2, 1fr);
      grid-template-rows: auto repeat(3, 1fr);
      grid-template-areas:
        'info info info info'
        'abilities mechanics combat characteristics'
        'abilities mechanics actions features'
        'proficiencies proficiencies equipment features';
      height: 100%;
    `;
  });

  return (
    <Layout>
      <Info character={character} game={game} />
      <Abilities abilities={abilities} />
      <Mechanics saves={saves} skills={skills} proficiency={proficiencyBonus} />
      <div style={{ gridArea: 'combat' }}>combat</div>
      <Actions />
      <Characteristics characteristics={character.characteristics} />
      <ListSection gridArea="features" title="Features & Traits" items={features} />
      <Equipment items={gear} />
      <Proficiencies />
    </Layout>
  );
};
DD5eCharacter.propTypes = {
  character: shape({}).isRequired,
};

export default DD5eCharacter;
