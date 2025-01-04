const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://bs-nextgen-backend.onrender.com/api'  // We'll set this up on Render
  : 'http://localhost:5000/api';

export default API_BASE_URL;
