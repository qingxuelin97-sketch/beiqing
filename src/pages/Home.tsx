import { motion } from 'framer-motion';
import { Hero } from '@/components/home/Hero';
import { StatsBoard } from '@/components/home/StatsBoard';
import { TimelinePreview } from '@/components/home/TimelinePreview';
import { StarDivider } from '@/components/ui/StarDivider';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, FileText, Shield } from 'lucide-react';
import { congresses, plenaries } from '@/data';

export default function Home() {
  const featuredCongress = congresses[congresses.length - 1];
  const featuredPlenary = plenaries[plenaries.length - 1];

  return (
    <div>
      <Hero />

      <StarDivider label="百年党史 · 数据一览" />

      <StatsBoard />

      <TimelinePreview />

      {/* 最新收录 */}
      <section className="relative py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-xs text-party-gold-soft/70 tracking-[0.3em] mb-2">LATEST RECORDS</p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gold-gradient">
              最新收录
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link to={`/congresses/${featuredCongress.id}`} className="group block h-full">
                <div className="relative h-full bg-party-red-darker/70 backdrop-blur-sm border border-party-gold/30 rounded-lg p-6 transition-all duration-500 hover:border-party-gold/70 hover:shadow-card-hover hover:-translate-y-1">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="text-party-gold" size={20} />
                    <span className="text-xs text-party-gold-soft tracking-widest">代表大会</span>
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-party-gold mb-2 group-hover:text-shadow-gold transition-all">
                    {featuredCongress.shortName}
                  </h3>
                  <p className="text-sm text-party-paper/70 mb-4 line-clamp-3 leading-relaxed">
                    {featuredCongress.significance}
                  </p>
                  <div className="flex items-center text-sm text-party-gold">
                    查看详情 <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link to={`/plenaries/${featuredPlenary.id}`} className="group block h-full">
                <div className="relative h-full bg-party-red-darker/70 backdrop-blur-sm border border-party-gold/30 rounded-lg p-6 transition-all duration-500 hover:border-party-gold/70 hover:shadow-card-hover hover:-translate-y-1">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="text-party-gold" size={20} />
                    <span className="text-xs text-party-gold-soft tracking-widest">中央全会</span>
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-party-gold mb-2 group-hover:text-shadow-gold transition-all">
                    {featuredPlenary.name}
                  </h3>
                  <p className="text-sm text-party-paper/70 mb-4 line-clamp-3 leading-relaxed">
                    {featuredPlenary.significance}
                  </p>
                  <div className="flex items-center text-sm text-party-gold">
                    查看详情 <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 合规声明 */}
      <section className="relative py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-3xl"
        >
          <div className="relative bg-party-red-darker/60 backdrop-blur-sm border border-party-gold/30 rounded-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <Shield className="text-party-gold" size={36} />
            </div>
            <h2 className="font-serif text-xl font-bold text-party-gold mb-3">合规与声明</h2>
            <p className="text-sm text-party-paper/80 leading-relaxed mb-4">
              本站所有资料均来源于官方公开出版物，严格遵循《中华人民共和国宪法》与《中国共产党章程》。
            </p>
            <p className="text-xs text-party-paper/60 leading-relaxed">
              坚持历史唯物主义，客观呈现历史进程，所有数据均标注可追溯的官方出处，不传播任何损害国家利益、社会公共利益的信息。
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
