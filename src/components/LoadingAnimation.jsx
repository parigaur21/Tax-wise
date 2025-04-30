import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const pulse = keyframes`
  0% { transform: scale(0.95); opacity: 0.7; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.7; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const StyledLoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '200px',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, rgba(31, 41, 55, 0.8) 0%, rgba(17, 24, 39, 0.9) 100%)'
    : 'linear-gradient(135deg, rgba(248, 250, 255, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%)',
  backdropFilter: 'blur(10px)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 10px 25px rgba(0, 0, 0, 0.5), 0 0 5px rgba(94, 114, 228, 0.3)'
    : '0 10px 25px rgba(0, 0, 0, 0.1), 0 0 5px rgba(41, 98, 255, 0.1)',
  animation: `${pulse} 2s infinite ease-in-out`,
}));

const IconContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  margin: theme.spacing(2),
  animation: `${float} 3s infinite ease-in-out`,
}));

const LoadingAnimation = ({ message = "Processing your request..." }) => {
  return (
    <StyledLoadingContainer>
      <IconContainer>
        <CircularProgress 
          size={60} 
          thickness={4} 
          color="primary" 
          sx={{ 
            filter: (theme) => `drop-shadow(0 0 10px ${theme.palette.primary.main})`,
          }} 
        />
      </IconContainer>
      <Typography 
        variant="h6" 
        sx={{ 
          textAlign: 'center',
          fontWeight: 500,
          mb: 1,
          background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
        {message}
      </Typography>
      <Typography 
        variant="body2" 
        color="textSecondary" 
        sx={{ 
          textAlign: 'center',
          opacity: 0.8,
          animation: `${pulse} 3s infinite ease-in-out`,
        }}>
        We're analyzing your tax information
      </Typography>
    </StyledLoadingContainer>
  );
};

export default LoadingAnimation;
