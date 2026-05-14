import { useState } from 'react';
import { Search, Plus, CheckCircle, XCircle, Eye, X, UserPlus, Phone, Mail, BookOpen, Calendar, Download, Filter } from 'lucide-react';

const FORMATIONS = [
  "Informatique de base",
  "Bureautique (Word, Excel, PowerPoint)",
  "Développement Web Fullstack",
  "Développement Mobile",
  "Maintenance Informatique",
  "Design Graphique",
  "Cours d'Anglais",
  "Réseaux & Systèmes",
];

const INITIAL_DATA = [
  { id: 1, prenom: "Mamadou", nom: "Sylla", email: "m.sylla@email.com", phone: "+224 622 00 11 22", formation: "Développement Web Fullstack", date: "2026-05-13", status: "En attente", genre: "Masculin", niveau: "Bac+2", source: "Site web", notes: "" },
  { id: 2, prenom: "Aissatou", nom: "Diallo", email: "adiallo@email.com", phone: "+224 621 33 44 55", formation: "Bureautique (Word, Excel, PowerPoint)", date: "2026-05-12", status: "En attente", genre: "Féminin", niveau: "Terminale", source: "WhatsApp", notes: "" },
  { id: 3, prenom: "Ibrahima", nom: "Camara", email: "ib.cam@email.com", phone: "+224 664 99 88 77", formation: "Maintenance Informatique", date: "2026-05-10", status: "Validé", genre: "Masculin", niveau: "Bac+1", source: "Recommandation", notes: "Très motivé" },
  { id: 4, prenom: "Fatoumata", nom: "Barry", email: "f.barry@email.com", phone: "+224 655 11 22 33", formation: "Design Graphique", date: "2026-05-09", status: "Rejeté", genre: "Féminin", niveau: "Lycée", source: "Facebook", notes: "Recontacter en septembre" },
];

const STATUS_STYLE = {
  "Validé":     "bg-emerald-50 text-emerald-600 border border-emerald-200",
  "En attente": "bg-amber-50 text-amber-600 border border-amber-200",
  "Rejeté":     "bg-red-50 text-red-600 border border-red-200",
};

const EMPTY_FORM = { prenom: "", nom: "", email: "", phone: "", formation: "", genre: "Masculin", niveau: "", source: "Site web", notes: "" };

