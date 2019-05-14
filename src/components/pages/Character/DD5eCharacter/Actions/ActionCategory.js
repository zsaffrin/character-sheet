import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import styled from 'styled-components';

import ActionAttack from './ActionAttack';
import ActionSpell from './ActionSpell';

const ActionCategory = ({ entries, title, type }) => {
  const SectionLayout = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      align-items: center;  
      display: grid;
      grid-gap: ${space.thin};
      grid-auto-rows: min-content;
      grid-template-columns: repeat(${type === 'attack' ? 3 : 5}, auto);
    `;
  });
  const Title = styled.div(({ theme }) => {
    const { font } = theme;
    return `
      grid-column: 1 / -1;
      font-size: ${font.size.sm};
      font-weight: ${font.weight.body.black};
      text-transform: uppercase;
    `;
  });

  return (
    <SectionLayout>
      <Title>{title}</Title>
      {type === 'attack' && <ActionAttack entries={entries} />}
      {type === 'spell' && <ActionSpell entries={entries} />}
    </SectionLayout>
  );
};
ActionCategory.propTypes = { title: string, entries: arrayOf(shape({})), type: string };
ActionCategory.defaultProps = { title: '', entries: [], type: '' };

export default ActionCategory;
