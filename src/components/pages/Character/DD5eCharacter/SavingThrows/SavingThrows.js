import React from 'react';
import { shape } from 'prop-types';
import styled from 'styled-components';

import { modFormat } from '../utils/characterUtils';
import Box from '../shared/Box';
import ScoreRow from '../shared/ScoreRow';

const SavingThrows = ({ data }) => {
  const SectionLayout = styled.div(({ theme }) => {
    const { space } = theme;
    return `
    display: grid;
    grid-gap: ${space.md};   
    grid-auto-rows: min-content;
    `;
  });

  return (
    <Box title="Saving Throws">
      <SectionLayout>
        {Object.keys(data).map((key) => {
          const { name, mod } = data[key];
          return <ScoreRow label={name} score={modFormat(mod)} key={key} />;
        })}
      </SectionLayout>
    </Box>
  );
};
SavingThrows.propTypes = { data: shape({}) };
SavingThrows.defaultProps = { data: {} };

export default SavingThrows;
