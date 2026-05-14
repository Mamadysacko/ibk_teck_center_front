import { useState } from 'react';
import { Plus, Edit, Trash2, X, ToggleLeft, ToggleRight, Wrench } from 'lucide-react';

const CATEGORIES = ["Formation", "Technique", "Développement", "Design", "Réseaux", "Scolaire", "Autre"];

const INITIAL_SERVICES = [
  { id: 1, titre: "Maintenance Informatique", categorie: "Technique", description: "Installation, dépannage matériel/logiciel, configuration de postes informatiques et assistance technique.", actif: true },
  { id: 2, titre: "Développement Web & Mobile", categorie: "Développement", description: "Création de sites web, d'applications mobiles et de logiciels de gestion adaptés à vos besoins.", actif: true },
  { id: 3, titre: "Design Graphique & Impression", categorie: "Design", description: "Création de logos, affiches, flyers, bannières publicitaires, cartes de visite et supports marketing.", actif: true },
  { id: 4, titre: "Réseaux & Systèmes", categorie: "Réseaux", description: "Installation de réseaux Wi-Fi/LAN, configuration de routeurs, sécurisation et administration réseau.", actif: false },
  { id: 5, titre: "Services Numériques pour Écoles", categorie: "Scolaire", description: "Création de sites scolaires, digitalisation de la gestion, supports pédagogiques et logiciels éducatifs.", actif: true },
];

const EMPTY_FORM = { titre: "", categorie: "Technique", description: "", actif: true };

export default function AdminServices() {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const openAdd = () => { setEditItem(null); setForm(EMPTY_FORM); setError(""); setShowModal(true); };
  const openEdit = (s) => { setEditItem(s); setForm({ ...s }); setError(""); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setError(""); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.titre || !form.description) { setError("Le titre et la description sont obligatoires."); return; }
    if (editItem) {
      setServices(prev => prev.map(s => s.id === editItem.id ? { ...form, id: editItem.id } : s));
    } else {
      setServices(prev => [{ ...form, id: Date.now() }, ...prev]);
    }
    closeModal();
  };

  const toggleActif = (id) => setServices(prev => prev.map(s => s.id === id ? { ...s, actif: !s.actif } : s));
  const confirmDelete = () => { setServices(prev => prev.filter(s => s.id !== deleteId)); setDeleteId(null); };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Gestion des Services</h1>
        <button onClick={openAdd} className="bg-[var(--color-brand-orange)] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-orange-600 transition flex items-center gap-2 shadow-md">
          <Plus size={20} /> Ajouter un service
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Total services", value: services.length, color: "text-slate-800" },
          { label: "Actifs (visibles)", value: services.filter(s => s.actif).length, color: "text-emerald-600" },
          { label: "Masqués", value: services.filter(s => !s.actif).length, color: "text-slate-500" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <p className="text-slate-500 text-sm mb-1">{s.label}</p>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map(service => (
          <div key={service.id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow ${service.actif ? 'border-slate-100' : 'border-slate-200 opacity-70'}`}>
            <div className={`h-2 w-full ${service.actif ? 'bg-gradient-to-r from-[var(--color-brand-blue)] to-blue-500' : 'bg-slate-300'}`} />
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${service.actif ? 'bg-blue-50 text-[var(--color-brand-blue)]' : 'bg-slate-100 text-slate-400'}`}>
                    <Wrench size={18} />
                  </div>
                  <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">{service.categorie}</span>
                </div>
                <button onClick={() => toggleActif(service.id)} className="shrink-0" title="Activer / Désactiver">
                  {service.actif
                    ? <ToggleRight size={26} className="text-emerald-500" />
                    : <ToggleLeft size={26} className="text-slate-400" />}
                </button>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2 leading-snug">{service.titre}</h3>
              <p className="text-sm text-slate-500 leading-relaxed flex-1 line-clamp-3">{service.description}</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${service.actif ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                  {service.actif ? "Visible sur le site" : "Masqué"}
                </span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(service)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={16} /></button>
                  <button onClick={() => setDeleteId(service.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Ajout / Modification */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">{editItem ? "Modifier le service" : "Nouveau Service"}</h2>
              <button onClick={closeModal} className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl"><X size={22} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Titre du service <span className="text-red-500">*</span></label>
                <input value={form.titre} onChange={e => setForm(p => ({...p, titre: e.target.value}))} type="text" placeholder="Ex: Maintenance Informatique"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Catégorie</label>
                <select value={form.categorie} onChange={e => setForm(p => ({...p, categorie: e.target.value}))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description <span className="text-red-500">*</span></label>
                <textarea value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))} rows={4} placeholder="Décrivez ce service en détail..."
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition resize-none" />
              </div>
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input type="checkbox" checked={form.actif} onChange={e => setForm(p => ({...p, actif: e.target.checked}))} className="w-4 h-4 accent-[var(--color-brand-blue)]" />
                <span className="text-sm font-semibold text-slate-700">Service visible sur le site public</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition">Annuler</button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-[var(--color-brand-orange)] text-white font-bold hover:bg-orange-600 transition shadow-md">
                  {editItem ? "Enregistrer" : "Ajouter le service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4"><Trash2 size={28} className="text-red-500" /></div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Supprimer ce service ?</h3>
            <p className="text-slate-500 text-sm mb-6">Cette action est irréversible.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition">Annuler</button>
              <button onClick={confirmDelete} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition">Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
