import React from 'react';
import styled from 'styled-components';

import { Panel } from '../shared';

const Actions = () => {
  const Layout = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      display: grid;
      grid-area: actions;
    `;
  });

  return (
    <Layout>
      <Panel title="Attacks & Spellcasting" />
    </Layout>
  );
};

export default Actions;
