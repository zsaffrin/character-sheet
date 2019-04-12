import React from 'react';
import { Router } from '@reach/router';

import CharacterList from '../CharacterList/CharacterList';
import CharacterLayout from '../Character/CharacterLayout';

const App = () => (
  <div>
    <h1>character-sheet</h1>
    <Router>
      <CharacterLayout path="/character/:cid" />
      <CharacterList default />
    </Router>
  </div>
);

export default App;
