import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Lock, User as UserIcon } from 'lucide-react';
import { OFFICE_DUO_IMAGE } from '../constants';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-black">
        <div 
            className="absolute inset-0 bg-cover bg-center opacity-80"
            style={{ backgroundImage: `url(${OFFICE_DUO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="relative z-10 w-full flex flex-col justify-end p-20 text-white">
            <h2 className="text-5xl font-serif font-bold mb-6">Görmek İnanmaktır.</h2>
            <p className="text-xl font-light text-gray-200 max-w-md leading-relaxed">
                Olivewing dünyasına katılın, premium gözlük deneyimini ve özel fırsatları kaçırmayın.
            </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-10">
          
          <div className="text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-2">
              {isLogin ? 'Tekrar Hoşgeldiniz' : 'Aramıza Katılın'}
            </h2>
            <p className="text-gray-500">
              {isLogin 
                ? 'Hesabınıza giriş yaparak alışverişe devam edin.' 
                : 'Formu doldurarak hemen üye olabilirsiniz.'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex p-1 bg-gray-100 rounded-lg">
             <button 
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 text-sm font-medium rounded-md transition-all duration-300 ${isLogin ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'}`}
             >
                Giriş Yap
             </button>
             <button 
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 text-sm font-medium rounded-md transition-all duration-300 ${!isLogin ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'}`}
             >
                Kayıt Ol
             </button>
          </div>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon size={18} className="text-gray-400 group-focus-within:text-black transition-colors" />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-4 border-b-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black transition-colors bg-transparent"
                  placeholder="Ad Soyad"
                />
              </div>
            )}
            
            <div className="relative group">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400 group-focus-within:text-black transition-colors" />
                </div>
              <input
                type="email"
                required
                className="block w-full pl-10 pr-3 py-4 border-b-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black transition-colors bg-transparent"
                placeholder="E-posta Adresi"
              />
            </div>
            
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400 group-focus-within:text-black transition-colors" />
                </div>
              <input
                type="password"
                required
                className="block w-full pl-10 pr-3 py-4 border-b-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black transition-colors bg-transparent"
                placeholder="Şifre"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              {isLogin && (
                <>
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                      Beni hatırla
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-gray-500 hover:text-black transition-colors">
                      Şifremi unuttum
                    </a>
                  </div>
                </>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold uppercase tracking-widest text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all transform hover:scale-[1.01]"
            >
              {isLogin ? 'GİRİŞ YAP' : 'KAYIT OL'} <ArrowRight size={18} className="ml-2"/>
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">veya</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
               <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
               </svg>
               Google
             </button>
             <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
               <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
               </svg>
               Facebook
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;