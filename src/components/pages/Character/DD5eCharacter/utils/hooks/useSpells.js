import { useEffect, useState } from 'react';
import { totalBonusAmount } from '../characterUtils';

const useSpells = (spellsKnown, gameSpells, proficiencyBonus, chaMod) => {
  const [spells, setSpells] = useState([]);

  useEffect(() => {
    const newSpells = spellsKnown.reduce((acc, spell) => {
      const gameSpell = gameSpells[spell];
      const attackModifierDetail = [
        { amount: proficiencyBonus, desc: 'Proficiency Bonus' },
        { amount: chaMod, desc: 'CHA Mod' },
      ];
      const attackModifier = totalBonusAmount(attackModifierDetail);
      const dcDetail = [
        { amount: 8, desc: 'Base' },
        { amount: proficiencyBonus, desc: 'Proficiency Bonus' },
        { amount: chaMod, desc: 'CHA Mod' },
      ];
      const dc = totalBonusAmount(dcDetail);
      const newSpell = Object.assign(gameSpell, {
        attackModifier,
        attackModifierDetail,
        dc,
        dcDetail,
      });

      return [newSpell, ...acc];
    }, []);

    setSpells(newSpells);
  }, [proficiencyBonus, chaMod]);

  return spells;
};

export default useSpells;
