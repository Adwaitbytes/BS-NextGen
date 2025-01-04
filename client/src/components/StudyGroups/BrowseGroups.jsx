import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  People as PeopleIcon,
  School as SchoolIcon,
} from '@mui/icons-material';

const BrowseGroups = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Demo data
  const studyGroups = [
    {
      id: 1,
      name: 'Advanced Mathematics',
      subject: 'Mathematics',
      members: 15,
      description: 'Group for discussing advanced mathematical concepts and problem-solving',
      topics: ['Calculus', 'Linear Algebra', 'Statistics'],
      nextMeeting: '2025-01-05T14:00:00',
    },
    {
      id: 2,
      name: 'Data Structures & Algorithms',
      subject: 'Computer Science',
      members: 20,
      description: 'Practice DSA problems and discuss solutions',
      topics: ['Arrays', 'Trees', 'Dynamic Programming'],
      nextMeeting: '2025-01-06T16:00:00',
    },
    {
      id: 3,
      name: 'Quantum Physics Study Circle',
      subject: 'Physics',
      members: 12,
      description: 'Explore quantum mechanics and modern physics concepts',
      topics: ['Quantum Mechanics', 'Particle Physics', 'Relativity'],
      nextMeeting: '2025-01-07T15:30:00',
    },
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleJoinGroup = () => {
    // Add join group logic here
    handleCloseDialog();
  };

  const filteredGroups = studyGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.topics.some((topic) =>
        topic.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Browse Study Groups
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PeopleIcon />}
          sx={{
            borderRadius: '20px',
            textTransform: 'none',
          }}
        >
          Create New Group
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 4,
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by group name, subject, or topic..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
            },
          }}
        />
        <IconButton>
          <FilterIcon />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        {filteredGroups.map((group) => (
          <Grid item xs={12} md={6} lg={4} key={group.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
              onClick={() => handleGroupClick(group)}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      mr: 2,
                    }}
                  >
                    <SchoolIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" component="h2">
                      {group.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {group.subject}
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {group.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  {group.topics.map((topic) => (
                    <Chip
                      key={topic}
                      label={topic}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    <PeopleIcon
                      sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }}
                    />
                    {group.members} members
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Next meeting:{' '}
                    {new Date(group.nextMeeting).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Join Study Group</DialogTitle>
        <DialogContent>
          {selectedGroup && (
            <>
              <Typography variant="h6" gutterBottom>
                {selectedGroup.name}
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedGroup.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Join this group to:
                <ul>
                  <li>Participate in group discussions</li>
                  <li>Attend study sessions</li>
                  <li>Share and access study materials</li>
                  <li>Connect with fellow students</li>
                </ul>
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleJoinGroup}
            sx={{ borderRadius: '20px' }}
          >
            Join Group
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BrowseGroups;
