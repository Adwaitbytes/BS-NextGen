import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  useTheme,
  LinearProgress,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const Analytics = () => {
  const theme = useTheme();

  // Sample data - In production, this would come from your backend
  const weeklyStudyHours = [
    { day: 'Mon', hours: 4 },
    { day: 'Tue', hours: 6 },
    { day: 'Wed', hours: 5 },
    { day: 'Thu', hours: 7 },
    { day: 'Fri', hours: 4 },
    { day: 'Sat', hours: 8 },
    { day: 'Sun', hours: 3 },
  ];

  const subjectPerformance = [
    { subject: 'Mathematics', score: 85 },
    { subject: 'Physics', score: 78 },
    { subject: 'Programming', score: 92 },
    { subject: 'Statistics', score: 88 },
  ];

  const assignmentStatus = [
    { name: 'Completed', value: 25 },
    { name: 'Pending', value: 5 },
  ];

  const COLORS = ['#00C49F', '#FF8042'];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Analytics Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Assignment Completion Rate</Typography>
              <Typography variant="h3" sx={{ mt: 2 }}>
                83%
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={83} 
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Timetable Adherence</Typography>
              <Typography variant="h3" sx={{ mt: 2 }}>
                91%
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={91} 
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Average Study Hours/Day</Typography>
              <Typography variant="h3" sx={{ mt: 2 }}>
                5.3
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={(5.3/8)*100} 
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Weekly Study Hours Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Weekly Study Hours
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyStudyHours}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="hours" fill={theme.palette.primary.main} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Assignment Status Pie Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Assignment Status
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assignmentStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {assignmentStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Subject Performance */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Subject Performance
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill={theme.palette.secondary.main} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
