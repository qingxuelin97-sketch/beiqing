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

/** 原始文件全文条目 */
export interface FullTextEntry {
  /** 与文档标题匹配的唯一标识 */
  title: string;
  /** 文件全文（可为完整全文或重要节选） */
  content: string;
  /** 是否为完整全文（true=完整全文，false=节选） */
  isComplete: boolean;
  /** 原始出处 */
  source: string;
  /** 文件通过/发表日期 */
  date: string;
  /** 全文段落结构（便于排版展示） */
  sections?: FullTextSection[];
}

/** 全文段落结构 */
export interface FullTextSection {
  /** 段落标题（如"一、""第一章"等） */
  heading?: string;
  /** 段落内容（多条段落） */
  paragraphs: string[];
}
