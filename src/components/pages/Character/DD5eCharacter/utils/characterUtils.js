export function calcAbilityMod(score) {
  return Math.floor((score - 10) / 2);
}

export function modFormat(score) {
  return score >= 0 ? `+${score}` : score;
}

export function calcProficiencyBonus() {}
