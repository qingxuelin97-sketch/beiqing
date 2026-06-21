import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, FileText, UserCheck } from 'lucide-react';
import type { Congress, Plenary } from '@/data/types';
import { formatDate, formatNumber } from '@/utils/format';

interface InfoCardProps {
  data: Congress | Plenary;
  type: 'congress' | 'plenary';
}

export function InfoCard({ data, type }: InfoCardProps) {
  const isCongress = type === 'congress';
  const congress = data as Congress;
  const plenary = data as Plenary;

  const items = isCongress
    ? [
        { icon: Calendar, label: '召开时间', value: `${formatDate(congress.startDate)} — ${formatDate(congress.endDate)}` },
        { icon: MapPin, label: '召开地点', value: congress.location },
        { icon: Users, label: '出席代表', value: `${congress.delegates} 人` },
        { icon: FileText, label: '全国党员', value: `${formatNumber(congress.representatives)} 人` },
      ]
    : [
        { icon: Calendar, label: '召开时间', value: formatDate(plenary.date) },
        { icon: MapPin, label: '召开地点', value: plenary.location },
        { icon: Users, label: '出席人员', value: plenary.attendees },
      ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-paper-card rounded-lg p-6 border border-party-gold/30 shadow-party"
    >
      <div className="flex items-center gap-2 mb-5 pb-3 border-b border-party-red/20">
        <UserCheck className="text-party-red" size={20} />
        <h3 className="font-serif font-bold text-lg text-party-red">基本信息</h3>
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.1 }}
            className="flex items-start gap-3"
          >
            <div className="shrink-0 p-2 rounded bg-party-red/10 border border-party-red/20">
              <item.icon className="text-party-red" size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-party-ink-soft/70 mb-0.5">{item.label}</div>
              <div className="text-sm text-party-ink font-medium">{item.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {isCongress && congress.personnel.generalSecretary && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-5 pt-4 border-t border-party-red/20"
        >
          <div className="text-xs text-party-ink-soft/70 mb-1">主要负责人</div>
          <div className="text-base font-serif font-bold text-party-red">
            {congress.personnel.chairman || congress.personnel.generalSecretary}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
