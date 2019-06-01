import React from 'react';
import { func, shape } from 'prop-types';
import styled from 'styled-components';

const ConditionsSection = ({ conditions, gConditions, toggleCondition }) => {
  const ConditionList = styled.ul(({ theme }) => {
    const { space } = theme;
    return `
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      grid-gap: ${space.sm};
      grid-template-columns: repeat(auto-fit, minmax(2em, 1fr));
    `;
  });
  const ConditionListItem = styled.li``;
  const ConditionLabel = styled.label(({ checked, theme }) => {
    const { colors, space } = theme;
    return `
      background: ${checked ? colors.red[4] : 'inherit'};
      border: 1px solid ${colors.gray[2]};
      color: ${checked ? colors.gray[0] : 'inherit'};
      cursor: pointer;
      display: grid;
      justify-items: center;
      font-size: 0.8em;
      padding: ${space.sm};
      text-transform: uppercase;
    `;
  });
  const ConditionCheckbox = styled.input`
    opacity: 0;
    position: absolute;
    transform: translateX(-10000px);
  `;

  return (
    <ConditionList>
      {Object.keys(conditions).map(c => (
        <ConditionListItem key={c}>
          <ConditionLabel checked={conditions[c]} htmlFor={c} title={gConditions[c].name}>
            <ConditionCheckbox
              id={c}
              type="checkbox"
              checked={conditions[c]}
              onChange={() => toggleCondition(c)}
            />
            <span>{gConditions[c].icon}</span>
          </ConditionLabel>
        </ConditionListItem>
      ))}
    </ConditionList>
  );
};
ConditionsSection.propTypes = {
  conditions: shape({}),
  gConditions: shape({}),
  toggleCondition: func,
};
ConditionsSection.defaultProps = {
  conditions: {},
  gConditions: {},
  toggleCondition: () => {},
};

export default ConditionsSection;
