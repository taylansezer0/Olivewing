
import { Product } from './types';

// Banner Images based on user request (Lifestyle / Storytelling)
export const HERO_MAN_COMPUTER = "https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=90&w=2070&auto=format&fit=crop"; // Man working intently
export const OFFICE_DUO_IMAGE = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=90&w=2070&auto=format&fit=crop"; 
export const NIGHT_DRIVING_IMAGE = "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=90&w=2070&auto=format&fit=crop";
export const WOMAN_READING_IMAGE = "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=90&w=2098&auto=format&fit=crop"; // Warm light reading
export const OUTDOOR_COUPLE_IMAGE = "https://images.unsplash.com/photo-1623838804048-c9233f20d2c8?q=90&w=2070&auto=format&fit=crop";
export const WOMAN_COMPUTER_IMAGE = "https://images.unsplash.com/photo-1629904853716-6c231718ec29?q=90&w=2070&auto=format&fit=crop"; // Woman at computer, dark/blue light context
export const MAN_PORTRAIT_OFFICE = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=90&w=1000&auto=format&fit=crop"; 

// Clean Product Images for the List Page (White background style)
export const PRODUCT_IMG_1 = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=90&w=1000&auto=format&fit=crop";
export const PRODUCT_IMG_2 = "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=90&w=1000&auto=format&fit=crop";
export const PRODUCT_IMG_3 = "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=90&w=1000&auto=format&fit=crop";
export const PRODUCT_IMG_4 = "https://images.unsplash.com/photo-1577803645773-f96470509666?q=90&w=1000&auto=format&fit=crop";

// Extended Product Catalog
export const PRODUCTS: Product[] = [
  // --- MAVİ IŞIK ---
  {
    id: 1,
    name: "Olivewing OLW 1804-06",
    category: "Mavi Işık",
    price: 649.00,
    image: PRODUCT_IMG_1, 
    description: "Dijital ekranların zararlı mavi ışığından gözlerinizi koruyun.",
    features: ["Blue Light Block", "UV400", "TR90 Çerçeve"],
    isNew: true
  },
  {
    id: 2,
    name: "Olivewing OLW 1847-05",
    category: "Mavi Işık",
    price: 949.00,
    image: PRODUCT_IMG_2,
    description: "Ofis şıklığınızı tamamlayan modern koruma.",
    features: ["Anti-Refle", "Çizilmez Cam", "Ultra Hafif"]
  },
  {
    id: 7,
    name: "Olivewing OLW 1858-06",
    category: "Mavi Işık",
    price: 949.00,
    image: PRODUCT_IMG_4,
    description: "Uzun çalışma saatleri için ideal koruma.",
    features: ["Blue Light Filter", "Ergonomik", "Dayanıklı"]
  },
  {
    id: 8,
    name: "Olivewing OLW 1003-177",
    category: "Mavi Işık",
    price: 649.00,
    image: PRODUCT_IMG_1,
    description: "Sade sevenler için çerçevesiz tasarım.",
    features: ["Hafif", "Şeffaf", "Blue Protect"]
  },
  {
    id: 20,
    name: "Olivewing OLW 1854-06",
    category: "Mavi Işık",
    price: 949.00,
    image: PRODUCT_IMG_2,
    description: "Profesyonel seri.",
    features: ["TR90", "Esnek", "Mat Siyah"]
  },
  {
    id: 21,
    name: "Olivewing OLW 1853-06",
    category: "Mavi Işık",
    price: 949.00,
    image: PRODUCT_IMG_4,
    description: "Modern hatlar.",
    features: ["Metal", "Hafif", "Konfor"]
  },

  // --- GÜNEŞ ---
  {
    id: 3,
    name: "Olivewing Pilot 1858",
    category: "Güneş",
    price: 949.00,
    image: PRODUCT_IMG_3,
    description: "Klasik pilot tasarımı, polarize lensler.",
    features: ["Polarize", "UV400", "Paslanmaz Çelik"]
  },
  {
    id: 9,
    name: "Olivewing Retro Sun",
    category: "Güneş",
    price: 899.00,
    image: PRODUCT_IMG_1,
    description: "Geçmişin ruhunu günümüze taşıyan tasarım.",
    features: ["UV400", "Asetat", "Vintage"]
  },
  // --- ANTI-EMF ---
  {
    id: 12,
    name: "Olivewing EMF Blocker X",
    category: "Anti-EMF",
    price: 1499.00,
    image: PRODUCT_IMG_2,
    description: "Elektromanyetik dalgalara karşı gelişmiş koruma kalkanı.",
    features: ["EMF Koruması", "Blue Light", "Titanyum"],
    isNew: true
  }
];
