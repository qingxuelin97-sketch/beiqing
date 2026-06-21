import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CongressTabsProps {
  ordinals: number[];
  active: number;
  onChange: (ordinal: number) => void;
}

export function CongressTabs({ ordinals, active, onChange }: CongressTabsProps) {
  return (
    <div className="relative">
      <div className="flex gap-1 overflow-x-auto pb-2 scroll-smooth" style={{ scrollbarWidth: 'thin' }}>
        {ordinals.map((ord) => (
          <button
            key={ord}
            onClick={() => onChange(ord)}
            className={cn(
              'relative shrink-0 px-4 py-2.5 text-sm font-medium transition-colors duration-300 whitespace-nowrap',
              active === ord
                ? 'text-party-red-darker'
                : 'text-party-paper/70 hover:text-party-gold'
            )}
          >
            第{ord}届
            {active === ord && (
              <motion.span
                layoutId="congress-tab-active"
                className="absolute inset-0 bg-gradient-to-br from-party-gold to-party-gold-soft rounded-md -z-10"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
