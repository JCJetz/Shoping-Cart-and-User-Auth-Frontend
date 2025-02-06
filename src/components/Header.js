import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CartService } from '../services/CartService';
import '../styles/Header.css';

export const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  const updateCartCount = () => {
    setCartItemCount(CartService.getTotalItems());
  };

  useEffect(() => {
    
    // Actualizar contador inicial
    updateCartCount();

    // Suscribirse a cambios
    const unsubscribe = CartService.subscribe(updateCartCount);

    // Limpieza al desmontar
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="main-header">
      <div className="container">
        <Link to="/" className="logo" onClick={handleLinkClick}>
          Food Web
        </Link>

        <button 
          className={`menu-btn ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link to="/" onClick={handleLinkClick}>
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/cart" onClick={handleLinkClick}>
                Carrito ({cartItemCount})
              </Link>
            </li>
            <li>
              <Link to="/orders" onClick={handleLinkClick}>
                Pedidos
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <span>Bienvenido, {user.username}</span>
                </li>
                <li>
                  <button onClick={logout}>
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" onClick={handleLinkClick}>
                  Iniciar Sesión
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};









/*import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { CartService } from '../services/CartService';
import '../styles/Header.css';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(CartService.getTotalItems());
  const menuRef = useRef();

  useEffect(() => {
    const unsubscribe = CartService.subscribe(() => {
      setCartCount(CartService.getTotalItems());
    });

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      unsubscribe();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="main-header">
      <div className="container">
        <Link to="/" className="logo">
          Food Web
        </Link>

        <button 
          className={`menu-btn ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav ref={menuRef} className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li>
              <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
                Cart ({cartCount})
              </Link>
            </li>
            <li><Link to="/orders" onClick={() => setIsMenuOpen(false)}>Orders</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
*/