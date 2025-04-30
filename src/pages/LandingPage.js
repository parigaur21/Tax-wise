import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  Avatar,
  Paper
} from '@mui/material';
import {
  Chat as ChatIcon,
  Calculate as CalculateIcon,
  BarChart as BarChartIcon,
  PersonOutline as PersonIcon,
  StarOutline as StarIcon
} from '@mui/icons-material';

import PrimaryButton from '../components/shared/PrimaryButton';
import SectionHeading from '../components/shared/SectionHeading';
import heroImage from '../hero-tax.webp';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'AI-Powered Chat',
      description: 'Get instant answers to your tax questions with our intelligent tax assistant.',
      icon: <ChatIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2'
    },
    {
      title: 'Tax Calculator',
      description: 'Accurately calculate your taxes based on your income, deductions, and credits.',
      icon: <CalculateIcon sx={{ fontSize: 40 }} />,
      color: '#2e7d32'
    },
    {
      title: 'Visual Insights',
      description: 'Visualize your tax breakdown with easy-to-understand charts and graphs.',
      icon: <BarChartIcon sx={{ fontSize: 40 }} />,
      color: '#7b1fa2'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah J.',
      role: 'Small Business Owner',
      content: 'This tax assistant helped me understand deductions I never knew existed. Saved me thousands this year!',
      avatar: '/avatars/placeholder.svg' // Changed to use a placeholder image
    },
    {
      name: 'Michael T.',
      role: 'Freelance Developer',
      content: 'The calculator made estimating my quarterly taxes so much easier. The explanations are clear and helpful.',
      avatar: '/avatars/placeholder.svg' // Changed to use a placeholder image
    },
    {
      name: 'Priya K.',
      role: 'Financial Advisor',
      content: 'I recommend this tool to all my clients. It helps them understand their tax situation before our meetings.',
      avatar: '/avatars/placeholder.svg' // Changed to use a placeholder image
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'background.paper', 
          pt: 12, 
          pb: 10,
          backgroundImage: theme => 
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #1a1f36 0%, #111827 100%)'
              : 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ed 100%)'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h1" 
                component="h1" 
                sx={{ 
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                  mb: 2,
                  lineHeight: 1.2
                }}
              >
                Simplify Your Tax Calculations with AI
              </Typography>
              <Typography 
                variant="h5" 
                component="p" 
                color="text.secondary"
                sx={{ mb: 4, maxWidth: 500 }}
              >
                Get accurate tax answers, perform calculations, and understand your tax situation with our AI-powered assistant.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <PrimaryButton onClick={() => navigate('/chat')} size="large">
                  Get Started
                </PrimaryButton>
                <PrimaryButton 
                  onClick={() => navigate('/info')} 
                  variant="outlined" 
                  size="large"
                >
                  Learn More
                </PrimaryButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box 
                component="img"
                src={heroImage}
                alt="Tax Assistant"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="350"><rect width="100%" height="100%" fill="%23f0f0f0"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="%23666" text-anchor="middle">Tax Assistant</text></svg>';
                }}
                sx={{ 
                  maxWidth: '100%',
                  height: 'auto',
                  transform: 'scale(1.9)',
                  transformOrigin:'left center',
                  filter: 'drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.15))'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <SectionHeading 
          title="How Our Tax Assistant Helps You" 
          subtitle="Our AI-powered platform provides personalized tax assistance for individuals and small businesses."
          align="center"
        />
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      mb: 3 
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        bgcolor: feature.color + '20', 
                        width: 80, 
                        height: 80,
                        color: feature.color
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    align="center"
                    sx={{ mb: 2, fontWeight: 600 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography align="center" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Example Queries Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 10 }}>
        <Container maxWidth="lg">
          <SectionHeading 
            title="What Can You Ask?" 
            subtitle="Our tax assistant can help with a wide range of tax questions and calculations."
            align="center"
          />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  bgcolor: theme => theme.palette.primary.light + '10',
                  borderLeft: theme => `4px solid ${theme.palette.primary.main}`
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Tax Calculations
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  <Typography component="li" paragraph>
                    "Calculate my tax liability with $85,000 income and $12,000 in deductions"
                  </Typography>
                  <Typography component="li" paragraph>
                    "What's my effective tax rate if I earn $120,000 annually?"
                  </Typography>
                  <Typography component="li">
                    "How much can I contribute to my 401(k) to reduce my taxable income?"
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  bgcolor: theme => theme.palette.secondary.light + '10',
                  borderLeft: theme => `4px solid ${theme.palette.secondary.main}`
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Tax Explanations
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  <Typography component="li" paragraph>
                    "Explain the difference between standard and itemized deductions"
                  </Typography>
                  <Typography component="li" paragraph>
                    "What tax credits are available for parents?"
                  </Typography>
                  <Typography component="li">
                    "How does the capital gains tax work for stock investments?"
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <SectionHeading 
          title="What Users Are Saying" 
          subtitle="Hear from people who have simplified their tax experience using our AI assistant."
          align="center"
        />
        
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon key={star} sx={{ color: '#FFB400' }} />
                    ))}
                  </Box>
                  <Typography variant="body1" paragraph>
                    "{testimonial.content}"
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      sx={{ mr: 2 }}
                    >
                      <PersonIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* CTA Section */}
        <Box 
          sx={{ 
            mt: 8, 
            textAlign: 'center',
            p: 5,
            borderRadius: 4,
            backgroundColor: theme => theme.palette.primary.main + '08'
          }}
        >
          <Typography 
            variant="h3" 
            component="h3" 
            sx={{ mb: 2, fontWeight: 700 }}
          >
            Ready to Simplify Your Taxes?
          </Typography>
          <Typography 
            variant="h6" 
            component="p" 
            color="text.secondary" 
            sx={{ mb: 3, maxWidth: 700, mx: 'auto' }}
          >
            Get started with our AI tax assistant today and take the stress out of tax planning.
          </Typography>
          <PrimaryButton onClick={() => navigate('/chat')} size="large">
            Start Using Tax Assistant Now
          </PrimaryButton>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
