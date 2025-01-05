import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { useAppContext } from './context/AppContext';

// Components
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import Onboarding from './components/Onboarding/Onboarding';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import Timetable from './components/Timetable/Timetable';
import Assignments from './components/Assignments/Assignments';
import StudyGroups from './components/StudyGroups/StudyGroups';
import ChatBot from './components/ChatBot/ChatBot';
import AlumniFaculty from './components/AlumniFaculty/AlumniFaculty';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import LearningResources from './components/LearningResources/LearningResources';
import Analytics from './components/Analytics/Analytics';

function App() {
  const { darkMode, isAuthenticated } = useAppContext();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#2196f3',
        light: '#64b5f6',
        dark: '#1976d2',
        contrastText: '#fff',
      },
      secondary: {
        main: '#f50057',
        light: '#ff4081',
        dark: '#c51162',
        contrastText: '#fff',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#2c3e50',
        secondary: darkMode ? '#b0bec5' : '#7f8c8d',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 14,
      h1: { fontSize: '2.5rem', fontWeight: 500 },
      h2: { fontSize: '2rem', fontWeight: 500 },
      h3: { fontSize: '1.75rem', fontWeight: 500 },
      h4: { fontSize: '1.5rem', fontWeight: 500 },
      h5: { fontSize: '1.25rem', fontWeight: 500 },
      h6: { fontSize: '1rem', fontWeight: 500 },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontSize: '1rem',
            padding: '8px 16px',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
            },
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: darkMode
                ? 'rgba(255,255,255,0.08)'
                : 'rgba(0,0,0,0.04)',
              transform: 'translateX(4px)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
            backgroundImage: darkMode
              ? 'linear-gradient(45deg, #1e1e1e, #2c2c2c)'
              : 'linear-gradient(45deg, #ffffff, #f5f5f5)',
            color: darkMode ? '#ffffff' : '#2c3e50',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
            backgroundImage: darkMode
              ? 'linear-gradient(45deg, #1e1e1e, #2c2c2c)'
              : 'linear-gradient(45deg, #ffffff, #f5f5f5)',
            borderRight: 'none',
            boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.1) rotate(5deg)',
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
          size: 'medium',
          fullWidth: true,
        },
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
              },
              '&.Mui-focused': {
                transform: 'translateY(-2px)',
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          },
        },
      },
      MuiTooltip: {
        defaultProps: {
          arrow: true,
          enterTouchDelay: 0,
          leaveTouchDelay: 1500,
        },
      },
      MuiLink: {
        defaultProps: {
          underline: 'hover',
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {isAuthenticated && <Navbar />}
        {isAuthenticated && <Sidebar />}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minHeight: '100vh',
            backgroundColor: 'background.default',
            color: 'text.primary',
            pt: isAuthenticated ? 8 : 0,
            px: isAuthenticated ? 3 : 0,
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <Login />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route
              path="/signup"
              element={
                !isAuthenticated ? (
                  <SignUp />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/timetable"
              element={
                isAuthenticated ? <Timetable /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/assignments"
              element={
                isAuthenticated ? <Assignments /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/study-groups/*"
              element={
                isAuthenticated ? <StudyGroups /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/chatbot"
              element={
                isAuthenticated ? <ChatBot /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/alumni-faculty"
              element={
                isAuthenticated ? <AlumniFaculty /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/learning-resources"
              element={
                isAuthenticated ? <LearningResources /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/profile"
              element={
                isAuthenticated ? <Profile /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/settings"
              element={
                isAuthenticated ? <Settings /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/analytics"
              element={
                isAuthenticated ? (
                  <Box sx={{ display: 'flex' }}>
                    <Navbar />
                    <Sidebar />
                    <Box
                      component="main"
                      sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { sm: `calc(100% - 240px)` },
                        ml: { sm: '240px' },
                        mt: '64px',
                      }}
                    >
                      <Analytics />
                    </Box>
                  </Box>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
