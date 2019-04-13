import React from 'react';
import styled from 'styled-components';

const StrengthSection = ({ carryCapacity }) => {
  const StyledSection = styled.div(({ theme }) => {
    const { spacing } = theme;
    return `
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: ${spacing[2]};
    `;
  });
  const CenteredCell = styled.td`
    text-align: center;
  `;
  return (
    <StyledSection>
      <table>
        <tbody>
          <tr>
            <th colSpan="2">CARRY</th>
          </tr>
          <tr>
            <CenteredCell>{`<= ${carryCapacity[0]}`}</CenteredCell>
            <td>Light</td>
          </tr>
          <tr>
            <CenteredCell>{`${carryCapacity[0] + 1} - ${carryCapacity[1]}`}</CenteredCell>
            <td>Medium</td>
          </tr>
          <tr>
            <CenteredCell>{`${carryCapacity[1] + 1} - ${carryCapacity[2]}`}</CenteredCell>
            <td>Heavy</td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <th colSpan="2">LIFT</th>
          </tr>
          <tr>
            <CenteredCell>{carryCapacity[2]}</CenteredCell>
            <td>Overhead</td>
          </tr>
          <tr>
            <CenteredCell>{carryCapacity[2] * 2}</CenteredCell>
            <td>Off Ground</td>
          </tr>
          <tr>
            <CenteredCell>{carryCapacity[2] * 5}</CenteredCell>
            <td>Push/Drag</td>
          </tr>
        </tbody>
      </table>
    </StyledSection>
  );
};

export default StrengthSection;
