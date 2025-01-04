import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  Box,
  Tabs,
  Tab,
  Paper,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  Group as GroupIcon,
  VideoCall as VideoCallIcon,
} from '@mui/icons-material';

import BrowseGroups from './BrowseGroups';
import MyGroups from './MyGroups';
import VideoCall from './VideoCall';

const StudyGroups = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/study-groups/browse');
        break;
      case 1:
        navigate('/study-groups/my-groups');
        break;
      case 2:
        navigate('/study-groups/video-call');
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper
        sx={{
          borderRadius: 0,
          borderBottom: 1,
          borderColor: 'divider',
          zIndex: 1,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              minHeight: 64,
              fontSize: '1rem',
            },
          }}
        >
          <Tab
            icon={<SearchIcon />}
            label="Browse Groups"
            iconPosition="start"
            sx={{
              textTransform: 'none',
              fontWeight: 500,
            }}
          />
          <Tab
            icon={<GroupIcon />}
            label="My Groups"
            iconPosition="start"
            sx={{
              textTransform: 'none',
              fontWeight: 500,
            }}
          />
          <Tab
            icon={<VideoCallIcon />}
            label="Video Call"
            iconPosition="start"
            sx={{
              textTransform: 'none',
              fontWeight: 500,
            }}
          />
        </Tabs>
      </Paper>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Routes>
          <Route path="/" element={<BrowseGroups />} />
          <Route path="/browse" element={<BrowseGroups />} />
          <Route path="/my-groups" element={<MyGroups />} />
          <Route path="/video-call" element={<VideoCall />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default StudyGroups;
