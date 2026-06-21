import type { FullTextEntry } from '../types';
import { congressFullTexts_1_7 } from './congress_1_7';
import { congressFullTexts_8_14 } from './congress_8_14';
import { congressFullTexts_15_20 } from './congress_15_20';
import { plenaryFullTexts } from './plenaries';

// 所有原始文件全文数据汇总
export const allFullTexts: FullTextEntry[] = [
  ...congressFullTexts_1_7,
  ...congressFullTexts_8_14,
  ...congressFullTexts_15_20,
  ...plenaryFullTexts,
];

// 按文件标题建立索引，便于快速查找
const fullTextMap = new Map<string, FullTextEntry>();
allFullTexts.forEach((entry) => {
  fullTextMap.set(entry.title, entry);
});

// 根据文件标题获取全文
export function getFullTextByTitle(title: string): FullTextEntry | undefined {
  return fullTextMap.get(title);
}

// 检查某文件是否有全文
export function hasFullText(title: string): boolean {
  return fullTextMap.has(title);
}

// 获取全文总数
export function getFullTextCount(): number {
  return allFullTexts.length;
}

// 获取所有有全文的文件标题列表
export function getFullTextTitles(): string[] {
  return Array.from(fullTextMap.keys());
}

export { congressFullTexts_1_7, congressFullTexts_8_14, congressFullTexts_15_20, plenaryFullTexts };
