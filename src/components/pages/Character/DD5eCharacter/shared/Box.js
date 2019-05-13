import React from 'react';
import styled from 'styled-components';

const Box = ({
  gridArea, children, textAlign, title, titleTop = false,
}) => {
  const OutsideWrap = styled.div(({ theme }) => {
    const { boxRadius, colors } = theme;
    return `
      border: 1px solid ${colors.orange[1]};
      border-radius: ${boxRadius};
      display: grid;
      ${gridArea && `grid-area: ${gridArea};`}
      grid-template-rows: 1fr min-content;
      grid-template-rows: ${titleTop ? 'auto 1fr' : '1fr auto'};
      ${textAlign && `text-align: ${textAlign};`}
    `;
  });
  const Title = styled.div(({ theme }) => {
    const { colors, font, space } = theme;
    return `
      background: ${colors.orange[1]};
      font-size: ${font.size.sm};
      font-weight: ${font.weight.body.black};
      padding: ${space.thin} ${space.md};
      text-align: center;
      text-transform: uppercase;
      ${titleTop && 'grid-row: 1;'}
    `;
  });
  const Content = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      display: grid;
      padding: ${space.sm};
    `;
  });

  return (
    <OutsideWrap>
      <Content>{children}</Content>
      {title && <Title>{title}</Title>}
    </OutsideWrap>
  );
};

export default Box;
