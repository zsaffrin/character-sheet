import { useEffect, useState } from 'react';

const useRace = (charRace, gameRaces) => {
  const [race, setRace] = useState({});

  useEffect(() => {
    const { bonuses, name, speed } = gameRaces[charRace];
    const newRace = {
      bonuses,
      name,
      speed,
    };

    setRace(newRace);
  }, []);

  return race;
};

export default useRace;
