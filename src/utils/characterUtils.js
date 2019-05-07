export const calcMod = score => Math.floor((score - 10) / 2);

export const modFormat = score => (score >= 0 ? `+${score}` : score);
