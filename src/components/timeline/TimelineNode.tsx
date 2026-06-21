import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import type { TimelineItem } from '@/data/types';
import { formatDate, getYear } from '@/utils/format';
import { PartyStar } from '@/components/ui/PartyEmblem';

interface TimelineNodeProps {
  item: TimelineItem;
  index: number;
  side: 'left' | 'right';
}

export function TimelineNode({ item, index, side }: TimelineNodeProps) {
  const isCongress = item.type === 'congress';
  const link = isCongress ? `/congresses/${item.refId}` : `/plenaries/${item.refId}`;

  return (
    <div className={`relative flex ${side === 'left' ? 'justify-start' : 'justify-end'} md:w-1/2 ${side === 'left' ? 'md:pr-12' : 'md:pl-12'}`}>
      {/* 节点圆点 */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
        className={`absolute top-6 ${side === 'left' ? 'left-full -translate-x-1/2 md:left-auto md:right-0 md:translate-x-1/2' : 'right-full translate-x-1/2 md:right-auto md:left-0 md:-translate-x-1/2'} z-10`}
      >
        <div className="relative">
          <div className={`w-5 h-5 rounded-full ${isCongress ? 'bg-party-gold' : 'bg-party-red'} border-2 border-party-paper shadow-gold-glow`} />
          <motion.div
            className={`absolute inset-0 rounded-full ${isCongress ? 'bg-party-gold' : 'bg-party-red'}`}
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.2 }}
          />
        </div>
      </motion.div>

      {/* 卡片 */}
      <motion.div
        initial={{ opacity: 0, x: side === 'left' ? -30 : 30, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full md:w-auto md:max-w-md"
      >
        <Link to={link} className="group block">
          <div className={`relative bg-party-red-darker/70 backdrop-blur-sm border ${isCongress ? 'border-party-gold/30' : 'border-party-red/40'} rounded-lg p-5 transition-all duration-500 hover:border-party-gold/60 hover:shadow-card-hover hover:-translate-y-1`}>
            {/* 年份大字 */}
            <div className="absolute top-2 right-3 font-serif text-4xl font-black text-party-gold/10 select-none pointer-events-none">
              {getYear(item.date)}
            </div>

            <div className="flex items-center gap-2 mb-2">
              <PartyStar size={14} className={isCongress ? 'text-party-gold' : 'text-party-red'} />
              <span className={`text-xs tracking-widest ${isCongress ? 'text-party-gold-soft' : 'text-party-red/80'}`}>
                {isCongress ? '全国代表大会' : '中央全会'}
              </span>
            </div>

            <h3 className="font-serif font-bold text-lg text-party-gold mb-1 group-hover:text-shadow-gold transition-all">
              {item.title}
            </h3>
            <p className="text-xs text-party-paper/60 mb-3 line-clamp-1">{item.subtitle}</p>

            <div className="flex items-center gap-3 text-xs text-party-paper/70">
              <span className="flex items-center gap-1">
                <Calendar size={11} className="text-party-gold-soft" />
                {formatDate(item.date)}
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
