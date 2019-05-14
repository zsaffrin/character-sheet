import React, { Fragment } from 'react';
import { shape } from 'prop-types';
import styled from 'styled-components';

import Box from '../shared/Box';

const Equipment = ({ data }) => {
  const SectionLayout = styled.div(({ theme }) => {
    const { font, space } = theme;
    return `
      display: grid;
      font-size: ${font.size.sm};
      grid-gap: ${space.sm};
      grid-template-columns: 1fr auto auto;
    `;
  });
  return (
    <Box gridArea="equipment" title="Equipment">
      <SectionLayout>
        {data.items.map(({ cost, name, weight }) => (
          <Fragment key={name}>
            <div>{name}</div>
            <div>{`${cost}gp`}</div>
            <div>{`${weight}lb`}</div>
          </Fragment>
        ))}
      </SectionLayout>
    </Box>
  );
};
Equipment.propTypes = { data: shape({}) };
Equipment.defaultProps = { data: { items: [] } };

export default Equipment;
