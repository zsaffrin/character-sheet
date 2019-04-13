class Character {
  constructor(data, Game) {
    this.Game = Game;
    this.name = data.name || 'character';
    this.abilityScores = data.abilityScores || {
      cha: 0,
      con: 0,
      dex: 0,
      int: 0,
      str: 0,
      wis: 0,
    };
    this.alignment = data.alignment || {
      gve: '',
      lvc: '',
    };
    this.conditions = Object.assign(this.conditions, data.conditions);
    this.classes = data.classes || [];
    this.race = data.race || null;
    this.archetype = data.archetype || null;
    this.xp = data.xp || [];
    this.gp = data.gp || [];
    this.maxHp = data.maxHp || 0;
    this.baseSize = data.baseSize || 0;
    this.items = data.items || [];
    this.abilities = data.abilities || [];
    this.discoveries = data.discoveries || [];
    this.feats = data.feats || [];
    this.skillRanks = data.skillRanks || {};

    // Inferable data
    // TODO: Automate these using Game data
    this.baseSaves = data.baseSaves || {
      fortitude: 0,
      reflex: 8,
      will: 4,
    };
    this.bab = data.bab || [0];

    this.toggleCondition = this.toggleCondition.bind(this);
  }

  conditions = {
    mutagen: false,
    beastForm: false,
    beastFormFeature: 0, // (0) 2 claws (1) Darkvision 60ft (2) +1 racial nat armor
    flatFooted: false,
  };

  toggleCondition(condition) {
    this.conditions[condition] = !this.conditions[condition];
  }

  getBonusTotal(bonuses) {
    return bonuses.reduce((total, bonus) => {
      if (bonus.bonus === 'classLevel') return total + this.hd();

      return total + bonus.bonus;
    }, 0);
  }

  getAllBonuses() {
    const sources = [
      {
        name: 'items',
        items: this.items,
      },
      {
        name: 'racial',
        items: [this.race],
      },
      {
        name: 'abilities',
        items: this.abilities,
      },
      {
        name: 'discoveries',
        items: this.discoveries,
      },
      {
        name: 'feats',
        items: this.feats,
      },
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
    return this.getAllBonuses().filter((bonus) => {
      if (bonus.key !== key) return false;
      if (bonus.condition && !this.conditions[bonus.condition]) return false;
      return true;
    });
  }

  getBonusTotalByKey(key) {
    return this.getBonusTotal(this.getAllBonusesByKey(key));
  }

  getBonusesByType(key) {
    return this.getAllBonusesByKey(key).reduce((obj, bonus) => {
      const newObj = Object.assign(obj);
      if (!newObj[bonus.bonusType]) newObj[bonus.bonusType] = [];
      newObj[bonus.bonusType].push(bonus);
      return newObj;
    }, {});
  }

  getBonusTotalByKeyAndType(key, type) {
    const bonuses = this.getBonusesByType(key)[type] || [];
    return this.getBonusTotal(bonuses);
  }

  getClassSkills() {
    const charClasses = this.classes.reduce((classIndex, entry) => {
      if (!classIndex.includes(entry)) classIndex.push(entry);
      return classIndex;
    }, []);
    return charClasses.reduce((skills, cc) => skills.concat(this.Game.classes[cc].classSkills), []);
  }

  isClassSkill(key) {
    const skills = this.getClassSkills();
    return skills.includes(key);
  }

  abilityScore(key) {
    return this.abilityScores[key] + this.getBonusTotalByKey(key);
  }

  abilityMod(key) {
    return Math.floor((this.abilityScore(key) - 10) / 2);
  }

  hd() {
    return this.classes.length;
  }

  classLevels(format = 0) {
    const classObjArray = this.classes
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

    if (format === 1) {
      return classObjArray.map(i => `${i.name} ${i.level}`);
    }
    return classObjArray;
  }

  totalXp() {
    return this.xp.reduce((acc, entry) => acc + entry.value, 0);
  }

  totalGp() {
    return this.gp.reduce((acc, entry) => acc + entry.value, 0);
  }

  itemsByType(type) {
    return this.items.filter(i => i.type === type);
  }

  saveBonus(saveKey) {
    const saveAbility = this.Game.saveBonus(saveKey).abilityKey;

    const baseSave = this.baseSaves[saveKey];
    const abilityMod = this.abilityMod(saveAbility);
    const miscMod = 0;

    return baseSave + abilityMod + miscMod;
  }

  skillBonus(key) {
    const skillData = this.Game.skills.find(s => s.key === key);
    const abilityMod = this.abilityMod(skillData.abilityKey);
    const ranks = this.skillRanks[key] || 0;
    const classSkill = this.isClassSkill(key) ? 3 : 0;
    // Other bonuses
    if (ranks === 0 && !skillData.useUntrained) return 0;
    return abilityMod + ranks + classSkill;
  }

  initiative() {
    return this.abilityMod('dex') + this.getBonusTotalByKey('init');
  }

  cmb() {
    const bab = this.bab[0];
    const strMod = this.abilityMod('str');
    const specialSizeMod = this.size().specialSizeModifier;

    return bab + strMod + specialSizeMod;
  }

  cmd() {
    const base = 10;
    const bab = this.bab[0];
    const strMod = this.abilityMod('str');
    const dexMod = this.conditions.flatFooted ? 0 : this.abilityMod('dex');
    const specialSizeMod = this.size().specialSizeModifier;
    const miscMod = 0;
    // MISC MOD TYPES
    // circumstance, deflection, dodge, insight, luck, morale, profane, sacred
    // ^^^ These need to come from Affects

    return base + bab + strMod + dexMod + specialSizeMod + miscMod;
  }

  size() {
    return this.Game.creatureSizes[this.baseSize];
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
}

export default Character;
