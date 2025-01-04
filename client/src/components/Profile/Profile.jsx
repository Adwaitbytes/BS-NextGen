import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Button,
  Grid,
  TextField,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  useTheme,
  Autocomplete,
} from '@mui/material';
import {
  Edit as EditIcon,
  Add as AddIcon,
  PhotoCamera as PhotoCameraIcon,
} from '@mui/icons-material';
import { useAppContext } from '../../context/AppContext';

const Profile = () => {
  const theme = useTheme();
  const { userProfile, updateProfile } = useAppContext();
  const [editMode, setEditMode] = useState(false);
  const [editInterests, setEditInterests] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    email: userProfile?.email || '',
    bio: userProfile?.bio || '',
    department: userProfile?.department || '',
    year: userProfile?.year || '',
    interests: userProfile?.interests || [],
  });

  const suggestedInterests = [
    'Programming',
    'Web Development',
    'Machine Learning',
    'Artificial Intelligence',
    'Data Science',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Literature',
    'History',
    'Economics',
    'Psychology',
    'Philosophy',
    'Art',
    'Music',
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    updateProfile(formData);
    setEditMode(false);
  };

  const handleInterestsSave = () => {
    updateProfile({ ...userProfile, interests: formData.interests });
    setEditInterests(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, position: 'relative' }}>
        <Box sx={{ position: 'absolute', right: 16, top: 16 }}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={userProfile?.avatar}
              sx={{
                width: 120,
                height: 120,
                border: `4px solid ${theme.palette.primary.main}`,
              }}
            />
            <IconButton
              sx={{
                position: 'absolute',
                bottom: -4,
                right: -4,
                backgroundColor: theme.palette.background.paper,
                '&:hover': { backgroundColor: theme.palette.background.paper },
              }}
            >
              <PhotoCameraIcon />
            </IconButton>
          </Box>
          <Box sx={{ ml: 3 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {formData.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {formData.department} • Year {formData.year}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              About Me
            </Typography>
            <Typography variant="body1" paragraph>
              {formData.bio || 'No bio added yet.'}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                Interests
              </Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={() => setEditInterests(true)}
              >
                Edit Interests
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.interests.map((interest) => (
                <Chip
                  key={interest}
                  label={interest}
                  color="primary"
                  variant="outlined"
                />
              ))}
              {formData.interests.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  No interests added yet.
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Edit Profile Dialog */}
        <Dialog open={editMode} onClose={() => setEditMode(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditMode(false)}>Cancel</Button>
            <Button onClick={handleSave} variant="contained">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Interests Dialog */}
        <Dialog open={editInterests} onClose={() => setEditInterests(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit Interests</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <Autocomplete
                multiple
                options={suggestedInterests}
                value={formData.interests}
                onChange={(_, newValue) => setFormData({ ...formData, interests: newValue })}
                freeSolo
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                      color="primary"
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Interests"
                    placeholder="Add interests"
                    helperText="You can add custom interests or select from suggestions"
                  />
                )}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditInterests(false)}>Cancel</Button>
            <Button onClick={handleInterestsSave} variant="contained">
              Save Interests
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default Profile;
