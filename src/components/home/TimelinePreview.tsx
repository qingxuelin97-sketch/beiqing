import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { congresses } from '@/data';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { formatDate, getYear } from '@/utils/format';
import { PartyStar } from '@/components/ui/PartyEmblem';

export function TimelinePreview() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="relative py-16 px-4">
      <div ref={ref} className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <p className="text-xs text-party-gold-soft/70 tracking-[0.3em] mb-2">HISTORICAL TIMELINE</p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gold-gradient">
              历次代表大会 · 历史脉络
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-party-gold/40 text-party-gold hover:bg-party-gold/10 transition-colors"
              aria-label="向左滚动"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-party-gold/40 text-party-gold hover:bg-party-gold/10 transition-colors"
              aria-label="向右滚动"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'thin' }}
        >
          {congresses.map((c, idx) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, x: 30 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              className="snap-start shrink-0 w-[280px]"
            >
              <Link to={`/congresses/${c.id}`} className="group block h-full">
                <div className="relative h-full bg-party-red-darker/70 backdrop-blur-sm border border-party-gold/20 rounded-lg p-5 transition-all duration-500 hover:border-party-gold/60 hover:bg-party-red-darker/90 hover:shadow-card-hover hover:-translate-y-1.5">
                  {/* 届次标识 */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-serif text-5xl font-black text-party-gold/20 group-hover:text-party-gold/40 transition-colors leading-none">
                      {c.ordinal}
                    </span>
                    <PartyStar size={20} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h3 className="font-serif font-bold text-lg text-party-gold mb-1 group-hover:text-shadow-gold transition-all">
                    {c.shortName}
                  </h3>
                  <p className="text-xs text-party-paper/60 mb-3 leading-relaxed line-clamp-2">
                    {c.name}
                  </p>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 text-party-paper/80">
                      <span className="text-party-gold-soft">时间</span>
                      <span>{getYear(c.startDate)}年</span>
                    </div>
                    <div className="flex items-center gap-2 text-party-paper/80">
                      <span className="text-party-gold-soft">地点</span>
                      <span className="line-clamp-1">{c.location}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-party-gold/15 flex items-center justify-between text-xs">
                    <span className="text-party-gold-soft/70">{formatDate(c.startDate)}</span>
                    <span className="text-party-gold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      查看详情 <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <Link
            to="/timeline"
            className="inline-flex items-center gap-2 text-party-gold hover:text-party-gold-soft transition-colors text-sm tracking-wider group"
          >
            查看完整时间轴
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
