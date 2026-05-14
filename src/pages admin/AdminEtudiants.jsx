import { useState } from 'react';
import { UserPlus, Search, Edit, Trash2, X, Phone, Mail, BookOpen } from 'lucide-react';

const FORMATIONS = ["Informatique de base","Bureautique","Développement Web Fullstack","Développement Mobile","Maintenance Informatique","Design Graphique","Cours d'Anglais","Réseaux & Systèmes"];
const EMPTY_FORM = { prenom: "", nom: "", email: "", phone: "", formation: "", genre: "Masculin", niveau: "", statut: "En cours", dateInscription: new Date().toISOString().split("T")[0] };

const INITIAL = [
  { id: 1, prenom: "Ibrahima", nom: "Camara", email: "ib.cam@email.com", phone: "+224 664 99 88 77", formation: "Maintenance Informatique", genre: "Masculin", niveau: "Bac+1", statut: "En cours", dateInscription: "2026-04-10" },
  { id: 2, prenom: "Fatoumata", nom: "Barry", email: "f.barry@email.com", phone: "+224 655 11 22 33", formation: "Bureautique", genre: "Féminin", niveau: "Terminale", statut: "Diplômé", dateInscription: "2026-01-15" },
  { id: 3, prenom: "Ousmane", nom: "Touré", email: "o.toure@email.com", phone: "+224 628 44 55 66", formation: "Design Graphique", genre: "Masculin", niveau: "Bac+2", statut: "En cours", dateInscription: "2026-03-01" },
];

const STATUT_STYLE = {
  "En cours":  "bg-blue-50 text-blue-600 border border-blue-200",
  "Diplômé":   "bg-emerald-50 text-emerald-600 border border-emerald-200",
  "Abandonné": "bg-red-50 text-red-600 border border-red-200",
};

export default function AdminEtudiants() {
  const [etudiants, setEtudiants] = useState(INITIAL);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [viewItem, setViewItem] = useState(null);

  const filtered = etudiants.filter(e =>
    `${e.prenom} ${e.nom} ${e.email} ${e.phone} ${e.formation}`.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setEditItem(null); setForm({ ...EMPTY_FORM, dateInscription: new Date().toISOString().split("T")[0] }); setError(""); setShowModal(true); };
  const openEdit = (e) => { setEditItem(e); setForm({ ...e }); setError(""); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setError(""); };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!form.prenom || !form.nom || !form.phone || !form.formation) { setError("Prénom, nom, téléphone et formation sont obligatoires."); return; }
    if (editItem) {
      setEtudiants(prev => prev.map(e => e.id === editItem.id ? { ...form, id: editItem.id } : e));
    } else {
      setEtudiants(prev => [{ ...form, id: Date.now() }, ...prev]);
    }
    closeModal();
  };

  const confirmDelete = () => { setEtudiants(prev => prev.filter(e => e.id !== deleteId)); setDeleteId(null); };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Gestion des Étudiants</h1>
        <button onClick={openAdd} className="bg-[var(--color-brand-blue)] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-800 transition flex items-center gap-2 shadow-md">
          <UserPlus size={20} /> Ajouter un étudiant
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Total étudiants", value: etudiants.length, color: "text-slate-800" },
          { label: "En cours", value: etudiants.filter(e => e.statut === "En cours").length, color: "text-blue-600" },
          { label: "Diplômés", value: etudiants.filter(e => e.statut === "Diplômé").length, color: "text-emerald-600" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <p className="text-slate-500 text-sm mb-1">{s.label}</p>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Rechercher un étudiant..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:bg-white transition" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
                <th className="px-5 py-4">Étudiant</th>
                <th className="px-5 py-4">Contact</th>
                <th className="px-5 py-4">Formation</th>
                <th className="px-5 py-4 text-center">Statut</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 && <tr><td colSpan={5} className="text-center py-14 text-slate-400">Aucun étudiant trouvé.</td></tr>}
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--color-brand-blue)] to-blue-400 text-white flex items-center justify-center text-sm font-black shadow-sm shrink-0">
                        {item.prenom[0]}{item.nom[0]}
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">{item.prenom} {item.nom}</div>
                        <div className="text-xs text-slate-400">{item.genre} · {item.niveau || "—"}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm">
                    <div className="flex items-center gap-1.5 text-slate-700"><Phone size={13} /> {item.phone}</div>
                    {item.email && <div className="flex items-center gap-1.5 text-slate-500 mt-0.5"><Mail size={13} /> {item.email}</div>}
                  </td>
                  <td className="px-5 py-4">
                    <span className="bg-orange-50 text-orange-600 px-2.5 py-1 rounded-lg text-xs font-bold border border-orange-100 flex items-center gap-1 w-fit">
                      <BookOpen size={12} /> {item.formation}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${STATUT_STYLE[item.statut] || ""}`}>{item.statut}</span>
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
        <div className="px-5 py-3 border-t border-slate-100 text-sm text-slate-500">{filtered.length} étudiant{filtered.length > 1 ? "s" : ""}</div>
      </div>

      {/* Modal Ajout / Édition */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">{editItem ? "Modifier l'étudiant" : "Ajouter un étudiant"}</h2>
              <button onClick={closeModal} className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl"><X size={22} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>}
              <div className="grid sm:grid-cols-2 gap-4">
                {[["Prénom *", "prenom", "text", "Mamadou"], ["Nom *", "nom", "text", "Sylla"]].map(([label, key, type, ph]) => (
                  <div key={key}>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
                    <input value={form[key]} onChange={e => setForm(p => ({...p, [key]: e.target.value}))} type={type} placeholder={ph}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition" />
                  </div>
                ))}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Téléphone *</label>
                  <input value={form.phone} onChange={e => setForm(p => ({...p, phone: e.target.value}))} type="tel" placeholder="+224 6XX XX XX XX"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
                  <input value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} type="email" placeholder="email@exemple.com"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Genre</label>
                  <select value={form.genre} onChange={e => setForm(p => ({...p, genre: e.target.value}))}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition">
                    <option>Masculin</option><option>Féminin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Niveau scolaire</label>
                  <input value={form.niveau} onChange={e => setForm(p => ({...p, niveau: e.target.value}))} type="text" placeholder="Ex: Bac+2"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Formation *</label>
                <select value={form.formation} onChange={e => setForm(p => ({...p, formation: e.target.value}))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition">
                  <option value="">-- Sélectionner --</option>
                  {FORMATIONS.map(f => <option key={f}>{f}</option>)}
                </select>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Statut</label>
                  <select value={form.statut} onChange={e => setForm(p => ({...p, statut: e.target.value}))}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition">
                    <option>En cours</option><option>Diplômé</option><option>Abandonné</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Date d'inscription</label>
                  <input value={form.dateInscription} onChange={e => setForm(p => ({...p, dateInscription: e.target.value}))} type="date"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition">Annuler</button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-[var(--color-brand-blue)] text-white font-bold hover:bg-blue-800 transition shadow-md">
                  {editItem ? "Enregistrer" : "Ajouter l'étudiant"}
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
            <h3 className="text-xl font-bold text-slate-800 mb-2">Supprimer cet étudiant ?</h3>
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
