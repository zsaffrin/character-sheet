import { useEffect, useState } from 'react';

import { totalBonusAmount } from '../characterUtils';

const useClasses = (classLevels, classes, abilities) => {
  const [saves, setSaves] = useState({});
  const [proficiencyBonus, setProficiencyBonus] = useState({});
  const [classDetails, setClassDetails] = useState([]);
  const [hd, setHd] = useState(0);

  useEffect(() => {
    const savingThrows = Object.keys(classLevels).reduce((acc, classKey) => {
      const classSaves = classes[classKey].savingThrows;
      const newThrows = classSaves.reduce(
        (newSavingThrows, save) => (newSavingThrows.indexOf(save) < 0
          ? [
            {
              key: save,
              source: classKey,
              sourceType: 'Class',
            },
            ...newSavingThrows,
          ]
          : newSavingThrows),
        [],
      );

      return [...newThrows, ...acc];
    }, []);

    const newSaves = savingThrows.reduce((obj, savingThrow) => {
      const { key } = savingThrow;
      const { name, mod } = abilities[key] || {};

      return Object.assign(obj, {
        [key]: Object.assign(savingThrow, { name, mod }),
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
        proficiencies: classes[key].proficiencies,
      });
      return [newDetail, ...acc];
    }, []);
    setClassDetails(newClassDetails);
  }, []);

  useEffect(() => {
    const newHd = classDetails.reduce((acc, cd) => acc + cd.level, 0);

    setHd(newHd);
  }, [classDetails]);

  return {
    classDetails, hd, proficiencyBonus, saves,
  };
};

export default useClasses;
