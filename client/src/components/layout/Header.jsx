import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  Badge,
  useTheme,
  Avatar,
  Tooltip,
  Divider,
  alpha,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const Header = ({ toggleSidebar }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { userProfile, logout } = useAppContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate('/profile');
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/login');
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.mode === 'dark' 
          ? alpha(theme.palette.background.paper, 0.95)
          : alpha('#fff', 0.95),
        color: theme.palette.text.primary,
        backdropFilter: 'blur(8px)',
        boxShadow: `0 1px 3px ${alpha(theme.palette.common.black, 0.12)}`,
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      }}
      elevation={0}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
          sx={{ 
            mr: 2,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
            },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h5"
          component="div"
          sx={{ 
            flexGrow: 1,
            fontWeight: 700,
            letterSpacing: '-0.5px',
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          BS Next Gen
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip title="Notifications">
            <IconButton
              color="inherit"
              onClick={handleNotificationMenuOpen}
              sx={{
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              <Badge 
                badgeContent={3} 
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: theme.palette.error.main,
                    color: '#fff',
                    fontWeight: 600,
                  },
                }}
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Profile">
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              sx={{
                p: 0.5,
                border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              <Avatar
                src={userProfile?.avatar}
                sx={{ 
                  width: 32, 
                  height: 32,
                }}
              >
                {userProfile?.name?.[0] || 'U'}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          onClick={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1.5,
              minWidth: 220,
              borderRadius: 2,
              overflow: 'visible',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: theme.palette.background.paper,
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
                borderLeft: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              },
            },
          }}
        >
          <Box sx={{ px: 2.5, py: 2 }}>
            <Typography variant="subtitle1" fontWeight="600" noWrap>
              {userProfile?.name || 'User'}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {userProfile?.email || 'user@example.com'}
            </Typography>
          </Box>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <MenuItem onClick={handleProfile} sx={{ py: 1.5, px: 2.5 }}>
            <PersonIcon sx={{ mr: 2, fontSize: 20 }} />
            <Typography variant="body2">Profile</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout} sx={{ py: 1.5, px: 2.5, color: 'error.main' }}>
            <LogoutIcon sx={{ mr: 2, fontSize: 20 }} />
            <Typography variant="body2">Logout</Typography>
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationAnchorEl}
          open={Boolean(notificationAnchorEl)}
          onClose={handleNotificationMenuClose}
          onClick={handleNotificationMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1.5,
              minWidth: 320,
              maxWidth: 360,
              borderRadius: 2,
              overflow: 'visible',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: theme.palette.background.paper,
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
                borderLeft: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              },
            },
          }}
        >
          <Box sx={{ px: 2.5, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="subtitle1" fontWeight="600">
              Notifications
            </Typography>
            <Typography variant="caption" sx={{ px: 1, py: 0.5, borderRadius: 1, bgcolor: 'primary.lighter', color: 'primary.main' }}>
              3 New
            </Typography>
          </Box>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
            {[
              {
                id: 1,
                title: 'New Assignment Posted',
                description: 'Data Structures assignment due next week',
                time: '2 hours ago',
                type: 'assignment'
              },
              {
                id: 2,
                title: 'Upcoming Class',
                description: 'Linear Algebra class in 30 minutes',
                time: '25 minutes ago',
                type: 'class'
              },
              {
                id: 3,
                title: 'Study Group Update',
                description: 'New discussion in Machine Learning group',
                time: '1 hour ago',
                type: 'group'
              }
            ].map((notification) => (
              <MenuItem key={notification.id} sx={{ py: 1.5, px: 2.5 }}>
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" fontWeight="600">
                      {notification.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {notification.time}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    {notification.description}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Box>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <Box sx={{ p: 1 }}>
            <MenuItem sx={{ py: 1.5, borderRadius: 1, justifyContent: 'center' }}>
              <Typography variant="body2" color="primary" fontWeight="600">
                View All Notifications
              </Typography>
            </MenuItem>
          </Box>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
