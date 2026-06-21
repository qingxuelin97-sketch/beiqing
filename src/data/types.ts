// 党史资料数据类型定义

export type DocumentType = '纲领' | '章程' | '决议' | '报告' | '宣言' | '公报' | '决定' | '意见';

export interface PartyDocument {
  title: string;
  type: DocumentType;
  summary: string;
  /** 通俗解读：用简短通俗的语言解释该文件的核心内容与意义 */
  plainExplanation: string;
  /** 文件核心要点 */
  keyPoints?: string[];
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
  /** 通俗解读：用简短通俗的语言说明本次会议的核心意义 */
  plainExplanation: string;
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
  /** 通俗解读：用简短通俗的语言说明本次会议的核心意义 */
  plainExplanation: string;
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

/** 文件浏览页用的扁平化文件结构 */
export interface DocumentWithMeta extends PartyDocument {
  docId: string;
  meetingId: string;
  meetingName: string;
  meetingShortName: string;
  meetingType: 'congress' | 'plenary';
  date: string;
  congressOrdinal: number;
}
