import React, { Fragment } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import styled from 'styled-components';

import { higherVal, modFormat } from '../utils/characterUtils';

const ActionSection = ({
  abilities, items, title, type,
}) => {
  const StyledSection = styled.div`
    display: grid;
    grid-template-rows: auto 1fr;
  `;

  const Title = styled.div(({ theme }) => {
    const { font } = theme;
    return `
      font-weight: ${font.weight.body.bold};
      text-transform: uppercase;
    `;
  });

  const Content = styled.div`
    display: grid;
    align-items: center;
    justify-items: center;
    grid-template-columns: repeat(3, auto);
    grid-auto-rows: min-content;
  `;

  const Header = styled.div(({ theme }) => {
    const { colors, font } = theme;
    return `
      color: ${colors.orange[2]};
      font-size: ${font.size.sm};
      font-weight: ${font.weight.body.bold};
      text-transform: uppercase;
      `;
  });

  const PrimaryCell = styled.div`
    text-align: left;
  `;

  return (
    <StyledSection>
      <Title>{title}</Title>
      <Content>
        <Header>Weapon</Header>
        <Header>Attack</Header>
        <Header>Damage</Header>
        {items.map(({
          damageDice, damageDie, damageType, name, properties, weaponType,
        }) => {
          let attackBonus = 0;
          if (properties.indexOf('finesse') >= 0) {
            attackBonus += higherVal(abilities.str.mod, abilities.dex.mod);
          } else if (weaponType === 'melee') {
            attackBonus += abilities.str.mod;
          } else if (weaponType === 'ranged') {
            attackBonus += abilities.dex.mod;
          }

          return (
            <Fragment key={name}>
              <PrimaryCell>{name}</PrimaryCell>
              <div>{modFormat(attackBonus)}</div>
              <div>{`${damageDice}d${damageDie} ${damageType}`}</div>
            </Fragment>
          );
        })}
      </Content>
    </StyledSection>
  );
};
ActionSection.propTypes = {
  title: string,
  items: arrayOf(shape({})),
};
ActionSection.defaultProps = {
  title: '',
  items: [],
};

export default ActionSection;
