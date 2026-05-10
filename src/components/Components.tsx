import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, ChevronDown, ChevronRight, Menu, X, Twitter, Facebook, Mail, Phone, Youtube, Instagram, Play, Bookmark, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

const TOPICS = [
  { label: 'Politics', slug: 'politics' },
  { label: 'Technology', slug: 'technology' },
  { label: 'Environment', slug: 'environment' },
  { label: 'Culture', slug: 'culture' },
  { label: 'Sports', slug: 'sports' },
  { label: 'Business', slug: 'business' }
];

const NAVIGATION = [
  { label: 'India', slug: 'india' },
  { 
    label: 'Americas', 
    slug: 'americas',
    subRegions: [
      { label: 'North America', slug: 'north-america', countries: ['United States', 'Canada', 'Mexico'] },
      { label: 'South America', slug: 'south-america', countries: ['Brazil', 'Argentina', 'Chile', 'Colombia'] }
    ]
  },
  { 
    label: 'Europe', 
    slug: 'europe',
    subRegions: [
      { label: 'Western Europe', slug: 'western-europe', countries: ['United Kingdom', 'France', 'Germany', 'Netherlands', 'Belgium'] },
      { label: 'Southern Europe', slug: 'southern-europe', countries: ['Italy', 'Spain', 'Portugal', 'Greece'] },
      { label: 'Northern Europe', slug: 'northern-europe', countries: ['Sweden', 'Norway', 'Denmark', 'Finland'] },
      { label: 'Eastern Europe', slug: 'eastern-europe', countries: ['Poland', 'Ukraine', 'Romania', 'Hungary'] }
    ]
  },
  { 
    label: 'Africa', 
    slug: 'africa',
    subRegions: [
      { label: 'Northern Africa', slug: 'northern-africa', countries: ['Egypt', 'Morocco', 'Algeria', 'Tunisia'] },
      { label: 'Western Africa', slug: 'western-africa', countries: ['Nigeria', 'Ghana', 'Senegal', 'Ivory Coast'] },
      { label: 'Eastern Africa', slug: 'eastern-africa', countries: ['Kenya', 'Ethiopia', 'Tanzania', 'Uganda'] },
      { label: 'Central Africa', slug: 'central-africa', countries: ['DRC', 'Cameroon', 'Gabon'] },
      { label: 'Southern Africa', slug: 'southern-africa', countries: ['South Africa', 'Namibia', 'Botswana'] }
    ]
  },
  { 
    label: 'Asia', 
    slug: 'asia',
    subRegions: [
      { label: 'South Asia', slug: 'south-asia', countries: ['Bangladesh', 'Bhutan', 'Maldives', 'Nepal', 'Pakistan', 'Sri Lanka', 'Afghanistan'] },
      { label: 'East Asia', slug: 'east-asia', countries: ['China', 'Japan', 'South Korea'] },
      { label: 'West Asia', slug: 'west-asia', countries: ['Saudi Arabia', 'UAE', 'Israel', 'Iran', 'Turkey'] },
      { label: 'Central Asia', slug: 'central-asia', countries: ['Kazakhstan', 'Uzbekistan'] },
      { label: 'Southeast Asia', slug: 'southeast-asia', countries: ['Vietnam', 'Thailand', 'Indonesia', 'Singapore'] }
    ]
  }
];

