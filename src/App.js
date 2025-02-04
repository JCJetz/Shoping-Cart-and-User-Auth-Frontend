import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CartService } from './services/CartService';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Cart } from './components/Cart';
import { Orders } from './components/Orders';
import { Login } from './components/auth/Login';
import { NotFound } from './components/NotFound';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Cargar el estado inicial del carrito
    const initialItems = CartService.getItems();
    setCartItems(initialItems);

    // Suscribirse a los cambios
    const unsubscribe = CartService.subscribe(items => {
      setCartItems(items);
    });

    return () => unsubscribe();
  }, []);

  // Calcular la cantidad total de items en el carrito
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <AuthProvider>
      <div className="App">
        <Header cartItemCount={cartItemCount} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;