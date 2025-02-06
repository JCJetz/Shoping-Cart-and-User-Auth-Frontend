class AuthService {
  static async login(username, password) {
    // Obtener usuarios
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Buscar usuario
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
      throw new Error('Usuario o contraseña incorrectos');
    }

    // Guardar sesión
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }

  static logout() {
    localStorage.removeItem('currentUser');
  }

  static getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}

export { AuthService }; 