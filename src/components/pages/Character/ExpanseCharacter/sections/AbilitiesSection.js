import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import styled from 'styled-components';

const AbilitiesSection = ({
  cAbilities, gAbilities, cFocuses, gFocuses,
}) => {
  const AbilityList = styled.ul(({ theme }) => {
    const { spacing } = theme;
    return `
      display: grid;
      grid-gap: ${spacing[1]};
      list-style: none;
      padding: 0;
    `;
  });
  const AbilityItem = styled.li(({ theme }) => {
    const { colors } = theme;
    return `
      border: 1px solid ${colors.blue[3]};
      display: grid;
      grid-template-columns: 1fr auto;
    `;
  });
  const AbilityTitle = styled.div(({ theme }) => {
    const { fontWeights, spacing } = theme;
    return `
    display: grid;
    align-items: center;  
    font-weight: ${fontWeights.body.bold};
    padding: ${spacing[1]};
    `;
  });
  const AbilityScore = styled.div(({ theme }) => {
    const { colors, fontWeights, spacing } = theme;
    return `
    background: ${colors.blue[7]};
    color: ${colors.gray[0]};
    font-weight: ${fontWeights.body.black};
    padding: ${spacing[1]} ${spacing[2]};
    `;
  });
  const AbilityFocusList = styled.ul(({ theme }) => {
    const { spacing } = theme;
    return `
      padding: ${spacing[1]};
      grid-column: 1 / -1;
      list-style: none;
      margin: 0;
    `;
  });
  const AbilityFocusItem = styled.li(({ theme }) => {
    const { colors, fontWeights, spacing } = theme;
    return `
      background: ${colors.gray[2]};
      border-radius: ${spacing[1]};
      font-size: 0.9em;
      font-weight: ${fontWeights.body.bold};
      padding: ${spacing[1]};
    `;
  });

  return (
    <div>
      <AbilityList>
        {Object.keys(cAbilities).map((a) => {
          const { name } = gAbilities[a] || '';
          const score = cAbilities[a] || 0;
          const focuses = cFocuses.map(f => gFocuses[f]);
          const filteredFocuses = focuses.filter(f => f.ability === a);
          return (
            <AbilityItem key={a}>
              <AbilityTitle>{name}</AbilityTitle>
              <AbilityScore>{score}</AbilityScore>
              {filteredFocuses.length > 0 && (
                <AbilityFocusList>
                  {filteredFocuses.map(({ name: fName }) => (
                    <AbilityFocusItem key={fName}>{fName}</AbilityFocusItem>
                  ))}
                </AbilityFocusList>
              )}
            </AbilityItem>
          );
        })}
      </AbilityList>
    </div>
  );
};
AbilitiesSection.propTypes = {
  cAbilities: shape({}),
  gAbilities: shape({}),
  cFocuses: arrayOf(string),
  gFocuses: shape({}),
};
AbilitiesSection.defaultProps = {
  cAbilities: {},
  gAbilities: {},
  cFocuses: [],
  gFocuses: {},
};

export default AbilitiesSection;
