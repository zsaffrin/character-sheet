import React from 'react';
import styled from 'styled-components';

import Box from '../../shared/Box';
import Skill from './Skill';

const Skills = ({ skills }) => {
  const Layout = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      display: grid;
      padding: ${space.sm};
    `;
  });

  return (
    <Box title="Skills">
      <Layout>
        {Object.keys(skills).map(s => (
          <Skill skill={skills[s]} key={s} />
        ))}
      </Layout>
    </Box>
  );
};

export default Skills;
