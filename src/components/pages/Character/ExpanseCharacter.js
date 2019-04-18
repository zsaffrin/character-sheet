import React, { Component } from 'react';
import { shape } from 'prop-types';
import styled from 'styled-components';

import G from '../../../data/game_expanse.json';

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
      grid-gap: 20px;
    `;
    const AbilitiesSection = styled.div`
      display: grid;
      grid-gap: 10px;
      grid-template-columns: min-content auto;
    `;

    return (
      <PageLayout>
        <h1>{C.name}</h1>

        {/* OVERVIEW INFO */}
        <div>
          <div>
            <strong>ORIGIN</strong>
            {` ${G.origins[C.origin].name}`}
          </div>
          <div>
            <strong>BACKGROUND</strong>
            {` ${G.backgrounds[C.background].name}`}
          </div>
          <div>
            <strong>SOCIAL CLASS</strong>
            {` ${G.socialClasses[C.socialClass].name}`}
          </div>
          <div>
            <strong>PROFESSION</strong>
            {` ${G.professions[C.profession].name}`}
          </div>
          <div>
            <strong>DRIVE</strong>
            {` ${G.drives[C.drives[0]].name}`}
          </div>
        </div>

        {/* ABILITIES */}
        <AbilitiesSection>
          {Object.keys(C.abilities).map(a => (
            <>
              <div>{G.abilities[a].name}</div>
              <div>
                <strong>{C.abilities[a]}</strong>
              </div>
            </>
          ))}
        </AbilitiesSection>

        {/* CHARACTER DEBUG [TEMP] */}
        <pre>{JSON.stringify(C, ' ', 2)}</pre>
      </PageLayout>
    );
  }
}
ExpanseCharacter.propTypes = {
  character: shape({}).isRequired,
};

export default ExpanseCharacter;
