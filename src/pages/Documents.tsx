import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Filter,
  Search,
  X,
  Calendar,
  BookOpen,
  Layers,
  Sparkles,
  ArrowRight,
  BookMarked,
  type LucideIcon,
} from 'lucide-react';
import { getAllDocuments, getDocumentStats, congresses, type DocumentWithFullText } from '@/data';
import type { DocumentType } from '@/data/types';
import { StarDivider } from '@/components/ui/StarDivider';
import { PartyStar } from '@/components/ui/PartyEmblem';
import { formatDate } from '@/utils/format';
import { cn } from '@/lib/utils';

const typeColor: Record<DocumentType, string> = {
  '纲领': 'bg-party-red/15 text-party-red border-party-red/30',
  '章程': 'bg-party-gold-deep/15 text-party-gold-deep border-party-gold-deep/40',
  '决议': 'bg-party-red/10 text-party-red-dark border-party-red/25',
  '报告': 'bg-party-ink/10 text-party-ink border-party-ink/20',
  '宣言': 'bg-party-gold/15 text-party-gold-deep border-party-gold/30',
  '公报': 'bg-party-red-dark/10 text-party-red-dark border-party-red-dark/25',
  '决定': 'bg-party-gold-deep/10 text-party-gold-deep border-party-gold-deep/30',
  '意见': 'bg-party-ink/8 text-party-ink-soft border-party-ink/20',
};

const allTypes: DocumentType[] = ['纲领', '章程', '决议', '报告', '宣言', '公报', '决定', '意见'];

