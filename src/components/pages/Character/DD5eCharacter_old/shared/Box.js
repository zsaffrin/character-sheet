import React from 'react';
import styled from 'styled-components';

const Box = ({
  children, compact, title, titleSize,
}) => {
  const StyledBox = styled.div(({ theme }) => {
    const { boxRadius, colors } = theme;
    return `
      border: 1px solid ${colors.orange[1]};
      border-radius: ${boxRadius};
      display: grid;
      grid-template-columns: ${compact ? 'auto 1fr' : 'none'}
      grid-template-rows: min-content;
    `;
  });
  const BoxTitle = styled.div(({ theme }) => {
    const { colors, font, space } = theme;
    return `
      align-items: center;  
      background: ${colors.orange[1]};
      display: ${compact ? 'grid' : 'block'};
      font-size: ${titleSize ? font.size[titleSize] : 'inherit'};
      font-weight: ${font.weight.body.bold};
      order: ${compact ? '1' : '0'};
      padding: ${space.thin} ${space.md};
      text-align: center;
      text-transform: uppercase;
    `;
  });

  return (
    <StyledBox>
      {title && <BoxTitle>{title}</BoxTitle>}
      <div>{children}</div>
    </StyledBox>
  );
};

export default Box;
