import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle
} from 'lucide-react';

// Import du logo
import logoIBK from '../assets/logo.jpg';     // ←←← CORRECTION ICI

const Footer = () => {
  return (
<footer className="relative bg-slate-50 text-gray-800 pt-20 pb-10 overflow-hidden border-t border-blue-200">
      {/* Accent Top Border with Blue and Orange */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[var(--color-brand-blue)] via-blue-400 to-[var(--color-brand-orange)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand / Logo */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img 
                src={logoIBK} 
                alt="IBK Tech Center Logo" 
                className="h-14 w-auto"   // Ajuste la taille selon ton goût
              />
            </Link>
            
            <p className="text-gray-900 text-sm leading-relaxed">
              La technologie au service de votre réussite. Centre de formation et de services numériques professionnels à Conakry.
            </p>

            {/* Réseaux Sociaux - Style Clair */}
            <div className="flex gap-4 pt-6">
              {[
                { 
                  href: "https://facebook.com/IBKTECHCENTER", 
                  bg: "hover:bg-[#1877F2] bg-blue-50 text-[var(--color-brand-blue)]", 
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" stroke="none" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> 
                },
                { 
                  href: "https://instagram.com/ibktechcenter", 
                  bg: "hover:bg-gradient-to-tr hover:from-[#f56040] hover:via-[#c13584] hover:to-[#405de6] bg-orange-50 text-[var(--color-brand-orange)]", 
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> 
                },
                { 
                  href: "https://tiktok.com/@ibktechcenter", 
                  bg: "hover:bg-black bg-gray-100 text-gray-800", 
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19.589 6.686a4.943 4.943 0 0 1-3.476-1.409V18.15a3.5 3.5 0 1 1-3.5-3.5V9.5a7 7 0 0 0 7 7v-2.5a4.94 4.94 0 0 1 3.476-1.409Z"/></svg> 
                },
                { 
                  href: "https://youtube.com/@ibktechcenter", 
                  bg: "hover:bg-[#FF0000] bg-red-50 text-red-600", 
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg> 
                }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`w-11 h-11 rounded-xl flex items-center justify-center ${social.bg} hover:text-white hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-sm border border-gray-100`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Liens Rapides */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-[var(--color-brand-blue)] relative inline-block pb-2 after:content-[''] after:absolute after:w-12 after:h-1 after:bg-[var(--color-brand-orange)] after:bottom-0 after:left-0">
              Liens Rapides
            </h3>
            <ul className="space-y-3 text-gray-600 font-medium">
              <li><Link to="/a-propos" className="hover:text-[var(--color-brand-orange)] transition-colors">À propos de nous</Link></li>
              <li><Link to="/services" className="hover:text-[var(--color-brand-orange)] transition-colors">Nos Services</Link></li>
              <li><Link to="/formations" className="hover:text-[var(--color-brand-orange)] transition-colors">Nos Formations</Link></li>
              <li><Link to="/ecoles" className="hover:text-[var(--color-brand-orange)] transition-colors">Solutions pour Écoles</Link></li>
              <li><Link to="/actualites" className="hover:text-[var(--color-brand-orange)] transition-colors">Actualités</Link></li>
            </ul>
          </div>

          {/* Expertises */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-[var(--color-brand-blue)] relative inline-block pb-2 after:content-[''] after:absolute after:w-12 after:h-1 after:bg-[var(--color-brand-orange)] after:bottom-0 after:left-0">
              Expertises
            </h3>
            <ul className="space-y-3 text-gray-600 font-medium">
              <li>Développement Web & Applications</li>
              <li>Maintenance & Support IT</li>
              <li>Digitalisation des Entreprises</li>
              <li>Design Graphique & Communication</li>
              <li>Formation en Informatique</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-[var(--color-brand-blue)] relative inline-block pb-2 after:content-[''] after:absolute after:w-12 after:h-1 after:bg-[var(--color-brand-orange)] after:bottom-0 after:left-0">
              Nous Contacter
            </h3>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-3 group">
                <MapPin size={20} className="text-[var(--color-brand-orange)] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-gray-800 font-semibold">Dixinn Centre 1</p>
                  <p className="text-gray-600">Rond-point Échangeur</p>
                  <p className="text-gray-600">Commune de Dixinn, Conakry - Guinée</p>
                  <p className="text-[var(--color-brand-orange)] text-xs mt-1 font-medium">📍 H83J + V9M</p>
                </div>
              </li>

              <li className="flex items-center gap-3 group">
                <Phone size={20} className="text-[var(--color-brand-orange)] shrink-0 group-hover:scale-110 transition-transform" />
                <a href="tel:+224612374585" className="text-gray-600 hover:text-[var(--color-brand-blue)] font-medium transition-colors">
                  +224 612 37 45 85
                </a>
              </li>

              <li className="flex items-center gap-3 group">
                <MessageCircle size={20} className="text-[var(--color-brand-orange)] shrink-0 group-hover:scale-110 transition-transform" />
                <a href="https://wa.me/224623719541" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[var(--color-brand-blue)] font-medium transition-colors">
                  WhatsApp : +224 623 71 95 41
                </a>
              </li>

              <li className="flex items-center gap-3 group">
                <Mail size={20} className="text-[var(--color-brand-orange)] shrink-0 group-hover:scale-110 transition-transform" />
                <a href="mailto:ibktechcenter@gmail.com" className="text-gray-600 hover:text-[var(--color-brand-blue)] font-medium transition-colors">
                  ibktechcenter@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Style Clair */}
        <div className="border-t border-gray-200 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <p className="text-gray-500 font-medium">
            &copy; {new Date().getFullYear()} <span className="text-[var(--color-brand-blue)] font-bold">IBK Tech Center</span>. Tous droits réservés.
          </p>
          <div className="flex gap-8 text-gray-500 font-medium">
            <Link to="/politique-de-confidentialite" className="hover:text-[var(--color-brand-orange)] transition-colors">Politique de confidentialité</Link>
            <Link to="/mentions-legales" className="hover:text-[var(--color-brand-orange)] transition-colors">Mentions légales</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;