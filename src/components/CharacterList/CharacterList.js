import React from 'react';
import { Link } from '@reach/router';

import characterData from '../../data/characters.json';

const CharacterList = () => {
  const characterNodes = characterData.map(({ id, name }) => (
    <li key={id}>
      <Link to={`/character/${id}`}>{name}</Link>
    </li>
  ));

  return (
    <div>
      <h2>Character List</h2>
      <ul>{characterNodes}</ul>
    </div>
  );
};

export default CharacterList;
