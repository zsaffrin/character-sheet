import React from 'react';
import styled from 'styled-components';

import { Panel } from '../shared';
import GearList from './GearList';
import Totals from './Totals';

const Equipment = ({ items }) => {
  const Layout = styled.div`
    display: grid;
    grid-area: equipment;
  `;
  const InnerLayout = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      display: grid;
      grid-gap: ${space.sm};
      grid-template-rows: 1fr auto;
      padding: ${space.sm};
    `;
  });

  return (
    <Layout>
      <Panel title="Equipment">
        <InnerLayout>
          <GearList items={items} />
          <Totals items={items} />
        </InnerLayout>
      </Panel>
    </Layout>
  );
};

export default Equipment;
