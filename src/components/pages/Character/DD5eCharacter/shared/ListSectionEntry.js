import React from 'react';
import styled from 'styled-components';

const ListSectionEntry = ({ desc, source, title }) => {
  const Content = styled.div(({ theme }) => {
    const { font } = theme;
    return `
      font-size: ${font.size.sm};
    `;
  });
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
    const { font, space } = theme;
    return `
    display: inline-block;  
    font-weight: ${font.weight.body.bold};

    &:after {
      display: inline-block;
      content: '-';
      padding: 0 ${space.sm};
    }
    `;
  });

  return (
    <div>
      <Content>
        {title && <Title>{title}</Title>}
        <span>{desc}</span>
      </Content>
      {source && <Source>{source}</Source>}
    </div>
  );
};

export default ListSectionEntry;
