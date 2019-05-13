import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

const FieldLabel = ({ title }) => {
  const StyledLabel = styled.span(({ theme }) => {
    const { colors, font } = theme;
    return `
      color: ${colors.orange[2]};
      font-size: ${font.size.sm};
      font-weight: ${font.weight.body.bold};
      text-transform: uppercase;
    `;
  });

  return <StyledLabel>{title}</StyledLabel>;
};
FieldLabel.propTypes = { title: string };
FieldLabel.defaultProps = { title: '' };

export default FieldLabel;
