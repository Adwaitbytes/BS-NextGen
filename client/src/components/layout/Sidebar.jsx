import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  useTheme,
  Typography,
  alpha,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Group as GroupIcon,
  School as SchoolIcon,
  Book as BookIcon,
  SmartToy as ChatBotIcon,
  Schedule as ScheduleIcon,
  MenuBook as ResourcesIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const Sidebar = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { sidebarOpen } = useAppContext();

  const menuItems = [
    { 
      text: 'Dashboard', 
      icon: <DashboardIcon />, 
      path: '/dashboard',
      description: 'Overview of your academic activities'
    },
    { 
      text: 'Timetable', 
      icon: <ScheduleIcon />, 
      path: '/timetable',
      description: 'View your class schedule'
    },
    { 
      text: 'Study Groups', 
      icon: <GroupIcon />, 
      path: '/study-groups',
      description: 'Join and manage study groups'
    },
    { 
      text: 'Learning Resources', 
      icon: <ResourcesIcon />, 
      path: '/learning-resources',
      description: 'Access study materials'
    },
    { 
      text: 'Assignments', 
      icon: <AssignmentIcon />, 
      path: '/assignments',
      description: 'View and submit assignments'
    },
    { 
      text: 'ChatBot', 
      icon: <ChatBotIcon />, 
      path: '/chatbot',
      description: 'Get instant help and answers'
    },
  ];

  return (
    <Drawer
      variant="permanent"
      open={sidebarOpen}
      sx={{
        width: sidebarOpen ? 280 : 80,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarOpen ? 280 : 80,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.mode === 'dark' 
            ? alpha(theme.palette.background.paper, 0.95)
            : alpha('#fff', 0.95),
          borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
          backdropFilter: 'blur(8px)',
        },
      }}
    >
      <Box sx={{ mt: 8, mb: 2, px: 3, py: 2 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            opacity: sidebarOpen ? 1 : 0,
            transition: theme.transitions.create('opacity'),
            fontWeight: 700,
            color: theme.palette.primary.main,
            textAlign: 'left',
          }}
        >
          Navigation
        </Typography>
      </Box>
      <Divider sx={{ borderStyle: 'dashed' }} />
      <List sx={{ pt: 3, px: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              mx: 1,
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: 'white',
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
              },
              '&:hover': {
                bgcolor: 'primary.light',
                color: 'white',
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color: location.pathname === item.path ? 'white' : 'inherit',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              secondary={item.description}
              sx={{
                opacity: sidebarOpen ? 1 : 0,
                display: sidebarOpen ? 'block' : 'none',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
