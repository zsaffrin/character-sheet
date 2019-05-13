import React from 'react';
import styled from 'styled-components';

import { Panel } from '../../shared';
import Skill from './Skill';

const Skills = ({ skills }) => {
  const Layout = styled.div`
    display: grid;
  `;

  return (
    <Panel title="Skills">
      <Layout>
        {Object.keys(skills).map(s => (
          <Skill skill={skills[s]} key={s} />
        ))}
      </Layout>
    </Panel>
  );
};

export default Skills;
