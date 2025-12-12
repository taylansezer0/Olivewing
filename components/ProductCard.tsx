
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="group block text-center">
      {/* Image Area - Clean White Background */}
      <div className="relative overflow-hidden w-full aspect-[5/3] mb-4 bg-white flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-[80%] h-auto object-contain transform group-hover:scale-105 transition-transform duration-500 ease-in-out mix-blend-multiply"
        />
      </div>
      
      {/* Info Area - Minimal */}
      <div className="space-y-1">
        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider group-hover:text-gold transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-sm font-medium text-gray-900">{product.price.toFixed(2)}TL</p>
      </div>
    </Link>
  );
};

export default ProductCard;
