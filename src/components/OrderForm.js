import { useState } from 'react';
import PropTypes from 'prop-types';
import { CartService } from '../services/CartService';
import { OrderService } from '../services/OrderService';
import '../styles/OrderForm.css';
import { useNavigate } from 'react-router-dom';

const validatePhone = (phone) => {
  // Elimina todos los espacios del número
  const cleanPhone = phone.replace(/\s/g, '');
  // Valida números móviles españoles (6 o 7 seguido de 8 dígitos)
  return /^[67]\d{8}$/.test(cleanPhone);
};

export function OrderForm({ items }) {
  const navigate = useNavigate(); // Add useNavigate hook
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'credit'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); //envio del formulario

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) 
      newErrors.name = 'Name is required';
    
    if (!formData.email.match(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/))
      newErrors.email = 'Valid email is required';
    
    if (!validatePhone(formData.phone))
      newErrors.phone = 'Please enter a valid Spanish mobile number (e.g., 606302255)';
    
    if (!formData.address.trim())
      newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);// Indica que el formulario se está enviando
    try {
      // Crea el pedido con los datos del formulario y el carrito
      await OrderService.createOrder({
        ...formData,
        items,
        total: CartService.getTotalPrice()
      });
      CartService.clearCart(); // Vacío el carrito después de crear el pedido
      navigate('/orders'); // Redirige a la pagina de pedidos
    } catch (error) {
      console.error('Order submission failed:', error);
      setErrors({ submit: 'Failed to submit order. Please try again.' });
    } finally {
      setIsSubmitting(false); // Indica que el envío ha terminado
    }
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? 'error' : ''}
          placeholder="606302255"
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={errors.address ? 'error' : ''}
        />
        {errors.address && <span className="error-message">{errors.address}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Processing...' : 'Place Order'}
      </button>
    </form>
  );
}

OrderForm.propTypes = { //Define las propiedades que espera recibir el componente OrderForm
  items: PropTypes.arrayOf( //Indica que la prop 'items' debe ser un array
    PropTypes.shape({ //Define la estructura que debe tener cada objeto dentro del array
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    })
  ).isRequired
};