import { motion } from 'framer-motion';
import { Search as SearchIcon, BookOpen, FileText } from 'lucide-react';
import { useSearch } from '@/hooks/useSearch';
import { SearchResultItem, SearchEmpty } from '@/components/search/SearchResult';
import { cn } from '@/lib/utils';

export default function Search() {
  const { query, setQuery, typeFilter, setTypeFilter, results } = useSearch();

  const filters: { value: 'all' | 'congress' | 'plenary'; label: string; icon: typeof BookOpen }[] = [
    { value: 'all', label: '全部', icon: SearchIcon },
    { value: 'congress', label: '代表大会', icon: BookOpen },
    { value: 'plenary', label: '中央全会', icon: FileText },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <SearchIcon className="text-party-gold" size={28} />
          <p className="text-xs text-party-gold-soft/70 tracking-[0.3em]">SEARCH ARCHIVE</p>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gold-gradient mb-3">
          资料检索
        </h1>
        <p className="text-sm text-party-paper/60">输入关键词检索党史资料</p>
      </motion.div>

      {/* 搜索框 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl mx-auto mb-6"
      >
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索会议名称、地点、文件、关键词..."
            className="w-full bg-party-red-darker/70 backdrop-blur-sm border-2 border-party-gold/30 rounded-lg py-4 pl-14 pr-4 text-party-paper placeholder-party-paper/40 focus:outline-none focus:border-party-gold focus:shadow-gold-glow transition-all duration-300 text-base"
          />
          <SearchIcon
            className="absolute left-5 top-1/2 -translate-y-1/2 text-party-gold"
            size={22}
          />
        </div>
      </motion.div>

      {/* 筛选 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-center gap-2 mb-8"
      >
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setTypeFilter(f.value)}
            className={cn(
              'inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 border',
              typeFilter === f.value
                ? 'bg-party-gold/15 border-party-gold/60 text-party-gold shadow-gold-glow'
                : 'bg-transparent border-party-gold/20 text-party-paper/60 hover:text-party-gold hover:border-party-gold/40'
            )}
          >
            <f.icon size={14} />
            {f.label}
          </button>
        ))}
      </motion.div>

      {/* 结果 */}
      <div className="max-w-3xl mx-auto">
        {query.trim() && results.length > 0 && (
          <p className="text-sm text-party-paper/60 mb-4">
            找到 <span className="text-party-gold font-bold">{results.length}</span> 条相关结果
          </p>
        )}
        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((r, idx) => (
              <SearchResultItem key={`${r.type}-${r.id}`} result={r} index={idx} />
            ))}
          </div>
        ) : (
          <SearchEmpty hasQuery={!!query.trim()} />
        )}
      </div>
    </div>
  );
}
