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
  const InfoCell = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      padding: 0 ${space.sm};
    `;
  });
  const Bold = styled(InfoCell)(({ theme }) => {
    const { font } = theme;
    return `
      font-weight: ${font.weight.body.bold};
    `;
  });
  const BoldUpper = styled(Bold)`
    text-transform: uppercase;
  `;
  return (
    <Box gridArea="equipment" title="Equipment">
      <SectionLayout>
        {data.items.map(({ cost, name, weight }) => (
          <Fragment key={name}>
            <div>{name}</div>
            <InfoCell>{`${cost} gp`}</InfoCell>
            <InfoCell>{`${weight} lb`}</InfoCell>
          </Fragment>
        ))}
        <BoldUpper>Total</BoldUpper>
        <div />
        <Bold>{`${data.totalWeight} LB`}</Bold>
      </SectionLayout>
    </Box>
  );
};
Equipment.propTypes = { data: shape({}) };
Equipment.defaultProps = { data: { items: [] } };

export default Equipment;
