import React from 'react';
import { string } from 'prop-types';
import { Link } from '@reach/router';

const SelectionPage = ({ data, dataKey }) => (
  <div>
    <ul>
      {data.map(({ id, name }) => (
        <li>
          <Link to={`/${dataKey}/${id}`}>{name}</Link>
        </li>
      ))}
    </ul>
  </div>
);
SelectionPage.propTypes = {
  data: string.isRequired,
  dataKey: string.isRequired,
};

export default SelectionPage;
