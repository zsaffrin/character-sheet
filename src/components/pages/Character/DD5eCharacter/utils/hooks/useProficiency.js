import { useEffect, useState } from 'react';

const useProficiency = (character, game) => {
  const [bonus, setBonus] = useState(0);

  useEffect(() => {
    const totalBonus = Object.keys(character.classLevels).reduce(
      (total, key) => total + game.classes[key].levels[character.classLevels[key]].proficiencyBonus,
      0,
    );
    setBonus(totalBonus);
  }, []);

  return bonus;
};

export default useProficiency;
