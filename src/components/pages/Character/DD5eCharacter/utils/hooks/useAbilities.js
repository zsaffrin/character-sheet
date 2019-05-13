import { useEffect, useState } from 'react';
import { calcAbilityMod, modFormat, totalBonusAmount } from '../characterUtils';

const useAbilities = (baseAbilityScores, abilityReference, bonuses) => {
  const [abilities, setAbilities] = useState({
    str: { mod: 0 },
    dex: { mod: 0 },
    con: { mod: 0 },
    int: { mod: 0 },
    wis: { mod: 0 },
    cha: { mod: 0 },
  });

  const abilityScore = key => baseAbilityScores[key];

  const abilityMod = (score, format = false) => {
    const mod = calcAbilityMod(score);
    return format ? modFormat(mod) : mod;
  };

  const ability = (key) => {
    const baseScore = abilityScore(key);
    let scoreDetail = [{ amount: baseScore, desc: `${key.toUpperCase()} Base Score` }];
    if (bonuses) {
      const relevantBonuses = bonuses.filter(b => b.affects === key);
      scoreDetail = scoreDetail.concat(relevantBonuses);
    }
    const scoreTotal = totalBonusAmount(scoreDetail);
    return {
      name: abilityReference[key].name,
      score: {
        detail: scoreDetail,
        total: scoreTotal,
      },
      mod: abilityMod(scoreTotal),
    };
  };

  useEffect(() => {
    const newAbilities = Object.keys(baseAbilityScores).reduce(
      (obj, key) => Object.assign(obj, {
        [key]: ability(key),
      }),
      {},
    );
    setAbilities(newAbilities);
  }, [bonuses]);

  return abilities;
};

export default useAbilities;
