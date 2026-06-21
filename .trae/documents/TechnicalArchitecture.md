# 中共历次代表大会与中央全会资料库 · 技术架构文档

## 1. 架构设计

本项目为纯前端单页应用，所有党史资料以静态 JSON 数据形式内置于前端，无需后端服务，确保内容可控、可追溯、可离线访问。

```mermaid
flowchart TB
    subgraph "前端层 Frontend"
        "React 18 + TypeScript"
        "React Router 6"
        "TailwindCSS 3"
        "Zustand 状态管理"
        "Framer Motion 动效"
    end
    subgraph "数据层 Data"
        "静态 JSON 数据集"
        "congresses.json 代表大会"
        "plenaries.json 中央全会"
        "timeline.json 时间轴"
    end
    subgraph "工具层 Utils"
        "搜索索引"
        "引用格式化"
        "滚动观察 Hook"
    end
    "前端层" --> "数据层"
    "前端层" --> "工具层"
```

## 2. 技术栈说明
- **前端框架**：React@18 + TypeScript
- **构建工具**：Vite
- **样式方案**：TailwindCSS@3 + CSS 变量（红色主题）
- **路由**：react-router-dom@6
- **状态管理**：zustand（收藏夹、筛选状态）
- **动效库**：framer-motion（页面过渡、滚动揭示、微交互）
- **图标**：lucide-react
- **字体**：思源宋体 / 思源黑体（Google Fonts Noto Serif SC / Noto Sans SC）
- **后端**：无（纯静态数据）
- **数据库**：无（JSON 静态数据）

## 3. 路由定义
| 路由 | 用途 |
|------|------|
| `/` | 首页（Hero、数据看板、时间轴预览） |
| `/congresses` | 代表大会列表页（一大至二十大） |
| `/congresses/:id` | 代表大会详情页 |
| `/plenaries` | 中央全会列表页（按届次浏览） |
| `/plenaries/:id` | 中央全会详情页 |
| `/timeline` | 时间轴页 |
| `/search` | 检索页 |
| `/about` | 关于页（资料来源与合规声明） |

## 4. 数据模型

### 4.1 代表大会数据结构
```typescript
interface Congress {
  id: string;              // '1'-'20'
  ordinal: number;         // 届次 1-20
  name: string;            // '中国共产党第一次全国代表大会'
  shortName: string;       // '中共一大'
  startDate: string;       // '1921-07-23'
  endDate: string;         // '1921-08-03'
  location: string;        // '上海 → 浙江嘉兴南湖'
  delegates: number;       // 出席代表数
  representatives: number; // 全国党员数
  agenda: string[];        // 主要议程
  documents: Document[];   // 通过的文件
  personnel: Personnel;    // 人事变动
  significance: string;    // 历史意义
  sources: Source[];       // 官方出处
}

interface Document {
  title: string;
  type: '纲领' | '章程' | '决议' | '报告' | '宣言' | '公报';
  summary: string;
}

interface Personnel {
  centralCommittee?: number;   // 中央委员数
 politburo?: number;          // 政治局委员数
  standingCommittee?: number;  // 政治局常委数
  generalSecretary?: string;   // 总书记/主席
  notes?: string;              // 人事说明
}

interface Source {
  title: string;     // 资料名称
  publisher: string; // 出版/发布机构
  year?: string;     // 年份
}
```

### 4.2 中央全会数据结构
```typescript
interface Plenary {
  id: string;              // '20-4' 表示二十届四中全会
  congressOrdinal: number; // 属于第几届中央委员会
  ordinal: number;         // 第几次全会
  name: string;            // '中共二十届四中全会'
  fullName: string;        // '中国共产党第二十届中央委员会第四次全体会议'
  date: string;            // '2025-10-20' / '2025-10-23'
  location: string;        // '北京'
  attendees: string;       // 出席人员描述
  agenda: string[];        // 主要议程
  documents: Document[];   // 通过的文件
  communique: string;      // 公报要点
  personnel: Personnel;    // 人事变动
  significance: string;    // 历史意义
  sources: Source[];       // 官方出处
}
```

