import React from 'react';
import { shape, string } from 'prop-types';
import styled from 'styled-components';

import Box from '../shared/Box';

const Proficiencies = ({ data }) => {
  const SectionLayout = styled.div(({ theme }) => {
    const { font, space } = theme;
    return `
      display: grid;
      font-size: ${font.size.sm};
      grid-gap: ${space.lg};
    `;
  });
  const SubHeading = styled.span(({ theme }) => {
    const { font, space } = theme;
    return `
      font-weight: ${font.weight.body.bold};
      margin-right: ${space.sm};
      text-transform: uppercase;
    `;
  });

  return (
    <Box gridArea="proficiencies" title="Proficiencies">
      <SectionLayout>
        {['weapons', 'armor', 'tools', 'languages'].map(category => (
          <div key={category}>
            <SubHeading>{category}</SubHeading>
            {data[category] && Object.keys(data[category]).join(', ')}
          </div>
        ))}
      </SectionLayout>
    </Box>
  );
};
Proficiencies.propTypes = { data: shape({ proficienciesString: string }) };
Proficiencies.defaultProps = { data: { proficienciesString: '' } };

export default Proficiencies;
