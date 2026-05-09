import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { articles } from '../data/articles';
import { 
  DeskHeader, 
  TopicPills, 
  ArticleStack,
  DeskFooter 
} from '../components/Components';
import { motion } from 'motion/react';

export default function Desk() {
  const { slug, topic } = useParams();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug, topic]);

  // Normalize slug to match field values
  const normalizedSlug = slug?.replace(/-/g, ' ');

  const deskArticles = articles.filter(a => {
    const regionMatch = 
      a.desk?.toLowerCase() === slug?.toLowerCase() ||
      a.region?.toLowerCase() === normalizedSlug?.toLowerCase() ||
      a.subRegion?.toLowerCase() === normalizedSlug?.toLowerCase() ||
      a.country?.toLowerCase() === normalizedSlug?.toLowerCase();
    
    const topicMatch = topic ? a.topic?.toLowerCase() === topic.toLowerCase() : true;
    
    return regionMatch && topicMatch && !a.isHero && a.pulseRank === null;
  });

  const title = topic 
    ? `${normalizedSlug?.charAt(0).toUpperCase()}${normalizedSlug?.slice(1)}: ${topic.charAt(0).toUpperCase()}${topic.slice(1)}`
    : (normalizedSlug ? normalizedSlug.charAt(0).toUpperCase() + normalizedSlug.slice(1) : 'Desk');

  if (deskArticles.length === 0 && slug !== 'india') {
    return (
      <div className="max-w-[1100px] mx-auto px-6 py-32 text-center">
        <h1 className="text-[32px] md:text-[48px] leading-[1.2] font-medium mb-6 uppercase tracking-tight text-ink">Desk Under Construction</h1>
        <p className="text-[20px] leading-[1.7] opacity-60 mb-12 max-w-[600px] mx-auto text-ink">
          The {title} desk is currently being populated by our regional bureaus. Please check back shortly for live reporting.
        </p>
        <Link to="/" className="text-[14px] font-black uppercase tracking-widest text-clay hover:underline">Return to Home</Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="max-w-[1100px] mx-auto px-6 py-12"
    >
      <DeskHeader title={title} />
      <TopicPills />
      <ArticleStack articles={deskArticles} />
      <DeskFooter />
    </motion.div>
  );
}
