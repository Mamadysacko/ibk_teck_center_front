import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import {
  User, Phone, Mail, MapPin, Briefcase, GraduationCap,
  Target, Heart, Monitor, CheckCircle, ArrowRight, ArrowLeft,
  ChevronDown, BookOpen, Laptop
} from 'lucide-react';

// ─── Mappings vers la base de données ───────────────────────────────────────
const mapSexe = (val) => (val === 'Féminin' ? 'Femme' : 'Homme');
const mapNiveauEtude = (val) => {
  const m = { Primaire: 'Primaire', Collège: 'College', Lycée: 'Lycee', Universitaire: 'Bac+3', Professionnel: 'Autre', Autre: 'Autre' };
  return m[val] || 'Autre';
};
const mapNiveauInfo = (val) => {
  const m = { Débutant: 'Debutant', Intermédiaire: 'Intermediaire', Avancé: 'Avance' };
  return m[val] || null;
};

// ─── Étapes du formulaire ────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: 'Formation', icon: BookOpen },
  { id: 2, label: 'État Civil', icon: User },
  { id: 3, label: 'Professionnel', icon: Briefcase },
  { id: 4, label: 'Motivation', icon: Heart },
  { id: 5, label: 'Équipement', icon: Laptop },
];

// ─── Composants UI réutilisables ─────────────────────────────────────────────
const InputField = ({ label, id, icon: Icon, ...props }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-sm font-semibold text-gray-700">{label}</label>
    <div className="relative">
      {Icon && (
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon size={17} />
        </span>
      )}
      <input
        id={id}
        className={`w-full border border-gray-200 rounded-xl py-3 pr-4 bg-white    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${Icon ? 'pl-10' : 'pl-4'}`}
        {...props}
      />
    </div>
  </div>
);

const TextareaField = ({ label, id, ...props }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-sm font-semibold text-gray-700">{label}</label>
    <textarea
      id={id}
      rows={3}
      className="w-full border border-gray-200 rounded-xl py-3 px-4 bg-white    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
      {...props}
    />
  </div>
);

