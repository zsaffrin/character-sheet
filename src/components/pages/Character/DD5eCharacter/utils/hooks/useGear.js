import { useEffect, useState } from 'react';
import {
  higherVal, isProficient, round, totalBonusAmount,
} from '../characterUtils';

const useGear = (charGear, gameItems, abilities, proficiencies, proficiencyBonus) => {
  const [allGear, setAllGear] = useState([]);
  const [armorBonus, setArmorBonus] = useState([]);
  const [attacks, setAttacks] = useState({});
  const [totalValue, setTotalValue] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);

  useEffect(() => {
    const newGear = charGear.reduce((acc, cg) => {
      const {
        customItem, gpItem, item, qty,
      } = cg;

      let newItem = {};
      if (customItem || gpItem) {
        newItem = cg;
      } else {
        newItem = Object.assign(gameItems[item] || {}, {
          name: qty > 1 ? `${item} x${qty}` : item,
        });
      }

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
    const newValue = allGear.reduce((total, item) => {
      if (item.cost) {
        return round(total) + round(item.cost);
      }

      return total;
    }, 0);

    setTotalValue(newValue);
  }, [allGear]);

  useEffect(() => {
    const justWeapons = allGear.filter(i => i.type === 'weapon');
    const newAttacks = justWeapons.reduce(
      (acc, weapon) => {
        const {
          damageDice, damageDie, damageType, name, properties, range, weaponType,
        } = weapon;
        const proficient = isProficient(weapon, proficiencies);
        const attack = {
          name,
          attackBonusDetail: [],
          damageBonusDetail: [],
          damage: `${damageDice}d${damageDie}`,
          damageType,
          proficient,
        };
        if (properties.finesse) {
          const mod = higherVal(abilities.str.mod, abilities.dex.mod);
          const finesseBonus = {
            amount: mod,
            desc: 'Higher of STR/DEX (Finesse Weapon)',
            toAttack: true,
            toDamage: true,
          };
          attack.attackBonusDetail.push(finesseBonus);
          attack.damageBonusDetail.push(finesseBonus);
        } else {
          if (weaponType === 'melee') {
            const strBonus = {
              amount: abilities.str.mod,
              desc: 'STR Bonus',
              toAttack: true,
              toDamage: true,
            };
            attack.attackBonusDetail.push(strBonus);
            attack.damageBonusDetail.push(strBonus);
          }
          if (weaponType === 'ranged') {
            const dexBonus = {
              amount: abilities.dex.mod,
              desc: 'DEX Bonus',
              toAttack: true,
              toDamage: true,
            };
            attack.attackBonusDetail.push(dexBonus);
            attack.damageBonusDetail.push(dexBonus);
          }
        }
        if (proficient) {
          const proficiency = {
            amount: proficiencyBonus.total,
            desc: 'Proficiency Bonus',
            toAttack: true,
            toDamage: false,
          };
          attack.attackBonusDetail.push(proficiency);
        }
        attack.attackBonus = totalBonusAmount(attack.attackBonusDetail);
        attack.damageBonus = totalBonusAmount(attack.damageBonusDetail);
        acc[weaponType].push(attack);

        if (properties.thrown) {
          const thrownAttack = {
            name: `${attack.name} (Thrown)`,
            bonus: attack.bonus,
            bonusDetail: attack.bonusDetail,
            attackBonus: attack.attackBonus,
            damageBonus: attack.damageBonus,
            damage: attack.damage,
            damageType: attack.damageType,
            range,
          };
          acc.ranged.push(thrownAttack);
        }

        return acc;
      },
      { melee: [], ranged: [] },
    );

    setAttacks(newAttacks);
  }, [allGear, proficiencyBonus]);

  useEffect(() => {
    const armorItem = allGear.filter(i => i.type === 'armor')[0];
    const shield = allGear.filter(i => i.type === 'shield')[0];
    const newArmorBonus = (armorItem ? armorItem.ac : 0) + (shield ? 2 : 0);
    setArmorBonus(newArmorBonus);
  }, [allGear]);

  return {
    gear: {
      items: allGear,
      totalValue,
      totalWeight,
    },
    armorBonus,
    attacks,
  };
};

export default useGear;
