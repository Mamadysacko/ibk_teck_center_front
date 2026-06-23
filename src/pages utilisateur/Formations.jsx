import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, ArrowRight, GraduationCap, X } from 'lucide-react';

const Formations = () => {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFormation, setSelectedFormation] = useState(null);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await fetch('/api/formations');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement');
        }
        const data = await response.json();
        setFormations(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFormations();
  }, []);

  const formatPrice = (price) => {
    return Number(price).toLocaleString('fr-FR') + ' GNF';
  };

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-[var(--color-brand-blue)] text-white mb-6">
            <GraduationCap size={50} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold   ">Nos Formations</h1>
          <div className="w-28 h-1 bg-[var(--color-brand-orange)] mx-auto mt-5 mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Découvrez nos formations professionnelles conçues pour développer vos compétences et améliorer votre employabilité.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Chargement des formations...</p>
          </div>
        )}

        {/* Liste des formations */}
        {!loading && (
          <>
            {formations.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center shadow">
                <h3 className="text-2xl font-semibold text-gray-700">Aucune formation disponible</h3>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {formations.map((formation, index) => (
                  <motion.div
                    key={formation.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100"
                  >
                    {/* Image */}
                    <div className="h-56 bg-gray-200 overflow-hidden">
                      <img
                        src={formation.image ? (formation.image.startsWith('data:') ? formation.image : formation.image.startsWith('/') ? formation.image : `/uploads/${formation.image}`) : 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80'}
                        alt={formation.nom}
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                      />
                    </div>
                    {/* Contenu */}
                    <div className="p-6">
                      {/* Statut */}
                      <div className="flex justify-between items-center mb-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${formation.statut === 'ouverte'
                              ? 'bg-green-100 text-green-700'
                              : formation.statut === 'fermee'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                        >
                          {formation.statut}
                        </span>
                        <span className="font-bold text-emerald-600">{formatPrice(formation.tarif)}</span>
                      </div>
                      {/* Type */}
                      {formation.type_formation_nom && (
                        <div className="mb-3">
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                            {formation.type_formation_nom}
                          </span>
                        </div>
                      )}
                      {/* Nom */}
                      <h3 className="text-2xl font-bold    mb-3">{formation.nom}</h3>
                      {/* Informations simplifiées */}
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1.5">
                          <Clock size={16} />
                          <span>{formation.duree}</span>
                        </div>
                        <div className="font-bold text-emerald-600">{formatPrice(formation.tarif)}</div>
                      </div>

                      {/* Boutons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedFormation(formation)}
                          className="flex-1 py-2.5 rounded-xl border-2 border-gray-100 text-gray-600 font-semibold hover:bg-gray-50 transition"
                        >
                          Détails
                        </button>
                        <Link
                          to={`/inscription?formation=${formation.id}`}
                          className={`flex items-center justify-center gap-1 w-12 rounded-xl transition ${formation.statut === 'ouverte'
                              ? 'bg-[var(--color-brand-orange)] hover:bg-orange-600 text-white'
                              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            }`}
                        >
                          <ArrowRight size={18} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal Détail Formation */}
      <AnimatePresence>
        {selectedFormation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedFormation(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="h-48 md:h-64 relative shrink-0">
                <img
                  src={selectedFormation.image ? (selectedFormation.image.startsWith('data:') ? selectedFormation.image : selectedFormation.image.startsWith('/') ? selectedFormation.image : `/uploads/${selectedFormation.image}`) : 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80'}
                  alt={selectedFormation.nom}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedFormation(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${selectedFormation.statut === 'ouverte' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {selectedFormation.statut}
                  </span>
                  {selectedFormation.type_formation_nom && (
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                      {selectedFormation.type_formation_nom}
                    </span>
                  )}
                </div>

                <h2 className="text-3xl font-bold mb-4">{selectedFormation.nom}</h2>
                <div className="text-2xl font-black text-emerald-600 mb-6">{formatPrice(selectedFormation.tarif)}</div>

                <div className="bg-gray-50 rounded-2xl p-5 mb-6 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Clock size={18}/></div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">Durée</p>
                      <p className="font-semibold">{selectedFormation.duree}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600"><Users size={18}/></div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">Places</p>
                      <p className="font-semibold">{selectedFormation.places_disponibles}</p>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><Calendar size={18}/></div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">Date de début</p>
                      <p className="font-semibold">{formatDate(selectedFormation.date_debut)}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-3">À propos de cette formation</h3>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{selectedFormation.description}</p>
                </div>

                <Link
                  to={`/inscription?formation=${selectedFormation.id}`}
                  className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-lg transition ${selectedFormation.statut === 'ouverte'
                      ? 'bg-[var(--color-brand-orange)] hover:bg-orange-600 text-white shadow-lg hover:shadow-orange-500/30'
                      : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                >
                  {selectedFormation.statut === 'ouverte' ? "S'inscrire maintenant" : 'Inscription fermée'}
                  <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Formations;
