import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

const Header = () => {
  const StyledHeader = styled.header(({ theme }) => {
    const { colors, space } = theme;

    return `
      background: ${colors.red[5]};
      color: ${colors.gray[0]};
      display: grid;
      grid-auto-columns: min-content;
      grid-auto-flow: column;
      grid-gap: ${space.md};
      padding: ${space.sm};

      & a {
        color: inherit;
        text-decoration: inherit;

        &:hover, &:focus {
          background: ${colors.red[4]}
        }
      }

      & > * {
        white-space: nowrap;
      }
    `;
  });

  return (
    <StyledHeader>
      <strong>CHARACTER-SHEET</strong>
      <Link to="/characters">Characters</Link>
      <Link to="/games">Games</Link>
    </StyledHeader>
  );
};

export default Header;
