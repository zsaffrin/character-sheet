import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import styled from 'styled-components';

import Box from './Box';
import ListSectionEntry from './ListSectionEntry';

const ListSection = ({ gridArea, items, title }) => {
  const OuterWrap = styled.div`
    display: grid;
    grid-area: ${gridArea};
  `;
  const InnerWrap = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      display: grid;
      grid-gap: ${space.md};
      grid-auto-rows: min-content;
    `;
  });

  return (
    <OuterWrap>
      <Box title={title}>
        <InnerWrap>
          {items.map(({
            desc, name, source, sourceType,
          }) => {
            const key = name || desc.replace(/\W/g, '').substring(0, 7);
            const sourceString = sourceType ? `${sourceType} > ${source}` : source;
            return <ListSectionEntry desc={desc} title={name} source={sourceString} key={key} />;
          })}
        </InnerWrap>
      </Box>
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
