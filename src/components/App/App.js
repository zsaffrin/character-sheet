import React from 'react';
import { Router } from '@reach/router';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

import Header from '../Header/Header';

import CharacterList from '../CharacterList/CharacterList';
import Character from '../Character/Character';
import CharacterLayout from '../CharacterOld/CharacterLayout';
import characterSheetTheme from '../../themes/characterSheetTheme';

const GlobalStyle = createGlobalStyle`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }
`;

const AppStyle = styled.div(({ theme }) => {
  const { colors } = theme;

  return `
    color: ${colors.black};
    font-family: 'Lato', sans-serif;
    min-height: 100vh;
  `;
});

const App = () => (
  <div>
    <GlobalStyle />
    <ThemeProvider theme={characterSheetTheme}>
      <AppStyle>
        <Header />
        <Router>
          <Character path="/character/:cid" />
          <CharacterLayout path="/characterold/:cid" />
          <CharacterList default />
        </Router>
      </AppStyle>
    </ThemeProvider>
  </div>
);

export default App;
