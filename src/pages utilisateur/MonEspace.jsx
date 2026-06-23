import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Search, CheckCircle, ArrowRight, Clock, GraduationCap, DollarSign, FileText, Printer, Eye, X } from 'lucide-react';

// ── Composant Reçu ────────────────────────────────────────────────────────────
function PrintReceipt({ paiement, inscription, summary }) {
  const receiptNumber = `IBK-${new Date(paiement.date_paiement).getFullYear()}-${String(paiement.id).padStart(5, '0')}`;
  const fmt = (n) => Number(n || 0).toLocaleString('fr-FR');
  const tarif = Number(summary.tarif);
  const totalPaye = Number(summary.total_paye);
  const reste = Number(summary.reste_a_payer);
  const pct = tarif > 0 ? Math.round((totalPaye / tarif) * 100) : 0;

  return (
    <div id="receipt-print-area" style={{ fontFamily: "'Segoe UI', Arial, sans-serif", color: '#1e293b', background: '#fff', maxWidth: '780px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '3px solid #003DA5', paddingBottom: '20px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg,#003DA5,#0056e0)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: '900', fontSize: '16px' }}>IBK</span>
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '900', color: '#003DA5' }}>IBK TECH CENTER</h1>
              <p style={{ margin: 0, fontSize: '11px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Centre de Formation Professionnelle</p>
            </div>
          </div>
          <div style={{ fontSize: '12px', color: '#475569', lineHeight: '1.7' }}>
            <div>📍 Dixinn Centre 1, Rond-point Échangeur — Commune de Dixinn, Conakry, Guinée</div>
            <div>🗺️ H83J+V9M &nbsp;|&nbsp; 📞 +224 612 37 45 85 &nbsp;|&nbsp; 💬 +224 623 71 95 41</div>
            <div>✉️ ibktechcenter@gmail.com</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ background: '#003DA5', color: '#fff', padding: '6px 18px', borderRadius: '8px', display: 'inline-block', marginBottom: '10px', fontWeight: '900', fontSize: '18px', letterSpacing: '2px' }}>REÇU</div>
          <div style={{ fontSize: '13px', color: '#334155' }}>
            <div style={{ fontWeight: '800', fontSize: '14px', color: '#003DA5' }}>{receiptNumber}</div>
            <div>Émis le : {new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
            <div>Date : {new Date(paiement.date_paiement).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
        <div style={{ flex: 1, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
          <p style={{ margin: '0 0 6px', fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#003DA5' }}>Reçu de :</p>
          <p style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>{inscription.prenom} {inscription.nom}</p>
          {inscription.telephone && <p style={{ margin: '2px 0', fontSize: '12px', color: '#475569' }}>📞 {inscription.telephone}</p>}
          {inscription.email && <p style={{ margin: '2px 0', fontSize: '12px', color: '#475569' }}>✉️ {inscription.email}</p>}
          <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#475569' }}><strong>Formation :</strong> {summary.formation_nom}</p>
        </div>
        <div style={{ width: '200px', background: 'linear-gradient(135deg,#059669,#10b981)', borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
          <p style={{ margin: '0 0 4px', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.85 }}>Montant payé</p>
          <p style={{ margin: 0, fontSize: '26px', fontWeight: '900' }}>{fmt(paiement.montant)}</p>
          <p style={{ margin: '4px 0 0', fontSize: '14px', fontWeight: '700', opacity: 0.9 }}>GNF</p>
          <div style={{ marginTop: '8px', background: 'rgba(255,255,255,0.2)', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>
            {{ especes: 'Espèces', orange_money: 'Orange Money', mobile_money: 'Mobile Money' }[paiement.mode_paiement] || paiement.mode_paiement}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <div style={{ width: '260px', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
          <p style={{ margin: 0, background: '#f8fafc', padding: '8px 14px', borderBottom: '1px solid #e2e8f0', fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: '#64748b' }}>Récapitulatif du Compte</p>
          <div style={{ padding: '12px 14px' }}>
            {[['Coût total', tarif, '#0f172a'], ['Total versé', totalPaye, '#059669'], ['Reste à régler', reste, reste === 0 ? '#059669' : '#ea580c']].map(([lbl, val, clr]) => (
              <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #f1f5f9', fontSize: '12px' }}>
                <span style={{ color: '#64748b' }}>{lbl}</span>
                <span style={{ fontWeight: '700', color: clr }}>{fmt(val)} GNF</span>
              </div>
            ))}
            <div style={{ height: '5px', background: '#e2e8f0', borderRadius: '99px', margin: '8px 0 4px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#003DA5,#059669)' }} />
            </div>
            <p style={{ fontSize: '10px', color: '#94a3b8', textAlign: 'right', margin: 0 }}>{pct}% réglé</p>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '6px', marginTop: '40px', width: '180px', textAlign: 'center', fontSize: '11px', color: '#64748b' }}>Signature Administration</div>
        <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '6px', marginTop: '40px', width: '180px', textAlign: 'center', fontSize: '11px', color: '#64748b' }}>Signature Étudiant(e)</div>
      </div>
      <div style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 16px', textAlign: 'center', fontSize: '10px', color: '#64748b', lineHeight: '1.8' }}>
        <strong>IBK Tech Center</strong> — Dixinn Centre 1, Conakry, Guinée &nbsp;|&nbsp; 📞 +224 612 37 45 85 &nbsp;|&nbsp; ✉️ ibktechcenter@gmail.com<br />
        <em>Ce document officiel tient lieu de justificatif de paiement.</em>
      </div>
    </div>
  );
}

// ── Page Mon Espace Étudiant ──────────────────────────────────────────────────
const MonEspace = () => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [selectedInscription, setSelectedInscription] = useState(null);
  const [paiements, setPaiements] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loadingPaiements, setLoadingPaiements] = useState(false);
  const [previewPaiement, setPreviewPaiement] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setLoading(true);
    setError('');
    setData(null);
    setSelectedInscription(null);
    try {
      const res = await fetch(`/api/mon-espace?telephone=${encodeURIComponent(phone.trim())}`);
      if (!res.ok) throw new Error('Aucun compte trouvé pour ce numéro de téléphone.');
      const d = await res.json();
      setData(d);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadPaiements = async (insc) => {
    setSelectedInscription(insc);
    setLoadingPaiements(true);
    try {
      const res = await fetch(`/api/mon-espace/paiements/${insc.id}`);
      if (res.ok) {
        const d = await res.json();
        setPaiements(d.paiements);
        setSummary(d.summary);
      }
    } catch (e) { console.error(e); }
    finally { setLoadingPaiements(false); }
  };

  const handlePrint = (p) => {
    setPreviewPaiement(p);
    setTimeout(() => window.print(), 200);
  };

  const fmt = (n) => Number(n || 0).toLocaleString('fr-FR');

  return (
    <div className="pt-24 pb-20 bg-gradient-to-br from-blue-50 via-white to-orange-50 min-h-screen">
      {/* Print CSS */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #receipt-print-area, #receipt-print-area * { visibility: visible !important; }
          #receipt-print-area { position: fixed !important; left: 0 !important; top: 0 !important; width: 100% !important; padding: 30px !important; box-sizing: border-box; background: #fff !important; }
          @page { size: A4; margin: 1.5cm; }
        }
      `}</style>

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Espace Personnel
          </span>
          <h1 className="text-4xl font-bold mb-3">Mon Espace Étudiant</h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Consultez vos inscriptions, votre suivi de paiement et téléchargez vos reçus en saisissant votre numéro de téléphone.
          </p>
        </motion.div>

        {/* Search Box */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
            <Phone size={20} className="text-blue-600" /> Accéder à mon dossier
          </h2>
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Votre numéro de téléphone (+224...)"
                className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-base"
                required
              />
            </div>
            <button type="submit" disabled={loading}
              className="px-6 py-3.5 bg-[var(--color-brand-blue)] hover:bg-blue-800 disabled:opacity-60 text-white font-bold rounded-2xl transition shadow-md flex items-center gap-2">
              {loading ? 'Recherche...' : <><Search size={16} /> Rechercher</>}
            </button>
          </form>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">{error}</div>
          )}
        </motion.div>

        {/* Results */}
        {data && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Student Header */}
            <div className="bg-[var(--color-brand-blue)] text-white rounded-3xl p-6 mb-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/4 translate-x-1/4 blur-2xl" />
              <div className="relative z-10">
                <p className="text-blue-200 text-sm mb-1">Bienvenue,</p>
                <h2 className="text-2xl font-black">{data.prenom} {data.nom}</h2>
                <p className="text-blue-200 text-sm mt-1">📞 {data.telephone}</p>
              </div>
            </div>

            {/* Inscriptions */}
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <GraduationCap size={20} className="text-blue-600" /> Mes Inscriptions ({data.inscriptions?.length || 0})
            </h3>
            <div className="space-y-4">
              {(data.inscriptions || []).map(insc => (
                <div key={insc.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-lg">{insc.formation_nom}</h4>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                          insc.statut_paiement === 'solde' ? 'bg-emerald-100 text-emerald-700' :
                          insc.statut_paiement === 'partiel' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {insc.statut_paiement === 'solde' ? '✅ Soldé' :
                           insc.statut_paiement === 'partiel' ? '⏳ En cours de paiement' : '⏳ Non commencé'}
                        </span>
                        <span className="text-sm text-gray-500">
                          <strong>{fmt(insc.total_paye)}</strong> / {fmt(insc.tarif)} GNF
                        </span>
                      </div>
                      {/* Progress */}
                      <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden w-full max-w-xs">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all"
                          style={{ width: `${insc.tarif > 0 ? Math.round((insc.total_paye / insc.tarif) * 100) : 0}%` }} />
                      </div>
                    </div>
                    <button
                      onClick={() => loadPaiements(insc)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-brand-blue)] hover:bg-blue-800 text-white font-semibold rounded-xl transition shadow text-sm shrink-0"
                    >
                      <DollarSign size={15} /> Voir mes paiements
                    </button>
                  </div>

                  {/* Paiements Detail */}
                  {selectedInscription?.id === insc.id && (
                    <div className="border-t border-gray-100 bg-gray-50 p-5">
                      {loadingPaiements ? (
                        <p className="text-gray-500 text-sm">Chargement...</p>
                      ) : (
                        <>
                          {paiements.length === 0 ? (
                            <p className="text-gray-500 text-sm">Aucun paiement enregistré pour cette inscription.</p>
                          ) : (
                            <div className="space-y-3">
                              <h5 className="font-bold text-gray-700 text-sm mb-3 flex items-center gap-1">
                                <FileText size={15} /> Historique des versements
                              </h5>
                              {paiements.map(p => (
                                <div key={p.id} className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex items-center justify-between group">
                                  <div>
                                    <p className="font-bold text-emerald-600">{fmt(p.montant)} GNF</p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                      {new Date(p.date_paiement).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                                      {' · '}
                                      {{ especes: 'Espèces', orange_money: 'Orange Money', mobile_money: 'Mobile Money' }[p.mode_paiement] || p.mode_paiement}
                                    </p>
                                    {p.reference_paiement && <p className="text-xs text-gray-400 font-mono">Réf: {p.reference_paiement}</p>}
                                  </div>
                                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                    <button onClick={() => setPreviewPaiement(p)}
                                      className="text-blue-500 text-xs font-semibold flex items-center gap-1 px-3 py-1.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                                      <Eye size={13} /> Aperçu
                                    </button>
                                    <button onClick={() => handlePrint(p)}
                                      className="text-emerald-600 p-1.5 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition">
                                      <Printer size={14} />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {(!data.inscriptions || data.inscriptions.length === 0) && (
                <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                  <GraduationCap size={40} className="text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Aucune inscription trouvée pour ce numéro.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Receipt Preview Modal */}
      {previewPaiement && summary && selectedInscription && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl z-10">
              <h3 className="font-bold text-slate-800 flex items-center gap-2"><Eye size={18} className="text-blue-500" /> Aperçu du Reçu</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => handlePrint(previewPaiement)}
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--color-brand-blue)] text-white text-sm font-bold rounded-xl hover:bg-blue-800 transition">
                  <Printer size={15} /> Imprimer / PDF
                </button>
                <button onClick={() => setPreviewPaiement(null)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-8">
              <PrintReceipt paiement={previewPaiement} inscription={selectedInscription} summary={summary} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonEspace;
