import React from 'react';
import styled from 'styled-components';

import { Panel } from '../shared';
import ActionSection from './ActionSection';

const Actions = ({ abilities, weapons }) => {
  const Layout = styled.div`
    display: grid;
    grid-area: actions;
  `;

  return (
    <Layout>
      <Panel title="Attacks & Spellcasting">
        <ActionSection title="Melee Attacks" type="attack" items={weapons} abilities={abilities} />
        <ActionSection title="Cantrips" />
        <ActionSection title="Spells" />
      </Panel>
    </Layout>
  );
};

export default Actions;