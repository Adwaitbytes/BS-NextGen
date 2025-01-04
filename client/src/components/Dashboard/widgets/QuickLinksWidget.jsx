import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
} from '@mui/material';
import {
  VideoCall as VideoCallIcon,
  Group as GroupIcon,
  Chat as ChatIcon,
  School as SchoolIcon,
  MenuBook as MenuBookIcon,
} from '@mui/icons-material';

const QuickLinksWidget = ({ onLinkClick }) => {
  const quickLinks = [
    {
      title: 'Join Study Group',
      icon: <GroupIcon />,
      path: '/study-groups',
      description: 'Connect with peers',
    },
    {
      title: 'Start Video Call',
      icon: <VideoCallIcon />,
      path: '/study-groups/video-call',
      description: 'Begin a study session',
    },
    {
      title: 'Chat with AI',
      icon: <ChatIcon />,
      path: '/chatbot',
      description: 'Get instant help',
    },
    {
      title: 'Alumni Network',
      icon: <SchoolIcon />,
      path: '/alumni-faculty',
      description: 'Connect with alumni',
    },
    {
      title: 'Learning Resources',
      icon: <MenuBookIcon />,
      path: '/resources',
      description: 'Access study materials',
    },
  ];

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Quick Links
      </Typography>
      <List>
        {quickLinks.map((link, index) => (
          <React.Fragment key={index}>
            <ListItem
              button
              onClick={() => onLinkClick(link.path)}
              sx={{
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText
                primary={link.title}
                secondary={link.description}
                primaryTypographyProps={{
                  variant: 'subtitle1',
                  fontWeight: 500,
                }}
              />
            </ListItem>
            {index < quickLinks.length - 1 && (
              <Box sx={{ mx: 2 }}>
                <Divider />
              </Box>
            )}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default QuickLinksWidget;
