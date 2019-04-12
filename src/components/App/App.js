import React from 'react';
import { Router } from '@reach/router';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

import Header from '../Header/Header';

import CharacterList from '../CharacterList/CharacterList';
import CharacterLayout from '../Character/CharacterLayout';
import characterSheetTheme from '../../themes/characterSheetTheme';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Lato', sans-serif;
  }

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
          <CharacterLayout path="/character/:cid" />
          <CharacterList default />
        </Router>
      </AppStyle>
    </ThemeProvider>
  </div>
);

export default App;
