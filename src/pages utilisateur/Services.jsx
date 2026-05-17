import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Wrench, Network, Code, Palette, GraduationCap, ShieldCheck,
  Globe, Laptop, BookOpenCheck, School, Printer, Megaphone,
  ArrowRight, Printer as PrintIcon, Copy, ScanLine, Layers,
  FileText, FileEdit, UserSquare, PenTool, Image, Monitor,
  Package, Settings, Code2, Building2, BookOpen, ChevronDown
} from 'lucide-react';

// ─── Données : catégories de services ────────────────────────────────────────
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
      "Cours d'anglais et communication",
      "Accompagnement pratique des apprenants",
    ],
  },
  {
    title: "Services techniques",
    desc: "Installation, maintenance et dépannage de vos équipements informatiques.",
    icon: <Wrench size={32} />,
    items: [
      "Maintenance des ordinateurs",
      "Dépannage matériel et logiciel",
      "Installation de logiciels",
      "Configuration de postes informatiques",
      "Mise à jour et optimisation des systèmes",
      "Assistance technique",
    ],
  },
  {
    title: "Développement & solutions numériques",
    desc: "Nous créons des solutions modernes adaptées aux besoins des particuliers et entreprises.",
    icon: <Code size={32} />,
    items: [
      "Création de sites web",
      "Développement d'applications",
      "Conception de logiciels de gestion",
      "Digitalisation des services",
      "Gestion de bases de données",
      "Maintenance et sécurisation des applications",
    ],
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
      "Impression et mise en forme de documents",
    ],
  },
];

const schoolServices = [
  { title: "Création de sites web scolaires", desc: "Vitrine en ligne pour votre établissement, portail pour parents et élèves.", icon: <Globe size={32} /> },
  { title: "Digitalisation de la gestion scolaire", desc: "Gestion complète des notes, inscriptions, emplois du temps et scolarité.", icon: <Laptop size={32} /> },
  { title: "Supports pédagogiques numériques", desc: "Conception de ressources interactives pour faciliter l'apprentissage.", icon: <BookOpenCheck size={32} /> },
  { title: "Logiciels éducatifs", desc: "Installation et configuration d'outils numériques pour les salles de classe.", icon: <School size={32} /> },
  { title: "Design et impression", desc: "Création et impression de documents scolaires, bulletins, badges et brochures.", icon: <Printer size={32} /> },
  { title: "Communication & visibilité des écoles", desc: "Mise en place de supports et stratégies de communication pour promouvoir les établissements.", icon: <Megaphone size={32} /> },
];

// ─── Tarifs ───────────────────────────────────────────────────────────────────
const pricingGroups = [
  {
    id: 'impression',
    label: 'Impression & Copie',
    icon: <PrintIcon size={20} />,
    color: 'blue',
    services: [
      { name: 'Impression Noir & Blanc', tarif: '2 000 GNF', fixed: true },
      { name: 'Impression Couleur', tarif: '4 000 GNF', fixed: true },
      { name: 'Photocopie Couleur', tarif: '2 000 GNF', fixed: true },
      { name: 'Photocopie Noir & Blanc', tarif: '1 000 GNF', fixed: true },
      { name: 'Scan de document', tarif: '3 000 GNF', fixed: true },
      { name: 'Plastification', tarif: '5 000 GNF', fixed: true },
      { name: 'Reliure de documents', tarif: '5 000 GNF', fixed: true },
    ],
  },
  {
    id: 'bureautique',
    label: 'Bureautique & Rédaction',
    icon: <FileText size={20} />,
    color: 'orange',
    services: [
      { name: 'Saisie de documents', tarif: 'À partir de 10 000 GNF/page', fixed: false },
      { name: 'Mise en forme de documents', tarif: 'À partir de 5 000 GNF/page', fixed: false },
      { name: 'Rédaction et impression d\'exposés', tarif: '50 000 GNF (1 à 10 pages)', fixed: false },
      { name: 'Création de CV Professionnel', tarif: '50 000 GNF', fixed: true },
    ],
  },
  {
    id: 'design',
    label: 'Design & Graphisme',
    icon: <PenTool size={20} />,
    color: 'violet',
    services: [
      { name: 'Création de logo', tarif: 'À partir de 80 000 GNF', fixed: false },
      { name: 'Conception d\'affiches & flyers', tarif: 'Coût selon la quantité', fixed: false },
      { name: 'Création de badges & invitations', tarif: 'Coût selon la quantité', fixed: false },
    ],
  },
  {
    id: 'technique',
    label: 'Services Techniques',
    icon: <Settings size={20} />,
    color: 'emerald',
    services: [
      { name: 'Installation Windows', tarif: '150 000 GNF + activation', fixed: false },
      { name: 'Installation Pack Office', tarif: '100 000 GNF + activation', fixed: false },
    ],
  },
  {
    id: 'numerique',
    label: 'Solutions Numériques',
    icon: <Code2 size={20} />,
    color: 'indigo',
    services: [
      { name: 'Création de site web', tarif: 'En fonction des besoins', fixed: false },
      { name: 'Développement d\'application', tarif: 'En fonction des besoins', fixed: false },
      { name: 'Digitalisation de gestion scolaire', tarif: 'En fonction des besoins', fixed: false },
      { name: 'Mise en place d\'outils de gestion', tarif: 'En fonction des besoins', fixed: false },
      { name: 'Développement de solutions numériques', tarif: 'En fonction des besoins', fixed: false },
    ],
  },
];

