import { motion } from 'framer-motion';
import { Monitor, FileSpreadsheet, Code2, Users, BookOpen, Clock, DollarSign, GraduationCap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Formations = () => {
  const formations = [
    {
      id: 'info-base',
      title: "Informatique de Base + Windows",
      duration: "1 mois",
      tarif: "170 000 GNF / mois",
      icon: <Monitor size={28} />,
      category: "Bureautique"
    },
    {
      id: 'word-deb',
      title: "Word Débutant – Intermédiaire",
      duration: "2 mois",
      tarif: "250 000 GNF / mois",
      icon: <FileSpreadsheet size={28} />,
      category: "Bureautique"
    },
    {
      id: 'excel-deb',
      title: "Excel Débutant – Intermédiaire",
      duration: "2 mois",
      tarif: "300 000 GNF / mois",
      icon: <FileSpreadsheet size={28} />,
      category: "Bureautique"
    },
    {
      id: 'excel-avance',
      title: "Excel Avancé",
      duration: "1 mois",
      tarif: "500 000 GNF / mois",
      icon: <FileSpreadsheet size={28} />,
      category: "Bureautique"
    },
    {
      id: 'ppt',
      title: "PowerPoint Professionnel",
      duration: "1 mois",
      tarif: "200 000 GNF / mois",
      icon: <FileSpreadsheet size={28} />,
      category: "Bureautique"
    },
    {
      id: 'outlook-deb',
      title: "Outlook Débutant – Intermédiaire",
      duration: "2 mois",
      tarif: "400 000 GNF / mois",
      icon: <FileSpreadsheet size={28} />,
      category: "Bureautique"
    },
    {
      id: 'outlook-avance',
      title: "Outlook Avancé",
      duration: "1 mois",
      tarif: "500 000 GNF / mois",
      icon: <FileSpreadsheet size={28} />,
      category: "Bureautique"
    },
    {
      id: 'access-deb',
      title: "Access Débutant – Intermédiaire (MERISE & Base de données)",
      duration: "2 mois + 2 semaines",
      tarif: "700 000 GNF / mois",
      icon: <FileSpreadsheet size={28} />,
      category: "Bureautique"
    },
    {
      id: 'access-avance',
      title: "Access Avancé",
      duration: "1 mois",
      tarif: "500 000 GNF / mois",
      icon: <FileSpreadsheet size={28} />,
      category: "Bureautique"
    },
    {
      id: 'internet',
      title: "Internet & Recherche Professionnelle",
      duration: "1 mois",
      tarif: "150 000 GNF / mois",
      icon: <Monitor size={28} />,
      category: "Bureautique"
    },
    {
      id: 'publisher',
      title: "Publisher",
      duration: "2 mois",
      tarif: "200 000 GNF",
      icon: <FileSpreadsheet size={28} />,
      category: "Bureautique"
    },
    {
      id: 'canva',
      title: "Canva Professionnel",
      duration: "1 mois",
      tarif: "350 000 GNF / mois",
      icon: <FileSpreadsheet size={28} />,
      category: "Design"
    },
    {
      id: 'photoshop',
      title: "Photoshop Professionnel",
      duration: "1 mois + 1 semaine",
      tarif: "450 000 GNF / mois",
      icon: <FileSpreadsheet size={28} />,
      category: "Design"
    }
  ];

  const englishCourses = [
    { id: 'anglais-deb', level: "Anglais Débutant", duration: "3 mois", tarif: "300 000 GNF / mois" },
    { id: 'anglais-inter', level: "Anglais Intermédiaire", duration: "3 mois", tarif: "350 000 GNF / mois" },
    { id: 'anglais-avance', level: "Anglais Avancé", duration: "3 mois", tarif: "400 000 GNF / mois" },
  ];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Nos Formations
        </h1>
        <div className="w-24 h-1 bg-[var(--color-brand-orange)] mx-auto mb-8"></div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Des formations pratiques et professionnelles adaptées aux besoins des particuliers, 
          des entreprises et des établissements scolaires.
        </p>
      </div>

      {/* Informatique & Bureautique Section */}
      <div className="mb-20">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-[var(--color-brand-blue)] text-white rounded-2xl flex items-center justify-center">
            <Monitor size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Informatique & Bureautique</h2>
            <p className="text-gray-600">Maîtrisez les outils numériques essentiels et avancés</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-8 py-5 text-left font-semibold text-gray-700">Formation</th>
                  <th className="px-6 py-5 text-left font-semibold text-gray-700">Durée</th>
                  <th className="px-6 py-5 text-left font-semibold text-gray-700">Tarif</th>
                  <th className="px-8 py-5 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {formations.map((formation, idx) => (
                  <motion.tr 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.03 }}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-start gap-4">
                        <div className="mt-0.5 text-[var(--color-brand-blue)]">
                          {formation.icon}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-lg leading-tight">
                            {formation.title}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock size={18} />
                        {formation.duration}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2 font-semibold text-emerald-700">
                        <DollarSign size={18} />
                        {formation.tarif}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <Link 
                        to={`/inscription?formation=${formation.id}`}
                        className="inline-flex items-center gap-2 bg-[var(--color-brand-orange)] hover:bg-[var(--color-brand-orange-dark)] text-white font-medium px-6 py-3 rounded-2xl transition-all group-hover:gap-3"
                      >
                        S'inscrire
                        <ArrowRight size={18} />
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Cours d'Anglais Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-sm border border-gray-100 p-10 md:p-16"
      >
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/3 text-center md:text-left">
            <div className="w-20 h-20 bg-white shadow-md rounded-3xl flex items-center justify-center mx-auto md:mx-0 mb-6">
              <GraduationCap size={48} className="text-[var(--color-brand-blue)]" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Cours d'Anglais</h2>
            <p className="text-gray-600 text-lg">
              Améliorez votre maîtrise de l'anglais avec des programmes adaptés à tous les niveaux.
            </p>
          </div>

          <div className="md:w-2/3 grid md:grid-cols-3 gap-6">
            {englishCourses.map((course, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-[var(--color-brand-blue)] transition-all hover:shadow-md group"
              >
                <div className="text-sm uppercase tracking-widest text-[var(--color-brand-blue)] font-semibold mb-3">
                  Niveau {idx + 1}
                </div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">{course.level}</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-500">Durée</span>
                    <span className="font-semibold">{course.duration}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-500">Tarif mensuel</span>
                    <span className="font-bold text-emerald-700">{course.tarif}</span>
                  </div>
                </div>

                <Link 
                  to={`/inscription?formation=${course.id}`}
                  className="block w-full text-center bg-gray-900 hover:bg-black text-white font-semibold py-4 rounded-2xl transition-all group-hover:scale-[1.02]"
                >
                  S'inscrire
                </Link>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <p className="text-gray-600 mb-6 text-lg">
          Vous souhaitez une formation sur mesure pour votre entreprise ou votre établissement ?
        </p>
        <Link 
          to="/contact" 
          className="inline-flex items-center gap-3 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all"
        >
          Demander un devis personnalisé
          <ArrowRight size={24} />
        </Link>
      </div>
    </div>
  );
};

export default Formations;