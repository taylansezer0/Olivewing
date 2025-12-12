import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { ShoppingBag, Check, Shield, Truck } from 'lucide-react';

interface ProductDetailProps {
  addToCart: (product: any) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ addToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === Number(id));

  if (!product) {
    return <div className="text-center py-20">Ürün bulunamadı.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    // Simple feedback
    const btn = document.getElementById('add-btn');
    if(btn) {
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Eklendi!';
      btn.classList.add('bg-green-600', 'border-green-600');
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove('bg-green-600', 'border-green-600');
      }, 2000);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left: Images */}
        <div className="space-y-4">
          <div className="bg-gray-50 aspect-square overflow-hidden rounded-lg">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-gray-50 aspect-video rounded-lg overflow-hidden">
                <img src={product.image} className="w-full h-full object-cover opacity-80" alt="detail"/>
             </div>
             <div className="bg-gray-50 aspect-video rounded-lg flex items-center justify-center text-gray-400 text-sm border border-dashed border-gray-300">
                + Daha fazla görsel
             </div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col h-full justify-center">
          <div className="mb-2">
             <span className="text-sm text-gray-500 uppercase tracking-widest">{product.category}</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-2xl font-medium text-gray-900 mb-8">{product.price.toFixed(2)} TL</p>
          
          <div className="prose prose-sm text-gray-600 mb-8">
            <p>{product.description}</p>
          </div>

          <div className="space-y-4 mb-8">
             {product.features.map((feature, index) => (
               <div key={index} className="flex items-center text-sm text-gray-700">
                 <Check size={16} className="text-green-600 mr-2" />
                 {feature}
               </div>
             ))}
          </div>

          <button 
            id="add-btn"
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-4 px-8 uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 border border-black"
          >
            <ShoppingBag size={20} />
            <span>Sepete Ekle</span>
          </button>

          <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-gray-100">
             <div className="text-center">
                <Shield size={24} className="mx-auto mb-2 text-gray-400" />
                <span className="text-xs text-gray-500">2 Yıl Garanti</span>
             </div>
             <div className="text-center">
                <Truck size={24} className="mx-auto mb-2 text-gray-400" />
                <span className="text-xs text-gray-500">Hızlı Kargo</span>
             </div>
             <div className="text-center">
                <Check size={24} className="mx-auto mb-2 text-gray-400" />
                <span className="text-xs text-gray-500">Orijinal Ürün</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;