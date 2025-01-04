# BS Next Gen App

A modern web application for IITM BS Program students to manage their academic life effectively.

## Features

- 📚 Class Schedule Management
- 📝 Assignment Tracking
- 👥 Study Group Collaboration
- 📖 Learning Resources
- 📊 Interactive Dashboard
- 🔐 Secure Authentication

## Tech Stack

### Frontend
- React 18
- Material-UI (MUI)
- React Router
- Context API for State Management

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Adwaitbytes/BS-NextGen.git
cd BS-NextGen
```

2. Install dependencies:
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
```

3. Set up environment variables:
Create a .env file in the root directory with:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. Run the development server:
```bash
# Run both frontend and backend
npm run dev

# Run only backend
npm run server

# Run only frontend
npm run client
```

## Deployment

The application is deployed in two parts:

### Frontend
- Hosted on GitHub Pages
- Live at: [https://adwaitbytes.github.io/BS-NextGen/](https://adwaitbytes.github.io/BS-NextGen/)
- Automatically deploys when changes are pushed to main branch

### Backend
- Hosted on Render.com
- API Endpoint: [https://bs-nextgen-backend.onrender.com](https://bs-nextgen-backend.onrender.com)
- Automatically deploys when changes are pushed to main branch

### Deployment Instructions

1. Frontend (GitHub Pages):
```bash
npm run deploy
```

2. Backend (Render):
- Push changes to main branch
- Render will automatically deploy from the main branch

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
