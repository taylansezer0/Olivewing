import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X, Instagram, Facebook, Twitter, ChevronRight } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  cartCount: number;
}

const Layout: React.FC<LayoutProps> = ({ children, cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  // Scroll detection for sticky header transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linksLeft = [
    { name: 'KOLEKSİYONLAR', path: '/products' },
    { name: 'GÜNEŞ', path: '/collections/gunes-gozlukleri' },
  ];
  
  const linksRight = [
    { name: 'MAVİ IŞIK', path: '/collections/mavi-isik-korumali-gozlukler' },
    { name: 'HİKAYEMİZ', path: '#' },
  ];

  const headerClass = isHome && !scrolled && !isMenuOpen
    ? 'bg-transparent text-white py-8' 
    : 'bg-white text-black py-4 shadow-sm';

  const logoClass = isHome && !scrolled && !isMenuOpen ? 'text-white' : 'text-black';
  const iconClass = isHome && !scrolled && !isMenuOpen ? 'text-white hover:text-gold' : 'text-black hover:text-gold';

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-gold selection:text-white">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${headerClass}`}>
        <div className="max-w-custom mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center relative">
            
            {/* Desktop Left Menu */}
            <div className="hidden lg:flex space-x-8 w-1/3">
              {linksLeft.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className={`text-xs font-medium tracking-luxury hover:text-gold transition-colors duration-300`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Logo (Centered) */}
            <div className="flex-shrink-0 cursor-pointer w-1/3 text-center z-20" onClick={() => navigate('/')}>
               <h1 className={`font-serif text-3xl lg:text-4xl tracking-[0.2em] font-medium ${logoClass}`}>
                 OLIVEWING
               </h1>
               <span className={`block text-[0.6rem] tracking-[0.4em] mt-1 opacity-80 ${logoClass}`}>EXCLUSIVE</span>
            </div>

            {/* Desktop Right Menu & Icons */}
            <div className="hidden lg:flex items-center justify-end space-x-8 w-1/3">
               {linksRight.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className={`text-xs font-medium tracking-luxury hover:text-gold transition-colors duration-300`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center space-x-6 border-l border-gray-300/30 pl-6">
                <button className={`transition-colors ${iconClass}`}>
                  <Search size={18} strokeWidth={1.5} />
                </button>
                <Link to="/login" className={`transition-colors ${iconClass}`}>
                  <User size={18} strokeWidth={1.5} />
                </Link>
                <Link to="/cart" className={`transition-colors relative ${iconClass}`}>
                  <ShoppingBag size={18} strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gold text-white text-[0.6rem] h-4 w-4 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden absolute left-0 z-30">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={logoClass}>
                {isMenuOpen ? <X size={24} className="text-black" /> : <Menu size={24} />}
              </button>
            </div>
            
            {/* Mobile Cart Icon (Absolute Right) */}
            <div className="lg:hidden absolute right-0 z-30">
               <Link to="/cart" className={logoClass}>
                  <ShoppingBag size={20} strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gold text-white text-[0.5rem] h-3 w-3 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
               </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu Full Screen Overlay */}
        <div className={`fixed inset-0 bg-white z-10 transition-transform duration-500 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden pt-32 px-8`}>
            <div className="flex flex-col space-y-6">
              {[...linksLeft, ...linksRight].map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xl font-serif text-black border-b border-gray-100 pb-4 flex justify-between items-center"
                >
                  {link.name}
                  <ChevronRight size={16} className="text-gray-400" />
                </Link>
              ))}
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-xl font-serif text-black border-b border-gray-100 pb-4 flex justify-between items-center">
                 GİRİŞ YAP
              </Link>
            </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer - Minimalist Luxury Style */}
      <footer className="bg-black text-white pt-24 pb-12 border-t border-gray-900">
        <div className="max-w-custom mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 mb-16">
            <div className="md:col-span-1">
              <h3 className="font-serif text-2xl tracking-[0.1em] mb-6">OLIVEWING</h3>
              <p className="text-gray-400 text-sm font-light leading-relaxed max-w-xs">
                Mükemmeliyetçilik ve estetiğin buluşma noktası. Gözleriniz için en iyisini tasarlıyoruz.
              </p>
            </div>
            
            <div>
              <h4 className="text-xs font-bold tracking-luxury text-gold mb-8">KEŞFET</h4>
              <ul className="space-y-4 text-sm font-light text-gray-300">
                <li><Link to="/collections/gunes-gozlukleri" className="hover:text-gold transition-colors">Güneş Koleksiyonu</Link></li>
                <li><Link to="/collections/mavi-isik-korumali-gozlukler" className="hover:text-gold transition-colors">Ofis Serisi</Link></li>
                <li><Link to="/collections/anti-emf-gozlukler" className="hover:text-gold transition-colors">Anti-EMF</Link></li>
                <li><Link to="/products" className="hover:text-gold transition-colors">Tüm Ürünler</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-luxury text-gold mb-8">MÜŞTERİ HİZMETLERİ</h4>
              <ul className="space-y-4 text-sm font-light text-gray-300">
                <li><a href="#" className="hover:text-gold transition-colors">Sipariş Takibi</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">İade ve Değişim</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Sıkça Sorulan Sorular</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Bize Ulaşın</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-luxury text-gold mb-8">BÜLTEN</h4>
              <p className="text-gray-400 text-sm mb-6 font-light">
                Yeni koleksiyonlardan ve özel davetlerden haberdar olun.
              </p>
              <div className="flex border-b border-white/20 pb-2">
                <input 
                  type="email" 
                  placeholder="E-posta adresiniz" 
                  className="bg-transparent w-full outline-none text-white placeholder-gray-600 text-sm font-light"
                />
                <button className="text-xs uppercase tracking-widest text-gold hover:text-white transition-colors">
                  Kayıt Ol
                </button>
              </div>
              <div className="flex space-x-6 mt-8 text-gray-400">
                <Instagram size={18} className="hover:text-white cursor-pointer transition-colors" />
                <Twitter size={18} className="hover:text-white cursor-pointer transition-colors" />
                <Facebook size={18} className="hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[0.65rem] text-gray-500 uppercase tracking-widest">
            <p>&copy; 2024 OLIVEWING EXCLUSIVE. ALL RIGHTS RESERVED.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
               <span>Gizlilik Politikası</span>
               <span>Kullanım Koşulları</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;