import React from 'react';
import './avatar.css';
import { AvatarProps } from './avatar.model';
import { getInitials } from '../../../utils/formatters';

const Avatar: React.FC<AvatarProps> = ({ name, role, onclick }) => {
  return (
    <div className="avatar" onClick={onclick}>
      <div className="avatar__circle">
        <span className="avatar__initials">{getInitials(name)}</span>
      </div>
      <div className="avatar__info">
        <p className="avatar__name">{name}</p>
        {role && <p className="avatar__role">{role}</p>}
      </div>
    </div>
  );
};

export default Avatar;
