import { motion } from 'framer-motion';

const Actualites = () => {
  const articles = [
    {
      title: "Lancement de notre nouvelle formation en Développement Web",
      date: "15 Mai 2026",
      category: "Formation",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80",
      excerpt: "Découvrez notre nouveau programme intensif de 4 mois pour devenir développeur web full-stack."
    },
    {
      title: "Partenariat avec le Groupe Scolaire Excellence",
      date: "02 Avril 2026",
      category: "Écoles",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80",
      excerpt: "IBK TECH CENTER déploie sa solution de gestion scolaire dans l'un des plus grands établissements de la ville."
    },
    {
      title: "Séminaire Gratuit : Les enjeux de la Cybersécurité",
      date: "20 Mars 2026",
      category: "Événement",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
      excerpt: "Rejoignez-nous pour une demi-journée de sensibilisation sur la sécurité de vos données en entreprise."
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Actualités</h1>
          <div className="w-24 h-1 bg-[var(--color-brand-orange)] mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Restez informés des dernières nouveautés, événements et annonces d'IBK TECH CENTER.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-[var(--color-brand-blue)] text-white text-xs font-bold px-3 py-1 rounded-full">
                  {article.category}
                </span>
              </div>
              <div className="p-6">
                <span className="text-sm text-gray-500 mb-2 block">{article.date}</span>
                <h3 className="text-xl font-bold mb-3 line-clamp-2">{article.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                <button className="text-[var(--color-brand-orange)] font-bold hover:text-[var(--color-brand-orange-dark)] transition-colors">
                  Lire la suite →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Actualites;
