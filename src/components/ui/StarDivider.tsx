import { cn } from '@/lib/utils';

interface StarDividerProps {
  className?: string;
  label?: string;
}

export function StarDivider({ className, label }: StarDividerProps) {
  return (
    <div className={cn('flex items-center justify-center gap-4 py-6', className)}>
      <div className="h-px flex-1 max-w-[200px] bg-gradient-to-r from-transparent to-party-gold/60" />
      <div className="flex items-center gap-2">
        <span className="text-party-gold/40 text-xs">❖</span>
        <span className="text-party-gold text-lg leading-none">★</span>
        {label && (
          <span className="text-party-gold-soft text-sm font-serif tracking-widest px-2">
            {label}
          </span>
        )}
        <span className="text-party-gold text-lg leading-none">★</span>
        <span className="text-party-gold/40 text-xs">❖</span>
      </div>
      <div className="h-px flex-1 max-w-[200px] bg-gradient-to-l from-transparent to-party-gold/60" />
    </div>
  );
}
