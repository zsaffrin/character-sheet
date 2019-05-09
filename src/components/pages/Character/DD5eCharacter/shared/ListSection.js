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
  const InnerWrap = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      padding: ${space.sm};
    `;
  });

  return (
    <OuterWrap>
      <Panel title={title}>
        <InnerWrap>
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
        </InnerWrap>
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
