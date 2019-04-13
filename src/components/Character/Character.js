import React, { Component } from 'react';
import styled from 'styled-components';

import characterData from '../../data/characters.json';
import pathfinderData from '../../data/pathfinder.json';

import Section from './shared/Section';
import StrengthSection from './sections/StrengthSection';
import ConditionsSection from './sections/ConditionsSection';
import SavesSection from './sections/SavesSection';

const modFormat = val => (val < 0 ? val : `+${val}`);

class Character extends Component {
  constructor(props) {
    super(props);
    const { cid } = this.props;
    const char = characterData.find(c => c.id === cid);
    this.state = {
      character: char,
      game: pathfinderData,
      conditions: {
        mutagen: false,
        beastForm: false,
        beastFormFeature: 0, // (0) 2 claws (1) Darkvision 60ft (2) +1 racial nat armor
        flatFooted: false,
      },
    };
  }

  totalXp() {
    const { character } = this.state;
    return character.xp.reduce((acc, entry) => acc + entry.value, 0);
  }

  totalGp() {
    const { character } = this.state;
    return character.gp.reduce((acc, entry) => acc + entry.value, 0);
  }

  getAllBonuses() {
    const { character } = this.state;
    const sources = [
      { name: 'items', items: character.items },
      { name: 'racial', items: [character.race] },
      { name: 'abilities', items: character.abilities },
      { name: 'discoveries', items: character.discoveries },
      { name: 'feats', items: character.feats },
    ];
    return sources.reduce((sourceBonuses, source) => {
      const sourceItemBonuses = source.items.reduce((itemBonuses, item) => {
        if (item.bonuses) {
          const formattedBonuses = item.bonuses.map(b => ({
            source: item.name,
            ...b,
          }));
          return itemBonuses.concat(formattedBonuses);
        }
        return itemBonuses;
      }, []);
      return sourceBonuses.concat(sourceItemBonuses);
    }, []);
  }

  getAllBonusesByKey(key) {
    const { conditions } = this.state;
    return this.getAllBonuses().filter((bonus) => {
      if (bonus.key !== key) return false;
      if (bonus.condition && !conditions[bonus.condition]) return false;
      return true;
    });
  }

  getBonusesByType(key) {
    return this.getAllBonusesByKey(key).reduce((obj, bonus) => {
      const newObj = Object.assign(obj);
      if (!newObj[bonus.bonusType]) newObj[bonus.bonusType] = [];
      newObj[bonus.bonusType].push(bonus);
      return newObj;
    }, {});
  }

  getBonusTotal(bonuses) {
    const { character } = this.state;
    return bonuses.reduce((total, bonus) => {
      if (bonus.bonus === 'classLevel') {
        return total + character.classes.length;
      }

      return total + bonus.bonus;
    }, 0);
  }

  getBonusTotalByKey(key) {
    return this.getBonusTotal(this.getAllBonusesByKey(key));
  }

  getBonusTotalByKeyAndType(key, type) {
    const bonuses = this.getBonusesByType(key)[type] || [];
    return this.getBonusTotal(bonuses);
  }

  classLevels() {
    const { character } = this.state;
    return character.classes
      .reduce((acc, entry) => {
        const existingEntry = acc.find(i => i.name === entry);
        if (existingEntry) {
          acc.forEach((c, ind) => {
            if (c.name === entry) acc[ind].level += 1;
          });
        } else {
          acc.push({
            name: entry,
            level: 1,
          });
        }
        return acc;
      }, [])
      .sort((a, b) => {
        if (a.level < b.level) return 1;
        if (a.level > b.level) return -1;
        return 0;
      });
  }

  toggleCondition = (key) => {
    const { conditions } = this.state;
    const newConditions = Object.assign(conditions, {});
    newConditions[key] = !newConditions[key];
    this.setState({
      conditions: newConditions,
    });
  };

  abilityScore(key) {
    const { character } = this.state;
    return character.abilityScores[key] + this.getBonusTotalByKey(key);
  }

  abilityMod(key) {
    return Math.floor((this.abilityScore(key) - 10) / 2);
  }

  hd() {
    const { character } = this.state;
    return character.classes.length;
  }

  size() {
    const { character, game } = this.state;
    return game.creatureSizes[character.baseSize];
  }

  cmb() {
    const { character } = this.state;
    const bab = character.bab[0];
    const strMod = this.abilityMod('str');
    const specialSizeMod = this.size().specialSizeModifier;

    return bab + strMod + specialSizeMod;
  }

  cmd() {
    const { character } = this.state;
    const base = 10;
    const bab = character.bab[0];
    const strMod = this.abilityMod('str');
    const dexMod = character.conditions.flatFooted ? 0 : this.abilityMod('dex');
    const specialSizeMod = this.size().specialSizeModifier;
    const miscMod = 0;
    // MISC MOD TYPES
    // circumstance, deflection, dodge, insight, luck, morale, profane, sacred
    // ^^^ These need to come from Affects

    return base + bab + strMod + dexMod + specialSizeMod + miscMod;
  }

  touchAc() {
    const base = 10;
    const sizeMod = this.size().sizeModifier;
    const enhanceBonus = 0;
    const deflectBonus = this.getBonusTotalByKeyAndType('ac', 'deflect');
    const dodgeBonus = 0;

    return base + sizeMod + enhanceBonus + deflectBonus + dodgeBonus;
  }

