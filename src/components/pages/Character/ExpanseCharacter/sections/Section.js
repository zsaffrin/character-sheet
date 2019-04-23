import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

const Section = ({ children, title }) => {
  const StyledSection = styled.div(({ theme }) => {
    const { colors } = theme;
    return `
      border: 1px solid ${colors.blue[7]};
    `;
  });
  const SectionHeader = styled.div(({ theme }) => {
    const { colors, fontWeights, spacing } = theme;
    return `
      background: ${colors.blue[7]};
      color: ${colors.gray[0]};
      font-size: 1.1em;
      font-weight: ${fontWeights.body.bold};
      padding: 0 ${spacing[1]};
      text-transform: uppercase;
    `;
  });
  const SectionContent = styled.div(({ theme }) => {
    const { spacing } = theme;
    return `
      padding: ${spacing[1]};
    `;
  });

  return (
    <StyledSection>
      <SectionHeader>{title}</SectionHeader>
      <SectionContent>{children}</SectionContent>
    </StyledSection>
  );
};
Section.propTypes = {
  title: string,
};
Section.defaultProps = {
  title: '',
};

export default Section;
