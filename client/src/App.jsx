import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

// Components
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import Onboarding from './components/Onboarding/Onboarding';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import TimetableManager from './components/Timetable/TimetableManager';
import AssignmentTracker from './components/Assignments/AssignmentTracker';
import StudyGroups from './components/StudyGroups/StudyGroups';
import ChatBot from './components/ChatBot/ChatBot';
import AlumniFaculty from './components/AlumniFaculty/AlumniFaculty';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // IITM Blue
      light: '#4791db',
      dark: '#115293',
    },
    secondary: {
      main: '#ffffff', // White
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          {isAuthenticated && <Navbar />}
          {isAuthenticated && <Sidebar />}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              minHeight: '100vh',
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              pt: isAuthenticated ? 8 : 0,
              px: isAuthenticated ? 3 : 0,
            }}
          >
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/dashboard" />} />
              <Route path="/signup" element={!isAuthenticated ? <SignUp /> : <Navigate to="/dashboard" />} />
              
              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  isAuthenticated ? (
                    showOnboarding ? (
                      <Onboarding onComplete={() => setShowOnboarding(false)} />
                    ) : (
                      <Dashboard />
                    )
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/timetable"
                element={isAuthenticated ? <TimetableManager /> : <Navigate to="/login" />}
              />
              <Route
                path="/assignments"
                element={isAuthenticated ? <AssignmentTracker /> : <Navigate to="/login" />}
              />
              <Route
                path="/study-groups"
                element={isAuthenticated ? <StudyGroups /> : <Navigate to="/login" />}
              />
              <Route
                path="/chatbot"
                element={isAuthenticated ? <ChatBot /> : <Navigate to="/login" />}
              />
              <Route
                path="/alumni-faculty"
                element={isAuthenticated ? <AlumniFaculty /> : <Navigate to="/login" />}
              />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
