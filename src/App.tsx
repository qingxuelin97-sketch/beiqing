import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import Home from '@/pages/Home';
import Congresses from '@/pages/Congresses';
import CongressDetail from '@/pages/CongressDetail';
import Plenaries from '@/pages/Plenaries';
import PlenaryDetail from '@/pages/PlenaryDetail';
import TimelinePage from '@/pages/Timeline';
import Search from '@/pages/Search';
import About from '@/pages/About';
import Documents from '@/pages/Documents';
import DocumentViewer from '@/pages/DocumentViewer';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/congresses" element={<PageTransition><Congresses /></PageTransition>} />
        <Route path="/congresses/:id" element={<PageTransition><CongressDetail /></PageTransition>} />
        <Route path="/plenaries" element={<PageTransition><Plenaries /></PageTransition>} />
        <Route path="/plenaries/:id" element={<PageTransition><PlenaryDetail /></PageTransition>} />
        <Route path="/documents" element={<PageTransition><Documents /></PageTransition>} />
        <Route path="/documents/:docId" element={<PageTransition><DocumentViewer /></PageTransition>} />
        <Route path="/timeline" element={<PageTransition><TimelinePage /></PageTransition>} />
        <Route path="/search" element={<PageTransition><Search /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}
