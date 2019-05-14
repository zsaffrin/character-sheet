import React from 'react';
import { shape } from 'prop-types';
import styled from 'styled-components';

import Box from '../shared/Box';
import SkillEntry from './SkillEntry';

const Skills = ({ data }) => {
  const SectionLayout = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      display: grid;
      grid-gap: ${space.thin};
    `;
  });

  return (
    <Box gridArea="skills" title="Skills">
      <SectionLayout>
        {Object.keys(data).map(key => (
          <SkillEntry skill={data[key]} key={key} />
        ))}
      </SectionLayout>
    </Box>
  );
};
Skills.propTypes = { data: shape({}) };
Skills.defaultProps = { data: {} };

export default Skills;
