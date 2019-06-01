import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import styled from 'styled-components';

const AbilitiesSection = ({
  cAbilities, gAbilities, cFocuses, gFocuses,
}) => {
  const AbilityList = styled.ul(({ theme }) => {
    const { space } = theme;
    return `
      display: grid;
      grid-gap: ${space.sm};
      list-style: none;
      padding: 0;
      margin: 0;
    `;
  });
  const AbilityItem = styled.li(({ theme }) => {
    const { colors } = theme;
    return `
      border: 1px solid ${colors.blue[3]};
      border-radius: 5px;
      display: grid;
      grid-template-columns: 1fr auto;
    `;
  });
  const AbilityTitle = styled.div(({ theme }) => {
    const { font, space } = theme;
    return `
    display: grid;
    align-items: center;  
    font-weight: ${font.weight.body.bold};
    padding: ${space.sm};
    `;
  });
  const AbilityScore = styled.div(({ theme }) => {
    const { colors, font, space } = theme;
    return `
      background: ${colors.blue[7]};
      color: ${colors.gray[0]};
      font-weight: ${font.weight.body.black};
      padding: ${space.sm} ${space.md};
    `;
  });
  const AbilityFocusList = styled.ul(({ theme }) => {
    const { space } = theme;
    return `
      padding: ${space.sm};
      grid-column: 1 / -1;
      list-style: none;
      margin: 0;
    `;
  });
  const AbilityFocusItem = styled.li(({ theme }) => {
    const { colors } = theme;
    return `
      border: 1px solid ${colors.gray[2]};
      border-radius: 3px;
      font-size: 0.9em;
    `;
  });
  const AbilityFocusItemHeader = styled.div(({ theme }) => {
    const { colors, font, space } = theme;
    return `
      background: ${colors.gray[2]};
      font-weight: ${font.weight.body.bold};
      padding: 0 ${space.sm};
    `;
  });
  const AbilityFocusItemContent = styled.div(({ theme }) => {
    const { colors, space } = theme;
    return `
      color: ${colors.blue[4]};
      font-size: 0.8em;  
      padding: ${space.sm};
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
                  {filteredFocuses.map(({ name: fName, desc }) => (
                    <AbilityFocusItem key={fName}>
                      <AbilityFocusItemHeader>{fName}</AbilityFocusItemHeader>
                      <AbilityFocusItemContent>{desc}</AbilityFocusItemContent>
                    </AbilityFocusItem>
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