export default function AdminInscriptions() {
  const [inscriptions, setInscriptions] = useState(INITIAL_DATA);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tous");
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");

  const filtered = inscriptions.filter(i => {
    const matchSearch = `${i.prenom} ${i.nom} ${i.email} ${i.phone} ${i.formation}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "Tous" || i.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const counts = {
    total: inscriptions.length,
    attente: inscriptions.filter(i => i.status === "En attente").length,
    valide: inscriptions.filter(i => i.status === "Validé").length,
    rejete: inscriptions.filter(i => i.status === "Rejeté").length,
  };

  const setStatus = (id, status) => {
    setInscriptions(prev => prev.map(i => i.id === id ? { ...i, status } : i));
    if (viewItem?.id === id) setViewItem(prev => ({ ...prev, status }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.prenom || !form.nom || !form.phone || !form.formation) {
      setFormError("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    const newItem = { ...form, id: Date.now(), date: new Date().toISOString().split("T")[0], status: "En attente" };
    setInscriptions(prev => [newItem, ...prev]);
    setForm(EMPTY_FORM);
    setFormError("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Gestion des Inscriptions</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[var(--color-brand-orange)] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-orange-600 transition-colors flex items-center gap-2 shadow-md"
        >
          <UserPlus size={20} /> Nouvelle inscription
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total", value: counts.total, color: "border-slate-300 bg-white", text: "text-slate-800" },
          { label: "En attente", value: counts.attente, color: "border-amber-200 bg-amber-50", text: "text-amber-600" },
          { label: "Validés", value: counts.valide, color: "border-emerald-200 bg-emerald-50", text: "text-emerald-600" },
          { label: "Rejetés", value: counts.rejete, color: "border-red-200 bg-red-50", text: "text-red-600" },
        ].map((s, i) => (
          <div key={i} className={`rounded-2xl border p-5 ${s.color}`}>
            <p className="text-slate-500 text-sm font-medium mb-1">{s.label}</p>
            <p className={`text-3xl font-bold ${s.text}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher par nom, email, téléphone, formation..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:bg-white transition"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["Tous", "En attente", "Validé", "Rejeté"].map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${filterStatus === s ? 'bg-[var(--color-brand-blue)] text-white border-[var(--color-brand-blue)]' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[780px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
                <th className="px-5 py-4 font-semibold">Candidat</th>
                <th className="px-5 py-4 font-semibold">Contact</th>
                <th className="px-5 py-4 font-semibold">Formation</th>
                <th className="px-5 py-4 font-semibold">Date</th>
                <th className="px-5 py-4 font-semibold text-center">Statut</th>
                <th className="px-5 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center py-16 text-slate-400">Aucune inscription trouvée.</td></tr>
              )}
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="font-bold text-slate-800">{item.prenom} {item.nom}</div>
                    <div className="text-xs text-slate-400">{item.genre} · {item.niveau}</div>
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
                  <td className="px-5 py-4 text-slate-500 text-sm">
                    <div className="flex items-center gap-1"><Calendar size={13} /> {item.date}</div>
                    <div className="text-xs text-slate-400 mt-0.5">via {item.source}</div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${STATUS_STYLE[item.status]}`}>{item.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <button onClick={() => setViewItem(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Voir détails">
                        <Eye size={17} />
                      </button>
                      {item.status === "En attente" && (
                        <>
                          <button onClick={() => setStatus(item.id, "Validé")} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Valider">
                            <CheckCircle size={17} />
                          </button>
                          <button onClick={() => setStatus(item.id, "Rejeté")} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Rejeter">
                            <XCircle size={17} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-slate-100 text-sm text-slate-500">
          {filtered.length} résultat{filtered.length > 1 ? "s" : ""} affiché{filtered.length > 1 ? "s" : ""}
        </div>
      </div>

      {/* ===== MODAL AJOUT ===== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">Nouvelle Inscription</h2>
              <button onClick={() => { setShowAddModal(false); setFormError(""); setForm(EMPTY_FORM); }} className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition-colors">
                <X size={22} />
              </button>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-5">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{formError}</div>
              )}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Prénom <span className="text-red-500">*</span></label>
                  <input value={form.prenom} onChange={e => setForm(p => ({...p, prenom: e.target.value}))} type="text" placeholder="ex: Mamadou" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nom <span className="text-red-500">*</span></label>
                  <input value={form.nom} onChange={e => setForm(p => ({...p, nom: e.target.value}))} type="text" placeholder="ex: Sylla" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Téléphone <span className="text-red-500">*</span></label>
                  <input value={form.phone} onChange={e => setForm(p => ({...p, phone: e.target.value}))} type="tel" placeholder="+224 6XX XX XX XX" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
                  <input value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} type="email" placeholder="email@exemple.com" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Genre</label>
                  <select value={form.genre} onChange={e => setForm(p => ({...p, genre: e.target.value}))} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition">
                    <option>Masculin</option>
                    <option>Féminin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Niveau scolaire</label>
                  <input value={form.niveau} onChange={e => setForm(p => ({...p, niveau: e.target.value}))} type="text" placeholder="ex: Terminale, Bac+2..." className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Formation souhaitée <span className="text-red-500">*</span></label>
                <select value={form.formation} onChange={e => setForm(p => ({...p, formation: e.target.value}))} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition">
                  <option value="">-- Sélectionner une formation --</option>
                  {FORMATIONS.map(f => <option key={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Source (comment a-t-il connu le centre ?)</label>
                <select value={form.source} onChange={e => setForm(p => ({...p, source: e.target.value}))} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition">
                  {["Site web", "WhatsApp", "Facebook", "Recommandation", "Affiche / Flyer", "Autre"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Notes (optionnel)</label>
                <textarea value={form.notes} onChange={e => setForm(p => ({...p, notes: e.target.value}))} rows={3} placeholder="Informations complémentaires sur ce candidat..." className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition resize-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setShowAddModal(false); setFormError(""); setForm(EMPTY_FORM); }} className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition">Annuler</button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-[var(--color-brand-orange)] text-white font-bold hover:bg-orange-600 transition shadow-md">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== MODAL DÉTAILS ===== */}
      {viewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">Fiche d'Inscription</h2>
              <button onClick={() => setViewItem(null)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition-colors">
                <X size={22} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[var(--color-brand-blue)] to-blue-400 text-white flex items-center justify-center text-2xl font-black shadow">
                  {viewItem.prenom[0]}{viewItem.nom[0]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{viewItem.prenom} {viewItem.nom}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${STATUS_STYLE[viewItem.status]}`}>{viewItem.status}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: "Téléphone", value: viewItem.phone },
                  { label: "Email", value: viewItem.email || "—" },
                  { label: "Genre", value: viewItem.genre },
                  { label: "Niveau", value: viewItem.niveau || "—" },
                  { label: "Source", value: viewItem.source },
                  { label: "Date d'inscription", value: viewItem.date },
                ].map((row, i) => (
                  <div key={i} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <p className="text-slate-500 text-xs font-semibold mb-0.5">{row.label}</p>
                    <p className="text-slate-800 font-semibold">{row.value}</p>
                  </div>
                ))}
              </div>
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                <p className="text-xs text-orange-500 font-bold uppercase mb-1">Formation demandée</p>
                <p className="text-orange-800 font-bold">{viewItem.formation}</p>
              </div>
              {viewItem.notes && (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">Notes</p>
                  <p className="text-slate-700">{viewItem.notes}</p>
                </div>
              )}
              {viewItem.status === "En attente" && (
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStatus(viewItem.id, "Validé")} className="flex-1 py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition flex items-center justify-center gap-2">
                    <CheckCircle size={18} /> Valider
                  </button>
                  <button onClick={() => setStatus(viewItem.id, "Rejeté")} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition flex items-center justify-center gap-2">
                    <XCircle size={18} /> Rejeter
                  </button>
                </div>
              )}
              <button onClick={() => setViewItem(null)} className="w-full py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition">Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