// ─── Couleurs par groupe ──────────────────────────────────────────────────────
const colorMap = {
  blue:    { bg: 'bg-blue-50',    text: 'text-blue-700',    badge: 'bg-blue-100 text-blue-700',    dot: 'bg-blue-500',    border: 'border-blue-200'   },
  orange:  { bg: 'bg-orange-50',  text: 'text-orange-700',  badge: 'bg-orange-100 text-orange-700',  dot: 'bg-orange-500',  border: 'border-orange-200' },
  violet:  { bg: 'bg-violet-50',  text: 'text-violet-700',  badge: 'bg-violet-100 text-violet-700',  dot: 'bg-violet-500',  border: 'border-violet-200' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500', border: 'border-emerald-200'},
  indigo:  { bg: 'bg-indigo-50',  text: 'text-indigo-700',  badge: 'bg-indigo-100 text-indigo-700',  dot: 'bg-indigo-500',  border: 'border-indigo-200' },
};

// ─── Composant accordéon tarif ────────────────────────────────────────────────
const PricingGroup = ({ group, index }) => {
  const [open, setOpen] = useState(index === 0);
  const c = colorMap[group.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`rounded-2xl border ${c.border} overflow-hidden`}
    >
      {/* En-tête accordéon */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between px-6 py-4 ${c.bg} transition-all`}
      >
        <div className="flex items-center gap-3">
          <span className={`${c.text}`}>{group.icon}</span>
          <span className={`font-bold text-gray-900 text-base`}>{group.label}</span>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${c.badge}`}>
            {group.services.length} service{group.services.length > 1 ? 's' : ''}
          </span>
        </div>
        <ChevronDown size={18} className={`text-gray-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Contenu */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="divide-y divide-gray-100 bg-white">
              {group.services.map((svc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition group"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${c.dot} flex-shrink-0`} />
                    <span className="text-gray-800 font-medium text-sm">{svc.name}</span>
                  </div>
                  <span className={`text-sm font-bold whitespace-nowrap ml-4 ${svc.fixed ? 'text-emerald-700' : 'text-gray-500 italic'}`}>
                    {svc.tarif}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Page principale ──────────────────────────────────────────────────────────
const Services = () => {
  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HEADER ── */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-[var(--color-brand-orange)] font-semibold text-sm mb-5">
            IBK TECH CENTER
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Nos Services</h1>
          <div className="w-24 h-1 bg-[var(--color-brand-orange)] mx-auto mb-8 rounded-full" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            IBK TECH CENTER vous accompagne avec des formations professionnelles,
            des services techniques et des solutions numériques modernes adaptées
            aux besoins des particuliers, étudiants, entreprises et établissements.
          </p>
        </div>

        {/* ── CATÉGORIES ── */}
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
                  <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">{category.desc}</p>
                </div>
              </div>
              <ul className="space-y-4 mt-4 grow">
                {category.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-orange-100 text-[var(--color-brand-orange)] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* ── SECTION TARIFS ── */}
        <div className="mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-5">
              Tarifs indicatifs
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Tarifs</h2>
            <div className="w-20 h-1 bg-[var(--color-brand-blue)] mx-auto mb-6 rounded-full" />
            <p className="text-gray-500 max-w-2xl mx-auto">
              Consultez nos tarifs par catégorie. Pour les services sur devis, contactez-nous pour un accompagnement personnalisé.
            </p>
          </motion.div>

          {/* Légende */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              Tarif fixe
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-3 h-3 rounded-full bg-gray-400 inline-block" />
              Tarif variable / sur devis
            </div>
          </div>

          {/* Grille accordéons */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Colonne gauche */}
            <div className="space-y-4">
              {pricingGroups.filter((_, i) => i % 2 === 0).map((group, idx) => (
                <PricingGroup key={group.id} group={group} index={idx} />
              ))}
            </div>
            {/* Colonne droite */}
            <div className="space-y-4">
              {pricingGroups.filter((_, i) => i % 2 !== 0).map((group, idx) => (
                <PricingGroup key={group.id} group={group} index={idx} />
              ))}
            </div>
          </div>

          {/* Bannière devis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-white"
          >
            <div>
              <p className="font-bold text-lg mb-1">Besoin d'un devis personnalisé ?</p>
              <p className="text-blue-200 text-sm">Pour les projets sur mesure, contactez notre équipe.</p>
            </div>
            <Link
              to="/contact"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-7 py-3.5 rounded-2xl hover:bg-blue-50 transition"
            >
              Nous contacter <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>

        {/* ── SERVICES ÉCOLES ── */}
        <div className="mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Services pour Écoles & Établissements
            </h2>
            <div className="w-24 h-1 bg-[var(--color-brand-orange)] mx-auto mb-8 rounded-full" />
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
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-[var(--color-brand-orange)] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── FOOTER CTA ── */}
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