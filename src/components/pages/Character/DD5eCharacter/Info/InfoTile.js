import React from 'react';
import { bool, string } from 'prop-types';
import styled from 'styled-components';

import InfoTileCaption from './InfoTileCaption';

const InfoTile = ({ big, title, value }) => {
  const Tile = styled.div`
    display: grid;
    align-content: end;
  `;
  const TileTitle = styled.div(({ theme }) => {
    const { colors, space } = theme;
    return `
      border-top: 1px solid ${colors.orange[0]}
      font-size: 10px;
      padding-left: ${space.thin};
    `;
  });

  return (
    <Tile>
      <div>{big ? <h1>{value}</h1> : value}</div>
      <TileTitle>
        <InfoTileCaption label={title} />
      </TileTitle>
    </Tile>
  );
};
InfoTile.propTypes = {
  big: bool,
  title: string,
  value: string,
};
InfoTile.defaultProps = {
  big: false,
  title: 'info',
  value: '0',
};

export default InfoTile;
