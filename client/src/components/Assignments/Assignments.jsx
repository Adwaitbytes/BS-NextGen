import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  LinearProgress,
  Card,
  CardContent,
  IconButton,
  MenuItem,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AttachFile as AttachFileIcon,
} from '@mui/icons-material';

const subjects = ['Mathematics', 'Physics', 'Computer Science', 'Chemistry'];
const priorities = ['High', 'Medium', 'Low'];

const Assignments = () => {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      subject: 'Mathematics',
      title: 'Calculus Assignment 1',
      description: 'Complete exercises 1-10 from Chapter 3',
      deadline: '2025-01-10',
      progress: 70,
      priority: 'High',
      attachments: ['calculus_problems.pdf'],
    },
    {
      id: 2,
      subject: 'Computer Science',
      title: 'Programming Project',
      description: 'Build a simple web application',
      deadline: '2025-01-15',
      progress: 30,
      priority: 'Medium',
      attachments: ['project_requirements.doc'],
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleAddAssignment = () => {
    setSelectedAssignment({
      id: assignments.length + 1,
      subject: '',
      title: '',
      description: '',
      deadline: '',
      progress: 0,
      priority: 'Medium',
      attachments: [],
    });
    setEditMode(false);
    setOpenDialog(true);
  };

  const handleEditAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleDeleteAssignment = (id) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const handleSaveAssignment = () => {
    if (!selectedAssignment) return;

    if (editMode) {
      setAssignments(assignments.map(a => 
        a.id === selectedAssignment.id ? selectedAssignment : a
      ));
    } else {
      setAssignments([...assignments, selectedAssignment]);
    }
    setOpenDialog(false);
  };

  const handleProgressChange = (id, newProgress) => {
    setAssignments(assignments.map(a =>
      a.id === id ? { ...a, progress: Math.min(100, Math.max(0, newProgress)) } : a
    ));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Assignments
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddAssignment}
        >
          Add Assignment
        </Button>
      </Box>

      <Grid container spacing={3}>
        {assignments.map((assignment) => (
          <Grid item xs={12} md={6} key={assignment.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">{assignment.title}</Typography>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleEditAssignment(assignment)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteAssignment(assignment.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Typography color="textSecondary" gutterBottom>
                  {assignment.subject}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {assignment.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    Due: {new Date(assignment.deadline).toLocaleDateString()}
                  </Typography>
                  <Chip
                    label={assignment.priority}
                    size="small"
                    color={
                      assignment.priority === 'High'
                        ? 'error'
                        : assignment.priority === 'Medium'
                        ? 'warning'
                        : 'success'
                    }
                    sx={{ ml: 1 }}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    Progress: {assignment.progress}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={assignment.progress}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Button
                      size="small"
                      onClick={() => handleProgressChange(assignment.id, assignment.progress - 10)}
                    >
                      -10%
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handleProgressChange(assignment.id, assignment.progress + 10)}
                    >
                      +10%
                    </Button>
                  </Box>
                </Box>

                {assignment.attachments.map((file, index) => (
                  <Chip
                    key={index}
                    icon={<AttachFileIcon />}
                    label={file}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Assignment Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editMode ? 'Edit Assignment' : 'Add New Assignment'}
        </DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Subject"
            value={selectedAssignment?.subject || ''}
            onChange={(e) =>
              setSelectedAssignment({ ...selectedAssignment, subject: e.target.value })
            }
            sx={{ mt: 2 }}
          >
            {subjects.map((subject) => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Title"
            value={selectedAssignment?.title || ''}
            onChange={(e) =>
              setSelectedAssignment({ ...selectedAssignment, title: e.target.value })
            }
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            value={selectedAssignment?.description || ''}
            onChange={(e) =>
              setSelectedAssignment({
                ...selectedAssignment,
                description: e.target.value,
              })
            }
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            type="date"
            label="Deadline"
            value={selectedAssignment?.deadline || ''}
            onChange={(e) =>
              setSelectedAssignment({
                ...selectedAssignment,
                deadline: e.target.value,
              })
            }
            sx={{ mt: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            select
            fullWidth
            label="Priority"
            value={selectedAssignment?.priority || 'Medium'}
            onChange={(e) =>
              setSelectedAssignment({
                ...selectedAssignment,
                priority: e.target.value,
              })
            }
            sx={{ mt: 2 }}
          >
            {priorities.map((priority) => (
              <MenuItem key={priority} value={priority}>
                {priority}
              </MenuItem>
            ))}
          </TextField>
          <Button
            component="label"
            startIcon={<AttachFileIcon />}
            sx={{ mt: 2 }}
          >
            Attach Files
            <input type="file" hidden />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveAssignment} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Assignments;
