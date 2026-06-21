import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { congresses } from '@/data';
import { CongressCard } from '@/components/congress/CongressCard';
import { StarDivider } from '@/components/ui/StarDivider';

export default function Congresses() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <BookOpen className="text-party-gold" size={28} />
          <p className="text-xs text-party-gold-soft/70 tracking-[0.3em]">NATIONAL CONGRESSES</p>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gold-gradient mb-3">
          历次全国代表大会
        </h1>
        <p className="text-sm text-party-paper/60 max-w-2xl mx-auto leading-relaxed">
          中国共产党第一次全国代表大会至第二十次全国代表大会 · 共 {congresses.length} 次
        </p>
      </motion.div>

      <StarDivider />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {congresses.map((c, idx) => (
          <CongressCard key={c.id} congress={c} index={idx} />
        ))}
      </div>
    </div>
  );
}
