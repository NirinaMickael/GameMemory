import * as React from 'react';
import { cn } from '@/lib/utils';

export type InputProps = React.ComponentProps<'input'> & {
  error?: string;
  label?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-y-3">
        {label && <label className="text-sm font-medium">{label}</label>}
        <div className="relative">
          <input
            type={type}
            className={cn(
              'flex h-10 w-full rounded-lg border border-input !bg-primary/5 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              className,
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && <h6 className="text-[10px] text-destructive">{error}</h6>}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
