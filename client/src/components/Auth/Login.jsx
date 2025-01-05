import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Divider,
  IconButton,
  InputAdornment,
  Alert,
  Grid,
  CircularProgress,
} from '@mui/material';
import { Google as GoogleIcon, LinkedIn as LinkedInIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Visibility, VisibilityOff, Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email is required';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'Password must contain at least one number';
    }
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      return 'Password must contain at least one special character (!@#$%^&*)';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate all fields
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    // If there are any errors, don't submit
    if (emailError || passwordError) {
      setLoading(false);
      return;
    }

    try {
      await login(formData);
      navigate('/dashboard');
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: 'Invalid email or password'
      }));
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      if (provider === 'google') {
        window.location.href = 'http://localhost:5000/auth/google';
      } else if (provider === 'linkedin') {
        window.location.href = 'http://localhost:5000/auth/linkedin';
      }
    } catch (error) {
      console.error('Social login failed:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <img
            src={process.env.PUBLIC_URL + '/iitm-logo.png'}
            alt="IITM Logo"
            style={{
              width: 80,
              height: 80,
              marginBottom: 2,
            }}
          />
          <Typography component="h1" variant="h5" gutterBottom>
            Sign In
          </Typography>
        </Box>

        {errors.submit && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.submit}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ mt: 3, mb: 2 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </Box>

          <Divider sx={{ my: 2 }}>OR</Divider>

          {/* Social Login Buttons */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<GoogleIcon />}
                onClick={() => handleSocialLogin('google')}
                sx={{
                  borderColor: '#DB4437',
                  color: '#DB4437',
                  '&:hover': {
                    borderColor: '#DB4437',
                    backgroundColor: 'rgba(219, 68, 55, 0.04)',
                  },
                }}
              >
                Sign in with Google
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<LinkedInIcon />}
                onClick={() => handleSocialLogin('linkedin')}
                sx={{
                  borderColor: '#0077B5',
                  color: '#0077B5',
                  '&:hover': {
                    borderColor: '#0077B5',
                    backgroundColor: 'rgba(0, 119, 181, 0.04)',
                  },
                }}
              >
                Sign in with LinkedIn
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: 'center' }}>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              Don't have an account? Sign Up
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
