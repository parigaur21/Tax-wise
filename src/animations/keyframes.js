import { keyframes } from '@emotion/react';

// Reusable animation keyframes that can be imported across components
export const fadeIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

export const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const pulse = keyframes`
  0% { 
    transform: scale(0.95); 
    opacity: 0.7; 
  }
  50% { 
    transform: scale(1.05); 
    opacity: 1; 
  }
  100% { 
    transform: scale(0.95); 
    opacity: 0.7; 
  }
`;

export const float = keyframes`
  0% { 
    transform: translateY(0px); 
  }
  50% { 
    transform: translateY(-10px); 
  }
  100% { 
    transform: translateY(0px); 
  }
`;

export const glow = keyframes`
  0% { 
    box-shadow: 0 0 5px rgba(41, 98, 255, 0.3); 
  }
  50% { 
    box-shadow: 0 0 20px rgba(41, 98, 255, 0.6), 0 0 30px rgba(0, 191, 165, 0.2); 
  }
  100% { 
    box-shadow: 0 0 5px rgba(41, 98, 255, 0.3); 
  }
`;

export const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const rotateIn = keyframes`
  from {
    transform: rotate(-10deg) scale(0.9);
    opacity: 0;
  }
  to {
    transform: rotate(0) scale(1);
    opacity: 1;
  }
`;

// Animation timing helpers
export const getAnimationDelay = (index, baseDelay = 0.1) => `${index * baseDelay}s`;

// Animation class utility functions
export const getAnimationClass = (name, duration = 0.6, delay = 0, timingFunction = 'ease-out') => ({
  animation: `${name} ${duration}s ${timingFunction} ${delay}s forwards`,
});
