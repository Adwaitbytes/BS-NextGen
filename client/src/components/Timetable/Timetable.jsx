import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  useTheme,
  alpha,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useAppContext } from '../../context/AppContext';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const HOURS = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return `${hour}:00`;
});

const Timetable = () => {
  const theme = useTheme();
  const { schedule, updateSchedule } = useAppContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleAddClass = () => {
    setSelectedClass({
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:00',
      subject: '',
      professor: '',
      location: '',
    });
    setEditMode(false);
    setOpenDialog(true);
  };

  const handleEditClass = (classInfo) => {
    setSelectedClass(classInfo);
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleDeleteClass = (classToDelete) => {
    const updatedSchedule = schedule.filter(
      (cls) => !(cls.day === classToDelete.day && cls.startTime === classToDelete.startTime)
    );
    updateSchedule(updatedSchedule);
  };

  const handleSaveClass = () => {
    if (!selectedClass) return;

    let updatedSchedule;
    if (editMode) {
      updatedSchedule = schedule.map((cls) =>
        cls.day === selectedClass.day && cls.startTime === selectedClass.startTime
          ? selectedClass
          : cls
      );
    } else {
      updatedSchedule = [...schedule, selectedClass];
    }

    updateSchedule(updatedSchedule);
    setOpenDialog(false);
  };

  const getClassForTimeSlot = (day, time) => {
    return schedule.find(
      (cls) => cls.day === day && cls.startTime === time
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Class Schedule
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClass}
          sx={{ borderRadius: 2 }}
        >
          Add Class
        </Button>
      </Box>

      <Paper 
        elevation={0}
        sx={{ 
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          borderRadius: 2,
          overflow: 'auto',
        }}
      >
        <Grid container sx={{ minWidth: 1200 }}>
          {/* Time Column */}
          <Grid item xs={1.5}>
            <Box sx={{ 
              p: 2, 
              borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              bgcolor: alpha(theme.palette.primary.main, 0.05),
            }}>
              <Typography variant="subtitle2" fontWeight="bold">
                Time
              </Typography>
            </Box>
            {HOURS.map((time) => (
              <Box 
                key={time}
                sx={{ 
                  p: 2,
                  height: 80,
                  borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {time}
                </Typography>
              </Box>
            ))}
          </Grid>

          {/* Days Columns */}
          {DAYS.map((day) => (
            <Grid item xs={1.5} key={day}>
              <Box sx={{ 
                p: 2,
                borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                bgcolor: alpha(theme.palette.primary.main, 0.05),
              }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {day}
                </Typography>
              </Box>
              {HOURS.map((time) => {
                const classItem = getClassForTimeSlot(day, time);
                return (
                  <Box
                    key={`${day}-${time}`}
                    sx={{
                      position: 'relative',
                      height: 80,
                      p: 1,
                      borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    }}
                  >
                    {classItem && (
                      <Paper
                        elevation={0}
                        sx={{
                          position: 'absolute',
                          top: 4,
                          left: 4,
                          right: 4,
                          bottom: 4,
                          p: 1,
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                          borderRadius: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          '&:hover': {
                            bgcolor: alpha(theme.palette.primary.main, 0.15),
                            transform: 'translateY(-2px)',
                            boxShadow: theme.shadows[2],
                          },
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="caption" fontWeight="bold" color="primary.main">
                            {classItem.subject}
                          </Typography>
                          <Box>
                            <Tooltip title="Edit">
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditClass(classItem);
                                }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteClass(classItem);
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {classItem.startTime} - {classItem.endTime}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {classItem.location}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {classItem.professor}
                        </Typography>
                      </Paper>
                    )}
                  </Box>
                );
              })}
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Add/Edit Class Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? 'Edit Class' : 'Add New Class'}</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Day"
            value={selectedClass?.day || ''}
            onChange={(e) => setSelectedClass({ ...selectedClass, day: e.target.value })}
            sx={{ mt: 2 }}
          >
            {DAYS.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            label="Start Time"
            value={selectedClass?.startTime || ''}
            onChange={(e) => setSelectedClass({ ...selectedClass, startTime: e.target.value })}
            sx={{ mt: 2 }}
          >
            {HOURS.map((time) => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            label="End Time"
            value={selectedClass?.endTime || ''}
            onChange={(e) => setSelectedClass({ ...selectedClass, endTime: e.target.value })}
            sx={{ mt: 2 }}
          >
            {HOURS.map((time) => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Subject"
            value={selectedClass?.subject || ''}
            onChange={(e) => setSelectedClass({ ...selectedClass, subject: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Professor"
            value={selectedClass?.professor || ''}
            onChange={(e) => setSelectedClass({ ...selectedClass, professor: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Location"
            value={selectedClass?.location || ''}
            onChange={(e) => setSelectedClass({ ...selectedClass, location: e.target.value })}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveClass} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Timetable;
