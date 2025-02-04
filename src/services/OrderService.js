class OrderService {
  constructor() {
    this.orders = [];
    this.subscribers = [];
    this.loadOrders();
  }

  loadOrders() {
    try {
      const savedOrders = localStorage.getItem('orders');
      this.orders = savedOrders ? JSON.parse(savedOrders) : [];
    } catch (error) {
      console.error('Error loading orders:', error);
      this.orders = [];
    }
    this.notify();
  }

  saveOrders() {
    try {
      localStorage.setItem('orders', JSON.stringify(this.orders));
    } catch (error) {
      console.error('Error saving orders:', error);
    }
    this.notify();
  }

  createOrder(orderData) {
    const userId = JSON.parse(localStorage.getItem('user'))?.id || 'guest';
    const order = {
      id: Date.now(),
      userId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      ...orderData,
      total: this.calculateOrderTotal(orderData.items)
    };

    this.orders.push(order);
    this.saveOrders();
    return order;
  }

  getOrders() {
    return [...this.orders];
  }

  getOrderById(orderId) {
    return this.orders.find(o => o.id === orderId);
  }

  getUserOrders(userId) {
    return this.orders.filter(o => o.userId === userId);
  }

  calculateOrderTotal(items) {
    return items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.subscribers.forEach(callback => callback(this.orders));
  }
}

const orderService = new OrderService();
export { orderService as OrderService };