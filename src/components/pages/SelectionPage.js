import React from 'react';
import { shape, string } from 'prop-types';
import { Link } from '@reach/router';

const SelectionPage = ({ data, dataKey }) => (
  <div>
    <ul>
      {Object.keys(data).map((key) => {
        const { id, name } = data[key];
        return (
          <li key={key}>
            <Link to={`/${dataKey}/${id}`}>{name}</Link>
          </li>
        );
      })}
    </ul>
  </div>
);
SelectionPage.propTypes = {
  data: shape({}).isRequired,
  dataKey: string.isRequired,
};

export default SelectionPage;
