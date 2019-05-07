import React from 'react';
import { arrayOf, oneOfType, node } from 'prop-types';
import styled from 'styled-components';

const DefaultLayout = ({ children }) => {
  const Layout = styled.div(({ theme }) => {
    const { colors, space } = theme;
    return `
      color: ${colors.orange[8]};
      display: grid;
      grid-gap: ${space.md};
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr 1fr;
      grid-template-areas:
        'info info info'
        'mechanics combat characteristics'
        'mechanics actions features'
        'proficiencies equipment features';

      
      &>div:nth-child(2) {
        grid-area: mechanics;
      }
      &>div:nth-child(3) {
        grid-area: combat;
      }
      &>div:nth-child(4) {
        grid-area: actions;
      }
      &>div:nth-child(5) {
        grid-area: characteristics;
      }
      &>div:nth-child(6) {
        grid-area: features;
      }
      &>div:nth-child(7) {
        grid-area: equipment;
      }
      &>div:nth-child(8) {
        grid-area: proficiencies;
      }
    `;
  });

  return <Layout>{children}</Layout>;
};
DefaultLayout.propTypes = {
  children: oneOfType([node, arrayOf(node)]),
};
DefaultLayout.defaultProps = {
  children: [],
};

export default DefaultLayout;
