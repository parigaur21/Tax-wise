import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  useMediaQuery,
  useTheme,
  Paper,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { keyframes } from '@emotion/react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';

// Import local images directly - this helps with webpack bundling
import heroImage from '../static/images/tax-hero.webp';
import analyticsImage from '../assets/images/tax-analytics-new.webp';
import securityImage from '../assets/images/tax-security-new.webp';
import supportImage from '../assets/images/tax-support-new.webp';
import mobileAppImage from '../assets/images/tax-mobile-new.webp';

// Fallback image from a high-quality source
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

// Image references with fallbacks
const IMAGES = {
  hero: heroImage,
  analytics: analyticsImage,
  security: securityImage,
  support: supportImage,
  mobileApp: mobileAppImage,
};

// Enhanced animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
  100% { transform: translateY(0); }
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(41, 98, 255, 0.3); }
  50% { box-shadow: 0 0 25px rgba(41, 98, 255, 0.6), 0 0 40px rgba(0, 191, 165, 0.3); }
  100% { box-shadow: 0 0 5px rgba(41, 98, 255, 0.3); }
`;

// Enhanced glow effect for AI responses
const aiResponseGlow = keyframes`
  0% { box-shadow: 0 0 8px rgba(0, 191, 165, 0.3); }
  50% { box-shadow: 0 0 20px rgba(0, 191, 165, 0.5), 0 0 30px rgba(41, 98, 255, 0.2); }
  100% { box-shadow: 0 0 8px rgba(0, 191, 165, 0.3); }
`;

// Chat message animations
const slideInRight = keyframes`
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
`;

const slideInLeft = keyframes`
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled components with improved responsiveness
const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.5)), url(${IMAGES.hero})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  color: '#fff',
  padding: theme.spacing(16, 0),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(12, 0),
    backgroundAttachment: 'scroll',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(8, 0),
    textAlign: 'center',
    backgroundPosition: '60% center',
  },
}));

// Adding the missing ChatContainer component
const ChatContainer = styled(Paper)(({ theme }) => ({
  maxWidth: '800px',
  margin: '0 auto',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  height: '450px',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    height: '400px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '350px',
    margin: '0 16px',
  },
}));

const AnimatedImage = styled('img')(({ theme, delay = 0 }) => ({
  maxWidth: '100%',
  height: 'auto',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.palette.mode === 'dark' 
    ? '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 15px rgba(94, 114, 228, 0.3)'
    : '0 25px 50px rgba(0, 0, 0, 0.15), 0 0 15px rgba(41, 98, 255, 0.3)',
  animation: `${floatAnimation} 6s infinite ease-in-out`,
  animationDelay: `${delay}s`,
  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
  filter: 'brightness(1.05) contrast(1.05)',
  '&:hover': {
    transform: 'scale(1.03) translateY(-5px)',
    boxShadow: theme.palette.mode === 'dark' 
      ? '0 35px 60px rgba(0, 0, 0, 0.6), 0 0 20px rgba(94, 114, 228, 0.5)'
      : '0 35px 60px rgba(0, 0, 0, 0.2), 0 0 20px rgba(41, 98, 255, 0.4)',
  },
}));

// Enhanced Message component for AI responses with glowing effect
const Message = styled(Box)(({ ownerState, theme }) => ({
  display: 'flex',
  marginBottom: '16px',
  justifyContent: ownerState.sender === 'user' ? 'flex-end' : 'flex-start',
  animation: ownerState.sender === 'user' 
    ? `${slideInRight} 0.3s ${ownerState.delay}s forwards` 
    : `${slideInLeft} 0.3s ${ownerState.delay}s forwards`,
  opacity: 0,
  maxWidth: '90%',
  [theme.breakpoints.down('md')]: {
    maxWidth: '95%',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
}));

// Enhanced styling for AI message bubbles
const MessageBubble = styled(Paper)(({ theme, isBot }) => ({
  padding: theme.spacing(2),
  backgroundColor: isBot 
    ? theme.palette.mode === 'dark' 
      ? 'rgba(25, 32, 45, 0.9)'
      : 'rgba(248, 250, 252, 0.95)'
    : theme.palette.primary.main,
  color: isBot 
    ? theme.palette.text.primary 
    : theme.palette.primary.contrastText,
  borderRadius: theme.spacing(2),
  borderTopLeftRadius: isBot ? 0 : theme.spacing(2),
  borderTopRightRadius: isBot ? theme.spacing(2) : 0,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 2px 10px rgba(0, 0, 0, 0.3)'
    : '0 2px 10px rgba(0, 0, 0, 0.08)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  backdropFilter: isBot ? 'blur(10px)' : 'none',
  animation: isBot ? `${aiResponseGlow} 4s infinite` : 'none',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 5px 15px rgba(0, 0, 0, 0.4)'
      : '0 5px 15px rgba(0, 0, 0, 0.1)',
  },
}));

