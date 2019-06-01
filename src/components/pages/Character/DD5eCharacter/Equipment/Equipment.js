import React, { Fragment } from 'react';
import { shape } from 'prop-types';
import styled from 'styled-components';

import { currency } from '../utils/characterUtils';
import Box from '../shared/Box';
import FieldLabel from '../shared/FieldLabel';

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
  const Total = styled(InfoCell)(({ theme }) => {
    const { font } = theme;
    return `
      font-weight: ${font.weight.body.bold};
    `;
  });
  const TotalTitle = styled(Total)`
    text-transform: uppercase;
    text-align: left;
  `;
  return (
    <Box gridArea="equipment" title="Equipment">
      <SectionLayout>
        {['Item', 'Value', 'Weight'].map(heading => (
          <div key={heading}>
            <FieldLabel title={heading} />
          </div>
        ))}
        {data.items.map(({ cost, name, weight }) => (
          <Fragment key={name}>
            <div>{name}</div>
            <InfoCell>{cost ? currency(cost) : '-'}</InfoCell>
            <InfoCell>{weight ? `${weight} lb` : '-'}</InfoCell>
          </Fragment>
        ))}
        <TotalTitle>Total</TotalTitle>
        <Total>{data && currency(data.totalValue)}</Total>
        <Total>{`${data.totalWeight} lb`}</Total>
      </SectionLayout>
    </Box>
  );
};
Equipment.propTypes = { data: shape({}) };
Equipment.defaultProps = { data: { items: [] } };

export default Equipment;
