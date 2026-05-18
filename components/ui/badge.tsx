import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-emerald-600 text-white',
    secondary: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    outline: 'border border-gray-300 text-gray-700',
  };

  return (
    <div
      className={cn('inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold', variants[variant], className)}
      {...props}
    />
  );
}
