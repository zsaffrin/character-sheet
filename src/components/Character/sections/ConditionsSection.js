import React from 'react';

const Conditions = ({ conditions, toggleCondition }) => (
  <div>
    <pre>{JSON.stringify(conditions, ' ', 2)}</pre>
    <button type="button" onClick={() => toggleCondition('mutagen')}>
      Toggle Mutagen
    </button>
  </div>
);

export default Conditions;
