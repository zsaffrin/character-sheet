import React from 'react';
import styled from 'styled-components';

const Panel = ({ children, title }) => {
  const StyledPanel = styled.div(({ theme }) => {
    const { boxRadius, colors } = theme;
    return `
      border: 1px solid ${colors.orange[1]};
      border-radius: ${boxRadius};
      display: grid;
      grid-template-rows: 1fr auto;
    `;
  });
  const PanelTitle = styled.div(({ theme }) => {
    const { colors, font, space } = theme;
    return `
      background: ${colors.orange[1]};
      font-size: ${font.size.sm};
      font-weight: ${font.weight.body.bold};
      padding: ${space.sm};
      text-align: center;
      text-transform: uppercase;
    `;
  });
  const PanelContent = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      display: grid;
      padding: ${space.sm};
    `;
  });

  return (
    <StyledPanel>
      <PanelContent>{children}</PanelContent>
      {title && <PanelTitle>{title}</PanelTitle>}
    </StyledPanel>
  );
};

export default Panel;
