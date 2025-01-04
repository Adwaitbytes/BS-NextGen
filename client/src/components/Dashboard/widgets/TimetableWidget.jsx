import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Divider,
} from '@mui/material';
import { Schedule as ScheduleIcon } from '@mui/icons-material';

const TimetableWidget = ({ classes = [], onViewAll }) => {
  return (
    <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <ScheduleIcon sx={{ mr: 1 }} />
        <Typography variant="h6" component="h2">
          Today's Classes
        </Typography>
      </Box>
      <List sx={{ flexGrow: 1, overflow: 'auto' }}>
        {classes.length > 0 ? (
          classes.map((cls, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={cls.subject}
                  secondary={`${cls.startTime} - ${cls.endTime} | ${cls.location}`}
                />
              </ListItem>
              {index < classes.length - 1 && <Divider />}
            </React.Fragment>
          ))
        ) : (
          <ListItem>
            <ListItemText
              primary="No classes scheduled for today"
              secondary="Enjoy your free time!"
            />
          </ListItem>
        )}
      </List>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={onViewAll}
        >
          View Full Timetable
        </Button>
      </Box>
    </Paper>
  );
};

export default TimetableWidget;
