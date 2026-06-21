// 日期格式化工具
export function formatDate(dateStr: string): string {
  // 处理"1978-12-18 至 1978-12-22"格式
  if (dateStr.includes('至')) {
    return dateStr;
  }
  const parts = dateStr.split('-');
  if (parts.length === 1) {
    return `${parts[0]}年`;
  }
  if (parts.length === 2) {
    return `${parts[0]}年${parseInt(parts[1], 10)}月`;
  }
  return `${parts[0]}年${parseInt(parts[1], 10)}月${parseInt(parts[2], 10)}日`;
}

export function getYear(dateStr: string): number {
  const yearStr = dateStr.match(/\d{4}/)?.[0];
  return yearStr ? parseInt(yearStr, 10) : 0;
}

// 中文数字转换
const chineseNums = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
export function toChineseNum(n: number): string {
  if (n <= 10) return chineseNums[n];
  if (n < 20) return '十' + chineseNums[n - 10];
  if (n < 100) {
    const tens = Math.floor(n / 10);
    const ones = n % 10;
    return chineseNums[tens] + '十' + (ones ? chineseNums[ones] : '');
  }
  return String(n);
}

// 数字格式化（带千分位）
export function formatNumber(n: number): string {
  if (n >= 10000) {
    return (n / 10000).toFixed(n % 10000 === 0 ? 0 : 1) + '万';
  }
  return n.toLocaleString('zh-CN');
}

// GB/T 7714 引用格式
export function formatCitation(source: { title: string; publisher: string; year?: string }): string {
  if (source.year) {
    return `${source.publisher}.${source.title}[M].${source.year}.`;
  }
  return `${source.publisher}.${source.title}.`;
}
