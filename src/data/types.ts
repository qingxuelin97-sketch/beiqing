// 党史资料数据类型定义

export type DocumentType = '纲领' | '章程' | '决议' | '报告' | '宣言' | '公报' | '决定' | '意见';

export interface PartyDocument {
  title: string;
  type: DocumentType;
  summary: string;
}

export interface Personnel {
  centralCommittee?: number;
  politburo?: number;
  standingCommittee?: number;
  generalSecretary?: string;
  chairman?: string;
  notes?: string;
}

export interface Source {
  title: string;
  publisher: string;
  year?: string;
}

export interface Congress {
  id: string;
  ordinal: number;
  name: string;
  shortName: string;
  startDate: string;
  endDate: string;
  location: string;
  delegates: number;
  representatives: number;
  agenda: string[];
  documents: PartyDocument[];
  personnel: Personnel;
  significance: string;
  sources: Source[];
}

export interface Plenary {
  id: string;
  congressOrdinal: number;
  ordinal: number;
  name: string;
  fullName: string;
  date: string;
  location: string;
  attendees: string;
  agenda: string[];
  documents: PartyDocument[];
  communique: string;
  personnel: Personnel;
  significance: string;
  sources: Source[];
}

export interface TimelineItem {
  id: string;
  type: 'congress' | 'plenary';
  date: string;
  title: string;
  subtitle: string;
  refId: string;
}
