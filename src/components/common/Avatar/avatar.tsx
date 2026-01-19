import './avatar.css';
import { AvatarProps } from './avatar.model';

export default function Avatar({ name, role, onclick }: AvatarProps) {
  const getInitials = (fullName: string) => {
    return fullName
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

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
}
