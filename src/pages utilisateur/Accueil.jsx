import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Monitor,
  ShieldCheck,
  PhoneCall,
  Code,
  Database,
  Palette,
  Cpu,
  GraduationCap,
  Globe,
  CheckCircle2,
  Trophy,
  Users,
  Play
} from 'lucide-react';
import { Link } from 'react-router-dom';
import afficheMurale from '../assets/affiche-murale.png';
import arrierePlan from '../assets/arriere-plan.png';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const Accueil = () => {
  // Données des services (plus propre)
  const services = [
    {
      icon: Code,
      title: "Développement Web & Applications",
      desc: "Création de sites web, applications mobiles et desktop sur mesure.",
      color: "blue"
    },
    {
      icon: Cpu,
      title: "Services Techniques & Maintenance IT",
      desc: "Maintenance des ordinateurs, dépannage matériel et logiciel, installation et sécurisation des systèmes.",
      color: "orange"
    },
    {
      icon: Database,
      title: "Solutions Numériques & Gestion",
      desc: "Développement de logiciels de gestion (ERP & CRM), digitalisation des entreprises et écoles.",
      color: "blue"
    },
    {
      icon: Palette,
      title: "Design & Communication Visuelle",
      desc: "Création de logos, affiches, flyers, bannières et supports marketing professionnels.",
      color: "orange"
    },
    {
      icon: GraduationCap,
      title: "Formation en Informatique",
      desc: "Bureautique (Word, Excel, PowerPoint, Access, Outlook), informatique de base et accompagnement.",
      color: "blue"
    },
    {
      icon: Globe,
      title: "Digitalisation & Transformation",
      desc: "Digitalisation des entreprises et établissements scolaires, automatisation des processus.",
      color: "orange"
    }
  ];

  const features = [
    { icon: Monitor, title: "Équipement de Pointe", desc: "Des laboratoires équipés des dernières technologies." },
    { icon: BookOpen, title: "Pédagogie Orientée Pratique", desc: "80% de pratique et 20% de théorie pour une immersion totale." },
    { icon: ShieldCheck, title: "Certifications Reconnues", desc: "Des programmes alignés sur les standards de l'industrie." }
  ];

  const garanties = [
    "Accompagnement personnalisé",
    "Formateurs experts du terrain",
    "Projets réels d'entreprise",
    "Aide à l'insertion professionnelle",
    "Veille technologique continue"
  ];



  const offres = [
    {
      title: "Design, Impression & Communication Visuelle",
      services: [
        "Impression noir & blanc et couleur",
        "Photocopie simple et en volume",
        "Scan, plastification et reliure de documents",
        "Impression de cartes de mariage, invitations et badges",
        "Saisie et mise en forme de documents",
        "Création de logo et identité visuelle",
        "Conception d'affiches, flyers, bannières et supports marketing"
      ]
    },
    {
      title: "Services Techniques",
      services: [
        "Maintenance des ordinateurs",
        "Dépannage matériel et logiciel",
        "Installation et configuration de postes informatiques",
        "Mise à jour et sécurisation des systèmes"
      ]
    },
    {
      title: "Développement & Solutions Numériques",
      services: [
        "Création de sites web et applications (mobile & desktop)",
        "Digitalisation de la gestion scolaire et administrative",
        "Développement de logiciels de gestion sur mesure (ERP & CRM)",
        "Automatisation des processus et gestion de bases de données",
        "Maintenance, sécurité et optimisation des systèmes numériques"
      ]
    },
    {
      title: "Formation & Accompagnement",
      services: [
        "Informatique de base",
        "Bureautique (Word, Excel, PowerPoint, Outlook, Access, Publisher)",
        "Programmation et développement d'applications",
        "Transformation numérique des entreprises et établissements",
        "Digitalisation de la gestion scolaire",
        "Conception de supports pédagogiques numériques"
      ]
    },
    {
      title: "Cours d'Anglais",
      services: [
        "Anglais général (débutant à avancé)",
        "Anglais de communication et conversation"
      ]
    },
    {
      title: "Assistance & Accompagnement Professionnel",
      services: [
        "Accompagnement personnalisé des apprenants",
        "Orientation et conseils professionnels",
        "Suivi des projets et travaux pratiques",
        "Assistance technique continue",
        "Préparation aux stages et à l’emploi",
        "Encadrement par des formateurs qualifiés"
      ]
    }
  ];

  return (
    <div className="bg-white">
      <section className="relative min-h-[100vh] flex items-center bg-gray-950 text-white overflow-hidden">
        {/* Background Image avec meilleure gestion */}
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src={arrierePlan}
            alt="IBK Tech Center - Formation et Solutions Digitales"
            className="w-full h-full object-cover"
          />

          {/* Overlay professionnel multi-couches */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/70 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/30 to-transparent z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(at_center,#00000080_30%,transparent_70%)] z-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full pt-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            {/* Badge */}
            <motion.div
              variants={fadeIn}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-sm font-medium mb-8"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-brand-orange)] animate-pulse"></span>
              Centre d'Excellence Numérique en Guinée
            </motion.div>

            {/* Titre principal */}
            <motion.h1
              variants={fadeIn}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tighter mb-6"
            >
              Maîtrisez le numérique.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-orange)] via-orange-400 to-yellow-300">
                Transformez votre avenir.
              </span>
            </motion.h1>

            {/* Sous-titre */}
            <motion.p
              variants={fadeIn}
              className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-2xl font-light"
            >
              Formations professionnelles • Solutions digitales • Accompagnement sur mesure<br />
              <span className="font-medium text-white">IBK Tech Center - Conakry</span>
            </motion.p>

            {/* Boutons */}
            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-5"
            >
              <Link
                to="/contact"
                className="group px-9 py-5 bg-gradient-to-r from-[var(--color-brand-orange)] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-orange-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                Commencer maintenant
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/formations"
                className="group px-9 py-5 border border-white/30 hover:border-white/50 backdrop-blur-md rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1"
              >
                <Play size={22} className="text-[var(--color-brand-orange)]" />
                Voir nos formations
              </Link>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              variants={fadeIn}
              className="flex items-center gap-8 mt-12 text-sm text-gray-400"
            >
              <div className="flex items-center gap-2">
                <div className="text-green-400">✔</div>
                <span>Formations certifiantes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-green-400">✔</div>
                <span>Accompagnement personnalisé</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-green-400">✔</div>
                <span>Reconnu par l'État</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
        >
          <span className="text-xs tracking-widest text-gray-400">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-400 to-transparent" />
        </motion.div>
      </section>

      {/* === Expertise Section === */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[var(--color-brand-orange)] font-bold tracking-wider uppercase text-sm mb-4 block"
            >
              Nos Domaines d'Expertise
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Solutions Numériques à 360°
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              De la conception à la réalisation, nous vous accompagnons dans chaque étape de votre transformation digitale.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="bg-white p-8 rounded-3xl shadow-lg shadow-gray-200/40 border border-gray-100 transition-all duration-300 group"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${service.color === 'blue'
                    ? 'bg-blue-50 text-[var(--color-brand-blue)] group-hover:bg-[var(--color-brand-blue)] group-hover:text-white'
                    : 'bg-orange-50 text-[var(--color-brand-orange)] group-hover:bg-[var(--color-brand-orange)] group-hover:text-white'
                  }`}>
                  <service.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-[var(--color-brand-blue)] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalogue détaillé de nos offres */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Catalogue détaillé de nos offres
            </h2>
            <div className="w-24 h-1 bg-[var(--color-brand-blue)] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offres.map((offre, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-50 rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-bold text-[var(--color-brand-orange)] mb-6 pb-4 border-b border-gray-200">
                  {offre.title}
                </h3>
                <ul className="space-y-4">
                  {offre.services.map((service, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="text-[var(--color-brand-blue)] flex-shrink-0 mt-1" size={18} />
                      <span className="text-gray-700 font-medium text-sm leading-snug">{service}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Pourquoi nous choisir + Garanties - Version Simplifiée */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[var(--color-brand-orange)] font-bold uppercase tracking-widest text-sm">
              Notre Engagement
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              Pourquoi choisir IBK Tech Center ?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Points forts */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-8 text-gray-800">Ce qui nous distingue</h3>

              <div className="space-y-8">
                {[
                  {
                    icon: Monitor,
                    title: "Formation pratique",
                    desc: "Beaucoup de mise en pratique pour que vous maîtrisiez réellement les outils."
                  },
                  {
                    icon: Users,
                    title: "Accompagnement personnalisé",
                    desc: "Petits groupes et suivi individuel pour progresser à votre rythme."
                  },
                  {
                    icon: Trophy,
                    title: "Formateurs expérimentés",
                    desc: "Des professionnels du terrain qui partagent leur savoir-faire réel."
                  },
                  {
                    icon: Globe,
                    title: "Prix accessibles",
                    desc: "Des formations de qualité à des tarifs adaptés au contexte guinéen."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-5">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 text-[var(--color-brand-orange)] rounded-2xl flex items-center justify-center">
                      <item.icon size={28} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Nos Garanties */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-100"
            >
              <h3 className="text-2xl font-semibold mb-8 text-gray-800">Nos Garanties</h3>

              <ul className="space-y-6">
                {[
                  "Formation basée sur la pratique",
                  "Supports de cours fournis",
                  "Suivi après formation",
                  "Attestation de fin de formation",
                  "Possibilité de payer en plusieurs fois"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="text-green-500 mt-0.5 flex-shrink-0" size={24} />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Badge Reconnaissance */}
              <div className="mt-12 p-6 bg-white rounded-2xl border border-gray-100 flex items-center gap-5 shadow-sm">
                <div className="w-14 h-14 bg-[var(--color-brand-blue)] rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                  <Trophy size={28} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    Centre de formation fiable et professionnel
                  </p>
                  <p className="text-sm text-gray-600">
                    Nous offrons une formation de qualité avec des méthodes modernes, un suivi sérieux et des formateurs expérimentés pour assurer votre réussite.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final - Version Améliorée avec couleurs du logo */}
      <section className="py-24 relative overflow-hidden bg-[#0F172A]">
        {/* Arrière-plan subtil avec dégradé */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] via-[#0F172A] to-[#1E3A8A]" />

        {/* Effet de lumière discret */}
        <div className="absolute inset-0 bg-[radial-gradient(at_center,#F97316_0%,transparent_70%)] opacity-10" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Petite phrase d'accroche */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full mb-6 border border-white/10">
              <span className="text-[#F97316] text-xl">🚀</span>
              <span className="text-blue-100 font-medium">Commencez aujourd'hui</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight tracking-tight">
              Prêt à transformer votre <br />
              <span className="text-[#F97316]">avenir digital ?</span>
            </h2>

            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
              Que ce soit pour une formation, un projet de développement ou des services techniques,
              notre équipe est prête à vous accompagner.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-3 bg-[#F97316] hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl shadow-orange-500/30 hover:-translate-y-1 active:scale-95"
              >
                <PhoneCall size={26} className="group-hover:rotate-12 transition" />
                Contactez-nous maintenant
              </Link>

              <Link
                to="/formations"
                className="inline-flex items-center justify-center gap-3 border-2 border-white/60 hover:border-white text-white hover:bg-white/10 px-8 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm"
              >
                Voir nos formations
                <BookOpen size={24} />
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-blue-200">

              <div className="flex flex-col items-start w-full sm:w-[45%] lg:w-[30%]">
                <div className="flex items-center gap-2 font-semibold text-white">
                  <CheckCircle2 size={18} className="text-[#F97316]" />
                  <span>Formation</span>
                </div>
                <p className="mt-1 text-blue-200">
                  Développez des compétences solides pour réussir dans le monde professionnel.
                </p>
              </div>

              <div className="flex flex-col items-start w-full sm:w-[45%] lg:w-[30%]">
                <div className="flex items-center gap-2 font-semibold text-white">
                  <CheckCircle2 size={18} className="text-[#F97316]" />
                  <span>Innovation</span>
                </div>
                <p className="mt-1 text-blue-200">
                  Des solutions modernes et efficaces adaptées aux besoins d’aujourd’hui.
                </p>
              </div>

              <div className="flex flex-col items-start w-full sm:w-[45%] lg:w-[30%]">
                <div className="flex items-center gap-2 font-semibold text-white">
                  <CheckCircle2 size={18} className="text-[#F97316]" />
                  <span>Compétence</span>
                </div>
                <p className="mt-1 text-blue-200">
                  Une expertise professionnelle au service de votre réussite.
                </p>
              </div>


            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Accueil;