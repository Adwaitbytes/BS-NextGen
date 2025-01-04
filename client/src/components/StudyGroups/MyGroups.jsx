import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  AvatarGroup,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  useTheme,
} from '@mui/material';
import {
  VideoCall as VideoCallIcon,
  Chat as ChatIcon,
  Event as EventIcon,
  MoreVert as MoreVertIcon,
  School as SchoolIcon,
} from '@mui/icons-material';

const MyGroups = () => {
  const theme = useTheme();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [openMeetingDialog, setOpenMeetingDialog] = useState(false);

  // Demo data
  const myGroups = [
    {
      id: 1,
      name: 'Advanced Mathematics',
      subject: 'Mathematics',
      nextMeeting: '2025-01-05T14:00:00',
      members: [
        { id: 1, name: 'John Doe', avatar: '👨‍🎓' },
        { id: 2, name: 'Jane Smith', avatar: '👩‍🎓' },
        { id: 3, name: 'Mike Johnson', avatar: '👨‍🎓' },
      ],
      upcomingMeetings: [
        {
          id: 1,
          title: 'Linear Algebra Review',
          date: '2025-01-05T14:00:00',
          duration: '1.5 hours',
        },
        {
          id: 2,
          title: 'Calculus Problem Solving',
          date: '2025-01-07T15:00:00',
          duration: '2 hours',
        },
      ],
    },
    {
      id: 2,
      name: 'Data Structures & Algorithms',
      subject: 'Computer Science',
      nextMeeting: '2025-01-06T16:00:00',
      members: [
        { id: 4, name: 'Sarah Wilson', avatar: '👩‍🎓' },
        { id: 5, name: 'Tom Brown', avatar: '👨‍🎓' },
        { id: 6, name: 'Emily Davis', avatar: '👩‍🎓' },
      ],
      upcomingMeetings: [
        {
          id: 3,
          title: 'Graph Algorithms Workshop',
          date: '2025-01-06T16:00:00',
          duration: '2 hours',
        },
      ],
    },
  ];

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setOpenMeetingDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenMeetingDialog(false);
  };

  const handleStartVideoCall = (groupId) => {
    // Navigate to video call page
    console.log('Starting video call for group:', groupId);
  };

  const handleOpenChat = (groupId) => {
    // Open chat interface
    console.log('Opening chat for group:', groupId);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Study Groups
      </Typography>

      <Grid container spacing={3}>
        {myGroups.map((group) => (
          <Grid item xs={12} md={6} key={group.id}>
            <Card
              sx={{
                height: '100%',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        mr: 2,
                      }}
                    >
                      <SchoolIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{group.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {group.subject}
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <AvatarGroup max={4}>
                    {group.members.map((member) => (
                      <Avatar key={member.id}>{member.avatar}</Avatar>
                    ))}
                  </AvatarGroup>
                  <Box>
                    <IconButton
                      color="primary"
                      onClick={() => handleStartVideoCall(group.id)}
                    >
                      <VideoCallIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenChat(group.id)}
                    >
                      <ChatIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Box>
                  <Button
                    variant="outlined"
                    startIcon={<EventIcon />}
                    onClick={() => handleGroupClick(group)}
                    fullWidth
                    sx={{
                      borderRadius: '20px',
                      textTransform: 'none',
                    }}
                  >
                    View Upcoming Meetings
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openMeetingDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Upcoming Meetings</DialogTitle>
        <DialogContent>
          {selectedGroup && (
            <List>
              {selectedGroup.upcomingMeetings.map((meeting, index) => (
                <React.Fragment key={meeting.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        <EventIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={meeting.title}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {new Date(meeting.date).toLocaleString()}
                          </Typography>
                          {' — '}
                          {meeting.duration}
                        </>
                      }
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<VideoCallIcon />}
                      sx={{
                        borderRadius: '20px',
                        textTransform: 'none',
                      }}
                    >
                      Join
                    </Button>
                  </ListItem>
                  {index < selectedGroup.upcomingMeetings.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </React.Fragment>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyGroups;
