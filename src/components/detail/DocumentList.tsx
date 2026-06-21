import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ScrollText, FileSignature, Sparkles, Lightbulb, BookMarked, ArrowRight } from 'lucide-react';
import type { PartyDocument } from '@/data/types';
import { hasFullText } from '@/data/fullTexts';
import { cn } from '@/lib/utils';

const typeColor: Record<string, string> = {
  '纲领': 'bg-party-red/15 text-party-red border-party-red/30',
  '章程': 'bg-party-gold-deep/15 text-party-gold-deep border-party-gold-deep/40',
  '决议': 'bg-party-red/10 text-party-red-dark border-party-red/25',
  '报告': 'bg-party-ink/10 text-party-ink border-party-ink/20',
  '宣言': 'bg-party-gold/15 text-party-gold-deep border-party-gold/30',
  '公报': 'bg-party-red-dark/10 text-party-red-dark border-party-red-dark/25',
  '决定': 'bg-party-gold-deep/10 text-party-gold-deep border-party-gold-deep/30',
  '意见': 'bg-party-ink/8 text-party-ink-soft border-party-ink/20',
};

interface DocumentListProps {
  documents: PartyDocument[];
  agenda?: string[];
  /** 当前会议 ID，用于构建全文链接 */
  meetingId?: string;
}

export function DocumentList({ documents, agenda, meetingId }: DocumentListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-paper-card rounded-lg p-6 border border-party-gold/30 shadow-party"
    >
      {agenda && agenda.length > 0 && (
        <>
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-party-red/20">
            <ScrollText className="text-party-red" size={20} />
            <h3 className="font-serif font-bold text-lg text-party-red">主要议程</h3>
          </div>
          <ul className="space-y-2.5 mb-6">
            {agenda.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="flex items-start gap-3 text-sm text-party-ink leading-relaxed"
              >
                <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-party-red/10 border border-party-red/30 flex items-center justify-center text-xs font-bold text-party-red">
                  {idx + 1}
                </span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </>
      )}

      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-party-red/20">
        <FileSignature className="text-party-red" size={20} />
        <h3 className="font-serif font-bold text-lg text-party-red">通过文件</h3>
      </div>

      {documents.length === 0 ? (
        <p className="text-sm text-party-ink-soft/60 italic">本次会议未通过正式文件，详见公报内容。</p>
      ) : (
        <div className="space-y-4">
          {documents.map((doc, idx) => {
            const docHasFullText = hasFullText(doc.title);
            const fullTextLink = meetingId
              ? `/documents/${meetingId}-doc-${idx}`
              : null;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white/40 border border-party-gold/30 rounded p-4 hover:border-party-gold/60 hover:shadow-md transition-all"
              >
                {/* 文件标题与类型 */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="font-serif font-bold text-base text-party-red-dark leading-snug">
                    《{doc.title}》
                  </h4>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {docHasFullText && (
                      <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 bg-party-gold/15 text-party-gold-deep border border-party-gold/30 rounded font-medium">
                        <BookMarked size={9} />
                        全文
                      </span>
                    )}
                    <span className={cn('text-xs px-2 py-0.5 rounded border', typeColor[doc.type] || typeColor['报告'])}>
                      {doc.type}
                    </span>
                  </div>
                </div>

                {/* 文件摘要 */}
                <p className="text-sm text-party-ink-soft leading-relaxed mb-3">{doc.summary}</p>

                {/* 通俗解读 */}
                {doc.plainExplanation && (
                  <div className="bg-gradient-to-br from-party-red/5 to-party-gold/8 border border-party-gold/25 rounded p-3 mb-3">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Sparkles size={13} className="text-party-gold-deep" />
                      <span className="text-xs font-bold text-party-gold-deep tracking-wider">通俗解读</span>
                    </div>
                    <p className="text-sm text-party-ink leading-relaxed font-serif">
                      {doc.plainExplanation}
                    </p>
                  </div>
                )}

                {/* 核心要点 + 查看全文按钮 */}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  {doc.keyPoints && doc.keyPoints.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {doc.keyPoints.map((pt, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 bg-party-red/8 text-party-red-dark border border-party-red/15 rounded-full"
                        >
                          <Lightbulb size={9} className="text-party-gold-deep" />
                          {pt}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span />
                  )}
                  {docHasFullText && fullTextLink && (
                    <Link
                      to={fullTextLink}
                      className="inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-gradient-to-r from-party-red to-party-red-dark text-party-gold-soft rounded border border-party-gold/30 hover:shadow-gold-glow hover:border-party-gold/60 transition-all font-medium"
                    >
                      <BookMarked size={12} />
                      查看全文
                      <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
