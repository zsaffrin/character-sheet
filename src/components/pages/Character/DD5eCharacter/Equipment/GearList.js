import React from 'react';
import { arrayOf, shape } from 'prop-types';
import styled from 'styled-components';

import GearListItem from './GearListItem';

const GearList = ({ items }) => {
  const StyledList = styled.table``;

  return (
    <StyledList>
      <tbody>
        {items.map(item => (
          <GearListItem item={item} key={item.name} />
        ))}
      </tbody>
    </StyledList>
  );
};
GearList.propTypes = {
  items: arrayOf(shape({})),
};
GearList.defaultProps = {
  items: [],
};

export default GearList;
