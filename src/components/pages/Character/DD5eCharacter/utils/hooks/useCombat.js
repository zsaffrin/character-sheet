import { useEffect, useState } from 'react';

const useCombat = (armorBonus, abilities, hd, maxHpData, race) => {
  const [combat, setCombat] = useState({
    ac: 0,
    hitDice: 1,
    initiative: 0,
    maxHp: 0,
    speed: 0,
  });

  useEffect(() => {
    const newCombat = combat;

    newCombat.ac = Number(armorBonus) + abilities.dex.mod;
    newCombat.hitDice = hd;
    newCombat.initiative = abilities.dex.mod;
    newCombat.maxHp = maxHpData.reduce((acc, entry) => acc + entry.amount, 0);
    newCombat.speed = race.speed;

    setCombat(newCombat);
  }, [armorBonus]);

  return combat;
};

export default useCombat;
