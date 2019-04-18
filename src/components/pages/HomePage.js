import React from 'react';
import { Link } from '@reach/router';

const HomePage = () => (
  <div>
    <ul>
      <li>
        <Link to="/games">Games</Link>
      </li>
    </ul>
  </div>
);

export default HomePage;
