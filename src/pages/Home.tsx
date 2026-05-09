import { useEffect } from 'react';
import { articles } from '../data/articles';
import { 
  HeroStory, 
  HomeGrid,
  EditorPicks,
  DeskFooter,
  ArticleCard,
  LiveSidebar,
  BreakingNewsTicker
} from '../components/Components';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Home() {
  const heroArticle = articles.find(a => a.isHero);
  const liveArticles = articles.filter(a => a.pulseRank !== null).sort((a, b) => a.pulseRank! - b.pulseRank!);
  const trendingArticles = articles.filter(a => a.desk === 'india' && !a.isHero).slice(0, 3);
  const globalArticles = articles.filter(a => a.desk !== 'india' && !a.isHero).slice(0, 6);
  const editorPicks = articles.filter(a => a.isEditorPick).slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="max-w-[1100px] mx-auto px-6 py-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 mb-20 items-start">
        {heroArticle && <HeroStory article={heroArticle} />}
        <LiveSidebar />
      </div>
      
      <BreakingNewsTicker />
      
      <HomeGrid 
        liveArticles={liveArticles}
        trendingArticles={trendingArticles}
        globalArticles={globalArticles}
      />

      <div className="w-full h-[1px] bg-ink/10 mb-20" />
      
      {editorPicks.length > 0 && (
        <div className="pt-10">
          <EditorPicks articles={editorPicks} />
        </div>
      )}
      
      <DeskFooter />
    </motion.div>
  );
}
