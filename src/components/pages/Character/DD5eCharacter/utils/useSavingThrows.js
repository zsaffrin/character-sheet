import { useEffect, useState } from 'react';

const useSavingThrows = (character, game, abilities) => {
  const [saves, setSaves] = useState({});

  useEffect(() => {
    const savingThrows = Object.keys(character.classLevels).reduce((acc, classKey) => {
      const classSaves = game.classes[classKey].savingThrows;
      const newThrows = classSaves.reduce(
        (newSavingThrows, save) => (newSavingThrows.indexOf(save) < 0 ? [save, ...newSavingThrows] : newSavingThrows),
        [],
      );

      return [...newThrows, ...acc];
    }, []);

    const newSaves = savingThrows.reduce((obj, key) => {
      const { name, mod } = abilities[key] || {};

      return Object.assign(obj, {
        [key]: { name, mod },
      });
    }, {});

    setSaves(newSaves);
  }, [abilities]);

  return saves;
};

export default useSavingThrows;
