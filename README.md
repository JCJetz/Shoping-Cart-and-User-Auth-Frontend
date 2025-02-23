# 🍽️ Shopping Cart and User Auth Frontend 

## 📝 What the App Does
A simple restaurant web app that allows:
- Login with predefined users
- View product catalog
- Add/remove products to cart
- Manage quantities in cart
- Place orders with form validation

🔑 Test Credentials
User: user1
Password: 123456

## 🎯 This project will help you understand:

### 1. State Management in React
```javascript
// CartService.js - Basic implementation of observer pattern
class CartService {
  constructor() {
    this.items = [];
    this.subscribers = [];
    this.loadCart();
  }

  // Subscription with cleanup
  subscribe(callback) {
    this.subscribers.push(callback);
    return () => this.unsubscribe(callback); // returns cleanup fuction
  }

  notify() {
    this.subscribers.forEach(cb => cb(this.items));
  }

  // Example of a method that uses the pattern
  addItem(item) {
    const existingItem = this.items.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ ...item, quantity: 1 });
    }
    this.saveCart();
    this.notify(); // Notifies the subscribers
  }
}
```
- Cart state with simple observer pattern
- Context API only for login state
- Persistence with localStorage

### 2. Basic Form Validation
```javascript
// OrderForm.js 
const validateForm = (values) => {
  const errors = {};
  
  if (!values.phone) {
    errors.phone = 'Teléfono requerido';
  } else if (!/^[67]\d{8}$/.test(values.phone.trim())) {
    errors.phone = 'Formato inválido';
  }

  if (!values.email) errors.email = 'Email requerido';
  if (!values.address) errors.address = 'Dirección requerida';

  return errors;
};
```

### 3. Implemented Services
- CartService: Basic cart management
- AuthService: Simple login with users.json
- OrderService: LocalStorage storage

## 🔧 Challenges and Learnings

### Technical Challenges
1. **Cart Synchronization**
   - Challenge: Keep the UI updated with the cart state
   - Solution: Observer pattern with subscribe/notify
   - Learning: Communication between components

2. **Data Persistence**
   - Challenge: Maintaining the cart between reloads
   - Solution: Using localStorage
   - Learning: Basic customer data management

3. **Form Validation**
   - Challenge: Validate user data
   - Solution: Simple validation functions
   - Learning: User input handling

## 🚀 Technologies  
- React 
- React Router 
- Context API for basic auth state
- CSS Modules 
- LocalStorage for basic persistence

## 📁 Project Structure
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


## 🚀 Installation and Usage

```bash
# Clone repository
git clone [repository-url]

# Install dependencies
npm install

# Start application
npm start
```







