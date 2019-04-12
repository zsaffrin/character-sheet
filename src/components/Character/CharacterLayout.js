import React, { Component } from 'react';
// TODO: Need prop-types to handle proper props validation
import Character from './characterModel';
import characterData from '../../data/characters.json';
import Pathfinder from './pathfinderModel';
import pathfinderData from '../../data/pathfinder.json';

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
    };
  }

  render() {
    const { character: C } = this.state;

    const classDescription = C.classLevels(1).join(' ');
    const carryCapacity = Game.canCarry(C.abilityScore('str'));
    const size = Game.creatureSizes[C.baseSize];

    return (
      <>
        <div>
          <h2>{C.name}</h2>
        </div>
        <div>{`HD: ${C.hd()} [${classDescription}]`}</div>
        <div>{`Alignment: ${C.alignment.lvc} ${C.alignment.gve}`}</div>
        <div>{`Race: ${C.race.name}`}</div>
        <div>{`Archetype: ${C.archetype}`}</div>
        <div>
          <table>
            <tbody>
              <tr>
                <th colSpan="2">CARRY</th>
              </tr>
              <tr>
                <td>{`<= ${carryCapacity[0]}`}</td>
                <td>Light</td>
              </tr>
              <tr>
                <td>{`${carryCapacity[0] + 1} - ${carryCapacity[1]}`}</td>
                <td>Medium</td>
              </tr>
              <tr>
                <td>{`${carryCapacity[1] + 1} - ${carryCapacity[2]}`}</td>
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
                <td>{carryCapacity[2]}</td>
                <td>Overhead</td>
              </tr>
              <tr>
                <td>{carryCapacity[2] * 2}</td>
                <td>Off Ground</td>
              </tr>
              <tr>
                <td>{carryCapacity[2] * 5}</td>
                <td>Push/Drag</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <strong>XP</strong>
          {` ${C.totalXp()}`}
        </div>
        <div>
          <strong>GP</strong>
          {` ${C.totalGp()}`}
        </div>

        <div>{JSON.stringify(C.conditions)}</div>

        <div>
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
        </div>
        <div>
          <strong>Saves</strong>
          {['fort', 'reflex', 'will'].map(s => (
            <div key={s}>{`${s} (${Game.saveBonus(s).abilityKey}) - ${C.saveBonus(s)}`}</div>
          ))}
        </div>
        <div>
          <strong>BAB</strong>
          {` +${C.bab.join(' / +')}`}
        </div>
        <div>
          <strong>Initiative</strong>
          {` ${modFormat(C.initiative())}`}
        </div>
        <div>
          <strong>Size</strong>
          {` ${size.name} (${modFormat(size.sizeModifier)})`}
          <br />
          {`Space: ${size.space}  Reach: ${size.naturalReach}`}
        </div>
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
          <strong>Armor Bonus</strong>
          {` ${C.getBonusTotalByKeyAndType('ac', 'armor')}`}
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
        </div>
      </>
    );
  }
}

export default CharacterLayout;
