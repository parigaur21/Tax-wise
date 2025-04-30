import React from 'react';
import { Typography, Box, Divider } from '@mui/material';

const SectionHeading = ({ title, subtitle, align = 'left', divider = true }) => {
  return (
    <Box sx={{ mb: 4, textAlign: align }}>
      <Typography 
        variant="h2" 
        component="h2" 
        sx={{ 
          fontWeight: 'bold',
          mb: subtitle ? 1 : 2
        }}
      >
        {title}
      </Typography>
      
      {subtitle && (
        <Typography 
          variant="subtitle1" 
          color="text.secondary" 
          sx={{ mb: 2, maxWidth: align === 'center' ? '700px' : 'none', mx: align === 'center' ? 'auto' : 0 }}
        >
          {subtitle}
        </Typography>
      )}
      
      {divider && <Divider sx={{ mt: 1, mb: 2 }} />}
    </Box>
  );
};

export default SectionHeading;
