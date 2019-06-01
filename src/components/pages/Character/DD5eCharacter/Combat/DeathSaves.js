import React from 'react';
import styled from 'styled-components';

import Box from '../shared/Box';
import ToggleSelect from '../shared/ToggleSelect';

const DeathSaves = () => {
  const SectionLayout = styled.div`
    align-items: center;
    display: grid;
    grid-template-columns: auto 1fr;
    justify-items: center;
  `;
  const Title = styled.div(({ theme }) => {
    const { font } = theme;
    return `
      font-size: ${font.size.sm};
      text-transform: uppercase;
    `;
  });

  return (
    <Box title="Death Saves">
      <SectionLayout>
        <Title>Success</Title>
        <div>
          <ToggleSelect />
          <ToggleSelect />
          <ToggleSelect />
        </div>
        <Title>Failure</Title>
        <div>
          <ToggleSelect />
          <ToggleSelect />
          <ToggleSelect />
        </div>
      </SectionLayout>
    </Box>
  );
};

export default DeathSaves;
