import { motion } from 'framer-motion';
import { UserCog, Crown } from 'lucide-react';
import type { Personnel } from '@/data/types';

interface PersonnelCardProps {
  personnel: Personnel;
}

export function PersonnelCard({ personnel }: PersonnelCardProps) {
  const hasData = personnel.centralCommittee || personnel.politburo ||
    personnel.standingCommittee || personnel.generalSecretary || personnel.chairman || personnel.notes;

  if (!hasData) return null;

  const stats = [
    { label: '中央委员', value: personnel.centralCommittee },
    { label: '政治局委员', value: personnel.politburo },
    { label: '政治局常委', value: personnel.standingCommittee },
  ].filter((s) => s.value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-paper-card rounded-lg p-6 border border-party-gold/30 shadow-party"
    >
      <div className="flex items-center gap-2 mb-5 pb-3 border-b border-party-red/20">
        <UserCog className="text-party-red" size={20} />
        <h3 className="font-serif font-bold text-lg text-party-red">人事与组织</h3>
      </div>

      {(personnel.chairman || personnel.generalSecretary) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-5 p-4 bg-gradient-to-br from-party-red/10 to-party-gold/10 border border-party-gold/40 rounded text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <Crown className="text-party-gold-deep" size={18} />
            <span className="text-xs text-party-ink-soft/70 tracking-wider">
              {personnel.chairman ? '中央委员会主席' : '中央委员会总书记'}
            </span>
          </div>
          <div className="font-serif font-bold text-2xl text-party-red">
            {personnel.chairman || personnel.generalSecretary}
          </div>
        </motion.div>
      )}

      {stats.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          {stats.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center p-3 bg-white/40 border border-party-gold/30 rounded"
            >
              <div className="font-serif font-bold text-2xl text-party-red-dark">{s.value}</div>
              <div className="text-xs text-party-ink-soft/70 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      )}

      {personnel.notes && (
        <div className="text-sm text-party-ink-soft leading-relaxed bg-white/30 p-3 rounded border-l-2 border-party-gold">
          {personnel.notes}
        </div>
      )}
    </motion.div>
  );
}
