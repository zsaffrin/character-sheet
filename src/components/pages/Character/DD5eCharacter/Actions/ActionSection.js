import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import styled from 'styled-components';

const ActionSection = ({ title, items }) => {
  const Layout = styled.div``;
  const Title = styled.div(({ theme }) => {
    const { font } = theme;
    return `
      font-weight: ${font.weight.body.bold};
      text-transform: uppercase;
    `;
  });

  return (
    <Layout>
      <Title>{title}</Title>
      <div>
        {items.map(({ name }) => (
          <div>{name}</div>
        ))}
      </div>
    </Layout>
  );
};
ActionSection.propTypes = {
  title: string,
  items: arrayOf(shape({})),
};
ActionSection.defaultProps = {
  title: '',
  items: [],
};

export default ActionSection;
