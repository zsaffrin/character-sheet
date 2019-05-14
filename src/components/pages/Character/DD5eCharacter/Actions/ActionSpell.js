import React, { Fragment } from 'react';
import { arrayOf, shape } from 'prop-types';
import styled from 'styled-components';

import { modFormat } from '../utils/characterUtils';
import FieldLabel from '../shared/FieldLabel';

const ActionSpell = ({ entries }) => {
  const Centered = styled.div`
    text-align: center;
  `;
  const Save = styled(Centered)(({ theme }) => {
    const { font } = theme;
    return `
      font-size: ${font.size.sm};
      text-transform: uppercase;
    `;
  });

  return (
    <>
      <FieldLabel />
      <Centered>
        <FieldLabel title="To Cast" />
      </Centered>
      <Centered>
        <FieldLabel title="Cast Time" />
      </Centered>
      <Centered>
        <FieldLabel title="Save" />
      </Centered>
      <Centered>
        <FieldLabel title="DC" />
      </Centered>
      {entries.map(({
        name, castBonus, castingTime, dc, save,
      }) => (
        <Fragment key={name}>
          <div>{name}</div>
          <Centered>{modFormat(castBonus)}</Centered>
          <Centered>{castingTime}</Centered>
          <Save>{save}</Save>
          <Centered>{dc}</Centered>
        </Fragment>
      ))}
    </>
  );
};
ActionSpell.propTypes = { entries: arrayOf(shape({})) };
ActionSpell.defaultProps = { entries: [] };

export default ActionSpell;
