import React from 'react';
import styled from 'styled-components';

import game from '../../../../data/game_dd5e.json';
import Box from './shared/Box';
import useDD5eCharacter from './utils/hooks/useDD5eCharacter';

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
        'abilities saves attacks features'
        'abilities skills attacks features'
        'passiveWisdom passiveWisdom equipment features'
        'proficiencies proficiencies equipment features';
      height: 100%;
    `;
  });

  return (
    <PageLayout>
      <Box gridArea="info" title="Info" />
      <Box gridArea="abilities" title="Abilities" />
      <Box gridArea="inspiration" title="Inspiration" />
      <Box gridArea="proficiencyBonus" title="Proficiency Bonus" />
      <Box gridArea="saves" title="Saving Throws" />
      <Box gridArea="skills" title="Skills" />
      <Box gridArea="passiveWisdom" title="Passive Wisdom" />
      <Box gridArea="proficiencies" title="Proficiencies" />
      <Box gridArea="combat" title="Combat" />
      <Box gridArea="attacks" title="Attacks & Spellcasting" />
      <Box gridArea="equipment" title="Equipment" />
      <Box gridArea="characteristics" title="Characteristics" />
      <Box gridArea="features" title="Features & Traits" />
    </PageLayout>
  );
};

export default DD5eCharacter;
