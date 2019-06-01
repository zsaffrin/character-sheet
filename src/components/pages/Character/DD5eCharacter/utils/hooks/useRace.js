import { useEffect, useState } from 'react';

const useRace = (charRace, gameRaces) => {
  const [race, setRace] = useState({});

  useEffect(() => {
    const {
      bonuses, choices, features, languages, name, speed,
    } = gameRaces[charRace];
    const newRace = {
      bonuses,
      choices,
      features,
      languages,
      name,
      speed,
    };

    setRace(newRace);
  }, []);

  return race;
};

export default useRace;