export function Header() {
  return (
    <header id="main-header" className="sticky top-0 z-50 w-full bg-sand/90 backdrop-blur-md border-b border-ink/10 transition-colors duration-200">
      <div className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">
        <Masthead />
        <nav className="hidden lg:flex items-center gap-6 justify-center flex-1">
          <Link to="/desk/india" className="text-[13px] font-bold uppercase tracking-[0.15em] text-ink hover:text-clay transition-colors">India</Link>
          {NAVIGATION.filter(i => i.slug !== 'india').map((item) => (
            <NavDropdown key={item.slug} item={item} />
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <ThemesMenu />
        </div>
      </div>
    </header>
  );
}

function ThemesMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-ink text-sand rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-clay transition-colors"
      >
        {isOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
        Themes
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15, ease: [0, 0, 0.2, 1] }}
            className="absolute right-0 mt-4 w-[220px] bg-white border border-ink/5 shadow-[0px_12px_48px_rgba(0,0,0,0.15)] rounded-2xl p-2 z-[70]"
          >
            <div className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-3 text-ink/40 border-b border-ink/5 mb-2">
              Global Coverage
            </div>
            <div className="flex flex-col gap-0.5">
              {TOPICS.map((topic) => (
                <Link
                  key={topic.slug}
                  to={`/topic/${topic.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-[14px] font-bold text-ink/80 hover:bg-ink/[0.04] hover:text-clay transition-all uppercase tracking-wide"
                >
                  {topic.label}
                  <ChevronRight className="w-3.5 h-3.5 opacity-30" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavDropdown({ item }: { item: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const [popoverDirection, setPopoverDirection] = useState<'left' | 'right'>('right');
  const [activeCountryDirection, setActiveCountryDirection] = useState<'left' | 'right'>('right');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setActiveCountry(null);
    }, 200);
  };

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      
      // Main dropdown positioning
      if (rect.left + 600 > screenWidth) {
        setPopoverDirection('left');
      } else {
        setPopoverDirection('right');
      }
    }
  }, [isOpen]);

  const handleCountryHover = (e: React.MouseEvent, country: string) => {
    setActiveCountry(country);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const screenWidth = window.innerWidth;

    // Check if there's 200px space to the right
    if (rect.right + 220 > screenWidth) {
      setActiveCountryDirection('left');
    } else {
      setActiveCountryDirection('right');
    }
  };

  return (
    <div 
      ref={dropdownRef}
      className="relative h-16 flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link 
        to={`/desk/${item.slug}`} 
        className="flex items-center gap-1 text-[13px] font-bold uppercase tracking-[0.15em] text-ink hover:text-clay transition-colors py-2"
      >
        {item.label}
        {item.subRegions && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />}
      </Link>

      <AnimatePresence>
        {isOpen && item.subRegions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
            className={`absolute top-[60px] ${popoverDirection === 'right' ? 'left-0' : 'right-0'} min-w-[640px] bg-white border border-ink/5 shadow-[0px_8px_32px_rgba(0,0,0,0.1)] rounded-2xl p-8 z-[60]`}
          >
            <div className="grid grid-cols-2 gap-x-12 gap-y-10">
              {item.subRegions.map((sub: any) => (
                <div key={sub.slug} className="relative">
                  <Link 
                    to={`/desk/${sub.slug}`}
                    className="flex items-center justify-between group/sub mb-4 pb-2 border-b border-ink/5"
                  >
                    <span className="text-[13px] font-black uppercase tracking-[0.2em] text-clay/90">
                      {sub.label}
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all text-clay" />
                  </Link>
                  <div className="flex flex-col gap-1">
                    {sub.countries.map((country: string) => (
                      <div 
                        key={country} 
                        className="relative group/country"
                        onMouseEnter={(e) => handleCountryHover(e, country)}
                        onMouseLeave={() => setActiveCountry(null)}
                      >
                        <Link 
                          to={`/desk/${country.toLowerCase().replace(/\s+/g, '-')}`}
                          className="flex items-center justify-between px-4 py-2.5 rounded-xl text-[15px] text-ink hover:bg-ink/[0.04] transition-all font-medium"
                        >
                          <span>{country}</span>
                          <ChevronRight className={`w-4 h-4 opacity-0 group-hover/country:opacity-100 transition-opacity ${activeCountry === country ? 'opacity-100' : ''}`} />
                        </Link>

                        {/* Third level: Topics MD3 Style */}
                        <AnimatePresence>
                          {activeCountry === country && (
                            <motion.div
                              initial={{ opacity: 0, x: activeCountryDirection === 'right' ? -8 : 8, scale: 0.95 }}
                              animate={{ opacity: 1, x: 0, scale: 1 }}
                              exit={{ opacity: 0, x: activeCountryDirection === 'right' ? -8 : 8, scale: 0.95 }}
                              className={`absolute ${activeCountryDirection === 'right' ? 'left-full ml-2' : 'right-full mr-2'} top-0 p-2 bg-white border border-ink/5 shadow-[0px_12px_48px_rgba(0,0,0,0.15)] rounded-2xl z-70 min-w-[200px]`}
                            >
                              <div className="text-[11px] font-black uppercase tracking-[0.2em] px-4 py-3 text-ink/40 border-b border-ink/5 mb-2">
                                Explorer: {country}
                              </div>
                              <div className="flex flex-col gap-0.5">
                                {TOPICS.map(topic => (
                                  <Link
                                    key={topic.slug}
                                    to={`/desk/${country.toLowerCase().replace(/\s+/g, '-')}/${topic.slug}`}
                                    className="text-[14px] px-4 py-2.5 rounded-xl font-bold uppercase tracking-wide text-ink/80 hover:bg-ink/[0.04] hover:text-clay transition-all"
                                  >
                                    {topic.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Masthead() {
  return (
    <Link id="masthead" to="/" className="flex items-center gap-1 group font-serif text-[24px] md:text-[28px] leading-none shrink-0">
      <span className="font-normal text-ink">Bharat</span>
      <span className="italic ml-0.5 text-ink">Lens</span>
    </Link>
  );
}

export function HeroStory({ article }: { article: any }) {
  const formattedTime = new Date(article.lastUpdated).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kolkata'
  });

  return (
    <section id="hero-story" className="h-full">
      <Link to={`/article/${article.slug}`} className="group block h-full">
        <div className="flex flex-col h-full">
          <div className="w-full">
            {article.image && (
              <div className="mb-8 overflow-hidden rounded-sm bg-clay/5 aspect-[16/9] md:aspect-[21/9] border border-ink/10">
                <img 
                  src={article.image} 
                  alt={article.headline} 
                  className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-1000 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
          </div>
          <div className="w-full flex-1">
            <h1 className="text-[32px] md:text-[52px] xl:text-[56px] leading-[1.1] font-medium mb-8 group-hover:text-clay transition-colors tracking-tight text-ink">
              {article.headline}
            </h1>
            <p className="text-[20px] md:text-[24px] leading-[1.4] italic text-ink mb-8 max-w-[900px]">
              {article.dek}
            </p>
            <div className="flex items-center justify-between border-t border-clay/20 pt-6 mt-auto">
              <div className="text-[14px] leading-[1.4] text-ink font-mono uppercase tracking-widest">
                Update {formattedTime} IST <span className="mx-4 text-clay/30">|</span> {article.readTimeMin} min read
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-clay/10 rounded-full transition-colors text-ink hover:text-clay" title="Save Story">
                  <Bookmark className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-clay/10 rounded-full transition-colors text-ink hover:text-clay" title="Share Story">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}

export function LiveSidebar() {
  const livePlatforms = [
    { name: 'YouTube Live', icon: Youtube, color: 'bg-red-600', url: 'https://youtube.com/live', status: 'Live Report' },
    { name: 'X / Twitter', icon: Twitter, color: 'bg-black', url: 'https://twitter.com/i/live', status: 'Pulse Feed' },
    { name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500', url: 'https://instagram.com', status: 'Behind the Lens' },
  ];

  return (
    <aside className="h-full bg-ink/5 p-8 rounded-sm border border-ink/10 flex flex-col">
      <SectionLabel label="Live Now" />
      
      <div className="flex flex-col gap-5 flex-1">
        {livePlatforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-3 p-5 bg-white border border-ink/10 hover:border-clay transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="flex items-center justify-between">
              <div className={`p-2.5 rounded-xl ${platform.color} text-white shadow-sm`}>
                <platform.icon className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-clay opacity-0 group-hover:opacity-100 transition-opacity">
                Join <Play className="w-2.5 h-2.5 fill-current" />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-ink/40 mb-1">{platform.status}</p>
              <h4 className="text-[16px] font-bold text-ink group-hover:text-clay transition-colors leading-tight">{platform.name}</h4>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-10 pt-10 border-t border-ink/10">
        <p className="text-[12px] leading-relaxed text-ink/60 italic font-serif">
          Our global bureaus transmitting in real-time. Follow the unedited lens.
        </p>
      </div>
    </aside>
  );
}

export function BreakingNewsTicker() {
  const breakingNews = [
    "Crisis in the Arctic: New temperature records set for May",
    "Global Trade Agreement signed in New Delhi to lower green-tech tariffs",
    "Tech Giant announces breakthrough in Solid-State battery technology",
    "SpaceX successfully launches first module of the Lunar Gateway Station"
  ];

  return (
    <div className="w-full border-y border-ink/10 py-3 mb-16 overflow-hidden bg-sand/30 relative group">
      <div className="max-w-[1100px] mx-auto px-6 flex items-center gap-6">
        <div className="flex items-center gap-2 shrink-0 border-r border-ink/10 pr-6 mr-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-ink">Breaking</span>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <motion.div 
            initial={{ x: "0%" }}
            animate={{ x: "-50%" }}
            transition={{ 
              repeat: Infinity, 
              duration: 60, 
              ease: "linear" 
            }}
            className="flex gap-24 whitespace-nowrap hover:[animation-play-state:paused]"
          >
            {[...breakingNews, ...breakingNews].map((news, i) => (
              <span key={i} className="text-[13px] font-medium text-ink flex items-center gap-8">
                {news}
                <span className="text-clay/20">/</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function HomeGrid({ liveArticles, trendingArticles, globalArticles }: { liveArticles: any[], trendingArticles: any[], globalArticles: any[] }) {
  return (
    <section id="home-grid" className="mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-20">
        {/* Column 1: Live News */}
        <div className="flex flex-col">
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

        {/* Column 2: Trending News */}
        <div className="flex flex-col lg:border-x border-ink/10 lg:px-8">
          <SectionLabel label="Trending Now" />
          <div className="flex flex-col gap-10">
            {trendingArticles.slice(0, 2).map((article) => (
              <Link key={article.id} to={`/article/${article.slug}`} className="group block mb-4">
                {article.image && (
                  <div className="mb-5 overflow-hidden rounded-sm bg-ink/5 relative">
                    <img 
                      src={article.image} 
                      alt="" 
                      className="w-full h-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-700 h-[220px]" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 bg-white shadow-sm text-[10px] font-black uppercase tracking-widest text-clay">
                        {article.country || article.desk?.toUpperCase()}
                      </span>
                    </div>
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
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3: Global Intel */}
        <div className="flex flex-col">
          <SectionLabel label="Global Intel" />
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

      {/* Full Width Reels Section */}
      <div className="border-t border-ink/10 pt-16">
        <div className="flex items-center justify-between mb-2">
          <div className="flex-1">
            <SectionLabel label="Lens Reels" />
          </div>
          <button className="text-[11px] font-black uppercase tracking-[0.2em] text-clay hover:opacity-70 transition-opacity mb-8 shrink-0 ml-4">
            Watch More Reels →
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[
            { id: '1590457121703-a13ea2dc5305', label: 'Dhaka Streets', country: 'Bangladesh', localPath: '/images/regenerated_image_1778330268088.png' },
            { id: '1518173946601-bbd1d27a432a', label: 'Mumbai Harbor', country: 'India', localPath: '/images/regenerated_image_1778330271450.png' },
            { id: '1531390844011-f19edf46713e', label: 'Tokyo Rain', country: 'Japan', localPath: '/images/regenerated_image_1778330274846.png' },
            { id: '1504608524841-42fe6f032b4b', label: 'Nairobi Market', country: 'Kenya', localPath: '/images/regenerated_image_1778336885523.png' },
            { id: '1504150537657-6186ee1bf5f8', label: 'Lagos Transit', country: 'Nigeria', localPath: '/images/regenerated_image_1778330276998.png' },
            { id: '1533105079780-92b9be482077', label: 'Seoul Lights', country: 'South Korea', localPath: '/images/regenerated_image_1778330279278.png' }
          ].map((reel) => (
            <div key={reel.id} className="aspect-[9/16] bg-ink/5 rounded-2xl overflow-hidden relative group cursor-pointer border border-ink/5 shadow-sm">
              <img 
                src={reel.localPath || `https://images.unsplash.com/photo-${reel.id}?auto=format&fit=crop&q=80&w=400&h=711`} 
                alt="" 
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
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <p className="text-[11px] text-white font-black uppercase tracking-widest leading-tight">{reel.label}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[14px] border-l-white border-b-8 border-b-transparent ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
      <div className="flex items-center gap-3 mb-8 w-full overflow-hidden">
        <h2 className="text-[17px] md:text-[20px] lg:text-[22px] uppercase font-serif font-black tracking-widest text-clay leading-none whitespace-nowrap shrink-0">{label}</h2>
        <div className="h-[1px] flex-1 bg-clay/20 mt-1"></div>
      </div>
  );
}

export function PulseStrip({ articles }: { articles: any[] }) {
  return (
    <section id="pulse-strip" className="mb-16 border-t border-ink/10 pt-16">
      <SectionLabel label="The Pulse" />
      <ol className="flex flex-col gap-6">
        {articles.sort((a, b) => a.pulseRank - b.pulseRank).map((article) => (
          <li key={article.id} className="flex gap-6 items-start pb-6 border-b border-clay/10 last:border-0 group">
            <span className="font-mono text-[14px] leading-[1.4] pt-1 opacity-70 font-bold text-ink">0{article.pulseRank}.</span>
            <div className="flex-1">
              <Link to={`/article/${article.slug}`} className="block group-hover:text-clay transition-colors">
                <h3 className="text-[18px] leading-[1.7] font-medium mb-2 text-ink">{article.headline}</h3>
                <div className="text-[14px] leading-[1.4] font-mono opacity-60 text-ink font-bold">
                  {new Date(article.lastUpdated).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false })}
                </div>
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function EditorPicks({ articles }: { articles: any[] }) {
  return (
    <section id="editor-picks" className="mb-16">
      <SectionLabel label="Editor's Picks" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {articles.map((article, idx) => (
          <div key={article.id} className={`${idx !== 0 ? 'md:border-l' : ''} md:pl-0 border-ink/10 md:first:pl-0 last:border-r-0`}>
            <div className={`h-full ${idx !== 0 ? 'md:pl-12' : ''}`}>
              <ArticleCard article={article} compact />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function DeskFooter() {
  return (
    <footer id="desk-footer" className="mt-24 mb-12 py-16 border-t-2 border-ink">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
        {NAVIGATION.map(cat => (
          <div key={cat.slug} className="flex flex-col gap-4">
            <Link to={`/desk/${cat.slug}`} className="text-[16px] font-black uppercase tracking-widest text-ink hover:text-clay">
              {cat.label}
            </Link>
            {cat.subRegions && (
              <div className="flex flex-col gap-2">
                {cat.subRegions.map((sub: any) => (
                  <Link 
                    key={sub.slug} 
                    to={`/desk/${sub.slug}`}
                    className="text-[14px] text-ink/70 hover:opacity-100 font-medium hover:text-clay transition-colors"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12 border-y border-clay/10 mb-12">
        <div className="flex flex-col gap-6">
          <SectionLabel label="Connect With Us" />
          <div className="flex flex-col gap-4">
            <a href="mailto:contact@bharatlens.com" className="flex items-center gap-3 text-[15px] font-bold text-ink hover:text-clay transition-colors">
              <Mail className="w-5 h-5 text-clay" />
              contact@bharatlens.com
            </a>
            <a href="tel:+911145678900" className="flex items-center gap-3 text-[15px] font-bold text-ink hover:text-clay transition-colors">
              <Phone className="w-5 h-5 text-clay" />
              +91 11 4567 8900
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <SectionLabel label="Follow Our Lens" />
          <div className="flex gap-6">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-ink text-sand rounded-xl hover:bg-clay transition-colors group">
              <Twitter className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-ink text-sand rounded-xl hover:bg-clay transition-colors group">
              <Facebook className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <Masthead />
        <div className="text-[13px] opacity-60 font-medium tracking-wide">
          © 2026 Bharat Lens · Reporting for the Global South
        </div>
      </div>
    </footer>
  );
}

export function DeskHeader({ title }: { title: string }) {
  return (
    <div id="desk-header" className="mb-12 pt-8">
      <div className="flex items-baseline gap-4 mb-4">
        <h1 className="text-[32px] md:text-[48px] font-medium uppercase tracking-tighter text-ink">
          {title}
        </h1>
      </div>
      <div className="h-[2px] w-full bg-ink"></div>
    </div>
  );
}

export function TopicPills() {
  const { slug, topic: urlTopic } = useParams();
  const navigate = useNavigate();
  const topics = ['Politics', 'Culture', 'Technology', 'Environment', 'Sports'];

  const handleTopicClick = (topicName: string) => {
    const topicSlug = topicName.toLowerCase();
    if (urlTopic?.toLowerCase() === topicSlug) {
      navigate(`/desk/${slug}`);
    } else {
      navigate(`/desk/${slug}/${topicSlug}`);
    }
  };

  return (
    <nav id="topic-pills" className="flex flex-wrap gap-3 mb-16 px-1">
      {topics.map(topic => (
        <button
          key={topic}
          onClick={() => handleTopicClick(topic)}
          className={`px-6 py-2 text-[13px] font-bold uppercase tracking-[0.15em] border-2 transition-all ${
            topic.toLowerCase() === urlTopic?.toLowerCase()
              ? 'bg-ink text-sand border-ink'
              : 'border-clay/20 text-ink/80 hover:border-ink'
          }`}
        >
          {topic}
        </button>
      ))}
    </nav>
  );
}

export function ArticleStack({ articles }: { articles: any[] }) {
  return (
    <div id="article-stack" className="flex flex-col">
      {articles.length > 0 ? (
        articles.map((article) => (
          <div key={article.id} className="py-16 border-b border-ink/10 last:border-0">
            <ArticleCard article={article} />
          </div>
        ))
      ) : (
        <div className="py-24 text-center">
          <p className="text-[20px] italic opacity-60">No articles found in this category.</p>
        </div>
      )}
    </div>
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
        <div className="mb-6 overflow-hidden rounded-sm bg-clay/5 aspect-[16/7] md:aspect-[21/9]">
          <img 
            src={article.image} 
            alt="" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      <h2 className={`${compact ? 'text-[22px] mb-4' : 'text-[32px] md:text-[42px] mb-6'} font-medium group-hover:text-clay transition-colors text-ink leading-[1.2]`}>
        {article.headline}
      </h2>
      <p className={`${compact ? 'text-[16px] leading-relaxed' : 'text-[22px] md:text-[24px]'} italic text-ink mb-6 line-clamp-3 leading-[1.5] opacity-90`}>
        {article.dek}
      </p>
      <div className="text-[13px] font-mono tracking-widest font-bold opacity-70 text-ink flex items-center gap-2">
        <span>{article.readTimeMin} MIN READ</span>
        {article.writer && (
          <>
            <span className="opacity-30">/</span>
            <span className="uppercase">{article.writer.name}</span>
          </>
        )}
      </div>
    </Link>
  );
}

export function Byline({ writer }: { writer: { name: string, role: string } }) {
  return (
    <div id="byline" className="flex flex-col mb-12 border-l-4 border-clay pl-6">
      <span className="text-clay font-black text-[20px] uppercase tracking-widest">{writer.name}</span>
      <span className="text-[13px] font-bold text-ink uppercase tracking-[0.2em] mt-2 opacity-60">{writer.role}</span>
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
