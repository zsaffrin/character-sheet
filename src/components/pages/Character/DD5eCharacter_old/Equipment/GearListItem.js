import React from 'react';
import styled from 'styled-components';

const GearListItem = ({ item }) => {
  const { cost, name, weight } = item;

  const StyledItem = styled.tr``;
  const Primary = styled.th(({ theme }) => {
    const { font } = theme;
    return `
      font-weight: ${font.weight.body.bold};
      text-align: left;
    `;
  });
  const Secondary = styled.td(({ theme }) => {
    const { font } = theme;
    return `
      font-size: ${font.size.sm};
      text-align: center;
    `;
  });

  return (
    <StyledItem>
      <Primary>{name}</Primary>
      <Secondary>{`${cost}gp`}</Secondary>
      <Secondary>{`${weight}lb`}</Secondary>
    </StyledItem>
  );
};

export default GearListItem;
