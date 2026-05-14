import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Accueil from './pages utilisateur/Accueil';
import APropos from './pages utilisateur/APropos';
import Services from './pages utilisateur/Services';
import Formations from './pages utilisateur/Formations';

import Actualites from './pages utilisateur/Actualites';
import Contact from './pages utilisateur/Contact';
import PolitiqueConfidentialite from './pages utilisateur/PolitiqueConfidentialite';
import MentionsLegales from './pages utilisateur/MentionsLegales';

// Imports Admin
import AdminLayout from './pages admin/AdminLayout';
import Dashboard from './pages admin/Dashboard';
import AdminFormations from './pages admin/AdminFormations';
import AdminActualites from './pages admin/AdminActualites';
import AdminInscriptions from './pages admin/AdminInscriptions';
import AdminEtudiants from './pages admin/AdminEtudiants';
import AdminServices from './pages admin/AdminServices';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Accueil />} />
          <Route path="a-propos" element={<APropos />} />
          <Route path="services" element={<Services />} />
          <Route path="formations" element={<Formations />} />

          <Route path="actualites" element={<Actualites />} />
          <Route path="contact" element={<Contact />} />
          <Route path="politique-de-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="mentions-legales" element={<MentionsLegales />} />
          {/* Catch all route - 404 can go here if needed */}
          <Route path="*" element={<Accueil />} />
        </Route>

        {/* Routes Administration */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="formations" element={<AdminFormations />} />
          <Route path="actualites" element={<AdminActualites />} />
          <Route path="inscriptions" element={<AdminInscriptions />} />
          <Route path="etudiants" element={<AdminEtudiants />} />
          <Route path="services" element={<AdminServices />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;