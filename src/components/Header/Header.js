import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

const Header = () => {
  const StyledHeader = styled.header(({ theme }) => {
    const { colors, spacing } = theme;

    return `
      background: ${colors.red[5]};
      color: ${colors.gray[0]};
      padding: ${spacing[1]};

      & a {
        color: inherit;
        text-decoration: inherit;

        &:hover, &:focus {
          background: ${colors.red[4]}
        }
      }
    `;
  });

  return (
    <StyledHeader>
      <Link to="/characters">Character List</Link>
    </StyledHeader>
  );
};

export default Header;
