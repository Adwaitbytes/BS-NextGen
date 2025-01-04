import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Avatar,
  Chip,
  Tab,
  Tabs,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';

const AlumniFaculty = () => {
  const [tab, setTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Demo data
  const alumni = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      graduation: '2020',
      company: 'Google',
      role: 'Senior Software Engineer',
      expertise: ['Machine Learning', 'AI', 'Cloud Computing'],
      avatar: '/avatars/alumni1.jpg',
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      email: 'sarah.j@example.com',
    },
    {
      id: 2,
      name: 'Michael Chen',
      graduation: '2021',
      company: 'Microsoft',
      role: 'Product Manager',
      expertise: ['Product Management', 'UX Design', 'Agile'],
      avatar: '/avatars/alumni2.jpg',
      linkedin: 'https://linkedin.com/in/michaelchen',
      email: 'michael.c@example.com',
    },
  ];

  const faculty = [
    {
      id: 1,
      name: 'Prof. Robert Smith',
      department: 'Computer Science',
      position: 'Professor',
      research: ['Artificial Intelligence', 'Data Science', 'Machine Learning'],
      avatar: '/avatars/faculty1.jpg',
      email: 'robert.smith@iitm.ac.in',
      office: 'CS-101',
      officeHours: 'Mon, Wed 2-4 PM',
    },
    {
      id: 2,
      name: 'Dr. Emily Brown',
      department: 'Mathematics',
      position: 'Associate Professor',
      research: ['Number Theory', 'Cryptography', 'Abstract Algebra'],
      avatar: '/avatars/faculty2.jpg',
      email: 'emily.brown@iitm.ac.in',
      office: 'MA-205',
      officeHours: 'Tue, Thu 10-12 PM',
    },
  ];

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const filteredAlumni = alumni.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredFaculty = faculty.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.research.some(area => area.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Alumni & Faculty Network
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="Alumni" />
          <Tab label="Faculty" />
        </Tabs>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={`Search ${tab === 0 ? 'alumni' : 'faculty'}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <FilterIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {tab === 0
          ? filteredAlumni.map((person) => (
              <Grid item xs={12} md={6} key={person.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        src={person.avatar}
                        sx={{ width: 64, height: 64, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="h6">{person.name}</Typography>
                        <Typography color="textSecondary">
                          {person.role} at {person.company}
                        </Typography>
                        <Typography variant="body2">
                          Class of {person.graduation}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      {person.expertise.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          size="small"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      startIcon={<LinkedInIcon />}
                      href={person.linkedin}
                      target="_blank"
                    >
                      LinkedIn
                    </Button>
                    <Button
                      size="small"
                      startIcon={<EmailIcon />}
                      href={`mailto:${person.email}`}
                    >
                      Email
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          : filteredFaculty.map((person) => (
              <Grid item xs={12} md={6} key={person.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        src={person.avatar}
                        sx={{ width: 64, height: 64, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="h6">{person.name}</Typography>
                        <Typography color="textSecondary">
                          {person.position}, {person.department}
                        </Typography>
                        <Typography variant="body2">
                          Office: {person.office}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Office Hours: {person.officeHours}
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" gutterBottom>
                        Research Areas:
                      </Typography>
                      {person.research.map((area, index) => (
                        <Chip
                          key={index}
                          label={area}
                          size="small"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      startIcon={<EmailIcon />}
                      href={`mailto:${person.email}`}
                    >
                      Email
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
      </Grid>
    </Container>
  );
};

export default AlumniFaculty;
