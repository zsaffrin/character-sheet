import React from 'react';
import { shape } from 'prop-types';
import styled from 'styled-components';

import { modFormat } from '../utils/characterUtils';

const SkillEntry = ({ skill }) => {
  const {
    ability, bonus, name, proficient,
  } = skill;

  const Entry = styled.div(({ theme }) => {
    const { colors, space } = theme;
    return `
      align-items: center;  
      display: grid;
      grid-gap: ${space.thin};
      grid-template-columns: 1.5em auto 1fr;
      ${!proficient
        && `
        color: ${colors.gray[3]};
        font-style: italic;
      `}
    `;
  });
  const Score = styled.div(({ theme }) => {
    const { font } = theme;
    return `
      font-weight: ${font.weight.body.bold};
      text-align: center;
    `;
  });
  const Ability = styled.div(({ theme }) => {
    const { colors, font, space } = theme;
    return `
      color: ${colors.gray[3]};
      font-size: ${font.size.sm};
      padding: ${space.thin} ${space.sm} 0;
      text-transform: uppercase;
    `;
  });

  return (
    <Entry>
      <Score>{modFormat(bonus)}</Score>
      <div>{name}</div>
      <Ability>{ability}</Ability>
    </Entry>
  );
};
SkillEntry.propTypes = { skill: shape({}) };
SkillEntry.defaultProps = { skill: {} };

export default SkillEntry;
