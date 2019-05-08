import React from 'react';
import styled from 'styled-components';

import Box from '../shared/Box';
import HorizontalScore from '../shared/HorizontalScore';

const SavingThrows = ({ saves }) => {
  const Layout = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      display: grid;
      grid-gap: ${space.lg};
      padding: ${space.lg};
    `;
  });

  return (
    <Box title="Saving Throws">
      <Layout>
        {Object.keys(saves).map((key) => {
          const { name, mod } = saves[key];
          return <HorizontalScore title={name} score={mod} key={key} mod />;
        })}
      </Layout>
    </Box>
  );
};

export default SavingThrows;
