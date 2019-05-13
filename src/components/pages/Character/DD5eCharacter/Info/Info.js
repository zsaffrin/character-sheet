import React from 'react';
import { shape } from 'prop-types';
import styled from 'styled-components';

import InfoField from './InfoField';

const Info = ({ data }) => {
  const {
    alignment, background, classes, name, race, xp,
  } = data;

  const StyledSection = styled.div`
    grid-area: info;
    display: grid;
    grid-auto-flow: column;
    align-items: end;
  `;

  return (
    <StyledSection>
      <InfoField label="Character Name" value={name} big />
      <InfoField label="Race" value={race} />
      <InfoField label="Classes" value={classes} />
      <InfoField label="Alignment" value={alignment} />
      <InfoField label="Background" value={background} />
      <InfoField label="XP" value={xp} />
    </StyledSection>
  );
};
Info.propTypes = { data: shape({}) };
Info.defaultProps = { data: {} };

export default Info;
