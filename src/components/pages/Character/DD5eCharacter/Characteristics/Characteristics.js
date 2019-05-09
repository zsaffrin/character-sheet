import React from 'react';
import styled from 'styled-components';

import { Panel } from '../shared';

const Characteristics = () => {
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
      <Panel title="Personality Traits" />
      <Panel title="Ideals" />
      <Panel title="Bonds" />
      <Panel title="Flaws" />
    </Layout>
  );
};

export default Characteristics;
