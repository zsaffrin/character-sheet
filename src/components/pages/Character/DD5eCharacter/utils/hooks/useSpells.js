import { useEffect, useState } from 'react';
import { totalBonusAmount } from '../characterUtils';

const useSpells = (spellsKnown, gameSpells, proficiencyBonus, chaMod) => {
  const [spells, setSpells] = useState({});

  useEffect(() => {
    const newSpells = spellsKnown.reduce(
      (acc, spell) => {
        const gameSpell = gameSpells[spell];
        const castBonusDetail = [
          { amount: proficiencyBonus, desc: 'Proficiency Bonus' },
          { amount: chaMod, desc: 'CHA Mod' },
        ];
        const castBonus = totalBonusAmount(castBonusDetail);
        const dcDetail = gameSpell.save
          ? [
            { amount: 8, desc: 'Base' },
            { amount: proficiencyBonus, desc: 'Proficiency Bonus' },
            { amount: chaMod, desc: 'CHA Mod' },
          ]
          : [{ amount: 0, desc: 'No save' }];
        const save = gameSpell.save || '-';
        const dc = save === '-' ? '-' : totalBonusAmount(dcDetail);

        const newSpell = Object.assign(gameSpell, {
          castBonus,
          castBonusDetail,
          dc,
          dcDetail,
          name: spell,
          save,
        });

        if (newSpell.level === 0) {
          acc.cantrips.push(newSpell);
        } else {
          acc.spells.push(newSpell);
        }
        return acc;
      },
      {
        cantrips: [],
        spells: [],
      },
    );

    setSpells(newSpells);
  }, [proficiencyBonus, chaMod]);

  return spells;
};

export default useSpells;
