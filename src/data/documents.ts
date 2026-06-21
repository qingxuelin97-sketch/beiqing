import { congresses } from './congresses';
import { plenaries } from './plenaries';
import type { DocumentWithMeta, DocumentType } from './types';

// 将所有代表大会与中央全会通过的文件扁平化为统一列表
// 便于"文件浏览页"按类型、届次进行筛选与浏览
export function getAllDocuments(): DocumentWithMeta[] {
  const result: DocumentWithMeta[] = [];

  // 代表大会文件
  for (const c of congresses) {
    const meetingDate = c.startDate;
    c.documents.forEach((doc, idx) => {
      result.push({
        ...doc,
        docId: `${c.id}-doc-${idx}`,
        meetingId: c.id,
        meetingName: c.name,
        meetingShortName: c.shortName,
        meetingType: 'congress',
        date: meetingDate,
        congressOrdinal: c.ordinal,
      });
    });
  }

  // 中央全会文件
  for (const p of plenaries) {
    p.documents.forEach((doc, idx) => {
      result.push({
        ...doc,
        docId: `${p.id}-doc-${idx}`,
        meetingId: p.id,
        meetingName: p.fullName,
        meetingShortName: p.name,
        meetingType: 'plenary',
        date: p.date,
        congressOrdinal: p.congressOrdinal,
      });
    });
  }

  // 按时间升序排序
  return result.sort((a, b) => {
    const ya = parseInt(a.date.slice(0, 4), 10) || 0;
    const yb = parseInt(b.date.slice(0, 4), 10) || 0;
    if (ya !== yb) return ya - yb;
    return a.congressOrdinal - b.congressOrdinal;
  });
}

// 获取所有出现过的文件类型
export function getDocumentTypes(): DocumentType[] {
  const all = getAllDocuments();
  const set = new Set<DocumentType>();
  all.forEach((d) => set.add(d.type));
  return Array.from(set);
}

// 统计信息：文件总数、按类型分组、按届次分组
export function getDocumentStats() {
  const all = getAllDocuments();
  const byType = new Map<DocumentType, number>();
  const byCongress = new Map<number, number>();

  all.forEach((d) => {
    byType.set(d.type, (byType.get(d.type) || 0) + 1);
    byCongress.set(d.congressOrdinal, (byCongress.get(d.congressOrdinal) || 0) + 1);
  });

  return {
    total: all.length,
    byType,
    byCongress,
  };
}
