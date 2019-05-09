import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import styled from 'styled-components';

import ListedItem from './ListedItem';
import Panel from './Panel';

const ListSection = ({ gridArea, items, title }) => {
  const OuterWrap = styled.div`
    grid-area: ${gridArea};
    display: grid;
  `;

  return (
    <OuterWrap>
      <Panel title={title}>
        {items.map(({
          desc, name, source, sourceType,
        }) => {
          const key = name
            || desc
              .replace(/\W/g, '')
              .substring(0, 7)
              .toUpperCase();
          const sourceString = sourceType ? `${sourceType} > ${source}` : source;
          return <ListedItem desc={desc} title={name} source={sourceString} key={key} />;
        })}
      </Panel>
    </OuterWrap>
  );
};
ListSection.propTypes = {
  gridArea: string,
  items: arrayOf(shape({})),
  title: string,
};
ListSection.defaultProps = {
  gridArea: '',
  items: [],
  title: '',
};

export default ListSection;