export default function Documents() {
  const allDocs = useMemo(() => getAllDocuments(), []);
  const stats = useMemo(() => getDocumentStats(), []);

  const [typeFilter, setTypeFilter] = useState<DocumentType | 'all'>('all');
  const [congressFilter, setCongressFilter] = useState<number | 'all'>('all');
  const [keyword, setKeyword] = useState('');
  const [onlyFullText, setOnlyFullText] = useState(false);

  const filtered = useMemo(() => {
    return allDocs.filter((d) => {
      if (onlyFullText && !d.hasFullText) return false;
      if (typeFilter !== 'all' && d.type !== typeFilter) return false;
      if (congressFilter !== 'all' && d.congressOrdinal !== congressFilter) return false;
      if (keyword.trim()) {
        const kw = keyword.trim().toLowerCase();
        const hay = `${d.title} ${d.summary} ${d.plainExplanation} ${d.meetingShortName} ${
          d.fullText?.content || ''
        }`.toLowerCase();
        if (!hay.includes(kw)) return false;
      }
      return true;
    });
  }, [allDocs, typeFilter, congressFilter, keyword, onlyFullText]);

  const resetFilters = () => {
    setTypeFilter('all');
    setCongressFilter('all');
    setKeyword('');
    setOnlyFullText(false);
  };

  const hasFilter =
    typeFilter !== 'all' || congressFilter !== 'all' || keyword.trim() !== '' || onlyFullText;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 标题区 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <FileText className="text-party-gold" size={28} />
          <p className="text-xs text-party-gold-soft/70 tracking-[0.3em]">PARTY DOCUMENTS ARCHIVE</p>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gold-gradient mb-3">
          会议文件总览
        </h1>
        <p className="text-sm text-party-paper/60 max-w-2xl mx-auto leading-relaxed">
          浏览历次代表大会与中央全会通过的报告、决议、章程等原始文献 · 附通俗解读 · 部分文件可查看全文
        </p>
      </motion.div>

      <StarDivider />

      {/* 统计栏 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
      >
        <StatCard icon={Layers} label="文件总数" value={stats.total} />
        <StatCard icon={BookMarked} label="可看全文" value={stats.withFullText} suffix="篇" />
        <StatCard icon={BookOpen} label="涉及届次" value={stats.byCongress.size} />
        <StatCard icon={Sparkles} label="通俗解读" value={stats.total} suffix="篇" />
      </motion.div>

      {/* 筛选区 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-party-red-darker/50 backdrop-blur-sm border border-party-gold/20 rounded-lg p-5 mb-8"
      >
        <div className="flex items-center gap-2 mb-4">
          <Filter className="text-party-gold" size={18} />
          <h3 className="font-serif font-bold text-base text-party-gold">筛选条件</h3>
          {hasFilter && (
            <button
              onClick={resetFilters}
              className="ml-auto flex items-center gap-1 text-xs text-party-paper/60 hover:text-party-gold transition-colors"
            >
              <X size={12} /> 清除筛选
            </button>
          )}
        </div>

        {/* 关键词搜索 + 仅看全文 */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-party-paper/40" size={16} />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="搜索文件标题、内容、通俗解读或全文..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-party-red-deepest/40 border border-party-gold/20 rounded text-party-paper placeholder:text-party-paper/40 focus:outline-none focus:border-party-gold/50 focus:bg-party-red-deepest/60 transition-colors"
            />
          </div>
          <button
            onClick={() => setOnlyFullText(!onlyFullText)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded border transition-all whitespace-nowrap',
              onlyFullText
                ? 'bg-gradient-to-br from-party-gold to-party-gold-soft text-party-red-darker border-party-gold shadow-gold-glow'
                : 'bg-party-red-deepest/30 text-party-paper/70 border-party-gold/20 hover:border-party-gold/50 hover:text-party-gold'
            )}
          >
            <BookMarked size={15} />
            仅看有全文
            {onlyFullText && <span className="text-xs">({stats.withFullText})</span>}
          </button>
        </div>

        {/* 文件类型筛选 */}
        <div className="mb-4">
          <div className="text-xs text-party-gold-soft/70 mb-2 tracking-wider">文件类型</div>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              active={typeFilter === 'all'}
              onClick={() => setTypeFilter('all')}
              label="全部"
              count={stats.total}
            />
            {allTypes
              .filter((t) => stats.byType.has(t))
              .map((t) => (
                <FilterChip
                  key={t}
                  active={typeFilter === t}
                  onClick={() => setTypeFilter(t)}
                  label={t}
                  count={stats.byType.get(t) || 0}
                />
              ))}
          </div>
        </div>

        {/* 届次筛选 */}
        <div>
          <div className="text-xs text-party-gold-soft/70 mb-2 tracking-wider">所属届次</div>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              active={congressFilter === 'all'}
              onClick={() => setCongressFilter('all')}
              label="全部"
            />
            {congresses.map((c) => (
              <FilterChip
                key={c.id}
                active={congressFilter === c.ordinal}
                onClick={() => setCongressFilter(c.ordinal)}
                label={`第${c.ordinal}届`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* 结果统计 */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-party-paper/70">
          共找到 <span className="text-party-gold font-bold">{filtered.length}</span> 篇文件
          {filtered.some((d) => d.hasFullText) && (
            <span className="ml-2 text-party-gold-soft/70">
              （其中 <span className="text-party-gold">{filtered.filter((d) => d.hasFullText).length}</span> 篇可看全文）
            </span>
          )}
        </p>
      </div>

      {/* 文件列表 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${typeFilter}-${congressFilter}-${keyword}-${onlyFullText}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {filtered.map((doc, idx) => (
                <DocumentCard key={doc.docId} doc={doc} index={idx} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <FileText className="mx-auto text-party-paper/30 mb-4" size={48} />
              <p className="text-party-paper/60 mb-2">未找到符合条件的文件</p>
              <button
                onClick={resetFilters}
                className="text-sm text-party-gold hover:text-party-gold-soft transition-colors"
              >
                点击清除筛选条件
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  suffix = '',
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix?: string;
}) {
  return (
    <div className="bg-party-red-darker/50 backdrop-blur-sm border border-party-gold/20 rounded-lg p-4 flex items-center gap-3">
      <div className="shrink-0 p-2.5 rounded bg-party-gold/10 border border-party-gold/30">
        <Icon size={18} className="text-party-gold" />
      </div>
      <div>
        <div className="text-xs text-party-paper/60">{label}</div>
        <div className="text-xl font-serif font-bold text-party-gold">
          {value}
          <span className="text-xs ml-0.5">{suffix}</span>
        </div>
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3 py-1.5 text-xs font-medium rounded border transition-all duration-200',
        active
          ? 'bg-gradient-to-br from-party-gold to-party-gold-soft text-party-red-darker border-party-gold shadow-gold-glow'
          : 'bg-party-red-deepest/30 text-party-paper/70 border-party-gold/20 hover:border-party-gold/50 hover:text-party-gold'
      )}
    >
      {label}
      {count !== undefined && (
        <span className={cn('ml-1.5 text-[10px]', active ? 'text-party-red-darker/70' : 'text-party-paper/40')}>
          {count}
        </span>
      )}
    </button>
  );
}

function DocumentCard({ doc, index }: { doc: DocumentWithFullText; index: number }) {
  const meetingLink =
    doc.meetingType === 'congress' ? `/congresses/${doc.meetingId}` : `/plenaries/${doc.meetingId}`;
  const fullTextLink = `/documents/${doc.docId}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: (index % 6) * 0.06, duration: 0.5 }}
      className="group relative bg-paper-card rounded-lg border border-party-gold/30 shadow-party hover:shadow-card-hover hover:border-party-gold/60 transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* 顶部装饰条 */}
      <div className="h-1 bg-gradient-to-r from-party-gold-deep via-party-gold to-party-gold-deep" />

      <div className="p-5 flex-1 flex flex-col">
        {/* 头部：类型 + 届次 + 全文标记 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={cn('text-xs px-2 py-0.5 rounded border font-medium', typeColor[doc.type])}>
              {doc.type}
            </span>
            {doc.hasFullText && (
              <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 bg-party-gold/15 text-party-gold-deep border border-party-gold/30 rounded font-medium">
                <BookMarked size={9} />
                {doc.fullText?.isComplete ? '全文' : '节选'}
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 text-xs text-party-ink-soft/60">
            <PartyStar size={10} className="text-party-gold-deep" />
            第{doc.congressOrdinal}届
          </span>
        </div>

        {/* 标题 */}
        <h3 className="font-serif font-bold text-lg text-party-red-dark leading-snug mb-2 group-hover:text-party-red transition-colors">
          《{doc.title}》
        </h3>

        {/* 出处会议 */}
        <Link
          to={meetingLink}
          className="inline-flex items-center gap-1.5 text-xs text-party-gold-deep hover:text-party-red transition-colors mb-3 group/link w-fit"
        >
          <BookOpen size={12} />
          <span className="border-b border-dashed border-party-gold-deep/40 group-hover/link:border-party-red">
            {doc.meetingShortName}
          </span>
          <ArrowRight size={11} className="opacity-0 group-hover/link:opacity-100 -translate-x-1 group-hover/link:translate-x-0 transition-all" />
        </Link>

        {/* 摘要 */}
        <p className="text-sm text-party-ink-soft leading-relaxed mb-3 line-clamp-2">{doc.summary}</p>

        {/* 通俗解读 */}
        <div className="bg-gradient-to-br from-party-red/5 to-party-gold/8 border border-party-gold/25 rounded p-3 mb-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Sparkles size={13} className="text-party-gold-deep" />
            <span className="text-xs font-bold text-party-gold-deep tracking-wider">通俗解读</span>
          </div>
          <p className="text-sm text-party-ink leading-relaxed font-serif">{doc.plainExplanation}</p>
        </div>

        {/* 核心要点 */}
        {doc.keyPoints && doc.keyPoints.length > 0 && (
          <div className="mb-3">
            <div className="text-xs text-party-red font-medium mb-1.5">核心要点</div>
            <div className="flex flex-wrap gap-1.5">
              {doc.keyPoints.map((pt, i) => (
                <span
                  key={i}
                  className="text-[11px] px-2 py-0.5 bg-party-red/8 text-party-red-dark border border-party-red/15 rounded-full"
                >
                  {pt}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 底部：日期 + 查看全文按钮 */}
        <div className="mt-auto pt-3 border-t border-party-red/10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs text-party-ink-soft/60">
            <Calendar size={11} />
            <span>{formatDate(doc.date)}</span>
          </div>
          {doc.hasFullText ? (
            <Link
              to={fullTextLink}
              className="inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-gradient-to-r from-party-red to-party-red-dark text-party-gold-soft rounded border border-party-gold/30 hover:shadow-gold-glow hover:border-party-gold/60 transition-all font-medium"
            >
              <BookMarked size={12} />
              查看全文
              <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ) : (
            <span className="text-[10px] text-party-ink-soft/40 italic">全文整理中</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
