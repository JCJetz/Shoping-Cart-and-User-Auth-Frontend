import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Food Web</h3>
            <p>Tu restaurante favorito a un click de distancia</p>
          </div>
          
          <div className="footer-section">
            <h4>Enlaces</h4>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/cart">Carrito</Link></li>
              <li><Link to="/orders">Pedidos</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contacto</h4>
            <ul>
              <li>📞 +34 123 456 789</li>
              <li>📧 info@foodweb.com</li>
              <li>📍 Calle Amable 52, Madrid</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Síguenos</h4>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; Created with ❤️ by </p>
          <p>
            <a href="https://github.com/JCJetz" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-github"></i> JCJetz
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}; 
