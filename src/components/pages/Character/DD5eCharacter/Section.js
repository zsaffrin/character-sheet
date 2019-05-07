import React from 'react';
import { arrayOf, oneOfType, node } from 'prop-types';
import styled from 'styled-components';

const Section = ({ children }) => {
  const SectionLayout = styled.div(({ theme }) => {
    const { colors } = theme;
    return `
      border: 1px solid ${colors.orange[1]};
    `;
  });

  return <SectionLayout>{children}</SectionLayout>;
};
Section.propTypes = {
  children: oneOfType([node, arrayOf(node)]),
};
Section.defaultProps = {
  children: [],
};

export default Section;
