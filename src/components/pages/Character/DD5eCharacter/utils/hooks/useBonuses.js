import { useEffect, useState } from 'react';

const useBonuses = (gameRaceBonuses = [], charSelectedBonuses = []) => {
  const [bonuses, setBonuses] = useState({});

  useEffect(() => {
    const allBonuses = [...gameRaceBonuses, ...charSelectedBonuses];

    const newBonuses = allBonuses.reduce(
      (acc, bonus) => {
        acc[bonus.type].push(bonus);
        return acc;
      },
      {
        ability: [],
      },
    );

    setBonuses(newBonuses);
  }, [gameRaceBonuses]);

  return bonuses;
};

export default useBonuses;
