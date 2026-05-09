import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { articles } from '../data/articles';
import { 
  Byline, 
  Dateline, 
  DeskFooter 
} from '../components/Components';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

export default function Article() {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="max-w-[1100px] mx-auto px-6 py-24 text-center">
        <h1 className="text-h2 font-medium mb-4">Article Not Found</h1>
        <Link to="/" className="text-clay underline">Return Home</Link>
      </div>
    );
  }

  const relatedArticles = articles
    .filter(a => a.id !== article.id && a.body !== "")
    .slice(0, 2);

  const formattedUpdate = new Date(article.lastUpdated).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kolkata'
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="max-w-[1100px] mx-auto px-6 pt-8"
    >
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-12 text-caption uppercase tracking-widest opacity-60">
        <Link to={`/desk/${article.desk}`} className="hover:text-clay transition-colors">{article.desk.replace('-', ' ')}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-clay font-medium">{article.topic}</span>
      </nav>

      <main className="max-w-[720px] mx-auto">
        <article>
          <h1 className="text-[54px] md:text-[64px] leading-[1.05] font-medium mb-8 leading-tight text-ink tracking-tight">
            {article.headline}
          </h1>
          <p className="text-[24px] md:text-[28px] leading-[1.4] italic text-ink mb-12">
            {article.dek}
          </p>

          {article.image && (
            <div className="mb-12 overflow-hidden rounded-sm bg-clay/5 aspect-[16/9] md:aspect-[21/9] border border-ink/10">
              <img 
                src={article.image} 
                alt="" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
          
          <Dateline filed={article.filed} />
          <Byline writer={article.writer} />
          
          <div className="text-[14px] leading-[1.4] text-ink font-mono mb-12 border-b-2 border-clay/10 pb-6 font-bold uppercase tracking-widest">
            Update {formattedUpdate} IST <span className="mx-4 opacity-30">/</span> {article.readTimeMin} min read
          </div>

          <div className="markdown-body">
            {article.body ? (
              <ReactMarkdown>{article.body}</ReactMarkdown>
            ) : (
              <p className="text-[20px] leading-[1.7] italic opacity-70 border-l-4 border-clay/20 pl-6 text-ink">This update is a brief pulse report. Full coverage to follow as the situation develops.</p>
            )}
          </div>
        </article>

        <section id="read-next" className="mt-32 pt-16 border-t-4 border-ink">
          <h4 className="text-[14px] leading-[1.4] uppercase tracking-[0.3em] font-black mb-12 text-ink">Read Next</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {relatedArticles.map(rel => (
              <Link key={rel.id} to={`/article/${rel.slug}`} className="group block">
                <h5 className="text-[22px] leading-[1.4] font-medium mb-4 group-hover:text-clay transition-colors line-clamp-3 text-ink">
                  {rel.headline}
                </h5>
                <span className="text-[12px] font-black uppercase tracking-widest text-clay">{rel.desk.replace('-', ' ')}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <DeskFooter />
    </motion.div>
  );
}
