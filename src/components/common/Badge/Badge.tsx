import { cn } from '../../../utils/cn';
import type { BadgeProps } from './Badge.types';

const variantStyles = {
  default: 'bg-secondary text-secondary-foreground',
  primary: 'bg-primary/10 text-primary border-primary/20',
  secondary: 'bg-secondary text-muted-foreground',
  success:
    'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/20 dark:border-green-900/30',
  warning:
    'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:border-amber-900/30',
  danger:
    'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:border-red-900/30',
  outline: 'border border-border bg-transparent text-foreground',
};

const sizeStyles = {
  sm: 'text-[10px] px-1.5 py-0.5',
  md: 'text-xs px-2.5 py-1',
};

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-bold rounded-full border',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
