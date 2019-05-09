import React from 'react';
import styled from 'styled-components';

import { ListSection } from '../shared';

const Characteristics = ({ characteristics }) => {
  const {
    bonds, flaws, ideals, personalityTraits,
  } = characteristics;

  const Layout = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      grid-area: characteristics;
      display: grid;
      grid-gap: ${space.sm};
    `;
  });

  return (
    <Layout>
      <ListSection title="Personality Traits" items={personalityTraits} />
      <ListSection title="Ideals" items={ideals} />
      <ListSection title="Bonds" items={bonds} />
      <ListSection title="Flaws" items={flaws} />
    </Layout>
  );
};

export default Characteristics;
