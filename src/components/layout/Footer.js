import React from 'react';
import { Box, Container, Typography, Link, Divider } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
      }}
    >
      <Container maxWidth="lg">
        <Divider sx={{ mb: 3 }} />
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {/* Column 1 - About */}
          <Box sx={{ minWidth: { xs: '100%', sm: '30%' }, mb: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              AI Tax Assistant
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Helping you navigate tax calculations and planning with ease.
              Our AI assistant provides accurate, timely tax information.
            </Typography>
          </Box>
          
          {/* Column 2 - Quick Links */}
          <Box sx={{ minWidth: { xs: '50%', sm: '30%' }, mb: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="/" color="text.secondary" sx={{ mb: 1 }}>Home</Link>
              <Link href="/chat" color="text.secondary" sx={{ mb: 1 }}>Chat Assistant</Link>
              <Link href="/calculator" color="text.secondary" sx={{ mb: 1 }}>Tax Calculator</Link>
              <Link href="/info" color="text.secondary">Tax Information</Link>
            </Box>
          </Box>
          
          {/* Column 3 - Disclaimer */}
          <Box sx={{ minWidth: { xs: '50%', sm: '30%' }, mb: 3 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Disclaimer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This tool provides general tax information and calculations.
              It is not a substitute for professional advice.
              Consult a tax professional for specific guidance.
            </Typography>
          </Box>
        </Box>
        
        {/* Copyright */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {'© '}
            {new Date().getFullYear()}
            {' AI Tax Assistant. All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
