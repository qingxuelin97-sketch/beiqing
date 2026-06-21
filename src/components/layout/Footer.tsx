import { Link } from 'react-router-dom';
import { PartyEmblem } from '@/components/ui/PartyEmblem';

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-party-gold/25 bg-party-red-darkest/80">
      <div className="meander-border" />
      <div className="container mx-auto px-4 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start gap-3">
            <PartyEmblem size={40} />
            <h3 className="font-serif text-lg text-gold-gradient font-bold">
              中共党史资料库
            </h3>
            <p className="text-xs text-party-paper/60 leading-relaxed">
              系统收录中国共产党第一次全国代表大会至第二十届中央委员会第四次全体会议资料
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-party-gold mb-3 tracking-wider">资料来源</h4>
            <ul className="text-xs text-party-paper/70 space-y-1.5 leading-relaxed">
              <li>中央党史和文献研究院编《中国共产党历史》</li>
              <li>人民出版社《中国共产党历次代表大会及重要全会资料》</li>
              <li>人民日报、新华社历次党代会/全会报道</li>
              <li>《中国共产党章程》历次修订版本</li>
              <li>党的三个历史决议</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-party-gold mb-3 tracking-wider">快速导航</h4>
            <ul className="text-xs text-party-paper/70 space-y-1.5">
              <li><Link to="/congresses" className="hover:text-party-gold transition-colors">历次代表大会</Link></li>
              <li><Link to="/plenaries" className="hover:text-party-gold transition-colors">中央委员会全体会议</Link></li>
              <li><Link to="/timeline" className="hover:text-party-gold transition-colors">历史时间轴</Link></li>
              <li><Link to="/search" className="hover:text-party-gold transition-colors">资料检索</Link></li>
              <li><Link to="/about" className="hover:text-party-gold transition-colors">关于与声明</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-party-gold/15">
          <p className="text-center text-xs text-party-paper/50 leading-relaxed">
            本站资料均来源于官方公开出版物，严格遵循《中华人民共和国宪法》与《中国共产党章程》。
          </p>
          <p className="text-center text-xs text-party-paper/40 mt-2">
            坚持历史唯物主义 · 弘扬红色文化 · 仅供党史学习研究使用
          </p>
        </div>
      </div>
    </footer>
  );
}
