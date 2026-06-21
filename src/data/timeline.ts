import type { TimelineItem } from './types';
import { congresses } from './congresses';
import { plenaries } from './plenaries';

export const timelineItems: TimelineItem[] = [
  ...congresses.map((c) => ({
    id: `tl-${c.id}`,
    type: 'congress' as const,
    date: c.startDate,
    title: c.shortName,
    subtitle: c.name,
    refId: c.id,
  })),
  ...plenaries.map((p) => ({
    id: `tl-${p.id}`,
    type: 'plenary' as const,
    date: p.date.split(' 至 ')[0].split('-').slice(0, 2).join('-') + (p.date.includes('至') ? '' : ''),
    title: p.name,
    subtitle: p.fullName,
    refId: p.id,
  })),
].sort((a, b) => a.date.localeCompare(b.date));
