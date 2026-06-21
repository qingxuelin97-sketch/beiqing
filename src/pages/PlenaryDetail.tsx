import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getPlenaryById, getCongressById } from '@/data';
import { InfoCard } from '@/components/detail/InfoCard';
import { DocumentList } from '@/components/detail/DocumentList';
import { PersonnelCard } from '@/components/detail/PersonnelCard';
import { SourceList } from '@/components/detail/SourceList';
import { StarDivider } from '@/components/ui/StarDivider';
import { PartyStar } from '@/components/ui/PartyEmblem';

export default function PlenaryDetail() {
  const { id } = useParams<{ id: string }>();
  const plenary = id ? getPlenaryById(id) : undefined;

  if (!plenary) return <Navigate to="/plenaries" replace />;

  const congress = getCongressById(String(plenary.congressOrdinal));

  return (
    <div className="container mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <Link
          to="/plenaries"
          className="inline-flex items-center gap-2 text-sm text-party-gold-soft hover:text-party-gold transition-colors"
        >
          <ArrowLeft size={16} /> 返回中央全会列表
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative text-center mb-8"
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <span className="font-serif text-[200px] font-black text-party-gold leading-none">
            {plenary.ordinal}
          </span>
        </div>
        <div className="relative">
          <div className="flex items-center justify-center gap-2 mb-3">
            <PartyStar size={20} className="text-party-gold" />
            <span className="text-xs text-party-gold-soft tracking-[0.3em]">
              第{plenary.congressOrdinal}届中央委员会 · 第{plenary.ordinal}次全体会议
            </span>
            <PartyStar size={20} className="text-party-gold" />
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-black text-gold-gradient mb-2">
            {plenary.name}
          </h1>
          <p className="text-sm md:text-base text-party-paper/70">{plenary.fullName}</p>
        </div>
      </motion.div>

      <StarDivider />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <InfoCard data={plenary} type="plenary" />
          <PersonnelCard personnel={plenary.personnel} />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <DocumentList documents={plenary.documents} agenda={plenary.agenda} />
          <SourceList
            sources={plenary.sources}
            significance={plenary.significance}
            communique={plenary.communique}
          />
        </div>
      </div>

      {/* 关联代表大会 */}
      {congress && (
        <div className="mt-12 text-center">
          <StarDivider label="所属代表大会" />
          <Link
            to={`/congresses/${congress.id}`}
            className="inline-flex items-center gap-2 text-party-gold hover:text-party-gold-soft transition-colors group"
          >
            <PartyStar size={16} />
            <span className="font-serif text-lg">{congress.shortName}</span>
            <span className="text-sm text-party-paper/60">— {congress.name}</span>
          </Link>
        </div>
      )}
    </div>
  );
}
