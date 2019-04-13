import React from 'react';

const CombatSection = () => (
  <>
    <div>
      <strong>Max HP</strong>
      {` ${C.maxHp}`}
    </div>
    <div>
      <strong>CMB</strong>
      {` ${this.cmb()}`}
    </div>
    <div>
      <strong>CMD</strong>
      {` ${this.cmd()}`}
    </div>
    <div>
      <strong>Touch AC</strong>
      {` ${this.touchAc()}`}
    </div>
    <div>
      <strong>Flat-Footed AC</strong>
      {` ${this.flatFootedAc()}`}
    </div>
    <div>
      <strong>AC</strong>
      {` ${this.ac()}`}
    </div>
    <div>
      <strong>Size</strong>
      {` ${size.name} (${modFormat(size.sizeModifier)})`}
      <br />
      {`Space: ${size.space}  Reach: ${size.naturalReach}`}
    </div>
    <div>
      <strong>BAB</strong>
      {` +${C.bab.join(' / +')}`}
    </div>
    <div>
      <strong>Initiative</strong>
      {` ${modFormat(this.initiative())}`}
    </div>
  </>
);

export default CombatSection;
