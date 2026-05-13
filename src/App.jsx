import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Accueil from './pages/Accueil';
import APropos from './pages/APropos';
import Services from './pages/Services';
import Formations from './pages/Formations';

import Actualites from './pages/Actualites';
import Contact from './pages/Contact';
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite';
import MentionsLegales from './pages/MentionsLegales';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;