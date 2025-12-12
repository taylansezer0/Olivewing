import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cartItems: CartItem[];
  removeFromCart: (id: number) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, removeFromCart }) => {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-serif font-bold mb-4">Sepetiniz Boş</h2>
        <p className="text-gray-500 mb-8">Henüz sepetinize bir ürün eklemediniz.</p>
        <Link 
          to="/products"
          className="bg-black text-white px-8 py-3 uppercase tracking-widest text-sm hover:bg-gray-800 transition"
        >
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-12 py-12">
      <h1 className="text-3xl font-serif font-bold mb-12 text-center">Alışveriş Sepeti</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        <div className="lg:col-span-8">
          <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.id} className="flex py-6 sm:py-10">
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-md object-cover object-center sm:w-32 sm:h-32"
                  />
                </div>

                <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-sm">
                          <Link to={`/product/${item.id}`} className="font-medium text-gray-700 hover:text-gray-800">
                            {item.name}
                          </Link>
                        </h3>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">{item.price.toFixed(2)} TL</p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">
                       <div className="flex items-center text-sm text-gray-500">
                          Adet: {item.quantity}
                       </div>
                      <div className="absolute top-0 right-0">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          type="button"
                          className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4 mt-16 lg:mt-0">
          <div className="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Sipariş Özeti</h2>

            <div className="flow-root">
              <dl className="-my-4 text-sm divide-y divide-gray-200">
                <div className="py-4 flex items-center justify-between">
                  <dt className="text-gray-600">Ara Toplam</dt>
                  <dd className="font-medium text-gray-900">{subtotal.toFixed(2)} TL</dd>
                </div>
                <div className="py-4 flex items-center justify-between">
                  <dt className="text-gray-600">Kargo</dt>
                  <dd className="font-medium text-gray-900">{shipping === 0 ? 'Ücretsiz' : `${shipping.toFixed(2)} TL`}</dd>
                </div>
                <div className="py-4 flex items-center justify-between border-t border-gray-200">
                  <dt className="text-base font-bold text-gray-900">Toplam</dt>
                  <dd className="text-base font-bold text-gray-900">{total.toFixed(2)} TL</dd>
                </div>
              </dl>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-black border border-transparent rounded-none shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex items-center justify-center"
              >
                ÖDEMEYE GEÇ <ArrowRight size={16} className="ml-2"/>
              </button>
            </div>
            <p className="mt-4 text-xs text-gray-500 text-center">
              1000 TL ve üzeri alışverişlerde kargo ücretsiz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;