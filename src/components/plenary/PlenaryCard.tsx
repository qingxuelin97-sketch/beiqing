import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import type { Plenary } from '@/data/types';
import { formatDate } from '@/utils/format';
import { PartyStar } from '@/components/ui/PartyEmblem';

interface PlenaryCardProps {
  plenary: Plenary;
  index: number;
}

export function PlenaryCard({ plenary, index }: PlenaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: (index % 3) * 0.08, duration: 0.5 }}
    >
      <Link to={`/plenaries/${plenary.id}`} className="group block h-full">
        <div className="relative h-full bg-party-red-darker/70 backdrop-blur-sm border border-party-gold/20 rounded-lg overflow-hidden transition-all duration-500 hover:border-party-gold/60 hover:shadow-card-hover hover:-translate-y-1">
          {/* 左侧届次色带 */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-party-gold via-party-gold-deep to-party-red" />

          <div className="p-5 pl-7">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <PartyStar size={14} className="text-party-gold" />
                <span className="text-xs text-party-gold-soft tracking-widest">
                  第{plenary.ordinal}次全体会议
                </span>
              </div>
              <span className="font-serif text-3xl font-black text-party-gold/15 group-hover:text-party-gold/30 transition-colors leading-none">
                {plenary.ordinal}
              </span>
            </div>

            <h3 className="font-serif font-bold text-lg text-party-gold mb-1 group-hover:text-shadow-gold transition-all">
              {plenary.name}
            </h3>
            <p className="text-xs text-party-paper/60 mb-3 line-clamp-1">{plenary.fullName}</p>

            <div className="space-y-1.5 text-xs mb-3">
              <div className="flex items-center gap-2 text-party-paper/80">
                <Calendar size={12} className="text-party-gold-soft shrink-0" />
                <span>{formatDate(plenary.date)}</span>
              </div>
              <div className="flex items-center gap-2 text-party-paper/80">
                <MapPin size={12} className="text-party-gold-soft shrink-0" />
                <span>{plenary.location}</span>
              </div>
            </div>

            <p className="text-xs text-party-paper/70 line-clamp-2 leading-relaxed mb-3">
              {plenary.significance}
            </p>

            <div className="flex items-center justify-end text-xs text-party-gold opacity-0 group-hover:opacity-100 transition-opacity">
              查看详情 <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
