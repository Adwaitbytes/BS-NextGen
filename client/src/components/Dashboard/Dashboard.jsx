import React, { useState, useMemo } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  useTheme,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  LinearProgress,
  Tooltip,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  CircularProgress,
} from '@mui/material';
import {
  Event as EventIcon,
  Assignment as AssignmentIcon,
  Group as GroupIcon,
  School as SchoolIcon,
  ArrowForward as ArrowForwardIcon,
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  CalendarMonth as CalendarIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
  </div>
);

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const { 
    userProfile,
    assignments = [],
    schedule = [],
    studyGroups = [],
    learningResources = [],
    updateAssignments,
  } = useAppContext();

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleMarkComplete = (assignmentId) => {
    const updatedAssignments = assignments.map(assignment =>
      assignment.id === assignmentId
        ? { ...assignment, completed: true }
        : assignment
    );
    updateAssignments(updatedAssignments);
  };

  const today = useMemo(() => {
    return new Date('2025-01-04T02:27:53+05:30').toLocaleDateString('en-US', { weekday: 'long' });
  }, []);

  const todayClasses = useMemo(() => {
    return schedule
      .filter(cls => cls.day === today)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [schedule, today]);

  const activeAssignments = useMemo(() => {
    return assignments.filter(a => !a.completed);
  }, [assignments]);

  const stats = [
    {
      title: 'Study Groups',
      count: studyGroups.length,
      icon: <GroupIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.primary.main,
      path: '/study-groups',
      progress: (studyGroups.length / 5) * 100, // Assuming 5 is the target number of study groups
    },
    {
      title: 'Active Assignments',
      count: activeAssignments.length,
      icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.secondary.main,
      path: '/assignments',
      progress: assignments.length > 0 
        ? ((assignments.length - activeAssignments.length) / assignments.length) * 100 
        : 0,
    },
    {
      title: 'Resources',
      count: learningResources.length,
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.success.main,
      path: '/learning-resources',
      progress: learningResources.length > 0 ? 100 : 0,
    },
    {
      title: "Today's Classes",
      count: todayClasses.length,
      icon: <EventIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.warning.main,
      path: '/timetable',
      progress: todayClasses.length > 0 ? 100 : 0,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Welcome back, {userProfile?.name || 'Student'}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening in your academic world
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative',
                overflow: 'visible',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[4],
                },
              }}
              onClick={() => navigate(stat.path)}
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
                  <Box>
                    <Typography variant="h3" fontWeight="bold">
                      {stat.count}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                  <Box sx={{ position: 'relative' }}>
                    <CircularProgress
                      variant="determinate"
                      value={stat.progress}
                      size={70}
                      thickness={4}
                      sx={{
                        position: 'absolute',
                        color: theme.palette.action.disabledBackground,
                      }}
                    />
                    <CircularProgress
                      variant="determinate"
                      value={stat.progress}
                      size={70}
                      thickness={4}
                      sx={{
                        color: stat.color,
                        position: 'absolute',
                        left: 0,
                      }}
                    />
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.action.disabledBackground,
                        color: stat.color,
                        width: 56,
                        height: 56,
                        position: 'relative',
                        top: 7,
                        left: 7,
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                  </Box>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={stat.progress}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    bgcolor: theme.palette.action.disabledBackground,
                    '& .MuiLinearProgress-bar': {
                      bgcolor: stat.color,
                      borderRadius: 3,
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tabs Section */}
      <Paper sx={{ mb: 3 }} elevation={0}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              minWidth: 120,
            },
          }}
        >
          <Tab
            icon={<ScheduleIcon sx={{ fontSize: 20 }} />}
            iconPosition="start"
            label="Today's Classes"
          />
          <Tab
            icon={<AssignmentIcon sx={{ fontSize: 20 }} />}
            iconPosition="start"
            label="Assignments"
          />
          <Tab
            icon={<CalendarIcon sx={{ fontSize: 20 }} />}
            iconPosition="start"
            label="Upcoming Events"
          />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          <List>
            {todayClasses.map((class_, index) => (
              <React.Fragment key={class_.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                      <SchoolIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={class_.subject}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          {class_.startTime} - {class_.endTime} • {class_.location}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2" color="text.secondary">
                          {class_.professor}
                        </Typography>
                      </>
                    }
                  />
                  <IconButton
                    size="small"
                    onClick={handleMenuOpen}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </ListItem>
                {index < todayClasses.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
            {todayClasses.length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
                No classes scheduled for today
              </Typography>
            )}
          </List>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <List>
            {activeAssignments.map((assignment, index) => (
              <React.Fragment key={assignment.id}>
                <ListItem
                  secondaryAction={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Tooltip title="Mark as Complete">
                        <IconButton
                          edge="end"
                          size="small"
                          onClick={() => handleMarkComplete(assignment.id)}
                          sx={{ color: theme.palette.success.main }}
                        >
                          <CheckCircleIcon />
                        </IconButton>
                      </Tooltip>
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={handleMenuOpen}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                      <AssignmentIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={assignment.title}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          {assignment.subject} • Due {new Date(assignment.deadline).toLocaleDateString()}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={assignment.progress}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              bgcolor: theme.palette.action.disabledBackground,
                              '& .MuiLinearProgress-bar': {
                                bgcolor: theme.palette.secondary.main,
                                borderRadius: 3,
                              },
                            }}
                          />
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                            Progress: {assignment.progress}%
                          </Typography>
                        </Box>
                      </>
                    }
                  />
                </ListItem>
                {index < activeAssignments.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
            {activeAssignments.length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
                No pending assignments
              </Typography>
            )}
          </List>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Coming soon! Stay tuned for upcoming events.
            </Typography>
          </Box>
        </TabPanel>
      </Paper>

      {/* Context Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
        <MenuItem onClick={handleMenuClose}>Set Reminder</MenuItem>
        <MenuItem onClick={handleMenuClose}>Share</MenuItem>
      </Menu>
    </Box>
  );
};

export default Dashboard;
