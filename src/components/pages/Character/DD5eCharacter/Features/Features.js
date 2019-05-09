import React from 'react';
import styled from 'styled-components';

import { Panel } from '../shared';

const Features = () => {
  const Layout = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      display: grid;
      grid-area: features;
    `;
  });

  return (
    <Layout>
      <Panel title="Features & Traits" />
    </Layout>
  );
};

export default Features;
