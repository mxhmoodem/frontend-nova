import { useState } from 'react';
import { cn } from '../../../utils/cn';
import type { AvatarProps } from './Avatar.types';

const sizeStyles = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
};

export default function Avatar({
  src,
  alt = '',
  initials,
  size = 'md',
  className,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const showImage = src && !imageError;

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-lg bg-secondary border border-border font-semibold text-foreground overflow-hidden',
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span>{initials || alt?.charAt(0)?.toUpperCase() || '?'}</span>
      )}
    </div>
  );
}
