import React from 'react';
import { shape, string } from 'prop-types';
import styled from 'styled-components';

const ProfileSection = ({
  origin, background, socialClass, profession, drive,
}) => {
  const ProfileItemList = styled.ul(({ theme }) => {
    const { space } = theme;
    return `
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      grid-gap: ${space.sm};
    `;
  });
  const Item = styled.li(({ theme }) => {
    const { space } = theme;
    return `
      align-items: center;
      display: grid;
      grid-template-columns: 7.5em 1fr;
      grid-gap: ${space.sm};
    `;
  });
  const ItemTitle = styled.div(({ theme }) => {
    const { colors, font } = theme;
    return `
      color: ${colors.blue[7]};
      font-weight: ${font.weight.body.bold};
      text-transform: uppercase;
    `;
  });
  const ItemContent = styled.div`
    font-size: 0.9em;
  `;

  return (
    <ProfileItemList>
      <Item>
        <ItemTitle>Origin</ItemTitle>
        <ItemContent>{` ${origin.name}`}</ItemContent>
      </Item>
      <Item>
        <ItemTitle>Background</ItemTitle>
        <ItemContent>{` ${background.name}`}</ItemContent>
      </Item>
      <Item>
        <ItemTitle>Social Class</ItemTitle>
        <ItemContent>{` ${socialClass.name}`}</ItemContent>
      </Item>
      <Item>
        <ItemTitle>Profession</ItemTitle>
        <ItemContent>{` ${profession.name}`}</ItemContent>
      </Item>
      <Item>
        <ItemTitle>Drive</ItemTitle>
        <ItemContent>{` ${drive.name}`}</ItemContent>
      </Item>
    </ProfileItemList>
  );
};
ProfileSection.propTypes = {
  origin: shape({ name: string }),
  background: shape({ name: string }),
  socialClass: shape({ name: string }),
  profession: shape({ name: string }),
  drive: shape({ name: string }),
};
ProfileSection.defaultProps = {
  origin: { name: '' },
  background: { name: '' },
  socialClass: { name: '' },
  profession: { name: '' },
  drive: { name: '' },
};

export default ProfileSection;
