import React, { useState } from 'react';
import {
  Box,
  Button,
  MobileStepper,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

const onboardingSteps = [
  {
    title: 'Welcome to BS NextGen',
    description: 'Your all-in-one platform for managing your IITM BS degree journey.',
    image: '/onboarding/welcome.svg',
  },
  {
    title: 'Track Your Progress',
    description: 'Stay on top of your assignments, deadlines, and grades with our intuitive tracking system.',
    image: '/onboarding/track.svg',
  },
  {
    title: 'Connect with Peers',
    description: 'Join study groups, collaborate on projects, and build your academic network.',
    image: '/onboarding/connect.svg',
  },
  {
    title: 'AI-Powered Support',
    description: 'Get instant answers to your questions with our AI chatbot assistant.',
    image: '/onboarding/ai.svg',
  },
];

const Onboarding = ({ onComplete }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = onboardingSteps.length;

  const handleNext = () => {
    if (activeStep === maxSteps - 1) {
      onComplete();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 600,
          width: '90%',
          p: 4,
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {onboardingSteps.map((step, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 2,
              }}
            >
              <Box
                component="img"
                src={step.image}
                alt={step.title}
                sx={{
                  height: 200,
                  width: 200,
                  mb: 4,
                  objectFit: 'contain',
                }}
              />
              <Typography variant="h5" component="h2" gutterBottom align="center">
                {step.title}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                align="center"
                sx={{ mb: 2 }}
              >
                {step.description}
              </Typography>
            </Box>
          ))}
        </SwipeableViews>

        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{ width: '100%', mt: 2 }}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              sx={{ fontWeight: 600 }}
            >
              {activeStep === maxSteps - 1 ? 'Get Started' : 'Next'}
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />

        <Button
          onClick={handleSkip}
          sx={{ mt: 2 }}
          color="inherit"
        >
          Skip Onboarding
        </Button>
      </Paper>
    </Box>
  );
};

export default Onboarding;
