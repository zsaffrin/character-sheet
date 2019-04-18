import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

const Header = () => {
  const StyledHeader = styled.header(({ theme }) => {
    const { colors, spacing } = theme;

    return `
      background: ${colors.red[5]};
      color: ${colors.gray[0]};
      display: grid;
      grid-auto-columns: min-content;
      grid-auto-flow: column;
      grid-gap: ${spacing[2]};
      padding: ${spacing[1]};

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
