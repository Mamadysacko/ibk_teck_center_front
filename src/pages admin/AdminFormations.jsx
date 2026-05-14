import { useState } from 'react';
import { Plus, Search, Edit, Trash2, X, BookOpen, Clock, DollarSign, Tag, ToggleLeft, ToggleRight } from 'lucide-react';

const CATEGORIES = ["Informatique", "Bureautique", "Développement", "Design", "Langues", "Réseaux", "Autre"];

const INITIAL_FORMATIONS = [
  { id: 1, titre: "Développement Web Fullstack", categorie: "Développement", duree: "6 mois", prix: "2 500 000 GNF", description: "HTML, CSS, JavaScript, React JS, Node JS, bases de données.", actif: true },
  { id: 2, titre: "Maîtrise Excel & Word", categorie: "Bureautique", duree: "2 mois", prix: "800 000 GNF", description: "Word, Excel, PowerPoint, Outlook, Access, Publisher.", actif: true },
  { id: 3, titre: "Design Graphique", categorie: "Design", duree: "3 mois", prix: "1 200 000 GNF", description: "Création de logos, affiches, flyers, bannières et supports marketing.", actif: false },
  { id: 4, titre: "Maintenance Informatique", categorie: "Informatique", duree: "4 mois", prix: "1 500 000 GNF", description: "Dépannage, configuration, réseaux et sécurisation des systèmes.", actif: true },
  { id: 5, titre: "Cours d'Anglais", categorie: "Langues", duree: "3 mois", prix: "700 000 GNF", description: "Anglais général, professionnel et conversation.", actif: true },
];

const EMPTY_FORM = { titre: "", categorie: "Informatique", duree: "", prix: "", description: "", actif: true };

export default function AdminFormations() {
  const [formations, setFormations] = useState(INITIAL_FORMATIONS);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const filtered = formations.filter(f =>
    `${f.titre} ${f.categorie}`.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setEditItem(null); setForm(EMPTY_FORM); setError(""); setShowModal(true); };
  const openEdit = (item) => { setEditItem(item); setForm({ ...item }); setError(""); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setError(""); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.titre || !form.duree || !form.prix) { setError("Titre, durée et prix sont obligatoires."); return; }
    if (editItem) {
      setFormations(prev => prev.map(f => f.id === editItem.id ? { ...form, id: editItem.id } : f));
    } else {
      setFormations(prev => [{ ...form, id: Date.now() }, ...prev]);
    }
    closeModal();
  };

  const toggleActif = (id) => setFormations(prev => prev.map(f => f.id === id ? { ...f, actif: !f.actif } : f));
  const confirmDelete = () => { setFormations(prev => prev.filter(f => f.id !== deleteId)); setDeleteId(null); };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Gestion des Formations</h1>
        <button onClick={openAdd} className="bg-[var(--color-brand-orange)] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-orange-600 transition flex items-center gap-2 shadow-md">
          <Plus size={20} /> Ajouter une formation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Total formations", value: formations.length },
          { label: "Actives", value: formations.filter(f => f.actif).length },
          { label: "Inactives", value: formations.filter(f => !f.actif).length },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <p className="text-slate-500 text-sm mb-1">{s.label}</p>
            <p className="text-3xl font-bold text-slate-800">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Rechercher une formation..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:bg-white transition" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[750px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
                <th className="px-5 py-4">Titre</th>
                <th className="px-5 py-4">Catégorie</th>
                <th className="px-5 py-4">Durée</th>
                <th className="px-5 py-4">Prix</th>
                <th className="px-5 py-4 text-center">Statut</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center py-14 text-slate-400">Aucune formation trouvée.</td></tr>
              )}
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="font-bold text-slate-800 flex items-center gap-2"><BookOpen size={15} className="text-[var(--color-brand-blue)]" /> {item.titre}</div>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{item.description}</p>
                  </td>
                  <td className="px-5 py-4"><span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-xs font-semibold">{item.categorie}</span></td>
                  <td className="px-5 py-4 text-slate-600 flex items-center gap-1.5 mt-4"><Clock size={14} className="text-slate-400" /> {item.duree}</td>
                  <td className="px-5 py-4 font-bold text-slate-700">{item.prix}</td>
                  <td className="px-5 py-4 text-center">
                    <button onClick={() => toggleActif(item.id)} className="inline-flex items-center gap-1.5 transition-colors" title="Activer / Désactiver">
                      {item.actif
                        ? <><ToggleRight size={26} className="text-emerald-500" /><span className="text-xs font-bold text-emerald-600">Actif</span></>
                        : <><ToggleLeft size={26} className="text-slate-400" /><span className="text-xs font-bold text-slate-500">Inactif</span></>}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={17} /></button>
                      <button onClick={() => setDeleteId(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={17} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Ajout / Modification */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">{editItem ? "Modifier la formation" : "Nouvelle Formation"}</h2>
              <button onClick={closeModal} className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl"><X size={22} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Titre <span className="text-red-500">*</span></label>
                <input value={form.titre} onChange={e => setForm(p => ({...p, titre: e.target.value}))} type="text" placeholder="Ex: Développement Web Fullstack"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Catégorie</label>
                  <select value={form.categorie} onChange={e => setForm(p => ({...p, categorie: e.target.value}))}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition">
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Durée <span className="text-red-500">*</span></label>
                  <input value={form.duree} onChange={e => setForm(p => ({...p, duree: e.target.value}))} type="text" placeholder="Ex: 3 mois"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Prix <span className="text-red-500">*</span></label>
                <input value={form.prix} onChange={e => setForm(p => ({...p, prix: e.target.value}))} type="text" placeholder="Ex: 1 500 000 GNF"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
                <textarea value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))} rows={3} placeholder="Contenu et objectifs de la formation..."
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition resize-none" />
              </div>
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input type="checkbox" checked={form.actif} onChange={e => setForm(p => ({...p, actif: e.target.checked}))} className="w-4 h-4 accent-[var(--color-brand-blue)]" />
                <span className="text-sm font-semibold text-slate-700">Formation active (visible sur le site)</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition">Annuler</button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-[var(--color-brand-blue)] text-white font-bold hover:bg-blue-800 transition shadow-md">
                  {editItem ? "Enregistrer les modifications" : "Ajouter la formation"}
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
            <h3 className="text-xl font-bold text-slate-800 mb-2">Supprimer cette formation ?</h3>
            <p className="text-slate-500 text-sm mb-6">Cette action est irréversible. La formation sera définitivement supprimée.</p>
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
