import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface PlainExplanationCardProps {
  text: string;
  label?: string;
}

// 会议级通俗解读卡片：用简短通俗的语言说明本次会议的核心意义
export function PlainExplanationCard({ text, label = '一句话读懂' }: PlainExplanationCardProps) {
  if (!text) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden bg-gradient-to-br from-party-gold/12 via-party-red/8 to-party-gold/12 border-2 border-party-gold/40 rounded-lg p-6 shadow-party"
    >
      {/* 装饰背景 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-party-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-party-red/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-full bg-party-gold/20 border border-party-gold/40">
            <Sparkles className="text-party-gold-deep" size={18} />
          </div>
          <h3 className="font-serif font-bold text-lg text-party-gold-deep tracking-wide">
            {label}
          </h3>
          <div className="flex-1 h-px bg-gradient-to-r from-party-gold/40 to-transparent" />
        </div>
        <p className="text-base md:text-lg text-party-ink leading-relaxed font-serif">
          {text}
        </p>
      </div>
    </motion.div>
  );
}
