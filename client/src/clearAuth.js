// Script to clear authentication state
localStorage.removeItem('isAuthenticated');
localStorage.removeItem('userProfile');
localStorage.removeItem('token');
window.location.href = '/login';
