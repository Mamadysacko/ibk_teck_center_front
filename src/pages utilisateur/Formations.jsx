import { motion } from 'framer-motion';
import { Monitor, FileSpreadsheet, Code2, GraduationCap, Link as LinkIcon, Users, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Formations = () => {
  const courses = [
    {
      title: "Informatique de base",
      duration: "Initiation",
      desc: "Maîtrisez l'utilisation de l'outil informatique et l'environnement numérique.",
      icon: <Monitor size={24} />
    },
    {
      title: "Bureautique",
      duration: "Essentiel",
      desc: "Word, Excel, PowerPoint, Outlook, Access, Publisher.",
      icon: <FileSpreadsheet size={24} />
    },
    {
      title: "Programmation et développement",
      duration: "Avancé",
      desc: "Développement web, mobile et desktop.",
      icon: <Code2 size={24} />
    },
    {
      title: "Transformation numérique",
      duration: "Professionnel",
      desc: "Transformation numérique des entreprises et établissements.",
      icon: <Users size={24} />
    },
    {
      title: "Accompagnement pédagogique",
      duration: "Éducatif",
      desc: "Formation et accompagnement des enseignants aux outils numériques.",
      icon: <BookOpen size={24} />
    }
  ];

  const englishCourses = [
    "Anglais général (débutant à avancé)",
    "Anglais de communication et conversation",
    "Anglais scolaire et préparation aux examens (BEPC, BAC)"
  ];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Nos Formations</h1>
        <div className="w-24 h-1 bg-[var(--color-brand-orange)] mx-auto mb-8"></div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Développez vos compétences avec nos programmes de formation pratiques, adaptés aux particuliers, écoles et entreprises.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {courses.map((course, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="bg-[var(--color-brand-blue)] w-full md:w-40 flex flex-col items-center justify-center p-6 text-white shrink-0">
              {course.icon}
              <span className="mt-2 font-bold text-center text-sm">{course.duration}</span>
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center grow">
              <h3 className="text-xl font-bold mb-3">{course.title}</h3>
              <p className="text-gray-600 mb-6">{course.desc}</p>
              <Link to="/contact" className="inline-flex items-center gap-2 text-[var(--color-brand-orange)] font-bold hover:text-[var(--color-brand-orange-dark)] transition-colors mt-auto">
                S'inscrire <LinkIcon size={18} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-center"
      >
        <div className="w-16 h-16 bg-blue-50 text-[var(--color-brand-blue)] rounded-full flex items-center justify-center mx-auto mb-6">
          <GraduationCap size={32} />
        </div>
        <h2 className="text-3xl font-bold mb-8">Cours d'Anglais</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {englishCourses.map((course, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <p className="text-gray-800 font-medium">{course}</p>
            </div>
          ))}
        </div>
        <Link to="/contact" className="inline-flex items-center gap-2 bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-dark)] text-white font-bold py-3 px-8 rounded-xl transition-colors mt-10">
          S'inscrire aux cours d'anglais
        </Link>
      </motion.div>
    </div>
  );
};

export default Formations;
