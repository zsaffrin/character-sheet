import React from 'react';
import { bool, number, string } from 'prop-types';
import styled from 'styled-components';

import { modFormat } from '../utils/characterUtils';
import ScoreRow from './ScoreRow';

const SingleScoreSection = ({
  gridArea, mod, score, title,
}) => {
  const OuterWrap = styled.div`
    display: grid;
    align-items: center;
    grid-area: ${gridArea};
  `;
  return (
    <OuterWrap>
      <ScoreRow label={title} score={mod ? modFormat(score) : score} />
    </OuterWrap>
  );
};
SingleScoreSection.propTypes = {
  gridArea: string,
  mod: bool,
  score: number,
  title: string,
};
SingleScoreSection.defaultProps = {
  gridArea: '',
  mod: false,
  score: 0,
  title: '',
};

export default SingleScoreSection;
