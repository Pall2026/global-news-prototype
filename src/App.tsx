import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Components';

const Home = lazy(() => import('./pages/Home'));
const Desk = lazy(() => import('./pages/Desk'));
const Topic = lazy(() => import('./pages/Topic'));
const Article = lazy(() => import('./pages/Article'));

function SkipLink() {
  return (
    <a 
      href="#root" 
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-clay text-sand px-4 py-2 font-medium focus:outline-2 focus:outline-offset-2 focus:outline-clay"
    >
      Skip to content
    </a>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen selection:bg-clay/20">
          <SkipLink />
          <Header />
          <Suspense fallback={
            <div className="h-screen flex items-center justify-center">
              <span className="text-caption uppercase tracking-widest animate-pulse opacity-50">Decoding...</span>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/desk/:slug" element={<Desk />} />
              <Route path="/desk/:slug/:topic" element={<Desk />} />
              <Route path="/topic/:topic" element={<Topic />} />
              <Route path="/article/:slug" element={<Article />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ThemeProvider>
  );
}

