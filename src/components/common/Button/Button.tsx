import React from 'react';
import './Button.css';
import { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  variant = 'primary',
  className = '',
  isLoading = false,
  children,
  ...props
}) => {
  // Requirement: Tests should check if at least either icon or text has been passed in otherwise throw error
  if (!text && !icon && !children) {
    throw new Error(
      'Button component requires either "text" or "icon" prop to be defined.'
    );
  }

  const rootClassNames = [
    'button',
    `button--${variant}`,
    !text && icon ? 'button--icon-only' : '',
    isLoading ? 'button--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={rootClassNames}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <span className="button__spinner" />}
      {!isLoading && icon && <span className="button__icon">{icon}</span>}
      {!isLoading && text && <span className="button__text">{text}</span>}
      {!isLoading && children}
    </button>
  );
};
