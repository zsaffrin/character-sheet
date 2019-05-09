import React from 'react';
import styled from 'styled-components';

import { Panel } from '../shared';

const Equipment = () => {
  const Layout = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      display: grid;
      grid-area: equipment;
    `;
  });

  return (
    <Layout>
      <Panel title="Equipment" />
    </Layout>
  );
};

export default Equipment;
