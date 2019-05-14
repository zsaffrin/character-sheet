import React from 'react';
import { shape } from 'prop-types';
import styled from 'styled-components';

import ListSection from '../shared/ListSection';

const Characteristics = ({ data }) => {
  const {
    bonds, flaws, ideals, personalityTraits,
  } = data;

  const Layout = styled.div(({ theme }) => {
    const { space } = theme;
    return `
      grid-area: characteristics;
      display: grid;
      grid-gap: ${space.sm};
    `;
  });

  return (
    <Layout>
      <ListSection title="Personality Traits" items={personalityTraits} />
      <ListSection title="Ideals" items={ideals} />
      <ListSection title="Bonds" items={bonds} />
      <ListSection title="Flaws" items={flaws} />
    </Layout>
  );
};
Characteristics.defaultProps = { data: {} };
Characteristics.propTypes = { data: shape({}) };

export default Characteristics;
