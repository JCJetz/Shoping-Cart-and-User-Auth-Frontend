class CartService {
  constructor() {
    this.items = [];
    this.subscribers = [];
    this.loadCart();
  }

  getUserId() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.id || 'guest';
  }

  getCartKey() {
    return `cart_${this.getUserId()}`;
  }

  loadCart() {
    try {
      const savedCart = localStorage.getItem(this.getCartKey());
      this.items = savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart:', error);
      this.items = [];
    }
    this.notify();
  }

  saveCart() {
    try {
      localStorage.setItem(this.getCartKey(), JSON.stringify(this.items));
      this.notify();
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  addItem(meal) {
    const existingItem = this.items.find(item => item.id === meal.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ ...meal, quantity: 1, userId: this.getUserId() });
    }
    this.saveCart();
  }

  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.saveCart();
  }

  updateQuantity(id, quantity) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(id);
      } else {
        item.quantity = quantity;
        this.saveCart();
      }
    }
  }

  clearCart() {
    this.items = [];
    this.saveCart();
  }

  getItems() {
    return [...this.items];
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.subscribers.forEach(callback => callback(this.items));
  }
}

const cartService = new CartService();
export { cartService as CartService };