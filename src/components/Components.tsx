import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, ChevronDown, ChevronRight, Menu, X, Twitter, Facebook, Mail, Phone, Youtube, Instagram, Play, Bookmark, Share2, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect, useMemo } from 'react';
import { articles } from '../data/articles';

const TOPICS = [
  { label: 'Politics', slug: 'politics' },
  { label: 'Economy', slug: 'business' },
  { label: 'Environment', slug: 'environment' },
  { label: 'Technology', slug: 'technology' },
  { label: 'Culture', slug: 'culture' },
];

const DESKS = [
  { label: 'South Asia', slug: 'south-asia' },
  { label: 'East Asia', slug: 'east-asia' },
  { label: 'Africa', slug: 'africa' },
  { label: 'Latin America', slug: 'latin-america' },
  { label: 'Middle East', slug: 'middle-east' },
];

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header id="main-header" className="sticky top-0 z-50 w-full bg-sand/90 backdrop-blur-md border-b border-ink/10 transition-colors duration-200">
      <div className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-[24px] font-black tracking-[-0.04em] text-clay hover:opacity-80 transition-opacity">
          BHARAT LENS
        </Link>
        <nav className="hidden md:flex items-center gap-8 translate-x-8">
          {TOPICS.slice(0, 4).map((item) => (
            <NavDropdown key={item.slug} item={item} />
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2.5 text-ink hover:text-clay transition-colors"
            title="Search Articles"
            id="search-trigger"
          >
            <Search className="w-5 h-5" />
          </button>
          <ThemesMenu />
        </div>
      </div>
      
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}

function SearchModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return articles.filter(article => 
      article.headline.toLowerCase().includes(q) ||
      article.dek.toLowerCase().includes(q) ||
      article.topic.toLowerCase().includes(q) ||
      (article.country && article.country.toLowerCase().includes(q))
    ).slice(0, 8);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="search-modal-container" className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            className="relative w-full max-w-[700px] bg-sand border border-ink/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] rounded-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-ink/10 flex items-center gap-4">
              <Search className="w-5 h-5 text-ink/40 ml-2" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search headlines, countries, or topics..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-[18px] text-ink placeholder:text-ink/30 h-12"
              />
              <button 
                onClick={onClose}
                className="p-2 text-ink/40 hover:text-clay transition-colors"
                id="close-search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto overflow-x-hidden">
              {results.length > 0 ? (
                <div className="p-2">
                  <div className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-ink/40">
                    Results
                  </div>
                  {results.map((article) => (
                    <Link
                      key={article.id}
                      to={`/article/${article.slug}`}
                      onClick={onClose}
                      className="flex gap-4 p-4 hover:bg-clay/5 rounded-xl transition-all group"
                    >
                      {article.image && (
                        <div className="w-24 h-16 shrink-0 bg-ink/5 rounded overflow-hidden">
                          <img 
                            src={article.image} 
                            alt="" 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] font-black uppercase tracking-widest text-clay">{article.topic}</span>
                          {article.country && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-clay/20" />
                              <span className="text-[9px] font-bold uppercase tracking-widest text-ink/40">{article.country}</span>
                            </>
                          )}
                        </div>
                        <h4 className="text-[16px] font-bold text-ink leading-tight group-hover:text-clay transition-colors truncate">
                          {article.headline}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : query.trim() ? (
                <div className="py-20 text-center">
                  <p className="text-[14px] italic text-ink/40">No matches found for "{query}"</p>
                </div>
              ) : (
                <div className="p-8">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-ink/40 mb-6">
                    Trending Topics
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['India', 'Bangledesh', 'Technology', 'Climate', 'Global South'].map(t => (
                      <button 
                        key={t}
                        onClick={() => setQuery(t)}
                        className="px-4 py-2 bg-ink/[0.03] hover:bg-clay/10 rounded-full text-[13px] font-bold text-ink/70 hover:text-clay transition-all"
                        id={`search-trend-${t.toLowerCase().replace(' ', '-')}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 bg-ink/[0.02] border-t border-ink/10 flex items-center justify-between">
              <div className="flex items-center gap-4 text-[10px] font-bold text-ink/40 uppercase tracking-widest">
                <span className="flex items-center gap-1"><span className="px-1.5 py-0.5 border border-ink/10 rounded-sm bg-white shadow-sm">ESC</span> Close</span>
                <span className="flex items-center gap-1"><span className="px-1.5 py-0.5 border border-ink/10 rounded-sm bg-white shadow-sm">↵</span> Select</span>
              </div>
              <div className="text-[10px] font-black italic text-clay">Bharat Lens Search</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function ThemesMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themes = [
    { id: 'classic', label: 'Classic Digital', icon: <Sun className="w-4 h-4" /> },
    { id: 'dark', label: 'Deep Ink', icon: <Moon className="w-4 h-4" /> },
    { id: 'sepia', label: 'Archive', icon: <div className="w-4 h-4 rounded-full bg-[#704214]/20" /> },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button 
        id="theme-selector"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 group p-2 hover:bg-clay/5 rounded-full transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-clay/10 flex items-center justify-center text-clay group-hover:bg-clay group-hover:text-sand transition-all">
          {theme === 'classic' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </div>
        <ChevronDown className={`w-4 h-4 text-ink/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-48 bg-sand border border-ink/10 shadow-xl rounded-xl overflow-hidden py-1"
          >
            {themes.map((t) => (
              <button
                key={t.id}
                id={`theme-option-${t.id}`}
                onClick={() => {
                  setTheme(t.id as any);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 text-[13px] font-medium transition-colors hover:bg-clay/5 ${theme === t.id ? 'text-clay bg-clay/5' : 'text-ink/70'}`}
              >
                <span className="opacity-60">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavDropdown({ item }: { item: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative h-full flex items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link 
        to={`/category/${item.slug}`}
        className="text-[13px] font-bold uppercase tracking-widest text-ink/60 hover:text-clay transition-colors flex items-center gap-1.5 py-4"
      >
        {item.label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </Link>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute top-full left-0 w-64 bg-sand border border-ink/10 shadow-2xl rounded-xl py-6 px-4"
          >
            <div className="grid gap-4">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-clay/40 mb-1 px-3">
                Featured Regions
              </div>
              {DESKS.map(desk => (
                <Link 
                  key={desk.slug}
                  to={`/desk/${desk.slug}`}
                  className="flex items-center justify-between group/link px-3 py-2 rounded-lg hover:bg-clay/5 transition-all"
                >
                  <span className="text-[13px] font-bold text-ink/80 group-hover/link:text-clay">{desk.label}</span>
                  <ChevronRight className="w-4 h-4 text-ink/20 group-hover/link:text-clay group-hover/link:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Footer() {
  return (
    <footer id="main-footer" className="bg-ink text-sand py-24 pb-12 transition-colors duration-200">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20 border-b border-sand/5 pb-16">
          <div className="md:col-span-4">
            <h2 className="text-[28px] font-black tracking-tighter mb-6">BHARAT LENS</h2>
            <p className="text-[16px] leading-[1.6] opacity-60 mb-8 max-w-xs">
              Reporting on the Global South with industrial precision and human curiosity. Part of the New Digital Era.
            </p>
            <div className="flex gap-4">
              {[Twitter, Facebook, Mail, Instagram, Youtube].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full border border-sand/10 flex items-center justify-center hover:bg-clay hover:border-clay transition-all group">
                  <Icon className="w-4 h-4 opacity-60 group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-black uppercase tracking-widest mb-8 opacity-40">Desks</h4>
            <div className="grid gap-4">
              {DESKS.map(desk => (
                <Link key={desk.slug} to={`/desk/${desk.slug}`} className="text-[14px] font-bold hover:text-clay transition-colors">{desk.label}</Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[11px] font-black uppercase tracking-widest mb-8 opacity-40">Topics</h4>
            <div className="grid gap-4">
              {TOPICS.map(topic => (
                <Link key={topic.slug} to={`/category/${topic.slug}`} className="text-[14px] font-bold hover:text-clay transition-colors">{topic.label}</Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-4 bg-sand/5 p-8 rounded-2xl border border-sand/5">
            <h4 className="text-[11px] font-black uppercase tracking-widest mb-4 opacity-40">Direct Intelligence</h4>
            <h3 className="text-[20px] font-bold mb-6 leading-tight">The Lens Weekly. Global perspective, delivered.</h3>
            <div className="relative">
              <input type="email" placeholder="email@example.com" className="w-full bg-sand/5 border border-sand/10 rounded-lg py-3 px-4 text-[14px] focus:outline-none focus:border-clay transition-colors" />
              <button className="absolute right-2 top-2 bottom-2 px-4 bg-clay text-sand text-[12px] font-black uppercase tracking-widest rounded-md hover:bg-clay/80 transition-colors">Join</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-[11px] font-black uppercase tracking-widest opacity-30">
          <div>© 2026 BHARAT LENS MEDIA GROUP</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-sand transition-colors">Privacy</a>
            <a href="#" className="hover:text-sand transition-colors">Terms</a>
            <a href="#" className="hover:text-sand transition-colors">Ad Choices</a>
            <a href="#" className="hover:text-sand transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function HeroArticle({ article }: { article: any }) {
  const formattedTime = new Date(article.lastUpdated).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return (
    <article id="hero-feature" className="relative group overflow-hidden border-b border-ink/10 transition-colors duration-200">
      <Link to={`/article/${article.slug}`} className="block">
        <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-clay/5">
          <img 
            src={article.image} 
            alt={article.headline}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s] ease-out opacity-90 group-hover:opacity-100"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
            <div className="max-w-[1100px] mx-auto">
              <div className="inline-flex items-center gap-3 bg-clay px-3 py-1.5 rounded-sm mb-6 shadow-xl">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white">Top Story</span>
              </div>
              <h1 className="text-[36px] md:text-[64px] font-black leading-[0.95] text-sand tracking-[-0.04em] mb-6 max-w-[900px] drop-shadow-2xl">
                {article.headline}
              </h1>
              <p className="text-[18px] md:text-[24px] leading-[1.3] text-sand/80 max-w-[800px] mb-8 font-medium">
                {article.dek}
              </p>
              <div className="flex items-center gap-4 text-[12px] font-black uppercase tracking-widest text-sand/60">
                <span className="text-clay-light">{article.topic}</span>
                <span className="w-1 h-1 rounded-full bg-sand/20" />
                <span>Updated Feb 26, {formattedTime} IST</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function PulseBar({ articles }: { articles: any[] }) {
  return (
    <div id="pulse-ticker" className="bg-clay py-3 overflow-hidden border-y border-clay-dark/20 shadow-inner">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex shrink-0">
            {articles.map((article) => (
              <Link 
                key={article.id + i} 
                to={`/article/${article.slug}`}
                className="flex items-center gap-4 px-8 group"
              >
                <div className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-black text-white uppercase tracking-widest">
                  #{article.pulseRank}
                </div>
                <span className="text-[13px] font-black text-white uppercase tracking-widest group-hover:underline">
                  {article.headline.split(':')[0]}
                </span>
                <span className="text-white/30 text-[18px] font-black">/</span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-12">
      <h2 className="text-[13px] font-black uppercase tracking-[0.4em] text-clay shrink-0">
        {label}
      </h2>
      <div className="w-full h-px bg-ink/10" />
    </div>
  );
}

export function HomeGrid({ liveArticles, trendingArticles, globalArticles }: { liveArticles: any[], trendingArticles: any[], globalArticles: any[] }) {
  return (
    <section id="home-grid" className="max-w-[1100px] mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Live Updates Column */}
        <div className="lg:col-span-3">
          <SectionLabel label="Live Updates" />
          <div className="flex flex-col gap-8">
            {liveArticles.slice(0, 5).map((article, idx) => (
                <div key={article.id} className="flex items-center justify-between border-b border-ink/10 pb-6 last:border-0 group">
                  <div className="flex gap-4 flex-1">
                    <span className="font-mono text-clay text-[14px] mt-1 shrink-0 font-black">{(idx + 1).toString().padStart(2, '0')}</span>
                    <Link to={`/article/${article.slug}`} className="hover:text-clay transition-colors flex-1">
                      <div className="text-[10px] font-black uppercase text-clay/60 mb-2">{article.country || article. desk?.toUpperCase()}</div>
                      <h3 className="text-[19px] leading-[1.3] font-medium mb-2 text-ink">{article.headline}</h3>
                      <span className="text-[11px] font-mono opacity-80 uppercase text-ink font-black">{new Date(article.lastUpdated).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} IST</span>
                    </Link>
                  </div>
                  <div className="flex flex-col gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-ink hover:text-clay" title="Save"><Bookmark className="w-3.5 h-3.5" /></button>
                    <button className="text-ink hover:text-clay" title="Share"><Share2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
            ))}
          </div>
        </div>

        {/* Major Trending Column */}
        <div className="lg:col-span-6">
          <SectionLabel label="Trending Now" />
          <div className="flex flex-col gap-16">
            {trendingArticles.slice(0, 3).map((article) => (
              <div key={article.id} className="group cursor-pointer">
                {article.image && (
                  <div className="relative aspect-[16/9] overflow-hidden rounded-sm mb-6 bg-clay/5">
                    <img 
                      src={article.image} 
                      alt="" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] opacity-90 group-hover:opacity-100" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-widest text-clay font-black block">{article.topic}</span>
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-clay hover:opacity-70"><Bookmark className="w-4 h-4" /></button>
                    <button className="text-clay hover:opacity-70"><Share2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <h3 className="text-[24px] leading-[1.2] font-medium group-hover:text-clay transition-colors text-ink">
                  {article.headline}
                </h3>
                <p className="mt-4 text-[16px] leading-[1.5] text-ink/70 line-clamp-3">
                  {article.dek}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Rail: Regional Focus */}
        <div className="lg:col-span-3">
          <SectionLabel label="Global Focus" />
          <div className="flex flex-col gap-8">
            {globalArticles.slice(0, 6).map((article) => (
              <div key={article.id} className="group pb-6 border-b border-ink/10 last:border-0 text-ink">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase text-clay/60">
                      {article.country || article.desk.replace('-', ' ')}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-clay/20" />
                    <span className="px-2 py-0.5 bg-ink/5 text-[9px] uppercase font-bold tracking-widest text-ink/40">
                      {article.topic}
                    </span>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover/article:opacity-100 transition-opacity">
                    <button className="text-ink/40 hover:text-clay"><Bookmark className="w-3.5 h-3.5" /></button>
                    <button className="text-ink/40 hover:text-clay"><Share2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                <Link to={`/article/${article.slug}`} className="block hover:text-clay transition-colors">
                  <h3 className="text-[18px] leading-[1.3] font-medium">{article.headline}</h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function VisualReels() {
  return (
    <section id="visual-reels" className="bg-ink py-24 transition-colors duration-200">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-[13px] font-black uppercase tracking-[0.4em] text-clay">Visual Dispatch</h2>
          <Link to="/" className="text-[10px] font-black uppercase tracking-widest text-sand hover:text-clay transition-colors">View All Reel</Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { id: '1590457121703-a13ea2dc5305', label: 'Dhaka Streets', country: 'Bangladesh', localPath: '/images/regenerated_image_1778330268088.png' },
            { id: '1518173946601-bbd1d27a432a', label: 'Mumbai Harbor', country: 'India', localPath: '/images/regenerated_image_1778330271450.png' },
            { id: '1531390844011-f19edf46713e', label: 'Tokyo Rain', country: 'Japan', localPath: '/images/regenerated_image_1778330274846.png' },
            { id: '1504608524841-42fe6f032b4b', label: 'Nairobi Market', country: 'Kenya', localPath: '/images/regenerated_image_1778336885523.png' },
            { id: '1504150537657-6186ee1bf5f8', label: 'Lagos Transit', country: 'Nigeria', localPath: '/images/regenerated_image_1778330276998.png' },
            { id: '1533105079780-92b9be482077', label: 'Seoul Lights', country: 'South Korea', localPath: '/images/regenerated_image_1778330279278.png' }
          ].map((reel) => (
            <div key={reel.id} className="relative aspect-[9/16] group cursor-pointer overflow-hidden rounded-sm">
              <img 
                src={reel.localPath || `https://images.unsplash.com/photo-${reel.id}?auto=format&fit=crop&q=80&w=400`} 
                alt={reel.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-90 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button className="w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-clay transition-colors" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                  <Bookmark className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-clay transition-colors" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute top-4 left-4">
                <span className="px-2 py-1 bg-black/40 backdrop-blur-sm text-[8px] text-white font-black uppercase tracking-widest rounded">
                  {reel.country}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center mb-3">
                  <Play className="w-3 h-3 text-white fill-current" />
                </div>
                <h3 className="text-[12px] font-black text-white uppercase tracking-widest leading-tight">
                  {reel.label}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EditorPicks({ articles }: { articles: any[] }) {
  return (
    <section id="editor-picks" className="max-w-[1100px] mx-auto px-6 py-24">
      <SectionLabel label="Editor's Selection" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        {articles.map((article) => (
          <div key={article.id} className="group">
            <Link to={`/article/${article.slug}`} className="block">
              {article.image && (
                <div className="aspect-[3/4] overflow-hidden mb-8 bg-clay/5 rounded-sm">
                  <img 
                    src={article.image} 
                    alt="" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] opacity-90 group-hover:opacity-100" 
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              <div className="inline-block px-2 py-1 bg-clay text-sand text-[9px] font-black uppercase tracking-widest mb-4">
                Analysis
              </div>
              <h3 className="text-[28px] leading-[1.1] font-medium group-hover:text-clay transition-colors text-ink">
                {article.headline}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.6] text-ink/60 line-clamp-3">
                {article.body}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ArticleCard({ article, compact = false }: { article: any, compact?: boolean }) {
  return (
    <Link to={`/article/${article.slug}`} className="group block">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-[13px] font-black uppercase tracking-widest text-clay">
            {article.topic}
          </div>
          {article.country && (
            <>
              <div className="w-1 h-1 rounded-full bg-clay/30" />
              <div className="text-[13px] font-bold uppercase tracking-widest text-ink/80">
                {article.country}
              </div>
            </>
          )}
        </div>
        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="text-ink/40 hover:text-clay"><Bookmark className="w-4 h-4" /></button>
          <button className="text-ink/40 hover:text-clay"><Share2 className="w-4 h-4" /></button>
        </div>
      </div>

      {article.image && (
        <div className={`overflow-hidden bg-clay/5 rounded-sm mb-6 ${compact ? 'aspect-[21/9]' : 'aspect-video'}`}>
          <img 
            src={article.image} 
            alt="" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] opacity-90 group-hover:opacity-100" 
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      <h3 className={`${compact ? 'text-[24px]' : 'text-[32px]'} leading-[1.1] font-medium group-hover:text-clay transition-colors text-ink mb-4 italic`}>
        {article.headline}
      </h3>
      
      {!compact && (
        <p className="text-[17px] leading-[1.5] text-ink/70 mb-6 line-clamp-3">
          {article.dek}
        </p>
      )}

      <div className="text-[11px] font-black uppercase tracking-widest text-ink/30 border-t border-ink/5 pt-4">
        {article.writer.name} <span className="mx-2">/</span> {new Date(article.filed.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
      </div>
    </Link>
  );
}

export function SidebarArticle({ article }: { article: any }) {
  return (
    <Link to={`/article/${article.slug}`} className="group block py-6 border-b border-ink/10 last:border-0">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[9px] font-black uppercase tracking-widest text-clay">{article.topic}</span>
        {article.country && (
          <>
            <span className="w-1 h-1 rounded-full bg-clay/20" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-ink/40">{article.country}</span>
          </>
        )}
      </div>
      <h4 className="text-[17px] font-bold text-ink leading-tight group-hover:text-clay transition-colors mb-2">
        {article.headline}
      </h4>
      <div className="text-[10px] uppercase font-black tracking-widest text-ink/30">
        {new Date(article.lastUpdated).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} IST
      </div>
    </Link>
  );
}

export function DetailedWriterCard({ writer }: { writer: any }) {
  return (
    <div id="author-card" className="flex items-center gap-6 py-10 border-y border-ink/10 my-12 bg-clay/[0.02] px-8 rounded-sm">
      <div className="w-16 h-16 rounded-full bg-clay text-sand flex items-center justify-center text-[24px] font-black shadow-lg">
        {writer.name.charAt(0)}
      </div>
      <div>
        <div className="text-[11px] font-black uppercase tracking-widest text-clay mb-1">Bureau Correspondent</div>
        <div className="text-[20px] font-bold text-ink mb-1">{writer.name}</div>
        <div className="text-[14px] italic text-ink/60">{writer.role}</div>
      </div>
    </div>
  );
}

export function ArticleActions() {
  return (
    <div className="flex items-center justify-between border-y border-ink/10 py-6 mb-12">
      <div className="flex items-center gap-8">
        <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest hover:text-clay transition-colors">
          <Bookmark className="w-4 h-4 text-clay" /> Save Story
        </button>
        <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest hover:text-clay transition-colors">
          <Share2 className="w-4 h-4 text-clay" /> Share
        </button>
      </div>
      <div className="flex items-center gap-4">
        {[Twitter, Facebook, Mail].map((Icon, idx) => (
          <button key={idx} className="p-2 hover:bg-clay/5 rounded-full text-ink/40 hover:text-clay transition-all">
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function Dateline({ filed }: { filed: { city: string, date: string } }) {
  const formattedDate = new Date(filed.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div id="dateline" className="border-y border-ink/10 py-4 mb-10">
      <span className="text-[13px] font-black uppercase tracking-[0.3em] text-ink">
        Filed {filed.city} <span className="mx-4 text-clay/40 font-normal">|</span> {formattedDate}
      </span>
    </div>
  );
}
