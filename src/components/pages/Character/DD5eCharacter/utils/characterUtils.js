export function calcAbilityMod(score) {
  return Math.floor((score - 10) / 2);
}

export function modFormat(score) {
  return score >= 0 ? `+${score}` : score;
}

export function prepareSkills(gameSkills, characterProficiences) {
  return Object.keys(gameSkills).reduce((obj, key) => {
    const { name } = gameSkills[key];
    const proficient = characterProficiences.indexOf(key) >= 0;
    return Object.assign(obj, {
      [key]: {
        name,
        proficient,
      },
    });
  }, {});
}
