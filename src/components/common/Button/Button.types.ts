import { ButtonHTMLAttributes, ReactNode } from 'react';
import { TooltipPosition } from '../Tooltip/Tooltip.model';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: ReactNode;
  variant?: ButtonVariant;
  isLoading?: boolean;
  tooltip?: string;
  tooltipPosition?: TooltipPosition;
}
