import { motion } from 'framer-motion';
import { Users, FileText, Calendar, BookMarked } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { congresses, plenaries } from '@/data';
import { formatNumber } from '@/utils/format';

interface StatItemProps {
  icon: typeof Users;
  label: string;
  value: number;
  suffix?: string;
  delay: number;
  visible: boolean;
  formatter?: (n: number) => string;
}

function StatItem({ icon: Icon, label, value, suffix, delay, visible, formatter }: StatItemProps) {
  const count = useCountUp(value, 2000, visible);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      className="relative group"
    >
      <div className="relative bg-party-red-darker/60 backdrop-blur-sm border border-party-gold/25 rounded-lg p-6 text-center transition-all duration-500 hover:border-party-gold/60 hover:bg-party-red-darker/80 hover:shadow-gold-glow hover:-translate-y-1">
        <div className="flex justify-center mb-3">
          <div className="p-3 rounded-full bg-party-gold/10 border border-party-gold/30 group-hover:bg-party-gold/20 transition-colors">
            <Icon className="text-party-gold" size={26} />
          </div>
        </div>
        <div className="font-serif font-bold text-3xl md:text-4xl text-gold-gradient mb-1">
          {formatter ? formatter(count) : count}
          {suffix && <span className="text-xl ml-1">{suffix}</span>}
        </div>
        <div className="text-xs md:text-sm text-party-paper/70 tracking-wider">{label}</div>
      </div>
    </motion.div>
  );
}

export function StatsBoard() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

  const totalDocs = congresses.reduce((acc, c) => acc + c.documents.length, 0) +
    plenaries.reduce((acc, p) => acc + p.documents.length, 0);

  return (
    <section className="relative py-16 px-4">
      <div ref={ref} className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-gold-gradient mb-2">
            百年党史 · 数据一览
          </h2>
          <p className="text-sm text-party-paper/60 tracking-widest">DATA OVERVIEW</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatItem icon={Calendar} label="历次全国代表大会" value={congresses.length} delay={0.1} visible={visible} />
          <StatItem icon={FileText} label="收录中央全会" value={plenaries.length} delay={0.2} visible={visible} />
          <StatItem icon={BookMarked} label="收录重要文件" value={totalDocs} delay={0.3} visible={visible} />
          <StatItem
            icon={Users}
            label="二十大党员数"
            value={96700000}
            delay={0.4}
            visible={visible}
            formatter={formatNumber}
          />
        </div>
      </div>
    </section>
  );
}
