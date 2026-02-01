import React, { KeyboardEvent } from 'react';
import { CardProps } from './Card.types';
import './Card.css';

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  clickable = false,
  hoverable = false,
  onClick,
  className = '',
  padding = 'md',
  header,
  footer,
  testId,
  ariaLabel,
  selected = false,
}) => {
  const hasSections = header || footer;

  const classNames = [
    'card',
    `card--${variant}`,
    `card--padding-${padding}`,
    hoverable && 'card--hoverable',
    clickable && 'card--clickable',
    selected && 'card--selected',
    hasSections && 'card--with-sections',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (clickable && onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  const cardProps = {
    className: classNames,
    'data-testid': testId,
    'aria-label': ariaLabel,
    ...(clickable && {
      role: 'button',
      tabIndex: 0,
      onClick,
      onKeyDown: handleKeyDown,
    }),
  };

  if (hasSections) {
    return (
      <div {...cardProps}>
        {header && <div className="card__header">{header}</div>}
        <div className="card__body">{children}</div>
        {footer && <div className="card__footer">{footer}</div>}
      </div>
    );
  }

  return <div {...cardProps}>{children}</div>;
};

export default Card;
