import { useEffect, useState } from 'react';

import useRace from './useRace';
import useBonuses from './useBonuses';
import useInfo from './useInfo';
import useAbilities from './useAbilities';
import useClasses from './useClasses';
import useSkills from './useSkills';
import useFeatures from './useFeatures';
import useGear from './useGear';
import useSpells from './useSpells';
import useProficiencies from './useProficiencies';

const useDD5eCharacter = (char, game) => {
  const [character, setCharacter] = useState({});

  const race = useRace(char.race, game.races);
  const info = useInfo(char, game);
  const features = useFeatures(char.background, game.backgrounds, game.features);

  const bonuses = useBonuses(race.bonuses, char.selectedBonuses);

  const abilities = useAbilities(char.abilityScores, game.abilities, bonuses.ability);
  const { attacks, gear } = useGear(char.gear, game.items, abilities);
  const { classDetails, proficiencyBonus, saves: savingThrows } = useClasses(
    char.classLevels,
    game.classes,
    abilities,
  );
  const proficiencies = useProficiencies(classDetails, char.proficiencies);
  const skills = useSkills(game.skills, proficiencies, abilities, proficiencyBonus);
  const spells = useSpells(
    char.spellsKnown,
    game.spells,
    proficiencyBonus.total,
    abilities.cha.mod,
  );

  useEffect(() => {
    const newCharacter = {
      bonuses,
      race,
      info,
      abilities,
      classDetails,
      proficiencyBonus,
      savingThrows,
      proficiencies,
      skills,
      features,
      attacks,
      gear,
      spells,
    };

    setCharacter(newCharacter);
  }, [info, abilities, proficiencies, skills, proficiencyBonus, savingThrows, classDetails]);

  return { character };
};

export default useDD5eCharacter;
