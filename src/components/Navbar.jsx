import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import logo from '../assets/logo.jpg'; // Ajustez le chemin si nécessaire

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'À propos', path: '/a-propos' },
    { name: 'Services', path: '/services' },
    { name: 'Formations', path: '/formations' },
    { name: 'Actualités', path: '/actualites' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile lors du changement de page
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={clsx(
        'fixed w-full z-50 transition-all duration-500',
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg py-3'
          : 'bg-white py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="IBK Tech Center"
              className="h-11 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <span className="font-heading font-bold text-2xl tracking-tighter   ">
                IBK <span className="text-[var(--color-brand-orange)]">TECH</span> CENTER
              </span>
              <p className="text-[10px] text-gray-500 -mt-1">Excellence technologique</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={clsx(
                  'relative font-medium text-sm transition-all duration-300 py-2',
                  location.pathname === link.path
                    ? 'text-[var(--color-brand-blue)]'
                    : 'text-gray-600 hover:  '
                )}
              >
                {link.name}
                {/* Soulignement animé */}
                <span
                  className={clsx(
                    'absolute bottom-0 left-0 h-0.5 bg-[var(--color-brand-blue)] transition-all duration-300',
                    location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  )}
                />
              </Link>
            ))}
          </div>

          {/* CTA Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/contact"
              className="px-6 py-2.5 bg-[var(--color-brand-blue)] hover:bg-blue-700 text-white font-medium rounded-full transition-all duration-300 text-sm shadow-sm hover:shadow-md"
            >
              Nous contacter
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 text-gray-700 hover:   transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          'md:hidden absolute w-full bg-white border-t shadow-xl transition-all duration-400 ease-out overflow-hidden',
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-6 py-8 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={clsx(
                'block px-5 py-4 text-base font-medium rounded-2xl transition-all',
                location.pathname === link.path
                  ? 'bg-blue-50 text-[var(--color-brand-blue)]'
                  : 'hover:bg-gray-50 text-gray-700'
              )}
            >
              {link.name}
            </Link>
          ))}

          {/* CTA Mobile */}
          <Link
            to="/contact"
            className="block mt-6 mx-5 text-center py-4 bg-[var(--color-brand-blue)] text-white font-semibold rounded-2xl"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;