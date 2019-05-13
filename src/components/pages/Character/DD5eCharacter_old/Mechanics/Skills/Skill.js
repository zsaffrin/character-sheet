import React from 'react';
import styled from 'styled-components';

import { modFormat } from '../../utils/characterUtils';

const Skill = ({ skill }) => {
  const {
    ability, bonus, name, proficient,
  } = skill;
  const StyledSkill = styled.div(({ theme }) => {
    const { colors, font, space } = theme;
    return `
      align-items: center;
      color: ${proficient ? 'inherit' : colors.gray[7]};  
      display: grid;
      font-style: ${proficient ? 'inherit' : 'italic'};
      font-weight: ${proficient ? font.weight.body.bold : 'inherit'};
      grid-gap: ${space.sm};
      grid-template-columns: auto auto 1fr;
    `;
  });
  const SkillMod = styled.div`
    text-align: center;
  `;
  const SkillAbility = styled.div(({ theme }) => {
    const { colors, font, space } = theme;
    return `
    color: ${colors.orange[1]};
    font-size: ${font.size.sm};
    font-style: normal;
    font-weight: ${font.weight.body.regular};
    padding-top: ${space.thin};
    text-transform: uppercase;
    `;
  });

  return (
    <StyledSkill>
      <SkillMod>{modFormat(bonus)}</SkillMod>
      <div>{name}</div>
      <SkillAbility>{ability}</SkillAbility>
    </StyledSkill>
  );
};

export default Skill;
