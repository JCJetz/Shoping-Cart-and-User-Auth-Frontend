import React from 'react';
import { MealCard } from './MealCard'; //componente para mostrar cada plato
import { CartService } from '../services/CartService'; // para gestionar el carrito
import { meals } from '../data/meals'; //platos disponibles

export function Home() {
  const handleAddToCart = (meal) => {
    CartService.addItem(meal);
  };

  return (
    <div className="home">
      <div className="meals-grid">
        {meals.map(meal => (
          <MealCard 
            key={meal.id} 
            meal={meal} 
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}