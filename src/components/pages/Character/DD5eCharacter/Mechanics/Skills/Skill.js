import React from 'react';
import styled from 'styled-components';

const Skill = ({ skill }) => {
  const { name, proficient } = skill;
  const StyledSkill = styled.div(({ theme }) => {
    const { colors, font, space } = theme;
    return `
    color: ${proficient ? 'inherit' : colors.gray[5]};  
    display: grid;
    font-style: ${proficient ? 'inherit' : 'italic'};
    font-weight: ${proficient ? font.weight.body.bold : 'inherit'};
    
    `;
  });

  return <StyledSkill>{name}</StyledSkill>;
};

export default Skill;
