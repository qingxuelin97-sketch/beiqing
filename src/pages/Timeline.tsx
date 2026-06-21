import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Timeline } from '@/components/timeline/Timeline';

export default function TimelinePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Calendar className="text-party-gold" size={28} />
          <p className="text-xs text-party-gold-soft/70 tracking-[0.3em]">HISTORICAL TIMELINE</p>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gold-gradient mb-3">
          历史时间轴
        </h1>
        <p className="text-sm text-party-paper/60 max-w-2xl mx-auto leading-relaxed">
          1921 — 至今 · 中国共产党历次代表大会与中央全会
        </p>
      </motion.div>

      <Timeline />
    </div>
  );
}
