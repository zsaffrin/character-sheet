import React from 'react';
import styled from 'styled-components';

import { Panel } from '../shared';

const Proficiencies = () => {
  const Layout = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      display: grid;
      grid-area: proficiencies;
    `;
  });

  return (
    <Layout>
      <Panel title="Other Proficiencies & Languages" />
    </Layout>
  );
};

export default Proficiencies;
