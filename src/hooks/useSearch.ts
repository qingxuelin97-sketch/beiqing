import { useMemo, useState } from 'react';
import { congresses, plenaries } from '@/data';

export interface SearchResult {
  id: string;
  type: 'congress' | 'plenary';
  title: string;
  subtitle: string;
  date: string;
  location: string;
  snippet: string;
}

export function useSearch() {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'congress' | 'plenary'>('all');

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const out: SearchResult[] = [];

    if (typeFilter !== 'plenary') {
      for (const c of congresses) {
        const haystack = `${c.name} ${c.shortName} ${c.location} ${c.significance} ${c.agenda.join(' ')} ${c.documents.map((d) => d.title + d.summary).join(' ')}`.toLowerCase();
        if (haystack.includes(q)) {
          out.push({
            id: c.id,
            type: 'congress',
            title: c.shortName,
            subtitle: c.name,
            date: `${c.startDate} 至 ${c.endDate}`,
            location: c.location,
            snippet: c.significance,
          });
        }
      }
    }

    if (typeFilter !== 'congress') {
      for (const p of plenaries) {
        const haystack = `${p.name} ${p.fullName} ${p.location} ${p.significance} ${p.communique} ${p.agenda.join(' ')} ${p.documents.map((d) => d.title + d.summary).join(' ')}`.toLowerCase();
        if (haystack.includes(q)) {
          out.push({
            id: p.id,
            type: 'plenary',
            title: p.name,
            subtitle: p.fullName,
            date: p.date,
            location: p.location,
            snippet: p.significance,
          });
        }
      }
    }

    return out;
  }, [query, typeFilter]);

  return { query, setQuery, typeFilter, setTypeFilter, results };
}
