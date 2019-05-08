import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

const InfoTileCaption = ({ label }) => {
  const Caption = styled.div(({ theme }) => {
    const { colors, font } = theme;
    return `
      color: ${colors.orange[2]};
      font-weight: ${font.weight.body.bold};
      text-transform: uppercase;
    `;
  });

  return <Caption>{label}</Caption>;
};
InfoTileCaption.propTypes = {
  label: string,
};
InfoTileCaption.defaultProps = {
  label: '',
};

export default InfoTileCaption;
