import React from 'react';
import { arrayOf, shape } from 'prop-types';
import styled from 'styled-components';

import Box from '../shared/Box';
import ActionCategory from './ActionCategory';

const Actions = ({ attacks, spells }) => {
  const SectionLayout = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      display: grid;
      grid-gap: ${space.md};
    `;
  });
  return (
    <Box gridArea="actions" title="Actions">
      <SectionLayout>
        <ActionCategory title="Melee Attacks" entries={attacks.melee} type="attack" />
        <ActionCategory title="Ranged Attacks" entries={attacks.ranged} type="attack" />
        <ActionCategory title="Cantrips" entries={spells.cantrips} type="spell" />
        <ActionCategory title="Spells" entries={spells.spells} type="spell" />
      </SectionLayout>
    </Box>
  );
};
Actions.propTypes = {
  attacks: shape({
    melee: arrayOf(shape({})),
    ranged: arrayOf(shape({})),
  }),
  spells: shape({
    cantrips: arrayOf(shape({})),
    spells: arrayOf(shape({})),
  }),
};
Actions.defaultProps = { attacks: { melee: [], ranged: [] }, spells: { cantrips: [], spells: [] } };

export default Actions;
