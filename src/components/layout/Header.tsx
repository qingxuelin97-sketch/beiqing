import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Home, Calendar, FileText, BookOpen, Info } from 'lucide-react';
import { PartyEmblem } from '@/components/ui/PartyEmblem';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', label: '首页', icon: Home },
  { to: '/congresses', label: '代表大会', icon: BookOpen },
  { to: '/plenaries', label: '中央全会', icon: FileText },
  { to: '/timeline', label: '历史时间轴', icon: Calendar },
  { to: '/search', label: '检索', icon: Search },
  { to: '/about', label: '关于', icon: Info },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-party-red-darker/85 border-b border-party-gold/25 shadow-party">
      <div className="meander-border" />
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <PartyEmblem size={36} className="drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
            </motion.div>
            <div className="flex flex-col leading-tight">
              <span className="font-serif font-bold text-base lg:text-xl text-gold-gradient tracking-wide">
                中共党史资料库
              </span>
              <span className="text-[10px] lg:text-xs text-party-gold-soft/70 tracking-[0.2em]">
                一大 — 二十大四中全会
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'relative px-4 py-2 text-sm font-medium transition-colors duration-300 group',
                    isActive
                      ? 'text-party-gold'
                      : 'text-party-paper/80 hover:text-party-gold'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="flex items-center gap-1.5">
                      <item.icon size={15} />
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-party-gold to-transparent"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-party-gold p-2"
            onClick={() => setOpen(!open)}
            aria-label="菜单"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-party-red-darker/95 border-t border-party-gold/20"
          >
            <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-party-gold/15 text-party-gold border-l-2 border-party-gold'
                        : 'text-party-paper/80 hover:bg-party-gold/5 hover:text-party-gold'
                    )
                  }
                >
                  <item.icon size={18} />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Scroll progress bar */}
      <motion.div
        key={location.pathname}
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-party-gold via-party-gold-soft to-party-gold"
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />
    </header>
  );
}
