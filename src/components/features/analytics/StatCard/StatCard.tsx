import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../../../utils/cn';
import type { StatCardProps } from './StatCard.types';

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  subText,
  iconBgColor = 'bg-primary/10',
  iconColor = 'text-primary',
  className,
  ...props
}: StatCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <div
      className={cn(
        'card-base p-6 card-hover group bg-card/80 backdrop-blur-sm',
        className
      )}
      {...props}
    >
      <div className="flex justify-between items-start mb-4">
        {Icon && (
          <div
            className={cn(
              'p-3 rounded-xl transition-colors group-hover:scale-110 duration-200',
              iconBgColor,
              iconColor
            )}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
        {change !== undefined && (
          <span
            className={cn(
              'text-xs font-bold px-2 py-1 rounded-full border border-border/50',
              isPositive && 'text-green-600 bg-green-50 dark:bg-green-900/10',
              isNegative && 'text-red-600 bg-red-50 dark:bg-red-900/10',
              !isPositive &&
                !isNegative &&
                'text-muted-foreground bg-secondary/50'
            )}
          >
            <span className="flex items-center gap-1">
              {isPositive && <TrendingUp className="w-3 h-3" />}
              {isNegative && <TrendingDown className="w-3 h-3" />}
              {subText || `${change > 0 ? '+' : ''}${change}%`}
            </span>
          </span>
        )}
      </div>
      <div className="text-4xl font-bold mb-1 group-hover:text-primary transition-colors tracking-tight">
        {value}
      </div>
      <div className="text-sm text-muted-foreground font-medium">{title}</div>
    </div>
  );
}
