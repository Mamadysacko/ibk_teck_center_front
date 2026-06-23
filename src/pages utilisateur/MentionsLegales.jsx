import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const MentionsLegales = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-16"
        >
          <span className="text-[var(--color-brand-orange)] font-bold tracking-wider uppercase text-sm mb-4 block">
            Informations Légales
          </span>
          <h1 className="text-4xl md:text-5xl font-bold    mb-6">
            Mentions Légales
          </h1>
          <p className="text-xl text-gray-600">
            IBK TECH CENTER
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-orange)] mx-auto mt-8"></div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-12 text-gray-700 leading-relaxed"
        >

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-brand-blue)] mb-4">1. Éditeur du site</h2>
            <p className="mb-4">Le site <strong>IBK TECH CENTER</strong> est édité et géré par :</p>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-3">
              <p><strong>Nom de la structure :</strong> IBK TECH CENTER</p>
              <p><strong>Adresse :</strong> Commune de Dixinn, Quartier Dixinn Centre 1 (Rond-point Échangeur), Conakry – Guinée</p>
              <p><strong>Téléphone :</strong> +224 612 37 45 85 / +224 623 71 95 41</p>
              <p><strong>WhatsApp :</strong> +224 623 71 95 41</p>
              <p><strong>Email :</strong> ibktechcenter@gmail.com</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-brand-blue)] mb-4">2. Responsable de publication</h2>
            <p>
              Le directeur de la publication et responsable de la rédaction est <strong>IBK TECH CENTER</strong>, en sa qualité de représentant légal de la structure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-brand-blue)] mb-4">3. Hébergement du site</h2>
            <p>
              Le site est hébergé par un prestataire professionnel d'hébergement web, assurant un niveau optimal de sécurité, de disponibilité et de sauvegarde des données.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-brand-blue)] mb-4">4. Propriété intellectuelle</h2>
            <p className="mb-4">
              L'ensemble de ce site relève de la législation sur le droit d'auteur et la propriété intellectuelle. Tous les contenus présents sur ce site (textes, images, graphismes, logo, icônes, design, services, vidéos) sont la propriété exclusive de <strong>IBK TECH CENTER</strong>.
            </p>
            <p className="bg-blue-50 p-5 rounded-xl border-l-4 border-[var(--color-brand-blue)]   ">
              Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement interdite sans l'accord exprès par écrit de IBK TECH CENTER.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-brand-blue)] mb-4">5. Limitation de responsabilité</h2>
            <p>
              IBK TECH CENTER s'efforce de fournir sur le site des informations aussi précises que possible. Toutefois, nous ne pourrons être tenus responsables des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de notre fait ou du fait des tiers partenaires qui fournissent ces informations. L'utilisateur reconnaît utiliser ces informations sous sa responsabilité exclusive.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-brand-blue)] mb-4">6. Contact & Support</h2>
            <p className="mb-4">Pour tout signalement, demande d'information ou question technique concernant le site, vous pouvez nous contacter :</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="text-xl">📧</span>
                <span><strong>Email :</strong> <a href="mailto:ibktechcenter@gmail.com" className="text-[var(--color-brand-blue)] hover:underline">ibktechcenter@gmail.com</a></span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-xl">📞</span>
                <span><strong>Téléphone :</strong> <a href="tel:+224612374585" className="text-[var(--color-brand-blue)] hover:underline">+224 612 37 45 85</a> / <a href="tel:+224623719541" className="text-[var(--color-brand-blue)] hover:underline">+224 623 71 95 41</a></span>
              </li>
            </ul>
          </section>

        </motion.div>
      </div>
    </div>
  );
};

export default MentionsLegales;
