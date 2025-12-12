import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import { CartItem, Product } from './types';

// Scroll to top on route change component
const ScrollToTop = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <Layout cartCount={totalItems}>
        <ScrollToTop /> {/* Manual scroll handling since HashRouter doesn't always do it automatically */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Default all products */}
          <Route path="/products" element={<ProductList />} />
          {/* Filtered collection route */}
          <Route path="/collections/:slug" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;