### 4.3 数据文件组织
```
src/data/
  congresses/        # 代表大会数据，按届分文件
    congress-01.json  # 一大
    congress-02.json  # 二大
    ...
    congress-20.json  # 二十大
  plenaries/         # 中央全会数据，按届分文件
    plenaries-01.json # 一届中央全会（含历次）
    ...
    plenaries-20.json # 二十届中央全会
  index.ts           # 数据加载与索引
```

## 5. 组件结构
```
src/
  components/
    layout/
      Header.tsx          # 顶部导航（党徽 + 菜单）
      Footer.tsx          # 页脚（版权 + 声明）
      PageTransition.tsx  # 页面过渡包裹
    home/
      Hero.tsx            # 首页 Hero（粒子动效）
      StatsBoard.tsx      # 数据看板
      TimelinePreview.tsx # 时间轴预览
    congress/
      CongressCard.tsx    # 代表大会卡片
      CongressList.tsx    # 列表
    plenary/
      PlenaryCard.tsx     # 中央全会卡片
      PlenaryList.tsx     # 列表
      CongressTabs.tsx    # 届次 Tab
    detail/
      InfoCard.tsx        # 信息卡
      DocumentList.tsx    # 文件清单
      PersonnelCard.tsx   # 人事变动
      SourceList.tsx      # 出处标注
    timeline/
      Timeline.tsx        # 时间轴主组件
      TimelineNode.tsx    # 节点
    search/
      SearchBar.tsx       # 搜索框
      FilterPanel.tsx     # 筛选面板
      SearchResult.tsx    # 结果项
    ui/
      GoldButton.tsx      # 金色按钮
      RedBadge.tsx        # 红色徽章
      StarDivider.tsx     # 五角星分隔线
      ParticleBg.tsx      # 粒子背景
  hooks/
    useCountUp.ts         # 数字滚动
    useScrollReveal.ts    # 滚动揭示
    useSearch.ts          # 检索逻辑
  pages/
    Home.tsx
    Congresses.tsx
    CongressDetail.tsx
    Plenaries.tsx
    PlenaryDetail.tsx
    Timeline.tsx
    Search.tsx
    About.tsx
  store/
    useFavoriteStore.ts   # 收藏夹
    useFilterStore.ts     # 筛选状态
  data/
    ...                   # 见数据模型
  utils/
    citation.ts           # GB/T 7714 引用格式
    date.ts               # 日期格式化
```

## 6. 关键技术实现

### 6.1 主题色系统（CSS 变量）
```css
:root {
  --party-red: #C8102E;        /* 党旗红 */
  --party-red-dark: #8B0000;   /* 深红 */
  --party-red-darker: #5C0000; /* 暗红 */
  --party-gold: #FFD700;       /* 党徽金 */
  --party-gold-soft: #E8C26A;  /* 米金 */
  --paper: #F5EFE0;            /* 宣纸米白 */
  --ink: #1A0A0A;              /* 墨色 */
}
```

### 6.2 动效方案
- **页面过渡**：framer-motion AnimatePresence，红色幕布滑入滑出
- **滚动揭示**：useScrollReveal hook + whileInView
- **数字计数**：useCountUp hook，缓动函数 easeOut
- **粒子背景**：Canvas 实现缓慢漂浮的金色粒子
- **卡片 3D 倾斜**：mousemove 监听 + perspective + rotateX/Y
- **按钮涟漪**：CSS 伪元素 + JS 计算点击位置

### 6.3 性能优化
- 数据按需加载（详情页动态 import JSON）
- 图片懒加载
- 路由级代码分割（除核心路由外）
- 粒子背景 requestAnimationFrame

## 7. 合规与版权
- 所有数据均来自官方公开出版物，引用时标注出处
- 页面底部固定显示「本站资料均来源于官方公开出版物，遵循《中华人民共和国宪法》与《中国共产党章程》」
- 不包含任何敏感或未公开信息
- 不允许用户上传或修改内容（纯只读展示）
