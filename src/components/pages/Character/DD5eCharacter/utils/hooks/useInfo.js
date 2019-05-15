import { useEffect, useState } from 'react';

const useInfo = (characterData, gameData, hd) => {
  const [info, setInfo] = useState({});

  useEffect(() => {
    const {
      alignment, background, classLevels, name, race, xp,
    } = characterData;
    const { races, classes, backgrounds } = gameData;
    const raceDetail = races[race];
    const classString = Object.keys(classLevels)
      .map(c => `${classes[c].name} ${classLevels[c]}`)
      .join(' ');
    const backgroundDetail = backgrounds[background];
    const totalXp = xp.reduce((acc, entry) => acc + entry.points, 0);

    const newInfo = {
      name,
      race: raceDetail.name,
      classes: classString,
      alignment,
      background: backgroundDetail.name,
      xp: totalXp,
    };

    setInfo(newInfo);
  }, []);

  return info;
};

export default useInfo;
