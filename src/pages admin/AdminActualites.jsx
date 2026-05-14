import { useState } from 'react';
import { Plus, Edit, Trash2, X, Globe, EyeOff, Eye } from 'lucide-react';

const EMPTY_FORM = { titre: "", resume: "", contenu: "", date: new Date().toISOString().split("T")[0], publie: false, image: "" };

const INITIAL_ARTICLES = [
  { id: 1, titre: "Ouverture des inscriptions 2026", resume: "Les inscriptions pour la nouvelle session de formation sont officiellement ouvertes.", contenu: "Nous sommes ravis d'annoncer l'ouverture des inscriptions pour la session de formation 2026...", date: "2026-05-12", publie: true, image: "" },
  { id: 2, titre: "Nouveau partenariat avec l'Université", resume: "IBK TECH CENTER signe un accord de partenariat stratégique avec une grande université.", contenu: "Dans le cadre de notre mission...", date: "2026-05-05", publie: true, image: "" },
  { id: 3, titre: "Masterclass sur le Développement Mobile", resume: "Une journée de formation intensive dédiée au développement d'applications mobiles.", contenu: "Rejoignez-nous pour une masterclass exceptionnelle...", date: "2026-05-20", publie: false, image: "" },
];

export default function AdminActualites() {
  const [articles, setArticles] = useState(INITIAL_ARTICLES);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [preview, setPreview] = useState(null);

  const openAdd = () => { setEditItem(null); setForm({ ...EMPTY_FORM, date: new Date().toISOString().split("T")[0] }); setError(""); setShowModal(true); };
  const openEdit = (a) => { setEditItem(a); setForm({ ...a }); setError(""); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setError(""); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.titre || !form.resume) { setError("Le titre et le résumé sont obligatoires."); return; }
    if (editItem) {
      setArticles(prev => prev.map(a => a.id === editItem.id ? { ...form, id: editItem.id } : a));
    } else {
      setArticles(prev => [{ ...form, id: Date.now() }, ...prev]);
    }
    closeModal();
  };

  const togglePublie = (id) => setArticles(prev => prev.map(a => a.id === id ? { ...a, publie: !a.publie } : a));
  const confirmDelete = () => { setArticles(prev => prev.filter(a => a.id !== deleteId)); setDeleteId(null); };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Actualités & Blog</h1>
        <button onClick={openAdd} className="bg-[var(--color-brand-blue)] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-800 transition flex items-center gap-2 shadow-md">
          <Plus size={20} /> Rédiger un article
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(article => (
          <div key={article.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
            <div className={`h-32 flex items-center justify-center text-4xl font-black ${article.publie ? 'bg-gradient-to-br from-blue-600 to-blue-800' : 'bg-gradient-to-br from-slate-400 to-slate-600'} text-white/30 select-none`}>
              IBK
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-2 gap-2">
                <h3 className="font-bold text-slate-800 line-clamp-2 leading-snug">{article.titre}</h3>
                <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-bold ${article.publie ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                  {article.publie ? "Publié" : "Brouillon"}
                </span>
              </div>
              <p className="text-sm text-slate-500 line-clamp-2 mb-3 flex-1">{article.resume}</p>
              <p className="text-xs text-slate-400 mb-4">{article.date}</p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex gap-1">
                  <button onClick={() => setPreview(article)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Aperçu"><Eye size={17} /></button>
                  <button onClick={() => openEdit(article)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" title="Modifier"><Edit size={17} /></button>
                  <button onClick={() => setDeleteId(article.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer"><Trash2 size={17} /></button>
                </div>
                <button onClick={() => togglePublie(article.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${article.publie ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}>
                  {article.publie ? <><EyeOff size={14} /> Dépublier</> : <><Globe size={14} /> Publier</>}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Rédaction */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">{editItem ? "Modifier l'article" : "Nouvel Article"}</h2>
              <button onClick={closeModal} className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl"><X size={22} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Titre de l'article <span className="text-red-500">*</span></label>
                <input value={form.titre} onChange={e => setForm(p => ({...p, titre: e.target.value}))} type="text" placeholder="Ex: Ouverture des inscriptions 2026"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Résumé (affiché sur la liste) <span className="text-red-500">*</span></label>
                <textarea value={form.resume} onChange={e => setForm(p => ({...p, resume: e.target.value}))} rows={2} placeholder="Courte description de l'article..."
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Contenu complet</label>
                <textarea value={form.contenu} onChange={e => setForm(p => ({...p, contenu: e.target.value}))} rows={7} placeholder="Rédigez ici le contenu détaillé de l'article..."
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition resize-none" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Date de publication</label>
                  <input value={form.date} onChange={e => setForm(p => ({...p, date: e.target.value}))} type="date"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] bg-slate-50 focus:bg-white transition" />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input type="checkbox" checked={form.publie} onChange={e => setForm(p => ({...p, publie: e.target.checked}))} className="w-4 h-4 accent-[var(--color-brand-blue)]" />
                    <span className="text-sm font-semibold text-slate-700">Publier immédiatement</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition">Annuler</button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-[var(--color-brand-blue)] text-white font-bold hover:bg-blue-800 transition shadow-md">
                  {editItem ? "Enregistrer" : "Créer l'article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">Aperçu de l'article</h2>
              <button onClick={() => setPreview(null)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl"><X size={22} /></button>
            </div>
            <div className="p-6">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${preview.publie ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>{preview.publie ? "Publié" : "Brouillon"} · {preview.date}</span>
              <h2 className="text-2xl font-black text-slate-800 mt-4 mb-3">{preview.titre}</h2>
              <p className="text-[var(--color-brand-orange)] font-semibold text-sm mb-6 italic">{preview.resume}</p>
              <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">{preview.contenu || "Aucun contenu rédigé."}</div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4"><Trash2 size={28} className="text-red-500" /></div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Supprimer cet article ?</h3>
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
