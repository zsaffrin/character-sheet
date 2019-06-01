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
    const { colors, font, space } = theme;
    return `
      background: ${colors.blue[7]};
      color: ${colors.gray[0]};
      font-size: 1.1em;
      font-weight: ${font.weight.body.bold};
      padding: 0 ${space.sm};
      text-transform: uppercase;
    `;
  });
  const SectionContent = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      padding: ${space.sm};
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