  flatFootedAc() {
    const touchAc = this.touchAc();
    const armorBonus = this.getBonusTotalByKeyAndType('ac', 'armor');
    const shieldBonus = 0;
    const natArmorBonus = 0;

    return touchAc + armorBonus + shieldBonus + natArmorBonus;
  }

  ac() {
    const flatFootedAc = this.flatFootedAc();
    const dexMod = this.abilityMod('dex');

    return flatFootedAc + dexMod;
  }

  initiative() {
    return this.abilityMod('dex') + this.getBonusTotalByKey('init');
  }

  getClassSkills() {
    const { character, game } = this.state;
    const charClasses = character.classes.reduce((classIndex, entry) => {
      if (!classIndex.includes(entry)) classIndex.push(entry);
      return classIndex;
    }, []);
    return charClasses.reduce((skills, cc) => skills.concat(game.classes[cc].classSkills), []);
  }

  isClassSkill(key) {
    const skills = this.getClassSkills();
    return skills.includes(key);
  }

  skillBonus(key) {
    const { character, game } = this.state;
    const skillData = game.skills.find(s => s.key === key);
    const abilityMod = this.abilityMod(skillData.abilityKey);
    const ranks = character.skillRanks[key] || 0;
    const classSkill = this.isClassSkill(key) ? 3 : 0;
    // Other bonuses
    if (ranks === 0 && !skillData.useUntrained) return 0;
    return abilityMod + ranks + classSkill;
  }

  canCarry() {
    const { game } = this.state;
    return game.carryingCapacity[this.abilityScore('str')];
  }

  saveBonus(saveKey) {
    const { character, game } = this.state;
    const saveAbility = game.savingThrows.find(s => s.key === saveKey).abilityKey;

    const baseSave = character.baseSaves[saveKey];
    const abilityMod = this.abilityMod(saveAbility);
    const miscMod = 0;

    return baseSave + abilityMod + miscMod;
  }

  render() {
    const { character: C, conditions, game } = this.state;

    const classDescription = this.classLevels().map(i => `${i.name} ${i.level}`);
    const size = game.creatureSizes[C.baseSize];
    const saves = {
      fort: modFormat(this.saveBonus('fort')),
      reflex: modFormat(this.saveBonus('reflex')),
      will: modFormat(this.saveBonus('will')),
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
          <div>{`HD: ${this.hd()} [${classDescription}]`}</div>
          <div>{`Alignment: ${C.alignment.lvc} ${C.alignment.gve}`}</div>
          <div>{`Race: ${C.race.name}`}</div>
          <div>{`Archetype: ${C.archetype}`}</div>
          <div>
            <strong>XP</strong>
            {` ${this.totalXp().toLocaleString()}`}
          </div>
          <div>
            <strong>GP</strong>
            {` ${this.totalGp().toLocaleString()}`}
          </div>
        </Section>
        <Section color={['red', 5]} title="Combat" titleColor={['gray', 0]}>
          <div>
            <strong>Max HP</strong>
            {` ${C.maxHp}`}
          </div>
          <div>
            <strong>CMB</strong>
            {` ${this.cmb()}`}
          </div>
          <div>
            <strong>CMD</strong>
            {` ${this.cmd()}`}
          </div>
          <div>
            <strong>Touch AC</strong>
            {` ${this.touchAc()}`}
          </div>
          <div>
            <strong>Flat-Footed AC</strong>
            {` ${this.flatFootedAc()}`}
          </div>
          <div>
            <strong>AC</strong>
            {` ${this.ac()}`}
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
            {` ${modFormat(this.initiative())}`}
          </div>
        </Section>
        <Section color={['fuschia', 7]} title="Strength" titleColor={['gray', 0]}>
          <StrengthSection carryCapacity={this.canCarry()} />
        </Section>
        <Section color={['yellow', 7]} title="Conditions" titleColor={['gray', 0]}>
          <ConditionsSection conditions={conditions} toggleCondition={this.toggleCondition} />
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
              {['str', 'dex', 'con', 'int', 'wis', 'cha'].map(a => (
                <tr key={a}>
                  <th>{a.toUpperCase()}</th>
                  <td>{C.abilityScores[a]}</td>
                  <td>{modFormat(this.getBonusTotalByKey(a))}</td>
                  <td>
                    <strong>{this.abilityScore(a)}</strong>
                  </td>
                  <td>
                    <strong>{modFormat(this.abilityMod(a))}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
        <Section color={['green', 6]} title="Saves" titleColor={['gray', 0]}>
          <SavesSection saves={saves} />
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
              {game.skills.map(({ key, name, abilityKey }) => (
                <tr key={key}>
                  <td>{name}</td>
                  <td>{abilityKey.toUpperCase()}</td>
                  <td>{modFormat(this.abilityMod(abilityKey))}</td>
                  <td>{C.skillRanks[key] ? C.skillRanks[key] : ''}</td>
                  <td>{this.isClassSkill(key) ? 'Y' : ''}</td>
                  <td>{this.skillBonus(key)}</td>
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

export default Character;
