import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GoldButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const GoldButton = forwardRef<HTMLButtonElement, GoldButtonProps>(
  ({ children, className, variant = 'solid', size = 'md', onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // 涟漪效果
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      ripple.className = 'ripple-effect';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
      onClick?.(e);
    };

    const base =
      'ripple relative inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 active:scale-95 select-none';
    const sizes = {
      sm: 'px-4 py-1.5 text-sm rounded',
      md: 'px-6 py-2.5 text-base rounded-md',
      lg: 'px-8 py-3.5 text-lg rounded-md',
    };
    const variants = {
      solid:
        'bg-gradient-to-br from-party-gold to-party-gold-deep text-party-red-darker border border-party-gold hover:shadow-gold-glow hover:-translate-y-0.5',
      outline:
        'bg-transparent text-party-gold border border-party-gold/60 hover:border-party-gold hover:bg-party-gold/10 hover:shadow-gold-glow',
      ghost:
        'bg-transparent text-party-gold-soft hover:text-party-gold hover:bg-party-gold/10',
    };

    return (
      <button
        ref={ref}
        className={cn(base, sizes[size], variants[variant], className)}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

GoldButton.displayName = 'GoldButton';
