# 🍽️ Food Web App - con Carrito de Compras

## 📝 Descripción



### Conceptos Clave
- Estados en React con `useState`
- Efectos secundarios con `useEffect`
- Manejo de LocalStorage
- Patrón Observer para actualizaciones del carrito
- Validación de formularios
- Props y PropTypes

### Retos que Enfrenté
1. **Persistencia de Datos**
   - Aprendí que necesitaba guardar el carrito en localStorage
   - Entendí cómo manejar errores al cargar/guardar datos

2. **Actualizaciones del Carrito**
   - El contador del carrito no se actualizaba inmediatamente
   - Solución: Implementé un sistema de suscripción con CartService

3. **Formularios y Validación**
   - Crear validaciones para el formulario de pedido
   - Manejar errores y mostrar mensajes al usuario

## 🚀 Cómo Ejecutar el Proyecto

```bash
# Clonar el repositorio
git clone [url-del-repo]

# Instalar dependencias
cd food-web-copy-react
npm install

# Iniciar la aplicación
npm start
```

## 📁 Estructura del Proyecto

```
food-web-copy-react/
├── src/
│   ├── components/
│   │   ├── Cart.js         # Manejo del carrito
│   │   ├── MealCard.js     # Tarjeta de plato individual
│   │   ├── OrderForm.js    # Formulario de pedido
│   │   └── Orders.js       # Lista de pedidos
│   ├── services/
│   │   ├── CartService.js  # Lógica del carrito
│   │   └── OrderService.js # Gestión de pedidos
│   └── styles/
└── public/
    └── images/            # Imágenes de platos
```

## 💡 Principales Aprendizajes

1. **Manejo de Estado**
   - Usar `useState` para datos que cambian
   - Actualizar estado de forma inmutable

2. **Servicios y Patrones**
   - Crear servicios separados para lógica de negocio
   - Implementar patrón Observer para actualizaciones

3. **LocalStorage**
   - Guardar datos entre recargas
   - Manejar errores de almacenamiento

4. **Componentes y Props**
   - Crear componentes reutilizables
   - Validar props con PropTypes

## 🐛 Problemas Comunes y Soluciones

1. **Problema**: Carrito no actualizaba el contador
   ```javascript
   // Solución: Implementar sistema de suscripción
   CartService.subscribe(() => {
     setCartCount(CartService.getTotalItems());
   });
   ```

2. **Problema**: Imágenes no cargaban correctamente
   ```javascript
   // Solución: Agregar manejo de errores
   const handleImageError = (e) => {
     e.target.src = '/images/default-meal.jpg';
   };
   ```

## 📚 Lo que Quiero Mejorar
- Añadir autenticación de usuarios





