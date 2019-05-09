import React from 'react';
import styled from 'styled-components';

const Totals = ({ items }) => {
  const totalWeight = items.reduce((total, item) => total + item.weight, 0);

  const StyledTotals = styled.div(({ theme }) => {
    const { font } = theme;
    return `
      font-size: ${font.size.sm}
      text-align: right;
      text-transform: uppercase;
    `;
  });
  const Subtext = styled.span(({ theme }) => {
    const { font } = theme;
    return `
      font-size: ${font.size.xs}
    `;
  });

  return (
    <StyledTotals>
      {`Total Weight: ${totalWeight} `}
      <Subtext>lb</Subtext>
    </StyledTotals>
  );
};

export default Totals;
