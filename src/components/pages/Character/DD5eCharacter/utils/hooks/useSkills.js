import { useEffect, useState } from 'react';
import { totalBonusAmount } from '../characterUtils';

const useSkills = (skillData, proficiencies, abilities, proficiencyBonus) => {
  const [skills, setSkills] = useState({});

  useEffect(() => {
    const newSkills = Object.keys(skillData).reduce((obj, key) => {
      const { abilityKey, name } = skillData[key];

      const proficient = proficiencies.indexOf(key) >= 0;

      const abilityMod = abilities[abilityKey] ? abilities[abilityKey].mod : 0;

      const bonuses = [{ amount: abilityMod, desc: `${abilityKey.toUpperCase()} Mod` }];
      if (proficient) {
        bonuses.push({ amount: proficiencyBonus.total, desc: 'Proficiency Bonus' });
      }
      const totalBonus = totalBonusAmount(bonuses);

      return Object.assign(obj, {
        [key]: {
          ability: abilityKey,
          bonus: totalBonus,
          bonusDetail: bonuses,
          name,
          proficient,
        },
      });
    }, {});

    setSkills(newSkills);
  }, [abilities]);

  return skills;
};

export default useSkills;
