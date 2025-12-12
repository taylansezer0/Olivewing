
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { Shield, Layers, Zap } from 'lucide-react';

const ProductList: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [pageTitle, setPageTitle] = useState("Koleksiyon");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) {
      setFilteredProducts(PRODUCTS);
      setPageTitle("Tüm Parçalar");
      return;
    }
    // Simple filter logic
    if (slug.includes('gunes')) {
        setFilteredProducts(PRODUCTS.filter(p => p.category === 'Güneş'));
        setPageTitle("Güneş Gözlükleri");
    } else if (slug.includes('mavi') || slug.includes('office')) {
        setFilteredProducts(PRODUCTS.filter(p => p.category === 'Mavi Işık'));
        setPageTitle("Mavi Işık Korumalı");
    } else {
        setFilteredProducts(PRODUCTS);
    }
  }, [slug]);

  return (
    <div className="bg-white min-h-screen pt-24 pb-24">
      {/* 1. Header Image (Optional, kept minimal as per reference which starts with products usually) */}
      <div className="max-w-custom mx-auto px-6 lg:px-12 mb-12 text-center">
         <h1 className="text-4xl md:text-5xl font-serif text-black uppercase tracking-widest">{pageTitle}</h1>
      </div>

      <div className="max-w-custom mx-auto px-6 lg:px-12">
        
        {/* 2. Product Grid - Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mb-24">
          {filteredProducts.slice(0, 6).map(product => (
             <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* 3. Technical Info Block (Reproducing the visual diagram from reference) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-24 items-start">
            {/* Left: TR90 Material */}
            <div className="bg-gray-50 p-8 rounded-lg flex flex-col items-center text-center">
                <div className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 mb-4 uppercase">İsviçre Hammadde</div>
                <h3 className="text-xl font-serif font-bold mb-2">SAĞLAM VE ESNEK</h3>
                <h4 className="text-sm tracking-widest text-gray-500 mb-6">GÖVDE YAPISI</h4>
                
                {/* Abstract graphic representing flexibility */}
                <div className="w-full h-48 relative mb-6 flex items-center justify-center">
                   <div className="w-32 h-32 border-4 border-black rounded-full border-t-transparent animate-spin-slow opacity-20 absolute"></div>
                   <Zap size={64} className="text-black relative z-10" strokeWidth={1} />
                </div>

                <p className="text-sm text-gray-600 leading-relaxed text-justify">
                    Plastik çerçeve piyasasında çeşitli PC, PP, PPE vb. hammaddeler kullanılmaktadır. 
                    Plastik kalitesi ölçümü kırılganlığı, zamana karşı dayanıklılık, form koruma gibi özelliklerde çeşitlilik göstermektedir.
                    Piyasada bulunan standart ürünlerin aksine, ürünümüz, İsviçre menşeli <strong>TR90</strong> hammaddesi ile 
                    <strong> dayanıklı, hafif ve esnek</strong> bir formda uzun ömürlü bir çerçeveye sahip.
                </p>
            </div>

            {/* Right: Lens Layers */}
            <div className="bg-gray-50 p-8 rounded-lg flex flex-col items-center text-center">
                <div className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 mb-4 uppercase">%100 Koruyucu</div>
                <h3 className="text-xl font-serif font-bold mb-2">CR39 ORGANİK CAM</h3>
                <h4 className="text-sm tracking-widest text-gray-500 mb-6">KATMAN TEKNOLOJİSİ</h4>

                 {/* Abstract graphic representing lens layers */}
                 <div className="w-full h-48 relative mb-6 flex items-center justify-center">
                   <div className="absolute w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl"></div>
                   <div className="absolute w-40 h-40 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl left-1/2 transform -translate-x-1/2"></div>
                   <Layers size={64} className="text-black relative z-10" strokeWidth={1} />
                </div>

                <p className="text-sm text-gray-600 leading-relaxed text-justify">
                    Standart organik camlardan daha fazla netliğe sahip Olivewing'in CR39 cam teknolojisi ile birlikte 
                    mineral camlarda söz konusu olan kırılganlığın önüne geçilmiştir. <strong>Mavi ışık ve UV400</strong> filtresi 
                    sayesinde 380 - 500nm spektrumundaki Mavi Işığın ~%30'unu, 400nm altında olan zararlı ışığın <strong>%100</strong>'ünü 
                    verimli bir şekilde engellemektedir.
                </p>
            </div>
        </div>

        {/* 4. More Products Grid (If any left) */}
        {filteredProducts.length > 6 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mb-24">
            {filteredProducts.slice(6).map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
            </div>
        )}

        {/* 5. SEO / Info Text Block at Bottom */}
        <div className="mt-24 pt-12 border-t border-gray-200">
            <h2 className="text-3xl font-serif mb-8 text-black">Mavi Işık Korumalı Gözlükler</h2>
            <div className="prose prose-sm max-w-none text-gray-500 text-justify columns-1 md:columns-2 gap-12">
                <p className="mb-4">
                    Dijital dünyada ne kadar uzun süre geçirirseniz göz sağlığınızı koruyabilmek adına daha fazla önlem almanız gerekir. 
                    Bilgisayarlar, akıllı telefonlar ve tabletler gibi dijital cihazlar etrafa mavi ışık yayarlar. Bu nedenle de yaydıkları mavi ışık 
                    ile zaman içinde gözlere zarar vermeye başlar. Bu yüzden de uzun vadede çeşitli sağlık problemleri ortaya çıkabilir. 
                    Bu durumun önüne geçebilmek için mavi ışık korumalı gözlükler kullanabilirsiniz.
                </p>
                <p className="mb-4">
                    Mavi ışık korumalı gözlükler, bilgisayar kullanımına bağlı göz yorgunluğunun da azalmasını sağlar. Bu sayede uyku düzenini korur 
                    ve genel göz sağlığını destekleme avantajı vardır. Özellikle uzun saatler boyunca ekrana maruz kalıyorsanız mavi ışık koruması 
                    olan gözlük modelleri konforlu ve sağlıklı bir görüş deneyimi vaat eder.
                </p>
                <p>
                    Web sitemizde çeşitli tarz ve modellerde sunulan mavi ışık korumalı gözlükler göz sağlığınızı korurken şıklığınızın da 
                    tamamlayıcısı olmaktadır. Mavi ışık korumalı gözlük kategorimizi inceleyerek her ihtiyaca uygun seçenekleri hemen bulabilirsiniz.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ProductList;
