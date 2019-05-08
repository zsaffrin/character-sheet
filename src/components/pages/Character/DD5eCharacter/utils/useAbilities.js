import { useEffect, useState } from 'react';
import { calcAbilityMod, modFormat } from './characterUtils';

const useAbilities = (character, game) => {
  const [abilities, setAbilities] = useState({});

  const abilityScore = key => character.abilityScores[key];

  const abilityMod = (key, format = false) => {
    const mod = calcAbilityMod(abilityScore(key));
    return format ? modFormat(mod) : mod;
  };

  const ability = key => ({
    name: game.abilities[key].name,
    score: abilityScore(key),
    mod: abilityMod(key),
  });

  useEffect(() => {
    const newAbilities = Object.keys(character.abilityScores).reduce(
      (obj, key) => Object.assign(obj, {
        [key]: ability(key),
      }),
      {},
    );
    setAbilities(newAbilities);
  }, []);

  return abilities;
};

export default useAbilities;
