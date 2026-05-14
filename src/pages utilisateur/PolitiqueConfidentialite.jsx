import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const PolitiqueConfidentialite = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Politique de Confidentialité
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
            <h2 className="text-2xl font-bold text-[var(--color-brand-blue)] mb-4">1. Introduction</h2>
            <p>
              IBK TECH CENTER accorde une grande importance à la protection de vos données personnelles. Cette politique explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site web ou nos services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-brand-blue)] mb-4">2. Collecte des informations</h2>
            <p className="mb-4">Nous pouvons collecter les informations suivantes :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nom et prénom</li>
              <li>Numéro de téléphone</li>
              <li>Adresse email</li>
              <li>Informations fournies via les formulaires d’inscription ou de contact</li>
              <li>Messages envoyés via WhatsApp ou réseaux sociaux</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-brand-blue)] mb-4">3. Utilisation des données</h2>
            <p className="mb-4">Vos informations sont utilisées uniquement pour :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>La gestion des inscriptions aux formations</li>
              <li>La réponse à vos demandes d’information</li>
              <li>Le suivi des apprenants</li>
              <li>L’amélioration de nos services</li>
              <li>La communication liée à nos formations et services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-brand-blue)] mb-4">4. Protection des données</h2>
            <p className="mb-4">Nous mettons en place des mesures de sécurité techniques et organisationnelles pour protéger vos données contre :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>L’accès non autorisé</li>
              <li>La perte</li>
              <li>L’altération ou la divulgation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-brand-blue)] mb-4">5. Partage des informations</h2>
            <p className="mb-4">Vos données personnelles ne sont jamais vendues. Elles peuvent être partagées uniquement avec :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Les responsables internes du centre</li>
              <li>Les services techniques nécessaires au fonctionnement du site</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-brand-blue)] mb-4">6. Cookies et navigation</h2>
            <p>
              Notre site peut utiliser des cookies pour améliorer l’expérience utilisateur et analyser le trafic du site. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-brand-blue)] mb-4">7. Vos droits</h2>
            <p className="mb-4">Vous avez le droit de :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Accéder à vos données personnelles</li>
              <li>Demander leur modification ou suppression</li>
              <li>Refuser l’utilisation de vos données à des fins de communication</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-brand-blue)] mb-4">8. Contact</h2>
            <p className="mb-4">Pour toute question liée à la confidentialité de vos données :</p>
            <ul className="space-y-3 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <li className="flex items-start gap-3">
                <span className="text-xl">📍</span>
                <span><strong>Adresse :</strong> Commune de Dixinn, Quartier Dixinn Centre 1 (Rond-point Échangeur)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-xl">📧</span>
                <span><strong>Email :</strong> ibktechcenter@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-xl">📞</span>
                <span><strong>Téléphone :</strong> +224 612 37 45 85 / +224 623 71 95 41</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-xl">📱</span>
                <span><strong>WhatsApp :</strong> +224 623 71 95 41</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-brand-blue)] mb-4">9. Réseaux sociaux</h2>
            <p className="mb-4">Vous pouvez également nous suivre sur :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Facebook :</strong> IBK TECH CENTER</li>
              <li><strong>TikTok :</strong> IBK TECH CENTER</li>
              <li><strong>Instagram :</strong> IBK TECH CENTER</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-brand-blue)] mb-4">10. Philosophie du centre</h2>
            <p className="mb-4">IBK TECH CENTER s’engage à offrir une formation de qualité basée sur :</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <strong className="text-[var(--color-brand-blue)] block mb-1">Formation</strong>
                <p className="text-sm">Développez vos compétences</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                <strong className="text-[var(--color-brand-orange)] block mb-1">Innovation</strong>
                <p className="text-sm">Des solutions modernes et efficaces</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <strong className="text-[var(--color-brand-blue)] block mb-1">Compétence</strong>
                <p className="text-sm">L’expertise au service de votre réussite</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                <strong className="text-[var(--color-brand-orange)] block mb-1">Technologie</strong>
                <p className="text-sm">Au service de votre réussite</p>
              </div>
            </div>
          </section>

        </motion.div>
      </div>
    </div>
  );
};

export default PolitiqueConfidentialite;