const CheckboxGroup = ({ label, options, name, value, onChange }) => (
  <div className="flex flex-col gap-2">
    <span className="text-sm font-semibold text-gray-700">{label}</span>
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const checked = Array.isArray(value) ? value.includes(opt) : value === opt;
        return (
          <label
            key={opt}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border cursor-pointer transition text-sm font-medium select-none
              ${checked
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'bg-white border-gray-200 text-gray-700 hover:border-blue-400'
              }`}
          >
            <input
              type={Array.isArray(value) ? 'checkbox' : 'radio'}
              name={name}
              value={opt}
              checked={checked}
              onChange={() => onChange(opt)}
              className="sr-only"
            />
            {opt}
          </label>
        );
      })}
    </div>
  </div>
);

// ─── Page principale ─────────────────────────────────────────────────────────
const Inscription = () => {
  const [searchParams] = useSearchParams();
  const preselected = searchParams.get('formation') || '';

  const [formations, setFormations] = useState([]);
  const [loadingFormations, setLoadingFormations] = useState(true);
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/formations');
        if (res.ok) {
          const data = await res.json();
          setFormations(data.filter(f => f.statut === 'ouverte'));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingFormations(false);
      }
    };
    load();
  }, []);

  const [step, setStep] = useState(preselected ? 2 : 1);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    // Étape 1 – Formation
    formation: preselected,
    // Étape 2 – État civil
    nom: '', prenom: '', sexe: '', commune: '',
    telephone: '', whatsapp: '', email: '',
    // Étape 3 – Professionnel
    profession: '',
    niveauEtude: '',
    niveauEtudeAutre: '',
    competences: '',
    objectifs: [],
    objectifAutre: '',
    // Étape 4 – Motivation
    motivation: '',
    dejaFormation: '',
    laquelle: '',
    niveauInfo: '',
    // Étape 5 – Équipement
    ordinateur: '',
    typeAppareil: '',
  });

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const toggleObjectif = (opt) => {
    setForm(f => ({
      ...f,
      objectifs: f.objectifs.includes(opt)
        ? f.objectifs.filter(o => o !== opt)
        : [...f.objectifs, opt],
    }));
  };

  const selectedFormation = formations.find(f => String(f.id) === String(form.formation));

  const formationCategories = [...new Set(formations.map(f => f.type_formation_nom || 'Autre'))];

  const canNext = () => {
    if (step === 1) return !!form.formation;
    if (step === 2) return form.nom && form.prenom && form.sexe && form.telephone;
    if (step === 4) return !!form.motivation && !!form.dejaFormation;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.motivation || !form.dejaFormation) {
      setSubmitError('Veuillez remplir la motivation et indiquer si vous avez déjà suivi une formation.');
      return;
    }
    setSubmitting(true);
    setSubmitError('');
    try {
      const payload = {
        formation_id: parseInt(form.formation, 10),
        nom: form.nom,
        prenom: form.prenom,
        sexe: mapSexe(form.sexe),
        commune: form.commune || null,
        telephone: form.telephone,
        whatsapp: form.whatsapp || null,
        email: form.email || null,
        profession: form.profession || null,
        niveau_etude: mapNiveauEtude(form.niveauEtude),
        niveau_etude_autre: form.niveauEtudeAutre || null,
        competences: form.competences || null,
        objectifs: form.objectifs.join(', ') || null,
        objectif_autre: form.objectifAutre || null,
        motivation: form.motivation,
        deja_formation: form.dejaFormation,
        laquelle: form.laquelle || null,
        niveau_info: mapNiveauInfo(form.niveauInfo),
        ordinateur: form.ordinateur || null,
        type_appareil: form.typeAppareil || null,
      };
      const res = await fetch('/api/inscriptions-ligne', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur lors de l\'inscription');
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // ── Succès ──
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center px-4 pt-24 pb-16">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-xl p-12 max-w-lg w-full text-center"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold    mb-3">Inscription envoyée !</h2>
          <p className="text-gray-500 mb-2">
            Merci <strong>{form.prenom} {form.nom}</strong>, votre demande d'inscription a bien été reçue.
          </p>
          {selectedFormation && (
            <div className="my-6 bg-blue-50 rounded-2xl p-4 text-left">
              <p className="text-xs uppercase tracking-widest text-blue-600 font-semibold mb-1">Formation choisie</p>
              <p className="font-bold   ">{selectedFormation.nom}</p>
              <p className="text-sm text-gray-500">{selectedFormation.duree} · {Number(selectedFormation.tarif).toLocaleString('fr-FR')} GNF</p>
            </div>
          )}
          <p className="text-gray-500 text-sm mb-8">Notre équipe vous contactera dans les plus brefs délais pour confirmer votre inscription.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-2xl transition"
          >
            Retour à l'accueil <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 pt-24 pb-20 px-4">
      <div className="max-w-2xl mx-auto">

        {/* ── En-tête ── */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            IBK Tech Center
          </span>
          <h1 className="text-4xl font-bold    mb-3">Fiche d'Inscription</h1>
          <p className="text-gray-500">Remplissez le formulaire ci-dessous pour vous inscrire à une formation.</p>
        </motion.div>

        {/* ── Barre de progression ── */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-5 h-0.5 bg-gray-200 z-0">
              <div
                className="h-full bg-blue-600 transition-all duration-500"
                style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
              />
            </div>
            {STEPS.map((s) => {
              const Icon = s.icon;
              const done = step > s.id;
              const active = step === s.id;
              return (
                <div key={s.id} className="flex flex-col items-center z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${done ? 'bg-blue-600 border-blue-600 text-white'
                      : active ? 'bg-white border-blue-600 text-blue-600'
                        : 'bg-white border-gray-200 text-gray-400'}`}
                  >
                    {done ? <CheckCircle size={18} /> : <Icon size={18} />}
                  </div>
                  <span className={`text-xs mt-2 font-semibold hidden sm:block ${active ? 'text-blue-600' : done ? 'text-gray-700' : 'text-gray-400'}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Carte formulaire ── */}
        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-10"
            >

              {/* ══ Étape 1 : Choix de la formation ══ */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Choix de la formation</h2>
                    <p className="text-gray-500 text-sm">Sélectionnez la formation à laquelle vous souhaitez vous inscrire.</p>
                  </div>

                  {loadingFormations && (
                    <p className="text-gray-500 text-center py-8">Chargement des formations...</p>
                  )}

                  {!loadingFormations && formations.length === 0 && (
                    <p className="text-gray-500 text-center py-8">Aucune formation ouverte pour le moment.</p>
                  )}

                  {formationCategories.map(cat => (
                    <div key={cat}>
                      <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-3">{cat}</p>
                      <div className="space-y-2">
                        {formations.filter(f => (f.type_formation_nom || 'Autre') === cat).map(f => (
                          <label
                            key={f.id}
                            className={`flex items-center justify-between gap-4 p-4 rounded-2xl border cursor-pointer transition
                              ${String(form.formation) === String(f.id)
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-100 hover:border-blue-200 hover:bg-gray-50'
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                                ${String(form.formation) === String(f.id) ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}
                              >
                                {String(form.formation) === String(f.id) && <div className="w-2 h-2 rounded-full bg-white" />}
                              </div>
                              <div>
                                <p className="font-semibold text-sm">{f.nom}</p>
                                <p className="text-xs text-gray-400">{f.duree}</p>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-emerald-700 whitespace-nowrap">{Number(f.tarif).toLocaleString('fr-FR')} GNF</span>
                            <input type="radio" name="formation" value={f.id} checked={String(form.formation) === String(f.id)}
                              onChange={() => set('formation', String(f.id))} className="sr-only" />
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ══ Étape 2 : État Civil ══ */}
              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-2xl font-bold    mb-1">État Civil</h2>
                    <p className="text-gray-500 text-sm">Vos informations personnelles de contact.</p>
                  </div>
                  {selectedFormation && (
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-3">
                      <BookOpen size={18} className="text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-blue-500 font-semibold uppercase tracking-wide">Formation choisie</p>
                        <p className="font-bold text-sm">{selectedFormation.nom}</p>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Nom *" id="nom" icon={User} placeholder="Votre nom de famille"
                      value={form.nom} onChange={e => set('nom', e.target.value)} required />
                    <InputField label="Prénom *" id="prenom" placeholder="Votre prénom"
                      value={form.prenom} onChange={e => set('prenom', e.target.value)} required />
                  </div>
                  <CheckboxGroup label="Sexe *" name="sexe" options={['Masculin', 'Féminin']}
                    value={form.sexe} onChange={val => set('sexe', val)} />
                  <InputField label="Commune / Quartier" id="commune" icon={MapPin} placeholder="Ex : Kaloum, Ratoma..."
                    value={form.commune} onChange={e => set('commune', e.target.value)} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Téléphone *" id="telephone" icon={Phone} placeholder="+224 ..."
                      value={form.telephone} onChange={e => set('telephone', e.target.value)} required />
                    <InputField label="WhatsApp" id="whatsapp" icon={Phone} placeholder="+224 ..."
                      value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)} />
                  </div>
                  <InputField label="Email" id="email" icon={Mail} type="email" placeholder="exemple@mail.com"
                    value={form.email} onChange={e => set('email', e.target.value)} />
                </div>
              )}

              {/* ══ Étape 3 : Cadre Professionnel ══ */}
              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-2xl font-bold    mb-1">Cadre Professionnel</h2>
                    <p className="text-gray-500 text-sm">Votre parcours académique et vos objectifs.</p>
                  </div>
                  <InputField label="Profession actuelle" id="profession" icon={Briefcase} placeholder="Ex : Étudiant, Comptable..."
                    value={form.profession} onChange={e => set('profession', e.target.value)} />

                  <CheckboxGroup
                    label="Niveau d'étude"
                    name="niveauEtude"
                    options={['Primaire', 'Collège', 'Lycée', 'Universitaire', 'Professionnel', 'Autre']}
                    value={form.niveauEtude}
                    onChange={val => set('niveauEtude', val)}
                  />
                  {form.niveauEtude === 'Autre' && (
                    <InputField label="Précisez votre niveau" id="niveauAutre" placeholder="Votre niveau d'étude"
                      value={form.niveauEtudeAutre} onChange={e => set('niveauEtudeAutre', e.target.value)} />
                  )}

                  <TextareaField label="Compétences informatiques actuelles" id="competences"
                    placeholder="Décrivez vos compétences actuelles en informatique..."
                    value={form.competences} onChange={e => set('competences', e.target.value)} />

                  <div className="space-y-2">
                    <span className="text-sm font-semibold text-gray-700">Objectif de la formation</span>
                    <div className="space-y-2">
                      {[
                        'Obtenir un emploi',
                        'Améliorer mes compétences professionnelles',
                        'Créer une entreprise',
                        'Reconversion professionnelle',
                        'Développement personnel',
                        'Autre',
                      ].map(opt => (
                        <label key={opt} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition text-sm
                          ${form.objectifs.includes(opt) ? 'border-blue-500 bg-blue-50 text-blue-800 font-semibold' : 'border-gray-100 hover:border-blue-200 text-gray-700'}`}>
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0
                            ${form.objectifs.includes(opt) ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                            {form.objectifs.includes(opt) && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 111.414-1.414L8.414 12.172l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          {opt}
                          <input type="checkbox" className="sr-only" checked={form.objectifs.includes(opt)}
                            onChange={() => toggleObjectif(opt)} />
                        </label>
                      ))}
                    </div>
                    {form.objectifs.includes('Autre') && (
                      <InputField label="Précisez votre objectif" id="objectifAutre" placeholder="Votre objectif..."
                        value={form.objectifAutre} onChange={e => set('objectifAutre', e.target.value)} />
                    )}
                  </div>
                </div>
              )}

              {/* ══ Étape 4 : Motivation ══ */}
              {step === 4 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-2xl font-bold    mb-1">Motivation & Niveau</h2>
                    <p className="text-gray-500 text-sm">Aidez-nous à mieux vous connaître.</p>
                  </div>

                  <TextareaField label="Pourquoi souhaitez-vous suivre cette formation ?" id="motivation"
                    placeholder="Exprimez librement vos motivations..."
                    value={form.motivation} onChange={e => set('motivation', e.target.value)} />

                  <CheckboxGroup label="Avez-vous déjà suivi une formation en informatique ?"
                    name="dejaFormation" options={['Oui', 'Non']}
                    value={form.dejaFormation} onChange={val => set('dejaFormation', val)} />

                  {form.dejaFormation === 'Oui' && (
                    <InputField label="Si oui, laquelle ?" id="laquelle" placeholder="Nom de la formation suivie..."
                      value={form.laquelle} onChange={e => set('laquelle', e.target.value)} />
                  )}

                  <CheckboxGroup label="Votre niveau actuel en informatique"
                    name="niveauInfo" options={['Débutant', 'Intermédiaire', 'Avancé']}
                    value={form.niveauInfo} onChange={val => set('niveauInfo', val)} />
                </div>
              )}

              {/* ══ Étape 5 : Équipement ══ */}
              {step === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold    mb-1">Équipement Personnel</h2>
                    <p className="text-gray-500 text-sm">Ces informations nous aident à adapter la formation.</p>
                  </div>

                  <CheckboxGroup label="Disposez-vous d'un ordinateur ?"
                    name="ordinateur" options={['Oui', 'Non']}
                    value={form.ordinateur} onChange={val => set('ordinateur', val)} />

                  <CheckboxGroup label="Type d'appareil utilisé"
                    name="typeAppareil"
                    options={['Ordinateur portable', 'Ordinateur bureau', 'Téléphone uniquement']}
                    value={form.typeAppareil} onChange={val => set('typeAppareil', val)} />

                  {/* Récapitulatif */}
                  <div className="bg-gray-50 rounded-2xl p-5 space-y-2 border border-gray-100">
                    <p className="font-bold   mb-3">Récapitulatif de votre inscription</p>
                    {selectedFormation && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Formation</span>
                        <span className="font-semibold   ">{selectedFormation.nom}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Nom complet</span>
                      <span className="font-semibold   ">{form.prenom} {form.nom}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Téléphone</span>
                      <span className="font-semibold   ">{form.telephone}</span>
                    </div>
                    {form.email && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Email</span>
                        <span className="font-semibold   ">{form.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* ── Navigation ── */}
          {submitError && (
            <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{submitError}</div>
          )}
          <div className="flex justify-between items-center mt-6">
            {step > 1 ? (
              <button type="button" onClick={() => setStep(s => s - 1)}
                className="flex items-center gap-2 text-gray-600 hover:   font-semibold px-5 py-3 rounded-2xl border border-gray-200 hover:border-gray-300 bg-white transition">
                <ArrowLeft size={18} /> Précédent
              </button>
            ) : (
              <Link to="/formations" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 font-medium px-5 py-3 transition">
                <ArrowLeft size={18} /> Formations
              </Link>
            )}

            {step < STEPS.length ? (
              <button type="button" onClick={() => setStep(s => s + 1)}
                disabled={!canNext()}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold px-7 py-3 rounded-2xl transition">
                Suivant <ArrowRight size={18} />
              </button>
            ) : (
              <button type="submit" disabled={submitting}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold px-8 py-3 rounded-2xl transition shadow-lg shadow-orange-200">
                <CheckCircle size={18} /> {submitting ? 'Envoi...' : 'Envoyer ma candidature'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Inscription;
