import React from 'react';
import { Paper, Typography, Box, Avatar } from '@mui/material';
import { Notifications } from '@mui/icons-material';

const NotificationWidget = () => {
  // Demo data
  const notifications = [
    {
      type: 'assignment',
      message: 'New assignment posted in Mathematics',
      time: '2 hours ago',
    },
    {
      type: 'announcement',
      message: 'Important announcement from faculty',
      time: '1 day ago',
    },
  ];

  return (
    <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Notifications color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6">Recent Notifications</Typography>
      </Box>
      {notifications.map((notification, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'start',
            mb: 2,
            p: 1,
            bgcolor: 'background.default',
            borderRadius: 1,
          }}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              mr: 1,
              bgcolor: notification.type === 'assignment' ? 'primary.main' : 'secondary.main',
            }}
          >
            {notification.type === 'assignment' ? 'A' : 'N'}
          </Avatar>
          <Box>
            <Typography variant="body1">{notification.message}</Typography>
            <Typography variant="caption" color="text.secondary">
              {notification.time}
            </Typography>
          </Box>
        </Box>
      ))}
    </Paper>
  );
};

export default NotificationWidget;
