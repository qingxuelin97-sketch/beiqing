import { useParams, Link, Navigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Calendar,
  BookOpen,
  Sparkles,
  Lightbulb,
  Shield,
  ChevronDown,
  ChevronUp,
  Printer,
  ExternalLink,
  type LucideIcon,
} from 'lucide-react';
import { getDocumentById, getAllDocuments } from '@/data';
import type { DocumentWithFullText } from '@/data';
import { StarDivider } from '@/components/ui/StarDivider';
import { PartyStar } from '@/components/ui/PartyEmblem';
import { formatDate } from '@/utils/format';
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

export default function DocumentViewer() {
  const { docId } = useParams<{ docId: string }>();
  const [showSummary, setShowSummary] = useState(true);

  const doc = useMemo(() => (docId ? getDocumentById(docId) : undefined), [docId]);

  // 相关文件：同类型或同届次的其他有全文的文件
  const relatedDocs = useMemo(() => {
    if (!doc) return [];
    return getAllDocuments()
      .filter(
        (d) =>
          d.docId !== doc.docId &&
          d.hasFullText &&
          (d.type === doc.type || d.congressOrdinal === doc.congressOrdinal)
      )
      .slice(0, 6);
  }, [doc]);

  if (!doc) return <Navigate to="/documents" replace />;

  const meetingLink =
    doc.meetingType === 'congress' ? `/congresses/${doc.meetingId}` : `/plenaries/${doc.meetingId}`;

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      {/* 返回 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6 flex items-center justify-between"
      >
        <Link
          to="/documents"
          className="inline-flex items-center gap-2 text-sm text-party-gold-soft hover:text-party-gold transition-colors"
        >
          <ArrowLeft size={16} /> 返回文件总览
        </Link>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 text-xs text-party-paper/60 hover:text-party-gold transition-colors"
        >
          <Printer size={14} /> 打印
        </button>
      </motion.div>

      {/* 文件标题区 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative text-center mb-8"
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <FileText className="text-party-gold" size={200} />
        </div>
        <div className="relative">
          <div className="flex items-center justify-center gap-2 mb-3">
            <PartyStar size={18} className="text-party-gold" />
            <span className="text-xs text-party-gold-soft tracking-[0.3em]">
              {doc.meetingType === 'congress' ? '代表大会文件' : '中央全会文件'} · 原始文献
            </span>
            <PartyStar size={18} className="text-party-gold" />
          </div>
          <span
            className={cn(
              'inline-block text-xs px-3 py-1 rounded border font-medium mb-3',
              typeColor[doc.type] || typeColor['报告']
            )}
          >
            {doc.type}
          </span>
          <h1 className="font-serif text-2xl md:text-4xl font-black text-gold-gradient mb-3 leading-tight">
            《{doc.title}》
          </h1>
          <Link
            to={meetingLink}
            className="inline-flex items-center gap-1.5 text-sm text-party-gold-deep hover:text-party-red transition-colors group"
          >
            <BookOpen size={14} />
            <span className="border-b border-dashed border-party-gold-deep/40 group-hover:border-party-red">
              {doc.meetingShortName}
            </span>
            <ExternalLink size={11} className="opacity-60" />
          </Link>
        </div>
      </motion.div>

      <StarDivider />

      {/* 元信息栏 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
      >
        <MetaItem icon={Calendar} label="通过日期" value={formatDate(doc.date)} />
        <MetaItem icon={BookOpen} label="出处会议" value={doc.meetingShortName} />
        <MetaItem icon={FileText} label="文件类型" value={doc.type} />
        <MetaItem
          icon={Shield}
          label="全文状态"
          value={doc.fullText?.isComplete ? '完整全文' : '重要节选'}
        />
      </motion.div>

      {/* 通俗解读 + 核心要点（可折叠） */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gradient-to-br from-party-gold/12 via-party-red/8 to-party-gold/12 border-2 border-party-gold/40 rounded-lg p-5 mb-6"
      >
        <button
          onClick={() => setShowSummary(!showSummary)}
          className="w-full flex items-center gap-2 mb-3"
        >
          <div className="p-1.5 rounded-full bg-party-gold/20 border border-party-gold/40">
            <Sparkles className="text-party-gold-deep" size={16} />
          </div>
          <h3 className="font-serif font-bold text-lg text-party-gold-deep tracking-wide">
            通俗解读与要点
          </h3>
          <div className="flex-1 h-px bg-gradient-to-r from-party-gold/40 to-transparent" />
          {showSummary ? <ChevronUp size={18} className="text-party-gold-deep" /> : <ChevronDown size={18} className="text-party-gold-deep" />}
        </button>
        {showSummary && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-base text-party-ink leading-relaxed font-serif mb-3">
              {doc.plainExplanation}
            </p>
            {doc.keyPoints && doc.keyPoints.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {doc.keyPoints.map((pt, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-party-red/8 text-party-red-dark border border-party-red/15 rounded-full"
                  >
                    <Lightbulb size={10} className="text-party-gold-deep" />
                    {pt}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* 全文正文 */}
      {doc.hasFullText && doc.fullText ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-paper-card rounded-lg border border-party-gold/30 shadow-party overflow-hidden"
        >
          {/* 全文头部 */}
          <div className="bg-gradient-to-r from-party-red-darker to-party-red-deepest px-6 py-4 border-b border-party-gold/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="text-party-gold" size={20} />
                <h2 className="font-serif font-bold text-lg text-party-gold">原始文献全文</h2>
              </div>
              <span
                className={cn(
                  'text-xs px-2 py-0.5 rounded',
                  doc.fullText.isComplete
                    ? 'bg-party-gold/20 text-party-gold border border-party-gold/40'
                    : 'bg-party-gold/10 text-party-gold-soft border border-party-gold/20'
                )}
              >
                {doc.fullText.isComplete ? '完整全文' : '重要节选'}
              </span>
            </div>
          </div>

          {/* 全文内容 */}
          <div className="p-6 md:p-10">
            <div className="prose prose-party max-w-none">
              <FullTextContent content={doc.fullText.content} />
            </div>
          </div>

          {/* 全文出处 */}
          <div className="px-6 py-4 bg-party-red-darker/30 border-t border-party-gold/20">
            <div className="flex items-start gap-2 text-xs text-party-paper/70">
              <Shield size={14} className="text-party-gold-soft shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-party-gold-soft mb-0.5">资料出处</p>
                <p>{doc.fullText.source}</p>
                <p className="mt-2 text-party-paper/50 italic">
                  ※ 本全文依据官方公开出版物整理，遵循《中华人民共和国宪法》与《中国共产党章程》
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-paper-card rounded-lg border border-party-gold/30 shadow-party p-10 text-center"
        >
          <FileText className="mx-auto text-party-paper/30 mb-4" size={48} />
          <p className="text-party-paper/70 mb-2">该文件的原始全文正在整理中</p>
          <p className="text-sm text-party-paper/50">
            您可查看上方通俗解读与核心要点，或浏览其他有全文的文件
          </p>
          <Link
            to="/documents"
            className="inline-flex items-center gap-1.5 mt-4 text-sm text-party-gold hover:text-party-gold-soft transition-colors"
          >
            浏览全部文件 <ArrowRight size={14} />
          </Link>
        </motion.div>
      )}

      {/* 相关文件 */}
      {relatedDocs.length > 0 && (
        <div className="mt-12">
          <StarDivider label="相关原始文献" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedDocs.map((rd, idx) => (
              <RelatedDocCard key={rd.docId} doc={rd} index={idx} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// 全文内容渲染组件：将 \n\n 分段，识别标题行
function FullTextContent({ content }: { content: string }) {
  const blocks = content.split('\n\n').filter((b) => b.trim());

  return (
    <div className="space-y-4">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        // 识别标题行：以"第X章""第X条""一、""二、"等开头的行
        const isHeading =
          /^(第[一二三四五六七八九十百千]+[章节条编]|序言|总纲|前言|引言|附则|附录|[一二三四五六七八九十]+[、.．])/.test(
            trimmed
          ) ||
          (/^（[一二三四五六七八九十]+）/.test(trimmed) && trimmed.length < 30);

        if (isHeading) {
          return (
            <motion.h3
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="font-serif font-bold text-lg text-party-red-dark mt-6 mb-2 pb-2 border-b border-party-red/15"
            >
              {trimmed}
            </motion.h3>
          );
        }

        // 普通段落
        return (
          <motion.p
            key={idx}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-sm md:text-base text-party-ink leading-loose font-serif text-justify"
            style={{ textIndent: '2em' }}
          >
            {trimmed}
          </motion.p>
        );
      })}
    </div>
  );
}

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-party-red-darker/50 backdrop-blur-sm border border-party-gold/20 rounded-lg p-3 flex items-center gap-2.5">
      <div className="shrink-0 p-2 rounded bg-party-gold/10 border border-party-gold/30">
        <Icon size={14} className="text-party-gold" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] text-party-paper/60">{label}</div>
        <div className="text-xs font-medium text-party-gold truncate">{value}</div>
      </div>
    </div>
  );
}

function RelatedDocCard({ doc, index }: { doc: DocumentWithFullText; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <Link
        to={`/documents/${doc.docId}`}
        className="group block h-full bg-paper-card rounded-lg border border-party-gold/30 p-4 hover:border-party-gold/60 hover:shadow-md transition-all"
      >
        <div className="flex items-center justify-between mb-2">
          <span
            className={cn(
              'text-[10px] px-1.5 py-0.5 rounded border',
              typeColor[doc.type] || typeColor['报告']
            )}
          >
            {doc.type}
          </span>
          <span className="text-[10px] text-party-ink-soft/60">第{doc.congressOrdinal}届</span>
        </div>
        <h4 className="font-serif font-bold text-sm text-party-red-dark leading-snug mb-1.5 group-hover:text-party-red transition-colors line-clamp-2">
          《{doc.title}》
        </h4>
        <p className="text-[11px] text-party-ink-soft/70 mb-2 line-clamp-1">{doc.meetingShortName}</p>
        <div className="flex items-center text-[11px] text-party-gold-deep opacity-0 group-hover:opacity-100 transition-opacity">
          查看全文 <ArrowRight size={10} className="ml-1" />
        </div>
      </Link>
    </motion.div>
  );
}
