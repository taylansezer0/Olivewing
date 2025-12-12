
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollGlassesAnimation from '../components/ScrollGlassesAnimation';
import { 
  HERO_MAN_COMPUTER,
  OFFICE_DUO_IMAGE, 
  NIGHT_DRIVING_IMAGE, 
  WOMAN_READING_IMAGE, 
  OUTDOOR_COUPLE_IMAGE,
  WOMAN_COMPUTER_IMAGE
} from '../constants';

const FullScreenBanner: React.FC<{
  image: string;
  title: string;
  subtitle: string;
  link: string;
  align?: 'left' | 'center' | 'right';
  overlayOpacity?: string;
}> = ({ image, title, subtitle, link, align = 'center', overlayOpacity = 'bg-black/20' }) => {
  
  let alignClass = 'items-center text-center';
  if (align === 'left') alignClass = 'items-start text-left pl-6 md:pl-24';
  if (align === 'right') alignClass = 'items-end text-right pr-6 md:pr-24';

  return (
    <div className="relative w-full h-screen overflow-hidden group">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[3000ms] group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className={`absolute inset-0 ${overlayOpacity}`} />
      
      {/* Content */}
      <div className={`absolute inset-0 flex flex-col justify-center ${alignClass} text-white z-10 p-6`}>
        <h2 className="text-4xl md:text-7xl font-serif font-light mb-4 leading-tight opacity-0 animate-[fadeIn_1s_ease-out_forwards] drop-shadow-lg">
          {title}
        </h2>
        <p className="text-sm md:text-lg font-light tracking-[0.2em] mb-8 max-w-xl opacity-0 animate-[fadeIn_1s_ease-out_forwards] drop-shadow-md" style={{animationDelay: '0.3s'}}>
          {subtitle}
        </p>
        <Link 
          to={link}
          className="inline-flex items-center px-8 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-white transition-colors duration-300 opacity-0 animate-[fadeIn_1s_ease-out_forwards] shadow-xl"
          style={{animationDelay: '0.6s'}}
        >
          Keşfet <ArrowRight size={16} className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

const SplitBanner: React.FC<{
  image: string;
  title: string;
  subtitle: string;
  link: string;
}> = ({ image, title, subtitle, link }) => (
  <div className="w-full md:w-1/2 h-full relative group overflow-hidden">
     <div 
      className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-110"
      style={{ backgroundImage: `url(${image})` }}
     />
     <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500" />
     <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 text-white z-10">
        <h3 className="text-3xl md:text-4xl font-serif mb-4 drop-shadow-lg">{title}</h3>
        <p className="text-xs tracking-widest mb-8 border-b border-white/50 pb-2 drop-shadow-md">{subtitle}</p>
        <Link 
          to={link} 
          className="px-6 py-2 border border-white text-white text-xs font-bold uppercase hover:bg-white hover:text-black transition-all duration-300"
        >
          İncele
        </Link>
     </div>
  </div>
);

const Home: React.FC = () => {
  return (
    <div className="w-full bg-black">
      
      {/* 1. HERO - OFFICE DUO */}
      <FullScreenBanner 
        image={OFFICE_DUO_IMAGE}
        title="OLIVEWING EXCLUSIVE"
        subtitle="Zarafetin ve netliğin mükemmel uyumu."
        link="/products"
        align="center"
        overlayOpacity="bg-black/30"
      />

      {/* 2. SPLIT - MAN & WOMAN COMPUTER */}
      <div className="flex flex-col md:flex-row w-full h-screen">
         <SplitBanner 
            image={HERO_MAN_COMPUTER}
            title="GÜN BOYU ODAK"
            subtitle="MAVİ IŞIK KORUMASI"
            link="/collections/mavi-isik-korumali-gozlukler"
         />
         <SplitBanner 
            image={WOMAN_COMPUTER_IMAGE}
            title="DİJİTAL KONFOR"
            subtitle="YENİ NESİL LENS TEKNOLOJİSİ"
            link="/collections/mavi-isik-korumali-gozlukler"
         />
      </div>

      {/* 3. SCROLL ANIMATION */}
      <ScrollGlassesAnimation />

      {/* 4. SPLIT - DRIVING & READING */}
      <div className="flex flex-col md:flex-row w-full h-screen">
         <SplitBanner 
            image={NIGHT_DRIVING_IMAGE}
            title="GECE SÜRÜŞÜ"
            subtitle="REFLEKS VE GÜVENLİK"
            link="/products"
         />
         <SplitBanner 
            image={WOMAN_READING_IMAGE}
            title="DİNLENME MODU"
            subtitle="GÖZ YORGUNLUĞUNA SON"
            link="/collections/mavi-isik-korumali-gozlukler"
         />
      </div>

      {/* 5. FULL - OUTDOOR COUPLE */}
      <FullScreenBanner 
        image={OUTDOOR_COUPLE_IMAGE}
        title="ÖZGÜR RUH"
        subtitle="Güneşin tadını çıkarırken stilinizden ödün vermeyin."
        link="/collections/gunes-gozlukleri"
        align="center"
        overlayOpacity="bg-black/20"
      />
      
    </div>
  );
};

export default Home;
