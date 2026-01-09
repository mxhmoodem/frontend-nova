import { HTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  change?: number;
  icon?: LucideIcon;
  subText?: string;
  iconBgColor?: string;
  iconColor?: string;
}
