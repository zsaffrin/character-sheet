import React, { Component } from 'react';
import { shape } from 'prop-types';
import styled from 'styled-components';

import Section from './sections/Section';
import ProfileSection from './sections/ProfileSection';
import AbilitiesSection from './sections/AbilitiesSection';
import RelationshipsSection from './sections/RelationshipsSection';
import ConditionsSection from './sections/ConditionsSection';

import G from '../../../../data/game_expanse.json';

class ExpanseCharacter extends Component {
  constructor(props) {
    super(props);
    const { character } = this.props;
    const conditions = {};
    Object.keys(G.conditions).forEach((c) => {
      conditions[c] = false;
      return true;
    });
    this.state = {
      C: character,
      conditions,
    };
  }

  toggleCondition = (key) => {
    const { conditions } = this.state;
    conditions[key] = !conditions[key];
    this.setState({ conditions });
  };

  render() {
    const { C, conditions } = this.state;

    const PageLayout = styled.div`
      display: grid;
      grid-gap: 10px;
    `;

    return (
      <>
        <h1>{C.name}</h1>
        <PageLayout>
          <Section title="Profile">
            <ProfileSection
              origin={G.origins[C.origin]}
              background={G.backgrounds[C.background]}
              socialClass={G.socialClasses[C.socialClass]}
              profession={G.professions[C.profession]}
              drive={G.drives[C.drives[0]]}
            />
          </Section>

          <Section title="Conditions">
            <ConditionsSection
              conditions={conditions}
              gConditions={G.conditions}
              toggleCondition={this.toggleCondition}
            />
          </Section>

          <Section title="Abilities">
            <AbilitiesSection
              cAbilities={C.abilities}
              gAbilities={G.abilities}
              cFocuses={C.focuses}
              gFocuses={G.focuses}
            />
          </Section>

          <Section title="Relationships">
            <RelationshipsSection relationships={C.relationships} />
          </Section>
        </PageLayout>
      </>
    );
  }
}
ExpanseCharacter.propTypes = {
  character: shape({}).isRequired,
};

export default ExpanseCharacter;
