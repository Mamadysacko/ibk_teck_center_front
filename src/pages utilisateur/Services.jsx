import { motion } from 'framer-motion';
import {
  Wrench,
  Network,
  Code,
  Palette,
  GraduationCap,
  ShieldCheck,
  Globe,
  Laptop,
  BookOpenCheck,
  School,
  Printer,
  Megaphone
} from 'lucide-react';

const Services = () => {
  const serviceCategories = [
    {
      title: "Formation informatique",
      desc: "Des formations pratiques et professionnelles pour développer vos compétences numériques.",
      icon: <GraduationCap size={32} />,
      items: [
        "Informatique de base",
        "Microsoft Word, Excel et PowerPoint",
        "Programmation et développement web",
        "Initiation aux outils numériques",
        "Cours d’anglais et communication",
        "Accompagnement pratique des apprenants"
      ]
    },

    {
      title: "Services techniques",
      desc: "Nous assurons l’installation, la maintenance et le dépannage de vos équipements informatiques.",
      icon: <Wrench size={32} />,
      items: [
        "Maintenance des ordinateurs",
        "Dépannage matériel et logiciel",
        "Installation de logiciels",
        "Configuration de postes informatiques",
        "Mise à jour et optimisation des systèmes",
        "Assistance technique"
      ]
    },

    {
      title: "Développement & solutions numériques",
      desc: "Nous créons des solutions modernes adaptées aux besoins des particuliers et entreprises.",
      icon: <Code size={32} />,
      items: [
        "Création de sites web",
        "Développement d’applications",
        "Conception de logiciels de gestion",
        "Digitalisation des services",
        "Gestion de bases de données",
        "Maintenance et sécurisation des applications"
      ]
    },


    {
      title: "Design & communication visuelle",
      desc: "Nous valorisons votre image avec des créations graphiques modernes et professionnelles.",
      icon: <Palette size={32} />,
      items: [
        "Création de logos",
        "Affiches et flyers",
        "Bannières publicitaires",
        "Supports marketing",
        "Cartes de visite",
        "Impression et mise en forme de documents"
      ]
    },


    
  ];

  const schoolServices = [
    {
      title: "Création de sites web scolaires",
      desc: "Vitrine en ligne pour votre établissement, portail pour parents et élèves.",
      icon: <Globe size={32} />
    },
    {
      title: "Digitalisation de la gestion scolaire",
      desc: "Gestion complète des notes, inscriptions, emplois du temps et scolarité.",
      icon: <Laptop size={32} />
    },
    {
      title: "Supports pédagogiques numériques",
      desc: "Conception de ressources interactives pour faciliter l'apprentissage.",
      icon: <BookOpenCheck size={32} />
    },
    {
      title: "Logiciels éducatifs",
      desc: "Installation et configuration d'outils numériques pour les salles de classe.",
      icon: <School size={32} />
    },
    {
      title: "Design et impression",
      desc: "Création et impression de documents scolaires, bulletins, badges et brochures.",
      icon: <Printer size={32} />
    },
          
    {
      title: "Communication & visibilité des écoles",
      desc: "Mise en place de supports et stratégies de communication pour promouvoir les établissements scolaires.",
      icon: <Megaphone size={32} />
    }

  ];

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-[var(--color-brand-orange)] font-semibold text-sm mb-5">
            IBK TECH CENTER
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nos Services
          </h1>

          <div className="w-24 h-1 bg-[var(--color-brand-orange)] mx-auto mb-8 rounded-full"></div>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            IBK TECH CENTER vous accompagne avec des formations professionnelles,
            des services techniques et des solutions numériques modernes adaptées
            aux besoins des particuliers, étudiants, entreprises et établissements.
          </p>
        </div>

        {/* SERVICES */}
        <div className="grid lg:grid-cols-2 gap-8">
          {serviceCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="flex items-start gap-5 mb-6">
                <div className="text-[var(--color-brand-blue)] bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0">
                  {category.icon}
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {category.title}
                  </h3>

                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                    {category.desc}
                  </p>
                </div>
              </div>

              <ul className="space-y-4 mt-4 grow">
                {category.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-orange-100 text-[var(--color-brand-orange)] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      ✓
                    </span>

                    <span className="text-gray-700 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* ECOLES SECTION */}
        <div className="mt-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Services pour Écoles & Établissements</h2>
            <div className="w-24 h-1 bg-[var(--color-brand-orange)] mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous accompagnons la modernisation du système éducatif avec des solutions adaptées à vos besoins pédagogiques et administratifs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {schoolServices.map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-white rounded-3xl border border-gray-100 hover:shadow-lg transition-all shadow-sm flex flex-col items-center text-center group"
              >
                <div className="bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-[var(--color-brand-blue)] group-hover:bg-[var(--color-brand-blue)] group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-[var(--color-brand-orange)] transition-colors">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FOOTER SECTION */}
        <div className="mt-20 text-center bg-[var(--color-brand-blue)] text-white rounded-3xl p-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">
            La technologie au service de votre réussite
          </h2>

          <p className="max-w-3xl mx-auto text-lg text-blue-100 leading-relaxed">
            Nous mettons notre expertise, notre professionnalisme et notre passion
            du numérique au service de votre formation, de votre entreprise et
            de vos projets technologiques.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Services;