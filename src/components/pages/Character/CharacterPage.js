import React from 'react';
import { string } from 'prop-types';

import ExpanseCharacter from './ExpanseCharacter/ExpanseCharacter';
import DD5eCharacter from './DD5eCharacter';

import characterData from '../../../data/characters.json';

const CharacterPage = ({ id }) => {
  const char = characterData.find(c => c.id === id);
  if (!char) return <div>{`Character ${id} not found`}</div>;

  if (char.gameKey === 'expanse') return <ExpanseCharacter character={char} />;
  if (char.gameKey === 'dd5e') return <DD5eCharacter character={char} />;

  return (
    <div>Character doesn&apos;t have a valid gameKey or no layout is defined for this Game</div>
  );
};
CharacterPage.propTypes = {
  id: string,
};
CharacterPage.defaultProps = {
  id: '',
};

export default CharacterPage;
