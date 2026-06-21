import { motion } from 'framer-motion';
import { Shield, BookMarked, ScrollText, Scale } from 'lucide-react';
import { StarDivider } from '@/components/ui/StarDivider';
import { PartyEmblem } from '@/components/ui/PartyEmblem';

export default function About() {
  const sources = [
    { title: '《中国共产党历史》（第一卷、第二卷、第三卷）', publisher: '中央党史和文献研究院 编', year: '2011—2019' },
    { title: '《中国共产党历次代表大会及重要全会资料》', publisher: '人民出版社', year: '' },
    { title: '《中国共产党历届中央委员大辞典》', publisher: '中共党史出版社', year: '' },
    { title: '人民日报、新华社历次党代会/全会报道', publisher: '人民日报社、新华社', year: '' },
    { title: '《中国共产党章程》历次修订版本', publisher: '人民出版社', year: '' },
    { title: '《关于建国以来党的若干历史问题的决议》', publisher: '人民出版社', year: '1981' },
    { title: '《关于党的百年奋斗重大成就和历史经验的决议》', publisher: '人民出版社', year: '2021' },
    { title: '党的领导人官方传记', publisher: '中央文献研究室 编', year: '' },
  ];

  const principles = [
    { icon: Scale, title: '宪法遵循', desc: '所有内容严格遵循《中华人民共和国宪法》与《中国共产党章程》。' },
    { icon: ScrollText, title: '历史唯物主义', desc: '坚持历史唯物主义，客观呈现历史进程，以党中央正式决议为评价依据。' },
    { icon: Shield, title: '国家利益', desc: '不传播任何损害国家利益、社会公共利益的信息。' },
    { icon: BookMarked, title: '出处可溯', desc: '所有数据均标注可追溯的官方出处，杜绝臆造与不实信息。' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <div className="flex justify-center mb-4">
          <PartyEmblem size={56} />
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gold-gradient mb-3">
          关于本站
        </h1>
        <p className="text-sm text-party-paper/60 max-w-2xl mx-auto leading-relaxed">
          权威、严谨、可追溯的党史资料检索与展示平台
        </p>
      </motion.div>

      <StarDivider label="建站宗旨" />

      {/* 宗旨 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto mb-12"
      >
        <div className="bg-party-red-darker/60 backdrop-blur-sm border border-party-gold/30 rounded-lg p-8">
          <p className="text-party-paper/90 leading-relaxed text-sm md:text-base font-serif text-center">
            本站旨在系统收录中国共产党第一次全国代表大会至第二十届中央委员会第四次全体会议期间的所有全国代表大会与中央委员会全体会议资料，以官方公开资料为准绳，为研究者、党员、学生与公众提供准确、可追溯的党史学习平台。
          </p>
          <p className="text-party-gold-soft/80 leading-relaxed text-sm text-center mt-4">
            在宪法与党章框架下传播党史知识，弘扬红色文化。
          </p>
        </div>
      </motion.div>

      {/* 原则 */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-5xl mx-auto">
        {principles.map((p, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-party-red-darker/60 backdrop-blur-sm border border-party-gold/25 rounded-lg p-5 text-center hover:border-party-gold/50 transition-colors"
          >
            <div className="flex justify-center mb-3">
              <div className="p-3 rounded-full bg-party-gold/10 border border-party-gold/30">
                <p.icon className="text-party-gold" size={22} />
              </div>
            </div>
            <h3 className="font-serif font-bold text-base text-party-gold mb-2">{p.title}</h3>
            <p className="text-xs text-party-paper/70 leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>

      <StarDivider label="资料来源" />

      {/* 资料来源 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-paper-card rounded-lg p-8 border border-party-gold/30 shadow-party">
          <div className="flex items-center gap-2 mb-5 pb-3 border-b border-party-red/20">
            <BookMarked className="text-party-red" size={20} />
            <h2 className="font-serif font-bold text-lg text-party-red">官方资料来源</h2>
          </div>
          <ul className="space-y-3">
            {sources.map((src, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="flex items-start gap-3 text-sm text-party-ink-soft"
              >
                <span className="shrink-0 text-party-gold-deep mt-0.5">[{idx + 1}]</span>
                <div>
                  <span className="font-medium">{src.title}</span>
                  <span className="text-party-ink-soft/70"> — {src.publisher}</span>
                  {src.year && <span className="text-party-ink-soft/60">（{src.year}）</span>}
                </div>
              </motion.li>
            ))}
          </ul>
          <div className="mt-6 pt-4 border-t border-party-red/15">
            <p className="text-xs text-party-ink-soft/70 italic leading-relaxed">
              ※ 本站所有资料均来源于上述官方公开出版物。涉及历史评价的内容，以党的三个历史决议（1945年六届七中全会《关于若干历史问题的决议》、1981年十一届六中全会《关于建国以来党的若干历史问题的决议》、2021年十九届六中全会《关于党的百年奋斗重大成就和历史经验的决议》）为准。
            </p>
          </div>
        </div>
      </motion.div>

      {/* 版权声明 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto mt-8 text-center"
      >
        <p className="text-xs text-party-paper/50 leading-relaxed">
          本站为党史学习研究公益性项目，仅供学习交流使用。<br />
          所有内容版权归原作者及出版机构所有，引用请注明出处。
        </p>
      </motion.div>
    </div>
  );
}
