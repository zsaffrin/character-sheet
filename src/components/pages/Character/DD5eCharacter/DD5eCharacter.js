import React from 'react';
import { shape } from 'prop-types';
import styled from 'styled-components';

import game from '../../../../data/game_dd5e.json';
import SingleScoreSection from './shared/SingleScoreSection';
import useDD5eCharacter from './utils/hooks/useDD5eCharacter';
import Info from './Info/Info';
import Abilities from './Abilities/Abilities';
import SavingThrows from './SavingThrows/SavingThrows';
import Skills from './Skills/Skills';
import Characteristics from './Characteristics/Characteristics';
import Equipment from './Equipment/Equipment';
import Actions from './Actions/Actions';
import Proficiencies from './Proficiencies/Proficiencies';
import Combat from './Combat/Combat';

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
        'abilities singlescores combat characteristics'
        'abilities skills actions characteristics'
        'proficiencies proficiencies equipment characteristics';
      grid-template-columns: min-content auto 1fr minmax(min-content, 25%);
      grid-template-rows: min-content;
      min-height: 100%;
    `;
  });
  const SectionLayout = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      display: grid;
      grid-gap: ${space.md};
    `;
  });

  return (
    <PageLayout>
      <Info data={C.info} />
      <Abilities data={C.abilities} />
      <SectionLayout style={{ gridArea: 'singlescores' }}>
        <SingleScoreSection title="Inspiration" mod />
        <SingleScoreSection
          title="Proficiency Bonus"
          score={C.proficiencyBonus && C.proficiencyBonus.total}
          mod
        />
        <SingleScoreSection title="Passive Wisdom" mod />
        <SavingThrows data={C.savingThrows} />
      </SectionLayout>
      <Skills data={C.skills} />
      <Proficiencies data={C.proficiencies} />
      <Combat data={C.combat} />
      <Actions attacks={C.attacks} spells={C.spells} />
      <Equipment data={C.gear} />
      <Characteristics data={C.characteristics} features={C.features} />
    </PageLayout>
  );
};
DD5eCharacter.propTypes = { character: shape({}) };
DD5eCharacter.defaultProps = { character: {} };

export default DD5eCharacter;
