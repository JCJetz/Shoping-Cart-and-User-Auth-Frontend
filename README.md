# 🍽️ Shopping Cart and User Auth Frontend

## 📝 Descripción
Aplicación web desarrollada en React que permite a los usuarios iniciar sesión, explorar un menú de comidas, gestionar un carrito de compras y realizar pedidos.


## 🔑 Credenciales de Prueba
```
Usuario: usuario1
Contraseña: 123456
```

### 🎯 Características Principales
- Autenticación de usuarios
- Catálogo de productos
- Carrito de compras persistente
- Sistema de pedidos
- Gestión de estado con Context API

## 🛠️ Componentes Principales

### 1. Autenticación
#### Login.js
- Gestiona el inicio de sesión
- Valida credenciales con users.json
- Maneja errores de autenticación
- Redirección tras login exitoso

### 2. Gestión de Productos y Pedidos
#### Cart.js
- Visualización de productos en carrito
- Modificación de cantidades
- Cálculo de totales
- Persistencia en localStorage

#### OrderForm.js
- Formulario de datos de envío
- Validaciones (teléfono, dirección)
- Integración con CartService
- Gestión de errores de formulario



## 🚨 Desafíos Técnicos Principales

### 1. Gestión del Estado
- **Reto**: Mantener sincronizado el estado entre componentes
- **Solución**: Implementación de Context API y sistema de suscripciones

### 2. Persistencia de Datos
- **Reto**: Mantener datos entre recargas sin backend
- **Solución**: Uso de localStorage con manejo de errores

### 3. Validaciones
- **Reto**: Validación de formularios y datos
- **Solución**: Sistema robusto de validación con feedback inmediato

## 📁 Estructura del Proyecto
```
src/
├── components/
│   ├── auth/
│   │   └── Login.js
│   ├── Cart.js
│   │── Footer.js
│   ├── Header.js
│   ├── Home.js
│   ├── MealCard.js
│   ├── OrderForm.js
│   └── Orders.js
├── context/
│   └── AuthContext.js
├── services/
│   ├── AuthService.js
│   ├── CartService.js
│   └── OrderService.js
├── styles/
└── data/
    └── users.json
```

## 🚀 Instalación y Uso

```bash
# Clonar repositorio
git clone [url-repositorio]

# Instalar dependencias
npm install

# Iniciar aplicación
npm start
```







