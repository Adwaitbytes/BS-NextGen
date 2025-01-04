import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  LinearProgress,
  Divider,
} from '@mui/material';
import { Assignment as AssignmentIcon } from '@mui/icons-material';

const AssignmentWidget = ({ assignments = [], onViewAll }) => {
  return (
    <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <AssignmentIcon sx={{ mr: 1 }} />
        <Typography variant="h6" component="h2">
          Pending Assignments
        </Typography>
      </Box>
      <List sx={{ flexGrow: 1, overflow: 'auto' }}>
        {assignments.length > 0 ? (
          assignments.map((assignment, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ListItemText
                      primary={assignment.title}
                      secondary={`Due: ${new Date(assignment.deadline).toLocaleDateString()}`}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {assignment.progress}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={assignment.progress}
                    sx={{ mt: 1 }}
                  />
                </Box>
              </ListItem>
              {index < assignments.length - 1 && <Divider />}
            </React.Fragment>
          ))
        ) : (
          <ListItem>
            <ListItemText
              primary="No pending assignments"
              secondary="You're all caught up!"
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
          View All Assignments
        </Button>
      </Box>
    </Paper>
  );
};

export default AssignmentWidget;
