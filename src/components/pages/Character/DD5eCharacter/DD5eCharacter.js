import React from 'react';
import styled from 'styled-components';

import game from '../../../../data/game_dd5e.json';
import Box from './shared/Box';
import ListSection from './shared/ListSection';
import useDD5eCharacter from './utils/hooks/useDD5eCharacter';
import Info from './Info/Info';
import Abilities from './Abilities/Abilities';
import SavingThrows from './SavingThrows/SavingThrows';
import Skills from './Skills/Skills';
import Characteristics from './Characteristics/Characteristics';
import Equipment from './Equipment/Equipment';
import Actions from './Actions/Actions';

const DD5eCharacter = ({ character }) => {
  const { character: C } = useDD5eCharacter(character, game);
  console.info(C);

  const PageLayout = styled.div(({ theme }) => {
    const { colors, font, space } = theme;
    return `
      color: ${colors.orange[8]};
      display: grid;
      font-size: ${font.size.normal};
      grid-gap: ${space.md};
      grid-template-areas:
        'info info info info'
        'abilities inspiration combat characteristics'
        'abilities proficiencyBonus combat characteristics'
        'abilities saves actions features'
        'abilities skills actions features'
        'passiveWisdom passiveWisdom equipment features'
        'proficiencies proficiencies equipment features';
      grid-template-columns: auto auto 1fr 1fr;
      grid-template-rows: min-content;
      min-height: 100%;
    `;
  });

  return (
    <PageLayout>
      <Info data={C.info} />
      <Abilities data={C.abilities} />
      <Box gridArea="inspiration" title="Inspiration" />
      <Box gridArea="proficiencyBonus" title="Proficiency Bonus" />
      <SavingThrows data={C.savingThrows} />
      <Skills data={C.skills} />
      <Box gridArea="passiveWisdom" title="Passive Wisdom" />
      <Box gridArea="proficiencies" title="Proficiencies" />
      <Box gridArea="combat" title="Combat" />
      <Actions attacks={C.attacks} spells={C.spells} />
      <Equipment data={C.gear} />
      <Characteristics data={C.characteristics} />
      <ListSection gridArea="features" title="Features & Traits" items={C.features} />
    </PageLayout>
  );
};

export default DD5eCharacter;
