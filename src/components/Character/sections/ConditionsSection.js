import React from 'react';

const Conditions = ({ conditions, toggleCondition }) => (
  <div>
    {Object.keys(conditions).map(key => (
      <div key={key}>
        {`${key}: ${conditions[key]} `}
        <button type="button" onClick={() => toggleCondition(key)}>
          Toggle
        </button>
      </div>
    ))}
  </div>
);

export default Conditions;
