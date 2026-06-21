import { motion } from 'framer-motion';
import { BookMarked, Quote } from 'lucide-react';
import type { Source } from '@/data/types';
import { formatCitation } from '@/utils/format';

interface SourceListProps {
  sources: Source[];
  significance?: string;
  communique?: string;
}

export function SourceList({ sources, significance, communique }: SourceListProps) {
  return (
    <div className="space-y-6">
      {significance && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-party-red-darker/80 to-party-red-darkest/80 backdrop-blur-sm rounded-lg p-6 border border-party-gold/30"
        >
          <div className="absolute top-3 right-3 text-party-gold/20 font-serif text-6xl leading-none select-none">
            ”
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Quote className="text-party-gold" size={20} />
            <h3 className="font-serif font-bold text-lg text-party-gold">历史意义</h3>
          </div>
          <p className="text-party-paper/90 leading-relaxed text-sm md:text-base font-serif">
            {significance}
          </p>
        </motion.div>
      )}

      {communique && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-paper-card rounded-lg p-6 border border-party-gold/30 shadow-party"
        >
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-party-red/20">
            <BookMarked className="text-party-red" size={20} />
            <h3 className="font-serif font-bold text-lg text-party-red">公报要点</h3>
          </div>
          <p className="text-party-ink leading-relaxed text-sm">{communique}</p>
        </motion.div>
      )}

      {sources.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-paper-card rounded-lg p-6 border border-party-gold/30 shadow-party"
        >
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-party-red/20">
            <BookMarked className="text-party-red" size={20} />
            <h3 className="font-serif font-bold text-lg text-party-red">资料来源</h3>
          </div>
          <ul className="space-y-2.5">
            {sources.map((src, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="flex items-start gap-2 text-sm text-party-ink-soft"
              >
                <span className="shrink-0 text-party-gold-deep mt-0.5">[{idx + 1}]</span>
                <span className="leading-relaxed">{formatCitation(src)}</span>
              </motion.li>
            ))}
          </ul>
          <p className="mt-4 pt-3 border-t border-party-red/15 text-xs text-party-ink-soft/60 italic">
            ※ 以上资料均来源于官方公开出版物，遵循《中华人民共和国宪法》与《中国共产党章程》
          </p>
        </motion.div>
      )}
    </div>
  );
}
