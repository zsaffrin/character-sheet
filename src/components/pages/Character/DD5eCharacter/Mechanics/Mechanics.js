import React from 'react';
import styled from 'styled-components';

import HorizontalScore from '../shared/HorizontalScore';
import SavingThrows from './SavingThrows';
import Skills from './Skills/Skills';

const Mechanics = ({ saves, skills }) => {
  const Layout = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      grid-area: mechanics;
      display: grid;
      grid-gap: ${space.lg};
      grid-template-rows: repeat(3, auto) 1fr;
    `;
  });

  return (
    <Layout>
      <HorizontalScore title="Inspiration" mod />
      <HorizontalScore title="Proficiency Bonus" mod />
      <SavingThrows saves={saves} />
      <Skills skills={skills} />
    </Layout>
  );
};

export default Mechanics;
