import React from 'react';
import { shape, string } from 'prop-types';

const ProfileSection = ({
  origin, background, socialClass, profession, drive,
}) => (
  <div>
    <div>
      <strong>ORIGIN</strong>
      {` ${origin.name}`}
    </div>
    <div>
      <strong>BACKGROUND</strong>
      {` ${background.name}`}
    </div>
    <div>
      <strong>SOCIAL CLASS</strong>
      {` ${socialClass.name}`}
    </div>
    <div>
      <strong>PROFESSION</strong>
      {` ${profession.name}`}
    </div>
    <div>
      <strong>DRIVE</strong>
      {` ${drive.name}`}
    </div>
  </div>
);
ProfileSection.propTypes = {
  origin: shape({ name: string }),
  background: shape({ name: string }),
  socialClass: shape({ name: string }),
  profession: shape({ name: string }),
  drive: shape({ name: string }),
};
ProfileSection.defaultProps = {
  origin: { name: '' },
  background: { name: '' },
  socialClass: { name: '' },
  profession: { name: '' },
  drive: { name: '' },
};

export default ProfileSection;
