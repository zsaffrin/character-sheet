import React from 'react';
import { shape, string } from 'prop-types';
import styled from 'styled-components';

import InfoTile from './InfoTile';

const totalXp = xp => xp.reduce((acc, entry) => acc + entry.points, 0);

const CharacterInfo = ({ character: C, game: G }) => {
  const classString = Object.keys(C.classLevels)
    .map(c => `${G.classes[c].name} ${C.classLevels[c]}`)
    .join(' ');

  const Layout = styled.div`
    grid-area: info;
    display: grid;
    grid-auto-flow: column;
  `;

  return (
    <Layout>
      <InfoTile title="Character Name" value={C.name} big />
      <InfoTile title="Race" value={G.races[C.race].name} />
      <InfoTile title="Classes" value={classString} />
      <InfoTile title="Alignment" value={C.alignment} />
      <InfoTile title="Background" value={G.backgrounds[C.background].name} />
      <InfoTile title="XP" value={totalXp(C.xp).toLocaleString()} />
    </Layout>
  );
};
CharacterInfo.propTypes = {
  character: shape({
    name: string,
  }),
  game: shape({
    races: shape({ name: string }),
  }),
};
CharacterInfo.defaultProps = {
  character: {
    name: '',
  },
  game: {
    races: {},
  },
};

export default CharacterInfo;
