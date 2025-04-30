import React from 'react';
import { Button } from '@mui/material';

const PrimaryButton = ({ children, ...props }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      disableElevation
      sx={{
        py: 1.5,
        px: 3,
        borderRadius: 2,
        fontWeight: 600,
        textTransform: 'none',
        transition: 'all 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