// Enhanced avatar for chat messages
const ChatAvatar = styled(Avatar)(({ theme, isBot }) => ({
  backgroundColor: isBot ? theme.palette.secondary.main : theme.palette.primary.main,
  marginRight: isBot ? theme.spacing(1) : 0,
  marginLeft: isBot ? 0 : theme.spacing(1),
  width: 38,
  height: 38,
  animation: isBot ? `${pulseAnimation} 3s infinite ease-in-out` : 'none',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 0 15px rgba(255, 255, 255, 0.2)'
    : '0 0 15px rgba(0, 0, 0, 0.1)',
}));

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [chatVisible, setChatVisible] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  // Function to handle image load errors
  const handleImageError = (imageKey) => {
    setImageErrors(prev => ({
      ...prev,
      [imageKey]: true
    }));
    console.error(`Failed to load image: ${imageKey}`);
  };

  // Get image source with fallback
  const getImageSrc = (imageKey) => {
    return imageErrors[imageKey] ? FALLBACK_IMAGE : IMAGES[imageKey];
  };

  // Animation on scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        if (rect.top <= windowHeight * 0.8) {
          el.classList.add('animated');
          
          // Check if chat section is visible
          if (el.id === 'chat-demo-section') {
            setChatVisible(true);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sample chat messages
  const chatMessages = [
    { sender: 'user', content: 'Hi, I need help with my tax deductions.', delay: 0.1 },
    { 
      sender: 'bot', 
      content: 'Hello! I\'d be happy to help you with tax deductions. What specific information are you looking for?', 
      delay: 0.6 
    },
    { sender: 'user', content: 'What are the common deductions I can claim as a freelancer?', delay: 1.2 },
    { 
      sender: 'bot', 
      content: 'Great question! As a freelancer, you can typically claim deductions for home office expenses, business travel, health insurance premiums, professional development, and business equipment. Would you like more details on any of these categories?', 
      delay: 1.8 
    }
  ];

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section with preloading */}
      <Box 
        component="img"
        src={IMAGES.hero}
        alt="Preload hero"
        onError={() => handleImageError('hero')}
        sx={{ display: 'none' }}
      />
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid item xs={12} md={7} sx={{ 
              textAlign: { xs: 'center', md: 'left' },
              mb: { xs: 4, md: 0 } 
            }}>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontSize: { xs: '2.5rem', sm: '3.2rem', md: '4rem' }, 
                  fontWeight: 800,
                  mb: 2,
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}
              >
                Tax assistance powered by AI
              </Typography>
              
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 3, 
                  opacity: 0.9,
                  maxWidth: { xs: '100%', md: '80%' },
                  fontSize: { xs: '1.1rem', md: '1.3rem' }
                }}
              >
                Our intelligent tax assistant helps you navigate complex tax scenarios, maximize deductions, and file with confidence.
              </Typography>
              
              <Box sx={{ 
                mt: 4, 
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: { xs: 'center', md: 'flex-start' },
                gap: 2
              }}>
                <Button 
                  variant="contained" 
                  size={isMobile ? "medium" : "large"}
                  sx={{
                    backgroundColor: 'primary.main',
                    px: { xs: 3, md: 5 },
                    py: { xs: 1.2, md: 1.8 },
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    fontWeight: 600,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 12px 25px rgba(0,0,0,0.4)'
                    }
                  }}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outlined"
                  size={isMobile ? "medium" : "large"}
                  sx={{
                    borderColor: 'common.white',
                    borderWidth: 2,
                    color: 'common.white',
                    px: { xs: 3, md: 5 },
                    py: { xs: 1.2, md: 1.8 },
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: 'common.white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    }
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={5}>
              <Box sx={{ 
                position: 'relative',
                maxWidth: '500px',
                mx: 'auto',
                animation: `${fadeIn} 1s ease-out 0.3s forwards`,
                opacity: 0,
              }}>
                <AnimatedImage 
                  src={IMAGES.mobileApp} 
                  alt="Tax Assistant App" 
                  style={{
                    borderRadius: '24px',
                    transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Chat Demo Section with enhanced styling */}
      <Box 
        id="chat-demo-section"
        className="animate-on-scroll"
        sx={{ 
          py: { xs: 8, md: 12 },
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(180deg, rgba(22, 28, 36, 0.8), rgba(22, 28, 36, 1))'
            : 'linear-gradient(180deg, rgba(245, 247, 250, 0.8), rgba(245, 247, 250, 1))',
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            align="center" 
            sx={{ 
              mb: { xs: 3, md: 5 },
              fontSize: { xs: '2rem', md: '2.75rem' },
              fontWeight: 700
            }}
          >
            Experience AI-Powered Tax Support
          </Typography>
          
          <Typography 
            variant="h6" 
            align="center" 
            color="textSecondary" 
            sx={{ 
              mb: { xs: 5, md: 8 },
              maxWidth: '800px',
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            See how our AI assistant can help answer your tax questions with accuracy and clarity
          </Typography>

          <ChatContainer>
            <Box sx={{ 
              p: { xs: 2, md: 3 }, 
              borderBottom: 1, 
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center'
            }}>
              <SmartToyIcon color="primary" sx={{ mr: 1.5 }} />
              <Typography variant="h6">Tax Assistant</Typography>
            </Box>
            
            <Box sx={{ 
              p: { xs: 2, md: 3 }, 
              height: '100%', 
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {chatVisible && chatMessages.map((message, index) => (
                <Message key={index} ownerState={{ sender: message.sender, delay: message.delay }}>
                  <ChatAvatar isBot={message.sender === 'bot'}>
                    {message.sender === 'user' ? <PersonIcon /> : <SmartToyIcon />}
                  </ChatAvatar>
                  
                  <MessageBubble isBot={message.sender === 'bot'}>
                    <Typography variant="body1">
                      {message.content}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color="textSecondary"
                      sx={{ display: 'block', textAlign: message.sender === 'user' ? 'right' : 'left', mt: 1 }}
                    >
                      {message.sender === 'user' ? 'You' : 'Tax Assistant'} • Just now
                    </Typography>
                  </MessageBubble>
                </Message>
              ))}
            </Box>
          </ChatContainer>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
