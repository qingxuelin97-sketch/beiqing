import { motion } from 'framer-motion';
import { timelineItems } from '@/data';
import { TimelineNode } from './TimelineNode';
import { StarDivider } from '@/components/ui/StarDivider';

export function Timeline() {
  return (
    <div className="relative">
      {/* 中央时间线 */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 bg-gradient-to-b from-transparent via-party-gold/40 to-transparent" />

      {/* 起始装饰 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative flex justify-center mb-8"
      >
        <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0">
          <div className="w-8 h-8 rounded-full bg-party-red border-2 border-party-gold flex items-center justify-center shadow-gold-glow">
            <span className="text-party-gold text-xs font-bold">始</span>
          </div>
        </div>
      </motion.div>

      <div className="space-y-8 md:space-y-0">
        {timelineItems.map((item, idx) => (
          <div
            key={item.id}
            className={`relative md:flex md:items-center md:min-h-[120px] ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
          >
            {/* 移动端：全部靠左 */}
            <div className="md:hidden pl-12">
              <TimelineNode item={item} index={idx} side="left" />
            </div>
            {/* 桌面端：左右交替 */}
            <div className="hidden md:block w-full flex">
              <TimelineNode item={item} index={idx} side={idx % 2 === 0 ? 'left' : 'right'} />
            </div>
          </div>
        ))}
      </div>

      {/* 结束装饰 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative flex justify-center mt-8"
      >
        <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0">
          <div className="w-8 h-8 rounded-full bg-party-gold border-2 border-party-red flex items-center justify-center shadow-gold-glow">
            <span className="text-party-red text-xs font-bold">今</span>
          </div>
        </div>
      </motion.div>

      <StarDivider label="百年征程 · 砥砺前行" />
    </div>
  );
}
