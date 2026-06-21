import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, BookOpen, FileText } from 'lucide-react';
import { ParticleBg } from '@/components/ui/ParticleBg';
import { GoldButton } from '@/components/ui/GoldButton';
import { PartyStar } from '@/components/ui/PartyEmblem';

export function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
      {/* 背景层 */}
      <div className="absolute inset-0 bg-party-gradient" />
      <div className="absolute inset-0 bg-paper-texture opacity-30" />
      <ParticleBg density={80} />

      {/* 装饰性大五角星 */}
      <motion.div
        className="absolute top-[15%] left-[8%] opacity-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        <PartyStar size={180} />
      </motion.div>
      <motion.div
        className="absolute bottom-[12%] right-[6%] opacity-10"
        animate={{ rotate: -360 }}
        transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
      >
        <PartyStar size={140} />
      </motion.div>

      {/* 内容 */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <PartyStar size={64} className="text-party-gold drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]" />
            <motion.div
              className="absolute inset-0"
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <PartyStar size={64} className="text-party-gold" />
            </motion.div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-party-gold-soft text-sm md:text-base tracking-[0.4em] mb-4 font-light"
        >
          不忘初心 · 牢记使命
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-serif font-black text-4xl md:text-6xl lg:text-7xl mb-4 leading-tight"
        >
          <span className="gold-shimmer">中共党史资料库</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-party-paper/90 text-base md:text-xl font-serif mb-2 tracking-wide"
        >
          中国共产党第一次全国代表大会
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-party-gold text-sm md:text-base mb-10 tracking-[0.3em]"
        >
          至 第二十届中央委员会第四次全体会议
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link to="/congresses">
            <GoldButton size="lg" variant="solid">
              <BookOpen size={18} />
              浏览代表大会
            </GoldButton>
          </Link>
          <Link to="/plenaries">
            <GoldButton size="lg" variant="outline">
              <FileText size={18} />
              查看中央全会
            </GoldButton>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1 text-party-gold-soft/70"
          >
            <span className="text-xs tracking-widest">向下滚动</span>
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
