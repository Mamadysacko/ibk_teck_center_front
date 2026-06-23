import { motion } from 'framer-motion';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [form, setForm] = useState({ prenom: '', nom: '', email: '', telephone: '', objet: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur lors de l\'envoi');
      setSuccess(true);
      setForm({ prenom: '', nom: '', email: '', telephone: '', objet: '', message: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold    mb-6">Contactez-nous</h1>
          <div className="w-24 h-1 bg-[var(--color-brand-orange)] mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une question sur nos formations ou un projet à nous confier ?
            Notre équipe vous répondra dans les plus brefs délais.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Informations de contact */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
              <h3 className="text-2xl font-bold mb-6   ">Nos Coordonnées</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-full text-[var(--color-brand-blue)] shadow-sm shrink-0">
                    <MapPin size={26} />
                  </div>
                  <div>
                    <strong className="block    mb-1 text-lg">Adresse</strong>
                    <span className="text-gray-600 leading-relaxed">
                      Dixinn Centre 1<br />
                      Rond-point Échangeur<br />
                      Commune de Dixinn<br />
                      Conakry, Guinée
                    </span>
                    <p className="text-[var(--color-brand-orange)] text-sm mt-2 font-medium">
                      📍 H83J + V9M
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-full text-[var(--color-brand-orange)] shadow-sm shrink-0">
                    <Phone size={26} />
                  </div>
                  <div>
                    <strong className="block    mb-1 text-lg">Téléphone</strong>
                    <a href="tel:+224612374585" className="text-gray-600 hover:text-[var(--color-brand-orange)] transition-colors">
                      +224 612 37 45 85
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-full text-green-500 shadow-sm shrink-0">
                    <MessageCircle size={26} />
                  </div>
                  <div>
                    <strong className="block    mb-1 text-lg">WhatsApp</strong>
                    <a href="https://wa.me/224623719541" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600 transition-colors">
                      +224 623 71 95 41
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-full text-red-500 shadow-sm shrink-0">
                    <Mail size={26} />
                  </div>
                  <div>
                    <strong className="block    mb-1 text-lg">Email</strong>
                    <a href="mailto:ibktechcenter@gmail.com" className="text-gray-600 hover:text-[var(--color-brand-orange)] transition-colors">
                      ibktechcenter@gmail.com
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      // triple-click detector: 3 clicks within 1.5s opens admin login
                      if (!window.__ibk_clicks) window.__ibk_clicks = 0;
                      window.__ibk_clicks += 1;
                      if (window.__ibk_clicks === 1) {
                        window.__ibk_clicks_timer = window.setTimeout(() => { window.__ibk_clicks = 0; window.__ibk_clicks_timer = null; }, 1500);
                      }
                      if (window.__ibk_clicks >= 3) {
                        if (window.__ibk_clicks_timer) { clearTimeout(window.__ibk_clicks_timer); window.__ibk_clicks_timer = null; }
                        window.__ibk_clicks = 0;
                        // navigate to admin/login
                        window.location.href = '/admin/login';
                      }
                    }}
                    className="bg-white p-3 rounded-full text-purple-500 shadow-sm shrink-0 cursor-pointer"
                    aria-label="Heures d'ouverture (triple-clic pour admin)"

                  >
                    <Clock size={26} />
                  </button>
                  <div>
                    <strong className="block    mb-1 text-lg">Heures d'ouverture</strong>
                    <span className="text-gray-600">
                      Lundi - Vendredi : 08h00 - 18h00<br />
                      Samedi : 09h00 - 13h00
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Google Maps */}
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <iframe
                title="Localisation IBK Tech Center - Dixinn Conakry"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d444.93939685523947!2d-13.669061026828205!3d9.554623449560186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xf1cd716c128befb%3A0x3192c1b4edfd11bd!2sIBK!5e0!3m2!1sfr!2s!4v1778647632685!5m2!1sfr!2s"
                width="100%"
                height="380"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>

          {/* Formulaire de contact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100"
          >
            <h3 className="text-2xl font-bold mb-6">Envoyez-nous un message</h3>
            {success && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center gap-2">
                <CheckCircle size={20} /> Message envoyé avec succès !
              </div>
            )}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">{error}</div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                  <input type="text" id="firstName" value={form.prenom} onChange={e => setForm(f => ({ ...f, prenom: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:border-[var(--color-brand-blue)] outline-none transition-all" placeholder="Votre prénom" required />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                  <input type="text" id="lastName" value={form.nom} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:border-[var(--color-brand-blue)] outline-none transition-all" placeholder="Votre nom" required />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input type="email" id="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:border-[var(--color-brand-blue)] outline-none transition-all" placeholder="votre@email.com" required />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
                <input type="tel" id="phone" value={form.telephone} onChange={e => setForm(f => ({ ...f, telephone: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:border-[var(--color-brand-blue)] outline-none transition-all" placeholder="+224 612 37 45 85" required />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Sujet *</label>
                <select id="subject" value={form.objet} onChange={e => setForm(f => ({ ...f, objet: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:border-[var(--color-brand-blue)] outline-none bg-white transition-all" required>
                  <option value="">Choisissez un sujet</option>
                  <option>Demande d'information sur une formation</option>
                  <option>Demande de devis (Service / Projet)</option>
                  <option>Partenariat avec une école ou entreprise</option>
                  <option>Autre demande</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea id="message" rows="6" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:border-[var(--color-brand-blue)] outline-none resize-y transition-all" placeholder="Décrivez votre besoin..." required></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--color-brand-orange)] hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-4 rounded-2xl transition-all duration-300 text-lg shadow-lg shadow-orange-500/30"
              >
                {loading ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;