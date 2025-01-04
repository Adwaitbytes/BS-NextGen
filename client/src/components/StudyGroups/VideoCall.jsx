import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  IconButton,
  Button,
  Avatar,
  AvatarGroup,
  Tooltip,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useTheme,
} from '@mui/material';
import {
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Videocam as VideocamIcon,
  VideocamOff as VideocamOffIcon,
  ScreenShare as ScreenShareIcon,
  StopScreenShare as StopScreenShareIcon,
  Chat as ChatIcon,
  PresentToAll as PresentToAllIcon,
  People as PeopleIcon,
  CallEnd as CallEndIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const VideoCall = () => {
  const theme = useTheme();
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [openNewMeetingDialog, setOpenNewMeetingDialog] = useState(false);

  // Demo participants
  const participants = [
    { id: 1, name: 'You', avatar: '👨‍🎓', isHost: true },
    { id: 2, name: 'John Doe', avatar: '👨‍🎓' },
    { id: 3, name: 'Jane Smith', avatar: '👩‍🎓' },
    { id: 4, name: 'Mike Johnson', avatar: '👨‍🎓' },
  ];

  const handleNewMeeting = () => {
    setOpenNewMeetingDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenNewMeetingDialog(false);
  };

  const handleStartMeeting = () => {
    // Add meeting start logic here
    handleCloseDialog();
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Bar */}
      <Box
        sx={{
          p: 2,
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">Study Group Video Call</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleNewMeeting}
            sx={{ borderRadius: '20px' }}
          >
            New Meeting
          </Button>
          <AvatarGroup max={4}>
            {participants.map((participant) => (
              <Tooltip key={participant.id} title={participant.name}>
                <Avatar>{participant.avatar}</Avatar>
              </Tooltip>
            ))}
          </AvatarGroup>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 2, bgcolor: 'background.default' }}>
        <Grid container spacing={2} sx={{ height: '100%' }}>
          {/* Video Grid */}
          <Grid item xs={showChat || showParticipants ? 9 : 12}>
            <Grid container spacing={2}>
              {participants.map((participant) => (
                <Grid item xs={6} key={participant.id}>
                  <Paper
                    sx={{
                      height: 300,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      bgcolor: 'grey.900',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 120,
                        height: 120,
                        fontSize: '3rem',
                      }}
                    >
                      {participant.avatar}
                    </Avatar>
                    <Typography
                      sx={{
                        position: 'absolute',
                        bottom: 16,
                        left: 16,
                        color: 'white',
                      }}
                    >
                      {participant.name}
                      {participant.isHost && ' (Host)'}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Side Panel */}
          {(showChat || showParticipants) && (
            <Grid item xs={3}>
              <Paper
                sx={{
                  height: '100%',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {showChat ? 'Chat' : 'Participants'}
                </Typography>
                {/* Add chat or participants list content here */}
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>

      {/* Controls */}
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        <IconButton
          color={micEnabled ? 'primary' : 'error'}
          onClick={() => setMicEnabled(!micEnabled)}
        >
          {micEnabled ? <MicIcon /> : <MicOffIcon />}
        </IconButton>
        <IconButton
          color={videoEnabled ? 'primary' : 'error'}
          onClick={() => setVideoEnabled(!videoEnabled)}
        >
          {videoEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
        </IconButton>
        <IconButton
          color={screenSharing ? 'primary' : 'inherit'}
          onClick={() => setScreenSharing(!screenSharing)}
        >
          {screenSharing ? <StopScreenShareIcon /> : <ScreenShareIcon />}
        </IconButton>
        <IconButton
          color={showChat ? 'primary' : 'inherit'}
          onClick={() => setShowChat(!showChat)}
        >
          <ChatIcon />
        </IconButton>
        <IconButton onClick={() => setShowParticipants(!showParticipants)}>
          <PeopleIcon />
        </IconButton>
        <IconButton>
          <PresentToAllIcon />
        </IconButton>
        <Fab
          color="error"
          variant="extended"
          sx={{ px: 3, mx: 2 }}
        >
          <CallEndIcon sx={{ mr: 1 }} />
          End Call
        </Fab>
      </Paper>

      {/* New Meeting Dialog */}
      <Dialog
        open={openNewMeetingDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Start New Meeting</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Meeting Title"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            select
            label="Study Group"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          >
            {/* Add study group options here */}
          </TextField>
          <TextField
            type="datetime-local"
            label="Start Time"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleStartMeeting}
            sx={{ borderRadius: '20px' }}
          >
            Start Meeting
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VideoCall;
