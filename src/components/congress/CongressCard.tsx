import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRef, type MouseEvent } from 'react';
import { MapPin, Calendar, Users, ArrowRight } from 'lucide-react';
import type { Congress } from '@/data/types';
import { formatDate, formatNumber } from '@/utils/format';
import { PartyStar } from '@/components/ui/PartyEmblem';

interface CongressCardProps {
  congress: Congress;
  index: number;
}

export function CongressCard({ congress, index }: CongressCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D 倾斜效果
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: (index % 4) * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="perspective-1000"
    >
      <Link to={`/congresses/${congress.id}`} className="block h-full">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="group relative h-full bg-party-red-darker/70 backdrop-blur-sm border border-party-gold/20 rounded-lg overflow-hidden transition-all duration-300 hover:border-party-gold/60 hover:shadow-card-hover"
          style={{ transformStyle: 'preserve-3d', transition: 'transform 0.2s ease-out, border-color 0.3s, box-shadow 0.3s' }}
        >
          {/* 顶部装饰条 */}
          <div className="h-1 bg-gradient-to-r from-party-gold-deep via-party-gold to-party-gold-deep" />

          {/* 届次大数字背景 */}
          <div className="absolute top-2 right-2 font-serif text-[120px] font-black text-party-gold/5 leading-none select-none pointer-events-none">
            {congress.ordinal}
          </div>

          <div className="relative p-6 z-10" style={{ transform: 'translateZ(20px)' }}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <PartyStar size={16} className="text-party-gold" />
                  <span className="text-xs text-party-gold-soft tracking-widest">
                    第{congress.ordinal}次
                  </span>
                </div>
                <h3 className="font-serif font-bold text-xl text-party-gold group-hover:text-shadow-gold transition-all">
                  {congress.shortName}
                </h3>
              </div>
            </div>

            <p className="text-xs text-party-paper/60 mb-4 line-clamp-1">{congress.name}</p>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-party-paper/80">
                <Calendar size={13} className="text-party-gold-soft shrink-0" />
                <span>{formatDate(congress.startDate)} — {formatDate(congress.endDate)}</span>
              </div>
              <div className="flex items-center gap-2 text-party-paper/80">
                <MapPin size={13} className="text-party-gold-soft shrink-0" />
                <span className="line-clamp-1">{congress.location}</span>
              </div>
              <div className="flex items-center gap-2 text-party-paper/80">
                <Users size={13} className="text-party-gold-soft shrink-0" />
                <span>代表{congress.delegates}人 · 党员{formatNumber(congress.representatives)}人</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-party-gold/15">
              <p className="text-xs text-party-paper/70 line-clamp-2 leading-relaxed">
                {congress.significance}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-end text-xs text-party-gold opacity-0 group-hover:opacity-100 transition-opacity">
              查看详情 <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
