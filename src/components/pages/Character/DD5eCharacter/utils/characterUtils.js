export function calcAbilityMod(score) {
  return Math.floor((score - 10) / 2);
}

export function modFormat(score) {
  return score >= 0 ? `+${score}` : score;
}

export function higherVal(a, b) {
  return a > b ? a : b;
}

export function totalBonusAmount(bonuses) {
  return bonuses.reduce((acc, bonus) => acc + bonus.amount, 0);
}

export function isProficient(focus, proficiencies) {
  return Object.keys(proficiencies).reduce(
    (accA, categoryKey) => (typeof proficiencies[categoryKey] === 'object'
      ? Object.keys(proficiencies[categoryKey]).reduce((accB, proficiencyKey) => {
        if (proficiencyKey === focus.name || proficiencyKey === focus.proficiencyCategory) return true;

        return accB;
      }, false)
      : accA),
    false,
  );
}

export function currency(amount) {
  if (amount < 1) {
    const sp = amount * 10;
    if (sp < 1) {
      const cp = sp * 10;
      return `${cp} cp`;
    }

    return `${sp} sp`;
  }

  return `${Number(amount).toLocaleString()} gp`;
}

export function round(num) {
  return parseInt(num * 100, 10) / 100;
}
