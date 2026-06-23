import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Accueil from './pages utilisateur/Accueil';
import APropos from './pages utilisateur/APropos';
import Services from './pages utilisateur/Services';
import Formations from './pages utilisateur/Formations';
import Inscription from './pages utilisateur/inscription';
import Actualites from './pages utilisateur/Actualites';
import Contact from './pages utilisateur/Contact';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Accueil />} />
          <Route path="a-propos" element={<APropos />} />
          <Route path="services" element={<Services />} />
          <Route path="formations" element={<Formations />} />
          <Route path="inscription" element={<Inscription />} />
          <Route path="actualites" element={<Actualites />} />
          <Route path="contact" element={<Contact />} />
          {/* Catch all route - 404 can go here if needed */}
          <Route path="*" element={<Accueil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;