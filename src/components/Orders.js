import React, { useState, useEffect } from 'react';
import { OrderService } from '../services/OrderService'; //para gestionar los pedidos
import '../styles/Orders.css';

export function Orders() {
  //almacenar la lista de pedidos
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = OrderService.subscribe(updatedOrders => {
      setOrders(updatedOrders);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <h3>Order #{order.id}</h3>
              <p>Status: {order.status}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Total: ${order.total.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}