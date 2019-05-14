import React, { Fragment } from 'react';
import { arrayOf, shape } from 'prop-types';
import styled from 'styled-components';

import { modFormat } from '../utils/characterUtils';
import FieldLabel from '../shared/FieldLabel';

const ActionAttack = ({ entries }) => {
  const Centered = styled.div`
    text-align: center;
  `;

  return (
    <>
      <FieldLabel />
      <Centered>
        <FieldLabel title="Attack" />
      </Centered>
      <Centered>
        <FieldLabel title="Damage" />
      </Centered>
      {entries.map(({ name, bonus, damage }) => (
        <Fragment key={name}>
          <div>{name}</div>
          <Centered>{modFormat(bonus)}</Centered>
          <Centered>{`${damage} + ${bonus}`}</Centered>
        </Fragment>
      ))}
    </>
  );
};
ActionAttack.propTypes = { entries: arrayOf(shape({})) };
ActionAttack.defaultProps = { entries: [] };

export default ActionAttack;
