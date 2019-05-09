import { useEffect, useState } from 'react';

const useSkills = (character, game, abilities, proficiencyBonus) => {
  const [skills, setSkills] = useState({});

  useEffect(() => {
    const newSkills = Object.keys(game.skills).reduce((obj, key) => {
      const { abilityKey, name } = game.skills[key];
      const proficient = character.proficiencies.indexOf(key) >= 0;
      const abilityMod = abilities[abilityKey] ? abilities[abilityKey].mod : 0;
      const bonus = proficient ? abilityMod + proficiencyBonus : abilityMod;

      return Object.assign(obj, {
        [key]: {
          bonus,
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
