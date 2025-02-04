import { useState } from 'react';
import PropTypes from 'prop-types';// para validar propiedaes
import '../styles/MealCard.css';

export function MealCard({ meal, onAddToCart }) { //datos del plato y func para añadir al carrito
  // Estado para controlar si el plato se acaba de añadir al carrito
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true); //Marca el plato como añadido
    onAddToCart(meal); //Llama a la función para añadir al carrito
    
    setTimeout(() => {
      setIsAdded(false);
    }, 1500); //Después de 1.5 segundos, resetea el estado
  };

  const handleImageError = (e) => {
    e.target.src = '/images/default-meal.jpg';
  };

  return (
    <div className="meal-card">
      <img 
        src={meal.image} 
        alt={meal.name}
        onError={handleImageError}
      />
      <div className="meal-info">
        <h3>{meal.name}</h3>
        <p>{meal.description}</p>
        <div className="meal-footer">
          <span className="price">${meal.price.toFixed(2)}</span>
          <button 
            className={`add-to-cart ${isAdded ? 'added' : ''}`}
            onClick={handleAddToCart}
            disabled={isAdded}
          >
            {isAdded ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

MealCard.propTypes = {
  meal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired
};