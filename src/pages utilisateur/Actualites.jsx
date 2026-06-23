import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const Actualites = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/actualites');
        if (res.ok) {
          const data = await res.json();
          setArticles(data.map(a => {
            const parts = (a.description || '').split('\n---\n');
            return {
              id: a.id,
              title: a.nom,
              date: a.created_at ? new Date(a.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '',
              excerpt: parts[0] || '',
              content: parts[1] || parts[0] || '',
              image: a.image || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80',
            };
          }));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Actualités</h1>
          <div className="w-24 h-1 bg-[var(--color-brand-orange)] mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Restez informés des dernières nouveautés, événements et annonces d'IBK TECH CENTER.
          </p>
        </div>

        {loading && (
          <p className="text-center text-gray-500 py-20">Chargement des actualités...</p>
        )}

        {!loading && articles.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <p className="text-gray-500">Aucune actualité pour le moment.</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={article.image.startsWith('/') ? article.image : article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="text-sm text-gray-500 mb-2 block">{article.date}</span>
                <h3 className="text-xl font-bold mb-3 line-clamp-2">{article.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="mt-2 w-full py-2.5 rounded-xl border-2 border-gray-100 text-[var(--color-brand-blue)] font-semibold hover:bg-blue-50 hover:border-blue-100 transition"
                >
                  Lire la suite
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Détail Actualité */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedArticle(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="h-56 md:h-80 relative shrink-0">
                <img
                  src={selectedArticle.image.startsWith('/') ? selectedArticle.image : selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 md:p-10 overflow-y-auto">
                <span className="text-sm font-semibold text-[var(--color-brand-orange)] uppercase tracking-wider mb-3 block">
                  Publié le {selectedArticle.date}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 leading-tight">
                  {selectedArticle.title}
                </h2>
                
                <div className="prose prose-lg max-w-none text-gray-600">
                  <p className="font-medium text-xl leading-relaxed mb-6 text-gray-700">
                    {selectedArticle.excerpt}
                  </p>
                  {selectedArticle.content && selectedArticle.content !== selectedArticle.excerpt && (
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {selectedArticle.content}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Actualites;
