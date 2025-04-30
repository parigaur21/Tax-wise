import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, ThemeProvider, CssBaseline, Typography, CircularProgress, useTheme, useMediaQuery } from '@mui/material';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Page components
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import CalculatorPage from './pages/CalculatorPage';
import InfoHubPage from './pages/InfoHubPage';
import SettingsPage from './pages/SettingsPage';

// Context providers
import { ChatProvider } from './contexts/ChatContext';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';

// Import the theme function
import getTheme from './theme';

// App wrapper that handles theme based on settings
const AppContent = () => {
  const { settings } = useSettings();
  const theme = getTheme(settings.darkMode ? 'dark' : 'light');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/info" element={<InfoHubPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Simulating app initialization
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #161c24 0%, #1c2531 100%)' 
            : 'linear-gradient(135deg, #f8fafc 0%, #f5f7fa 100%)',
          padding: 3
        }}
      >
        <Box 
          sx={{ 
            position: 'relative', 
            mb: 3,
            animation: 'pulse 2s infinite ease-in-out'
          }}
        >
          <CircularProgress 
            size={isMobile ? 50 : 70} 
            thickness={4} 
            sx={{
              color: theme => theme.palette.primary.main,
              filter: 'drop-shadow(0 0 10px rgba(41, 98, 255, 0.5))'
            }}
          />
        </Box>
        <Typography 
          variant="h4" 
          align="center"
          sx={{ 
            fontSize: { xs: '1.5rem', sm: '2rem' },
            fontWeight: 600,
            background: theme => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shimmer 3s infinite',
            backgroundSize: '200% 100%'
          }}
        >
          Loading Tax Assistant...
        </Typography>
        <Typography 
          variant="body2" 
          color="textSecondary" 
          align="center" 
          sx={{ mt: 1, maxWidth: 400, opacity: 0.8 }}
        >
          Preparing your personalized tax assistance experience
        </Typography>
      </Box>
    );
  }

  return (
    <SettingsProvider>
      <ChatProvider>
        <AppContent />
      </ChatProvider>
    </SettingsProvider>
  );
}

export default App;
