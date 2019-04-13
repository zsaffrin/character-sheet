class Pathfinder {
  constructor(data) {
    this.carryingCapacity = data.carryingCapacity || [];
    this.encumbranceEffects = data.encumbranceEffects || {};
    this.reducedSpeeds = data.reducedSpeeds || [];
    this.savingThrows = data.savingThrows || [];
    this.creatureSizes = data.creatureSizes || [];
    this.classes = data.classes || [];
    this.skills = data.skills || [];
  }

  canCarry(strengthScore) {
    return this.carryingCapacity[strengthScore];
  }

  saveBonus(key) {
    return this.savingThrows.find(s => s.key === key);
  }
}

export default Pathfinder;
