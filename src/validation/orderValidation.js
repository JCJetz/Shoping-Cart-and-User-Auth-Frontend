export function validateOrder(formData) {
    const errors = {};
    
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
  
    return errors;
  }