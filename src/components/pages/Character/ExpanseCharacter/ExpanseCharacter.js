import React, { Component } from 'react';
import { shape } from 'prop-types';
import styled from 'styled-components';

import ProfileSection from './sections/ProfileSection';
import AbilitiesSection from './sections/AbilitiesSection';

import G from '../../../../data/game_expanse.json';

class ExpanseCharacter extends Component {
  constructor(props) {
    super(props);
    const { character } = this.props;
    this.state = { C: character };
  }

  render() {
    const { C } = this.state;

    const PageLayout = styled.div`
      display: grid;
      grid-gap: 10px;
    `;

    return (
      <PageLayout>
        <h1>{C.name}</h1>

        <div>
          <ProfileSection
            origin={G.origins[C.origin]}
            background={G.backgrounds[C.background]}
            socialClass={G.socialClasses[C.socialClass]}
            profession={G.professions[C.profession]}
            drive={G.drives[C.drives[0]]}
          />
        </div>

        <div>
          <AbilitiesSection
            cAbilities={C.abilities}
            gAbilities={G.abilities}
            cFocuses={C.focuses}
            gFocuses={G.focuses}
          />
        </div>
      </PageLayout>
    );
  }
}
ExpanseCharacter.propTypes = {
  character: shape({}).isRequired,
};

export default ExpanseCharacter;
