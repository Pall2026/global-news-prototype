import { useParams, Link } from 'react-router-dom';
import { articles } from '../data/articles';
import { 
  DeskHeader, 
  ArticleStack, 
  DeskFooter 
} from '../components/Components';
import { motion } from 'motion/react';
import { useEffect } from 'react';

export default function Topic() {
  const { topic } = useParams();
  const topicLabel = topic ? topic.charAt(0).toUpperCase() + topic.slice(1) : '';
  
  const topicArticles = articles.filter(a => 
    a.topic.toLowerCase() === topic?.toLowerCase()
  ).sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [topic]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="max-w-[1100px] mx-auto px-6 py-12"
    >
      <div className="mb-12">
        <Link to="/" className="text-[11px] font-black uppercase tracking-widest text-clay hover:opacity-70 transition-opacity mb-4 block">
          ← Back to Global Lens
        </Link>
        <DeskHeader title={topicLabel} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8">
          <ArticleStack articles={topicArticles} />
        </div>
        <div className="lg:col-span-4 lg:border-l lg:border-ink/5 lg:pl-12">
          <div className="sticky top-24">
            <h3 className="text-[14px] font-black uppercase tracking-widest mb-8 text-ink/40">Global Pulse</h3>
            <div className="flex flex-col gap-6">
              {topicArticles.slice(0, 5).map(article => (
                <Link key={article.id} to={`/article/${article.slug}`} className="group block">
                   <div className="text-[10px] font-black uppercase text-clay mb-1">{article.country || article.region}</div>
                   <h4 className="text-[16px] font-medium group-hover:text-clay transition-colors line-clamp-2">{article.headline}</h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <DeskFooter />
    </motion.div>
  );
}
