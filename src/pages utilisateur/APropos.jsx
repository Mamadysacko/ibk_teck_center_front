import { motion } from 'framer-motion';
import { 
  Target, 
  Eye, 
  Lightbulb, 
  CheckCircle2, 
  Users, 
  GraduationCap, 
  Code, 
  Wrench, 
  Palette, 
  Languages, 
  Handshake, 
  MapPin, 
  Phone, 
  Mail,
  Monitor
} from 'lucide-react';
import { Link } from 'react-router-dom';
import afficheMurale from '../assets/affiche-murale.png';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const APropos = () => {
  const team = [
    {
      name: "MAMADY SACKO",
      role: "Fondateur & Directeur Général",
      qualities: ["Visionnaire", "Leadership", "Stratégique"],
      bg: "bg-blue-900"
    },
    {
      name: "Aminata S.",
      role: "Responsable Pédagogique",
      qualities: ["Pédagogue", "Rigoureuse", "À l'écoute"],
      bg: "bg-orange-600"
    },
    {
      name: "Mamadou B.",
      role: "Lead Développeur & Formateur",
      qualities: ["Expert technique", "Passionné", "Innovant"],
      bg: "bg-slate-700"
    },
    {
      name: "Fatoumata D.",
      role: "Designer Graphique",
      qualities: ["Créative", "Esthète", "Précise"],
      bg: "bg-[var(--color-brand-blue)]"
    },
    {
      name: "Ousmane T.",
      role: "Technicien Maintenance & Réseaux",
      qualities: ["Réactif", "Analytique", "Méthodique"],
      bg: "bg-slate-800"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <section className="relative py-20 lg:py-28 bg-white overflow-hidden border-b border-slate-100">
        {/* Décoration d'arrière-plan très claire */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50 translate-y-1/3 -translate-x-1/4"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Colonne Texte */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <motion.span 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[var(--color-brand-orange)] font-bold tracking-wider uppercase text-sm mb-4 block"
              >
                À Propos De Nous
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-slate-900"
              >
                Bienvenue chez <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-orange)]">
                  IBK TECH CENTER
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8"
              >
                Centre de formation, d’innovation et de services numériques spécialisé dans l’informatique, le développement, la maintenance et la transformation digitale en Guinée.
              </motion.p>
            </div>

            {/* Colonne Image (Entièrement visible) */}
            <div className="relative h-[40vh] md:h-[50vh] lg:h-[70vh] w-full flex items-center justify-center order-1 lg:order-2">
              <motion.img 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                src={afficheMurale} 
                alt="IBK Tech Center" 
                className="w-full h-full object-contain drop-shadow-2xl rounded-xl"
              />
            </div>

          </div>
        </div>
      </section>

      {/* --- MISSION & VISION --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-stretch"
          >
            {/* Vision */}
            <motion.div variants={fadeIn} className="bg-slate-50 rounded-3xl p-10 border border-slate-100 relative overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand-blue)]/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <Eye className="text-[var(--color-brand-blue)] mb-6" size={48} />
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Notre Vision</h2>
              <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                Devenir une référence en Guinée dans la formation informatique professionnelle, l’accompagnement numérique, l’innovation technologique, et la digitalisation des services éducatifs et administratifs.
              </p>
              <div className="p-4 bg-white rounded-xl border border-slate-100 text-[var(--color-brand-orange)] font-medium">
                La technologie est un puissant outil de réussite, d’innovation et d’autonomisation.
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div variants={fadeIn} className="bg-blue-900 rounded-3xl p-10 text-white relative overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
              <Target className="text-[var(--color-brand-orange)] mb-6" size={48} />
              <h2 className="text-3xl font-bold mb-6">Notre Mission</h2>
              <ul className="space-y-4 text-blue-100 text-lg">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-[var(--color-brand-orange)] shrink-0 mt-1" size={20} />
                  Former des apprenants compétents et opérationnels
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-[var(--color-brand-orange)] shrink-0 mt-1" size={20} />
                  Faciliter l’accès aux outils numériques modernes
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-[var(--color-brand-orange)] shrink-0 mt-1" size={20} />
                  Accompagner les entreprises dans leur transformation digitale
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-[var(--color-brand-orange)] shrink-0 mt-1" size={20} />
                  Développer des solutions adaptées aux besoins locaux
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- NOS VALEURS --- */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nos Valeurs Fondamentales</h2>
            <div className="w-24 h-1 bg-[var(--color-brand-orange)] mx-auto"></div>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {[
              { title: "Professionnalisme", desc: "Qualité, sérieux et engagement dans nos services.", icon: Users },
              { title: "Innovation", desc: "Utilisation de méthodes modernes et outils récents.", icon: Lightbulb },
              { title: "Excellence", desc: "Viser les meilleurs résultats pour nos partenaires.", icon: Target },
              { title: "Accompagnement", desc: "Un suivi personnalisé pour chaque apprenant.", icon: Handshake },
              { title: "Compétence", desc: "Une équipe qualifiée passionnée par la technologie.", icon: GraduationCap }
            ].map(({ title, desc, icon: Icon }, idx) => (
              <motion.div key={idx} variants={fadeIn} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 mx-auto bg-slate-50 text-[var(--color-brand-blue)] rounded-full flex items-center justify-center mb-4">
                  <Icon size={28} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-600">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- NOTRE ÉQUIPE (5 Membres avec Qualités) --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Notre Équipe</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-6">
              Une équipe dynamique de formateurs, développeurs, techniciens et créatifs travaillant chaque jour pour offrir une formation orientée vers le marché de l’emploi.
            </p>
            <div className="w-24 h-1 bg-[var(--color-brand-blue)] mx-auto"></div>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center"
          >
            {team.map((member, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeIn} 
                className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`h-24 ${member.bg} relative`}>
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
                    <Users size={32} className="text-slate-400" />
                  </div>
                </div>
                <div className="pt-14 pb-8 px-6 text-center">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-[var(--color-brand-orange)] font-medium text-sm mb-6">{member.role}</p>
                  
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {member.qualities.map((quality, qIdx) => (
                      <span key={qIdx} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600">
                        {quality}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- DOMAINES DE FORMATION --- */}
      <section className="py-20 bg-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Domaines de Formation</h2>
            <div className="w-24 h-1 bg-[var(--color-brand-orange)] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Monitor, title: "Informatique & Bureautique", items: ["Initiation", "Word, Excel, PowerPoint", "Outlook, Access, Publisher"] },
              { icon: Code, title: "Programmation & Développement", items: ["HTML, CSS, JS", "React JS, Node JS", "Bases de données", "Apps Mobile & Desktop"] },
              { icon: Wrench, title: "Services Techniques", items: ["Maintenance ordinateurs", "Dépannage logiciel", "Sécurisation & Réseaux"] },
              { icon: Palette, title: "Design & Communication", items: ["Création de logos", "Affiches & Flyers", "Impression & Reliure"] },
              { icon: Languages, title: "Cours d'Anglais", items: ["Anglais général", "Anglais professionnel", "Conversation"] }
            ].map(({ icon: Icon, title, items }, idx) => (
              <div key={idx} className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-slate-500 transition-colors">
                <Icon className="text-[var(--color-brand-orange)] mb-6" size={40} />
                <h3 className="text-xl font-bold mb-4 text-blue-100">{title}</h3>
                <ul className="space-y-2 text-slate-400">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- POURQUOI CHOISIR IBK & ENGAGEMENT --- */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Pourquoi choisir */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Pourquoi Choisir IBK TECH CENTER ?</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Formations pratiques",
                  "Encadrement par des experts",
                  "Accompagnement personnalisé",
                  "Programmes modernes",
                  "Environnement professionnel",
                  "Solutions numériques innovantes",
                  "Assistance technique fiable"
                ].map((raison, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <CheckCircle2 className="text-[var(--color-brand-blue)] shrink-0" size={20} />
                    <span className="text-slate-700 font-medium">{raison}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Engagement */}
            <div className="bg-gradient-to-br from-[var(--color-brand-blue)] to-blue-900 rounded-3xl p-10 text-white shadow-xl">
              <h2 className="text-3xl font-bold mb-6 text-orange-100">Notre Engagement</h2>
              <p className="text-blue-100 mb-8 text-lg leading-relaxed">
                Nous nous engageons à offrir une formation de qualité, développer les compétences numériques, accompagner les jeunes vers l’emploi et participer activement à la transformation digitale en Guinée.
              </p>
              <div className="p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl">
                <p className="text-lg font-semibold italic text-center">
                  "Nous croyons que chaque personne peut réussir avec les bonnes compétences, le bon accompagnement et les bons outils technologiques."
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- PARTENAIRES --- */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Ils nous font confiance</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["Établissements scolaires", "Centres de formation", "Entreprises privées", "Startups", "Professionnels"].map((partenaire, idx) => (
              <span key={idx} className="px-6 py-3 bg-slate-100 text-slate-700 rounded-full font-medium text-sm">
                {partenaire}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION & CONTACT --- */}
      <section className="py-24 bg-[var(--color-brand-orange)] text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">La technologie au service de votre réussite</h2>
          <p className="text-xl mb-10 text-orange-100">Rejoignez IBK TECH CENTER aujourd'hui et donnez vie à vos projets numériques.</p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 bg-white/20 px-6 py-3 rounded-full">
              <MapPin size={20} /> Dixinn Centre 1, Conakry
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-6 py-3 rounded-full">
              <Phone size={20} /> +224 623 71 95 41
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-6 py-3 rounded-full">
              <Mail size={20} /> ibktechcenter@gmail.com
            </div>
          </div>

          <Link 
            to="/contact" 
            className="inline-block bg-white text-[var(--color-brand-orange)] px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all"
          >
            Contactez-nous
          </Link>
        </div>
      </section>

    </div>
  );
};

export default APropos;
