import React from 'react';
import styled from 'styled-components';

import { modFormat } from '../../utils/characterUtils';

const Skill = ({ skill }) => {
  const { bonus, name, proficient } = skill;
  const StyledSkill = styled.div(({ theme }) => {
    const { colors, font } = theme;
    return `
      color: ${proficient ? 'inherit' : colors.gray[5]};  
      display: grid;
      font-style: ${proficient ? 'inherit' : 'italic'};
      font-weight: ${proficient ? font.weight.body.bold : 'inherit'};
    `;
  });

  return <StyledSkill>{`${modFormat(bonus)} ${name}`}</StyledSkill>;
};

export default Skill;
