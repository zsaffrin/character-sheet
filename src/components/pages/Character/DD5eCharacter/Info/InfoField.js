import React from 'react';
import {
  bool, oneOfType, number, string,
} from 'prop-types';
import styled from 'styled-components';

import FieldLabel from '../shared/FieldLabel';

const InfoField = ({ big, label, value }) => {
  const StyledLabel = styled.div(({ theme }) => {
    const { colors } = theme;
    return `
      border-top: 1px solid ${colors.orange[1]};
    `;
  });

  return (
    <div>
      <div>{big ? <h1>{value}</h1> : value}</div>
      <StyledLabel>
        <FieldLabel title={label} />
      </StyledLabel>
    </div>
  );
};
InfoField.propTypes = {
  big: bool,
  label: string,
  value: oneOfType([number, string]),
};
InfoField.defaultProps = {
  big: false,
  label: '',
  value: '',
};

export default InfoField;
