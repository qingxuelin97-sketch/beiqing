import { cn } from '@/lib/utils';

// 党徽样式五角星图标
interface PartyStarProps {
  className?: string;
  size?: number;
}

export function PartyStar({ className, size = 24 }: PartyStarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn('text-party-gold', className)}
      aria-hidden="true"
    >
      <path d="M12 2 L14.59 8.41 L21.5 9.27 L16.5 14.14 L17.78 21.02 L12 17.77 L6.22 21.02 L7.5 14.14 L2.5 9.27 L9.41 8.41 Z" />
    </svg>
  );
}

// 党徽（镰刀锤头）简化版
export function PartyEmblem({ className, size = 48 }: PartyStarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={cn('text-party-gold', className)}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      {/* 镰刀 */}
      <path
        d="M 30 25 Q 20 35 25 55 Q 30 70 50 75"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M 25 30 Q 18 40 22 55"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* 锤头 */}
      <path
        d="M 55 30 L 75 50 L 70 55 L 50 35 Z"
        fill="currentColor"
      />
      <rect x="48" y="33" width="4" height="40" fill="currentColor" transform="rotate(45 50 53)" />
    </svg>
  );
}
