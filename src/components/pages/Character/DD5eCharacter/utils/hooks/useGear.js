import { useEffect, useState } from 'react';
import { higherVal, totalBonusAmount } from '../characterUtils';

const useGear = (charGear, gameItems, abilities) => {
  const [allGear, setAllGear] = useState([]);
  const [attacks, setAttacks] = useState({});
  const [totalWeight, setTotalWeight] = useState(0);

  useEffect(() => {
    const newGear = charGear.reduce((acc, key) => {
      const newItem = Object.assign(gameItems[key] || {}, {
        name: key,
      });
      return [newItem, ...acc];
    }, []);

    setAllGear(newGear);
  }, []);

  useEffect(() => {
    const newWeight = allGear.reduce(
      (total, item) => (item.weight ? total + item.weight : total),
      0,
    );

    setTotalWeight(newWeight);
  }, [allGear]);

  useEffect(() => {
    const justWeapons = allGear.filter(i => i.type === 'weapon');
    const newAttacks = justWeapons.reduce(
      (acc, weapon) => {
        const {
          damageDice, damageDie, damageType, name, properties, range, weaponType,
        } = weapon;
        const attack = {
          name,
          bonusDetail: [],
          damage: `${damageDice}d${damageDie} ${damageType}`,
        };
        if (properties.finesse) {
          const mod = higherVal(abilities.str.mod, abilities.dex.mod);
          attack.bonusDetail.push({
            amount: mod,
            desc: 'Higher of STR/DEX (Finesse)',
          });
        } else {
          if (weaponType === 'melee') {
            attack.bonusDetail.push({ amount: abilities.str.mod, desc: 'STR Bonus' });
          }
          if (weaponType === 'ranged') {
            attack.bonusDetail.push({ amount: abilities.dex.mod, desc: 'DEX Bonus' });
          }
        }
        attack.bonus = totalBonusAmount(attack.bonusDetail);
        acc[weaponType].push(attack);

        if (properties.thrown) {
          const thrownAttack = {
            name: `${attack.name} (Thrown)`,
            bonusDetail: attack.bonusDetail,
            damage: attack.damage,
            range,
          };
          acc.ranged.push(thrownAttack);
        }

        return acc;
      },
      { melee: [], ranged: [] },
    );

    setAttacks(newAttacks);
  }, [allGear]);

  return {
    gear: {
      items: allGear,
      totalWeight,
    },
    attacks,
  };
};

export default useGear;
