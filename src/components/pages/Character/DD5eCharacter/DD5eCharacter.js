import React from 'react';
import { shape } from 'prop-types';

import game from '../../../../data/game_dd5e.json';
import Section from './Section';
import DefaultLayout from './DefaultLayout';
import CharacterInfo from './CharacterInfo/CharacterInfo';

const DD5eCharacter = ({ character }) => {
  const sections = [
    <div>mechanics</div>,
    <div>combat</div>,
    <div>actions</div>,
    <div>characteristics</div>,
    <div>features</div>,
    <div>equipment</div>,
    <div>proficiencies</div>,
  ];

  return (
    <DefaultLayout>
      <CharacterInfo character={character} game={game} />

      {sections.map((s, i) => (
        <Section key={i}>{s}</Section>
      ))}
    </DefaultLayout>
  );
};
DD5eCharacter.propTypes = {
  character: shape({}).isRequired,
};

export default DD5eCharacter;
