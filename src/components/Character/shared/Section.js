import React from 'react';
import styled from 'styled-components';

const Section = ({
  children, color, noHeader = false, title, titleColor, colSpan,
}) => {
  const StyledSection = styled.div(({ theme }) => {
    const { colors } = theme;
    return `
      border: 1px solid ${color ? colors[color[0]][color[1]] : colors.red[1]};
      border-radius: 3px;
      grid-column: ${colSpan ? `span ${colSpan}` : 'auto'};
    `;
  });
  const SectionHeader = styled.div(({ theme }) => {
    const { colors, spacing } = theme;
    return `
      background: ${color ? colors[color[0]][color[1]] : 'inherit'};
      color: ${titleColor ? colors[titleColor[0]][titleColor[1]] : 'inherit'};
      padding: ${spacing[1] || 0};
    `;
  });
  const SectionContent = styled.div(({ theme }) => {
    const { spacing } = theme;
    return `
      padding: ${spacing[1] || 0};
    `;
  });

  return (
    <StyledSection>
      {!noHeader && (
        <SectionHeader>
          <h3>{title}</h3>
        </SectionHeader>
      )}
      <SectionContent>{children}</SectionContent>
    </StyledSection>
  );
};

export default Section;
