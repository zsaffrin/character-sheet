import React, { Fragment } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import styled from 'styled-components';

import { modFormat } from '../utils/characterUtils';
import FieldLabel from '../shared/FieldLabel';

const ActionAttack = ({ entries, type }) => {
  const columnTitles = ['Attack', 'Damage', 'Type'];
  if (type === 'ranged') {
    columnTitles.splice(0, 0, 'Range');
  }

  const Centered = styled.div`
    text-align: center;
  `;
  const Title = styled.div(({ theme }) => {
    const { font } = theme;
    return `
      font-weight: ${font.weight.body.bold};
    `;
  });
  const SmallCaps = styled(Centered)(({ theme }) => {
    const { font } = theme;
    return `
      align-items: center;  
      display: grid;
      font-size: ${font.size.xs};
      text-transform: uppercase;
    `;
  });

  return (
    <>
      <FieldLabel />
      {columnTitles.map(title => (
        <Centered key={title}>
          <FieldLabel title={title} />
        </Centered>
      ))}
      {entries.map(({
        name, attackBonus, damageBonus, damage, damageType, range,
      }) => (
        <Fragment key={name}>
          <Title>{name}</Title>
          {type === 'ranged' && <Centered>{range}</Centered>}
          <Centered>{modFormat(attackBonus)}</Centered>
          <Centered>{`${damage} + ${damageBonus}`}</Centered>
          <SmallCaps>{damageType}</SmallCaps>
        </Fragment>
      ))}
    </>
  );
};
ActionAttack.propTypes = { entries: arrayOf(shape({})), type: string };
ActionAttack.defaultProps = { entries: [], type: '' };

export default ActionAttack;
