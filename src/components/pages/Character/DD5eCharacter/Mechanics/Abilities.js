import React from 'react';
import { shape } from 'prop-types';
import styled from 'styled-components';

import { calcMod, modFormat } from '../../../../../utils/characterUtils';

const Abilities = ({ charAbilities, gameAbilities }) => {
  const Layout = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      display: grid;
      grid-gap: ${space.sm};
    `;
  });

  const AbilityTile = styled.div(({ theme }) => {
    const { colors, space } = theme;
    return `
      border: 1px solid ${colors.orange[0]}
      display: grid;
      grid-gap: ${space.sm};
      grid-template-rows: auto 1fr auto;
      align-items: center;
      justify-items: center;
      padding: ${space.sm} ${space.thin};
    `;
  });
  const AbilityTileTitle = styled.div(({ theme }) => {
    const { colors, font } = theme;
    return `
      color: ${colors.blue[5]}
      font-size: ${font.size.sm};
      font-weight: ${font.weight.body.black};
      text-transform: uppercase;
    `;
  });
  const AbilityTileScore = styled.div(({ theme }) => {
    const { colors, font } = theme;
    return `
      color: ${colors.blue[6]}
      font-size: ${font.size.xl};
      font-weight: ${font.weight.body.black};
    `;
  });
  const AbilityTileMod = styled.div(({ theme }) => {
    const { colors, font } = theme;
    return `
      color: ${colors.green[7]}
      font-size: ${font.size.lg};
      font-weight: ${font.weight.body.black};
    `;
  });

  return (
    <Layout>
      {Object.keys(gameAbilities).map(key => (
        <AbilityTile key={key}>
          <AbilityTileTitle>{gameAbilities[key].name}</AbilityTileTitle>
          <AbilityTileScore>{charAbilities[key]}</AbilityTileScore>
          <AbilityTileMod>{modFormat(calcMod(charAbilities[key]))}</AbilityTileMod>
        </AbilityTile>
      ))}
    </Layout>
  );
};
Abilities.propTypes = {
  charAbilities: shape({}),
  gameAbilities: shape({}),
};
Abilities.defaultProps = {
  charAbilities: {},
  gameAbilities: {},
};

export default Abilities;
