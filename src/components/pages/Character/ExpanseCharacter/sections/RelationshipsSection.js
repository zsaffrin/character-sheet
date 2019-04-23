import React from 'react';
import styled from 'styled-components';

const RelationshipsSection = ({ relationships }) => {
  const RelationshipList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
  `;
  const RelationshipListItem = styled.li(({ theme }) => {
    const { colors } = theme;
    return `
      border: 1px solid ${colors.gray[2]};
    `;
  });
  const RelationshipListItemHeader = styled.div(({ theme }) => {
    const { colors, fontWeights } = theme;
    return `
      background: ${colors.gray[2]};
      font-weight: ${fontWeights.body.bold};
    `;
  });
  const RelationshipListItemContent = styled.div(({ theme }) => {
    const { colors, spacing } = theme;
    return `
      color: ${colors.blue[5]};
      padding: ${spacing[1]};
      font-size: 0.8em;
    `;
  });

  return (
    <RelationshipList>
      {relationships.map(({ name, desc, rating }) => (
        <RelationshipListItem key={name}>
          <RelationshipListItemHeader>{`${name} ${rating}`}</RelationshipListItemHeader>
          <RelationshipListItemContent>{desc}</RelationshipListItemContent>
        </RelationshipListItem>
      ))}
    </RelationshipList>
  );
};

export default RelationshipsSection;
