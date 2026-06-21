import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText } from 'lucide-react';
import { plenaries, getCongressOrdinals, getPlenariesByCongress } from '@/data';
import { PlenaryCard } from '@/components/plenary/PlenaryCard';
import { CongressTabs } from '@/components/plenary/CongressTabs';
import { StarDivider } from '@/components/ui/StarDivider';

export default function Plenaries() {
  const ordinals = getCongressOrdinals();
  const [active, setActive] = useState(ordinals[ordinals.length - 1]);
  const list = getPlenariesByCongress(active);

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <FileText className="text-party-gold" size={28} />
          <p className="text-xs text-party-gold-soft/70 tracking-[0.3em]">CENTRAL COMMITTEE PLENARY SESSIONS</p>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gold-gradient mb-3">
          中央委员会全体会议
        </h1>
        <p className="text-sm text-party-paper/60 max-w-2xl mx-auto leading-relaxed">
          按届次浏览历次中央委员会全体会议 · 共收录 {plenaries.length} 次
        </p>
      </motion.div>

      <StarDivider />

      {/* 届次选择 */}
      <div className="bg-party-red-darker/50 backdrop-blur-sm border border-party-gold/20 rounded-lg p-3 mb-8">
        <CongressTabs ordinals={ordinals} active={active} onChange={setActive} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {list.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {list.map((p, idx) => (
                <PlenaryCard key={p.id} plenary={p} index={idx} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-party-paper/60">
              <p className="text-sm">第{active}届中央委员会暂无收录全会资料</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
