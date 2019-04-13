import React, { Component } from 'react';
import styled from 'styled-components';
import Character from './characterModel';
import characterData from '../../data/characters.json';
import Pathfinder from './pathfinderModel';
import pathfinderData from '../../data/pathfinder.json';

import Section from './shared/Section';
import Strength from './sections/Strength';
import Saves from './sections/Saves';
import ConditionSection from './sections/ConditionsSection';

const Game = new Pathfinder(pathfinderData);

const abilityCodes = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
const modFormat = val => (val < 0 ? val : `+${val}`);

class CharacterLayout extends Component {
  constructor(props) {
    super(props);
    const { cid } = this.props;
    const char = characterData.find(c => c.id === cid);
    this.state = {
      character: new Character(char, Game),
      conditions: Object.assign(char.conditions),
    };
  }

  toggleCondition(condition) {
    const { conditions } = this.state;
    const newConditions = Object.assign(conditions, {});
    newConditions[condition] = !newConditions[condition];
    this.setState({
      conditions: newConditions,
    });
  }

  render() {
    const { character: C } = this.state;

    const classDescription = C.classLevels(1).join(' ');
    const carryCapacity = Game.canCarry(C.abilityScore('str'));
    const size = Game.creatureSizes[C.baseSize];
    const saves = {
      fort: modFormat(C.saveBonus('fort')),
      reflex: modFormat(C.saveBonus('reflex')),
      will: modFormat(C.saveBonus('will')),
    };

    const StyledPage = styled.div(({ theme }) => {
      const { spacing } = theme;
      return `
        display: grid;
        grid-gap: ${spacing[2] || 0};
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
        padding: ${spacing[1] || 0};
      `;
    });

    return (
      <StyledPage>
        <Section noHeader>
          <div>
            <h2>{C.name}</h2>
          </div>
          <div>{`HD: ${C.hd()} [${classDescription}]`}</div>
          <div>{`Alignment: ${C.alignment.lvc} ${C.alignment.gve}`}</div>
          <div>{`Race: ${C.race.name}`}</div>
          <div>{`Archetype: ${C.archetype}`}</div>
          <div>
            <strong>XP</strong>
            {` ${C.totalXp().toLocaleString()}`}
          </div>
          <div>
            <strong>GP</strong>
            {` ${C.totalGp().toLocaleString()}`}
          </div>
        </Section>
        <Section color={['red', 5]} title="Combat" titleColor={['gray', 0]}>
          <div>
            <strong>Max HP</strong>
            {` ${C.maxHp}`}
          </div>
          <div>
            <strong>CMB</strong>
            {` ${C.cmb()}`}
          </div>
          <div>
            <strong>CMD</strong>
            {` ${C.cmd()}`}
          </div>
          <div>
            <strong>Touch AC</strong>
            {` ${C.touchAc()}`}
          </div>
          <div>
            <strong>Flat-Footed AC</strong>
            {` ${C.flatFootedAc()}`}
          </div>
          <div>
            <strong>AC</strong>
            {` ${C.ac()}`}
          </div>
          <div>
            <strong>Size</strong>
            {` ${size.name} (${modFormat(size.sizeModifier)})`}
            <br />
            {`Space: ${size.space}  Reach: ${size.naturalReach}`}
          </div>
          <div>
            <strong>BAB</strong>
            {` +${C.bab.join(' / +')}`}
          </div>
          <div>
            <strong>Initiative</strong>
            {` ${modFormat(C.initiative())}`}
          </div>
        </Section>
        <Section color={['fuschia', 7]} title="Strength" titleColor={['gray', 0]}>
          <Strength carryCapacity={carryCapacity} />
        </Section>
        <Section color={['yellow', 7]} title="Conditions" titleColor={['gray', 0]}>
          <ConditionSection conditions={C.conditions} toggleCondition={this.toggleCondition} />
        </Section>
        <Section color={['cyan', 7]} title="Abilities" titleColor={['gray', 0]}>
          <table style={{ textAlign: 'center' }}>
            <tbody>
              <tr>
                <td />
                <td>BASE</td>
                <td>BONUS</td>
                <td>SCORE</td>
                <td>MOD</td>
              </tr>
              {abilityCodes.map(a => (
                <tr key={a}>
                  <th>{a.toUpperCase()}</th>
                  <td>{C.abilityScores[a]}</td>
                  <td>{modFormat(C.getBonusTotalByKey(a))}</td>
                  <td>
                    <strong>{C.abilityScore(a)}</strong>
                  </td>
                  <td>
                    <strong>{modFormat(C.abilityMod(a))}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
        <Section color={['green', 6]} title="Saves" titleColor={['gray', 0]}>
          <Saves saves={saves} />
        </Section>
        <Section color={['blue', 7]} title="Skills" titleColor={['gray', 0]} colSpan="2">
          <table>
            <tbody>
              <tr>
                <td>Skill</td>
                <td>Abil</td>
                <td>Mod</td>
                <td>Ranks</td>
                <td>Class</td>
                <td />
                <td>TOTAL</td>
              </tr>
              {Game.skills.map(({ key, name, abilityKey }) => (
                <tr key={key}>
                  <td>{name}</td>
                  <td>{abilityKey.toUpperCase()}</td>
                  <td>{modFormat(C.abilityMod(abilityKey))}</td>
                  <td>{C.skillRanks[key] ? C.skillRanks[key] : ''}</td>
                  <td>{C.isClassSkill(key) ? 'Y' : ''}</td>
                  <td>{C.skillBonus(key)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
        <Section color={['pink', 6]} title="Gear" titleColor={['gray', 0]}>
          {C.items.map(({ name }) => (
            <div key={name}>{name}</div>
          ))}
        </Section>
      </StyledPage>
    );
  }
}

export default CharacterLayout;
