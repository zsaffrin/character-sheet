import { useEffect, useState } from 'react';

import useAbilities from './useAbilities';
import useBonuses from './useBonuses';
import useClasses from './useClasses';
import useCombat from './useCombat';
import useFeatures from './useFeatures';
import useGear from './useGear';
import useInfo from './useInfo';
import useProficiencies from './useProficiencies';
import useRace from './useRace';
import useSkills from './useSkills';
import useSpells from './useSpells';

const useDD5eCharacter = (char, game) => {
  const [character, setCharacter] = useState({});

  const { characteristics } = char;

  const race = useRace(char.race, game.races);
  const info = useInfo(char, game);
  const features = useFeatures(char.background, game.backgrounds, race, game.features);
  const proficiencies = useProficiencies(char.proficiencies);

  const bonuses = useBonuses(race.bonuses, char.selectedBonuses);

  const abilities = useAbilities(char.abilityScores, game.abilities, bonuses.ability);
  const {
    classDetails, hd, proficiencyBonus, saves: savingThrows,
  } = useClasses(
    char.classLevels,
    game.classes,
    abilities,
  );
  const { armorBonus, attacks, gear } = useGear(
    char.gear,
    game.items,
    abilities,
    proficiencies,
    proficiencyBonus,
  );
  const combat = useCombat(armorBonus, abilities, hd, char.maxHp, race);
  const skills = useSkills(game.skills, proficiencies.skills, abilities, proficiencyBonus);
  const spells = useSpells(
    char.spellsKnown,
    game.spells,
    proficiencyBonus.total,
    abilities.cha.mod,
  );

  useEffect(() => {
    const newCharacter = {
      abilities,
      attacks,
      characteristics,
      classDetails,
      combat,
      features,
      gear,
      info,
      proficiencies,
      proficiencyBonus,
      savingThrows,
      skills,
      spells,
    };

    setCharacter(newCharacter);
  }, [abilities, classDetails, info, proficiencies, proficiencyBonus, savingThrows, skills]);

  return { character };
};

export default useDD5eCharacter;
