import React, { useState, useEffect } from 'react';
import { OrderForm } from './OrderForm';
import { CartService } from '../services/CartService';
import '../styles/Cart.css';

export function Cart() {
  const [items, setItems] = useState(CartService.getItems());
  const [total, setTotal] = useState(CartService.getTotalPrice());

  useEffect(() => {
    const unsubscribe = CartService.subscribe((cartItems) => {
      setItems(cartItems);
      setTotal(CartService.getTotalPrice());
    });
    
    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  const handleQuantityChange = (id, change) => {
    const item = items.find(item => item.id === id);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        CartService.updateQuantity(id, newQuantity);
      } else {
        CartService.removeItem(id);
      }
    }
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <div className="price-quantity">
                    <p>${item.price.toFixed(2)} x {item.quantity}</p>
                    <div className="quantity-controls">
                      <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                    </div>
                    <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h3>Total: ${total.toFixed(2)}</h3>
            <OrderForm items={items} />
          </div>
        </>
      )}
    </div>
  );
}