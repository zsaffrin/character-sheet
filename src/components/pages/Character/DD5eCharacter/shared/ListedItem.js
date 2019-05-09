import React from 'react';
import styled from 'styled-components';

const ListedItem = ({ desc, source, title }) => {
  const Source = styled.div(({ theme }) => {
    const { colors, font } = theme;
    return `
      color: ${colors.gray[7]};
      font-size: ${font.size.xs};
      font-style: italic;
      text-transform: uppercase;
    `;
  });
  const Title = styled.div(({ theme }) => {
    const { font } = theme;
    return `
      font-weight: ${font.weight.body.bold};
    `;
  });
  const Desc = styled.div(({ theme }) => {
    const { font } = theme;
    return `
      font-size: ${font.size.sm};
    `;
  });
  return (
    <div>
      <Source>{source}</Source>
      <Title>{title}</Title>
      <Desc>{desc}</Desc>
    </div>
  );
};

export default ListedItem;
