import React from 'react';
import { shape } from 'prop-types';

const ExpanseCharacter = ({ character }) => {
  const { name } = character;

  return (
    <div>
      <h1>{name}</h1>
      <pre>{JSON.stringify(character, ' ', 2)}</pre>
    </div>
  );
};
ExpanseCharacter.propTypes = {
  character: shape({}).isRequired,
};

export default ExpanseCharacter;
