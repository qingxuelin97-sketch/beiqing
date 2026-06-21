import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, BookOpen, FileText, Calendar, MapPin } from 'lucide-react';
import type { SearchResult } from '@/hooks/useSearch';
import { formatDate } from '@/utils/format';

interface SearchResultItemProps {
  result: SearchResult;
  index: number;
}

export function SearchResultItem({ result, index }: SearchResultItemProps) {
  const isCongress = result.type === 'congress';
  const link = isCongress ? `/congresses/${result.id}` : `/plenaries/${result.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link to={link} className="group block">
        <div className="bg-party-red-darker/60 backdrop-blur-sm border border-party-gold/20 rounded-lg p-5 transition-all duration-300 hover:border-party-gold/60 hover:bg-party-red-darker/80 hover:shadow-card-hover hover:-translate-y-0.5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                {isCongress ? (
                  <BookOpen size={14} className="text-party-gold" />
                ) : (
                  <FileText size={14} className="text-party-red" />
                )}
                <span className={`text-xs tracking-widest ${isCongress ? 'text-party-gold-soft' : 'text-party-red/80'}`}>
                  {isCongress ? '全国代表大会' : '中央全会'}
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-party-gold mb-1 group-hover:text-shadow-gold transition-all">
                {result.title}
              </h3>
              <p className="text-xs text-party-paper/60 mb-3 line-clamp-1">{result.subtitle}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-party-paper/70 mb-3">
                <span className="flex items-center gap-1">
                  <Calendar size={11} className="text-party-gold-soft" />
                  {formatDate(result.date)}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={11} className="text-party-gold-soft" />
                  {result.location}
                </span>
              </div>

              <p className="text-sm text-party-paper/80 line-clamp-2 leading-relaxed">
                {result.snippet}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

interface SearchEmptyProps {
  hasQuery: boolean;
}

export function SearchEmpty({ hasQuery }: SearchEmptyProps) {
  return (
    <div className="text-center py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-block p-6 rounded-full bg-party-gold/10 border border-party-gold/30 mb-4"
      >
        <Search className="text-party-gold/60" size={40} />
      </motion.div>
      <p className="text-party-paper/60 text-sm">
        {hasQuery ? '未找到相关资料，请尝试其他关键词' : '请输入关键词检索党史资料'}
      </p>
    </div>
  );
}
