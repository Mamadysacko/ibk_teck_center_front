import { Users, BookOpen, Newspaper, TrendingUp, Activity, UserCheck } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: "Total Étudiants", value: "245", icon: Users, color: "bg-blue-500", trend: "+12%" },
    { title: "Formations Actives", value: "18", icon: BookOpen, color: "bg-[var(--color-brand-orange)]", trend: "+2" },
    { title: "Nouvelles Inscriptions", value: "32", icon: UserCheck, color: "bg-emerald-500", trend: "+5%" },
    { title: "Actualités Publiées", value: "45", icon: Newspaper, color: "bg-purple-500", trend: "+8%" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Tableau de bord</h1>
        <button className="bg-[var(--color-brand-blue)] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 shadow-md shadow-blue-500/20">
          <Activity size={18} /> Rapport Complet
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3.5 rounded-xl text-white ${stat.color} shadow-lg group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <span className="flex items-center gap-1 text-sm font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                <TrendingUp size={14} /> {stat.trend}
              </span>
            </div>
            <h3 className="text-slate-500 font-medium text-sm mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Dernières Inscriptions</h2>
            <button className="text-[var(--color-brand-blue)] text-sm font-semibold hover:underline">Voir tout</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="text-sm font-semibold text-slate-500 border-b border-slate-100">
                  <th className="pb-3 px-4">Nom de l'étudiant</th>
                  <th className="pb-3 px-4">Formation</th>
                  <th className="pb-3 px-4">Date</th>
                  <th className="pb-3 px-4 text-center">Statut</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { name: "Mamadou Sylla", course: "Développement Web", date: "Aujourd'hui", status: "En attente", color: "bg-amber-50 text-amber-600 border border-amber-200" },
                  { name: "Fatoumata Barry", course: "Bureautique", date: "Hier", status: "Validé", color: "bg-emerald-50 text-emerald-600 border border-emerald-200" },
                  { name: "Ibrahima Camara", course: "Maintenance", date: "Il y a 2 jours", status: "Validé", color: "bg-emerald-50 text-emerald-600 border border-emerald-200" },
                  { name: "Aissatou Diallo", course: "Design Graphique", date: "Il y a 3 jours", status: "Rejeté", color: "bg-red-50 text-red-600 border border-red-200" }
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-800">{row.name}</td>
                    <td className="py-4 px-4 text-slate-600">{row.course}</td>
                    <td className="py-4 px-4 text-slate-500">{row.date}</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${row.color}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[var(--color-brand-blue)] text-white p-8 rounded-2xl shadow-xl flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[var(--color-brand-orange)]/20 rounded-full blur-2xl -translate-x-1/4 translate-y-1/4"></div>
          
          <h2 className="text-xl font-bold mb-6 relative z-10">Actions Rapides</h2>
          <div className="space-y-4 relative z-10 flex-1">
            <button className="w-full bg-white/10 hover:bg-white/20 px-5 py-3.5 rounded-xl flex items-center justify-between transition-colors border border-white/10 backdrop-blur-sm">
              <span className="font-medium">Ajouter une formation</span>
              <BookOpen size={18} className="text-orange-300" />
            </button>
            <button className="w-full bg-white/10 hover:bg-white/20 px-5 py-3.5 rounded-xl flex items-center justify-between transition-colors border border-white/10 backdrop-blur-sm">
              <span className="font-medium">Publier une actualité</span>
              <Newspaper size={18} className="text-orange-300" />
            </button>
            <div className="mt-auto pt-6">
              <button className="w-full bg-gradient-to-r from-[var(--color-brand-orange)] to-orange-500 hover:from-orange-500 hover:to-orange-600 px-5 py-4 rounded-xl flex items-center justify-between transition-all shadow-lg shadow-orange-500/30 group">
                <span className="font-bold">Valider les inscriptions</span>
                <span className="bg-white text-orange-600 px-2 py-0.5 rounded-md text-xs font-black group-hover:scale-110 transition-transform">3</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
