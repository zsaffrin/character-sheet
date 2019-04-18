import React from 'react';
import { shape } from 'prop-types';

const DD5eCharacter = ({ character }) => {
  const { name } = character;

  return (
    <div>
      <h1>{name}</h1>
      <p>D&amp;D 5e</p>
    </div>
  );
};
DD5eCharacter.propTypes = {
  character: shape({}).isRequired,
};

export default DD5eCharacter;
