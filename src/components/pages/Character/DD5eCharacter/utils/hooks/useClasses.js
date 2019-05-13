import { useEffect, useState } from 'react';

import { totalBonusAmount } from '../characterUtils';

const useClasses = (classLevels, classes, abilities) => {
  const [saves, setSaves] = useState({});
  const [proficiencyBonus, setProficiencyBonus] = useState({});
  const [classDetails, setClassDetails] = useState([]);

  useEffect(() => {
    const savingThrows = Object.keys(classLevels).reduce((acc, classKey) => {
      const classSaves = classes[classKey].savingThrows;
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

  useEffect(() => {
    const classBonuses = Object.keys(classLevels).reduce((acc, key) => {
      const levelNum = classLevels[key];
      const classData = classes[key];
      const classLevelData = classData.levels[levelNum];
      const bonusAmt = classLevelData.proficiencyBonus;
      const bonusObj = {
        amount: bonusAmt,
        desc: `${classData.name} Level ${levelNum}`,
      };
      return [bonusObj, ...acc];
    }, []);
    const allBonuses = [...classBonuses];
    const totalBonus = totalBonusAmount(allBonuses);
    setProficiencyBonus({
      total: totalBonus,
      detail: allBonuses,
    });
  }, []);

  useEffect(() => {
    const newClassDetails = Object.keys(classLevels).reduce((acc, key) => {
      const initialDetail = classes[key].levels[classLevels[key]];
      const newDetail = Object.assign(initialDetail, {
        key,
        name: classes[key].name,
        level: classLevels[key],
        proficiencies: classes[key].startingProficiencies,
      });
      return [newDetail, ...acc];
    }, []);
    setClassDetails(newClassDetails);
  }, []);

  return { classDetails, proficiencyBonus, saves };
};

export default useClasses;
