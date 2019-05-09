import React from 'react';
import { Router } from '@reach/router';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

import Header from './Header';
import HomePage from './pages/HomePage';
import SelectionPage from './pages/SelectionPage';
import CharacterPage from './pages/Character/CharacterPage';
import GamePage from './pages/GamePage';

import games from '../data/games.json';
import characters from '../data/characters.json';
import characterSheetTheme from '../themes/characterSheetTheme';

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
  const { font, colors } = theme;

  return `
    color: ${colors.blue[9]};
    font-family: ${font.stack.body};
    display: grid;
    min-height: 100vh;
    grid-template-rows: auto 1fr;
  `;
});

const Page = styled.div(({ theme }) => {
  const { space } = theme;

  return `
    padding: ${space.sm}
    display: grid;
  `;
});

const App = () => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={characterSheetTheme}>
      <AppStyle>
        <Header />
        <Page>
          <Router>
            <SelectionPage data={games} dataKey="game" path="/games" />
            <SelectionPage data={characters} dataKey="character" path="/characters" />

            <CharacterPage path="/character/:id" />
            <GamePage path="/game/:id" />

            <HomePage default />
          </Router>
        </Page>
      </AppStyle>
    </ThemeProvider>
  </>
);

export default App;
