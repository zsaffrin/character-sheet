import React from 'react';

const SelectionPage = ({ data }) => (
  <div>
    <ul>
      {data.map(({ name }) => (
        <li>{name}</li>
      ))}
    </ul>
  </div>
);

export default SelectionPage;
