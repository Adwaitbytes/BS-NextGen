import React, { useState } from 'react';
import {
  Container,
  Paper,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';

const TimetableManager = () => {
  const [open, setOpen] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [newClass, setNewClass] = useState({
    subject: '',
    day: '',
    startTime: null,
    endTime: null,
    room: '',
    professor: '',
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewClass({
      subject: '',
      day: '',
      startTime: null,
      endTime: null,
      room: '',
      professor: '',
    });
  };

  const handleSubmit = () => {
    setSchedule([...schedule, newClass]);
    handleClose();
  };

  const handleChange = (field) => (event) => {
    setNewClass({
      ...newClass,
      [field]: event.target.value,
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" component="h1">
              Timetable Manager
            </Typography>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
              Add Class
            </Button>
          </Paper>
        </Grid>

        {/* Weekly Schedule */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            {days.map((day) => (
              <div key={day}>
                <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
                  {day}
                </Typography>
                {schedule
                  .filter((class_) => class_.day === day)
                  .map((class_, index) => (
                    <Paper
                      key={index}
                      sx={{
                        p: 2,
                        mb: 1,
                        backgroundColor: 'primary.light',
                        color: 'primary.contrastText',
                      }}
                    >
                      <Typography variant="subtitle1">
                        {class_.subject} - {class_.professor}
                      </Typography>
                      <Typography variant="body2">
                        Room: {class_.room}
                      </Typography>
                      <Typography variant="body2">
                        Time: {class_.startTime} - {class_.endTime}
                      </Typography>
                    </Paper>
                  ))}
              </div>
            ))}
          </Paper>
        </Grid>
      </Grid>

      {/* Add Class Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Class</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Subject"
            fullWidth
            value={newClass.subject}
            onChange={handleChange('subject')}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Day</InputLabel>
            <Select
              value={newClass.day}
              onChange={handleChange('day')}
            >
              {days.map((day) => (
                <MenuItem key={day} value={day}>
                  {day}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Start Time"
              value={newClass.startTime}
              onChange={(newValue) => {
                setNewClass({ ...newClass, startTime: newValue });
              }}
              renderInput={(params) => <TextField {...params} fullWidth sx={{ mt: 2 }} />}
            />
            <TimePicker
              label="End Time"
              value={newClass.endTime}
              onChange={(newValue) => {
                setNewClass({ ...newClass, endTime: newValue });
              }}
              renderInput={(params) => <TextField {...params} fullWidth sx={{ mt: 2 }} />}
            />
          </LocalizationProvider>
          <TextField
            margin="dense"
            label="Room"
            fullWidth
            value={newClass.room}
            onChange={handleChange('room')}
          />
          <TextField
            margin="dense"
            label="Professor"
            fullWidth
            value={newClass.professor}
            onChange={handleChange('professor')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TimetableManager;
