import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getCongressById, getPlenariesByCongress } from '@/data';
import { InfoCard } from '@/components/detail/InfoCard';
import { DocumentList } from '@/components/detail/DocumentList';
import { PersonnelCard } from '@/components/detail/PersonnelCard';
import { SourceList } from '@/components/detail/SourceList';
import { PlainExplanationCard } from '@/components/detail/PlainExplanationCard';
import { StarDivider } from '@/components/ui/StarDivider';
import { PartyStar } from '@/components/ui/PartyEmblem';
import { PlenaryCard } from '@/components/plenary/PlenaryCard';

export default function CongressDetail() {
  const { id } = useParams<{ id: string }>();
  const congress = id ? getCongressById(id) : undefined;

  if (!congress) return <Navigate to="/congresses" replace />;

  const relatedPlenaries = getPlenariesByCongress(congress.ordinal);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* 返回 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <Link
          to="/congresses"
          className="inline-flex items-center gap-2 text-sm text-party-gold-soft hover:text-party-gold transition-colors"
        >
          <ArrowLeft size={16} /> 返回代表大会列表
        </Link>
      </motion.div>

      {/* 标题区 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative text-center mb-8"
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <span className="font-serif text-[200px] font-black text-party-gold leading-none">
            {congress.ordinal}
          </span>
        </div>
        <div className="relative">
          <div className="flex items-center justify-center gap-2 mb-3">
            <PartyStar size={20} className="text-party-gold" />
            <span className="text-xs text-party-gold-soft tracking-[0.3em]">
              第{congress.ordinal}次全国代表大会
            </span>
            <PartyStar size={20} className="text-party-gold" />
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-black text-gold-gradient mb-2">
            {congress.shortName}
          </h1>
          <p className="text-sm md:text-base text-party-paper/70">{congress.name}</p>
        </div>
      </motion.div>

      <StarDivider />

      {/* 一句话读懂本次大会 */}
      {congress.plainExplanation && (
        <div className="mb-6">
          <PlainExplanationCard text={congress.plainExplanation} label="一句话读懂本次大会" />
        </div>
      )}

      {/* 内容区 */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <InfoCard data={congress} type="congress" />
          <PersonnelCard personnel={congress.personnel} />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <DocumentList documents={congress.documents} agenda={congress.agenda} />
          <SourceList sources={congress.sources} significance={congress.significance} />
        </div>
      </div>

      {/* 相关中央全会 */}
      {relatedPlenaries.length > 0 && (
        <div className="mt-12">
          <StarDivider label={`第${congress.ordinal}届中央委员会全体会议`} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedPlenaries.map((p, idx) => (
              <PlenaryCard key={p.id} plenary={p} index={idx} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
