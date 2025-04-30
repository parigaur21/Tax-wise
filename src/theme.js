import { createTheme } from '@mui/material/styles';

// Create themes for both light and dark modes with neon professional aesthetic
const getTheme = (mode = 'light') => {
  return createTheme({
    palette: {
      mode,
      ...(mode === 'light' 
        ? {
            // Light mode with neon professional colors
            primary: {
              main: '#2962ff', // Vibrant blue
              light: '#768fff',
              dark: '#0039cb',
            },
            secondary: {
              main: '#00bfa5', // Teal neon
              light: '#5df2d6',
              dark: '#008e76',
            },
            background: {
              default: '#f8faff', // Slight blue tint for depth
              paper: '#ffffff',
            },
            text: {
              primary: '#1a1f36', // Deeper text for contrast
              secondary: '#4f566b',
            },
            success: {
              main: '#00c853',
            },
            info: {
              main: '#00b0ff',
            },
            warning: {
              main: '#ffab00',
            },
            error: {
              main: '#ff5252',
            },
          }
        : {
            // Dark mode with neon professional colors
            primary: {
              main: '#5e72e4', // Bright blue/purple
              light: '#8f9ff9',
              dark: '#2848d0',
            },
            secondary: {
              main: '#00f2c3', // Bright neon green
              light: '#6affef',
              dark: '#00be94',
            },
            background: {
              default: '#111827', // Dark blue-gray
              paper: '#1f2937',
            },
            text: {
              primary: '#ffffff',
              secondary: '#c0ccda',
            },
            success: {
              main: '#2dce89',
            },
            info: {
              main: '#11cdef',
            },
            warning: {
              main: '#fb6340',
            },
            error: {
              main: '#f5365c',
            },
          }),
    },
    typography: {
      fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
      h1: {
        fontSize: '2.75rem',
        fontWeight: 700,
        letterSpacing: '-0.01em',
      },
      h2: {
        fontSize: '2.25rem',
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
        letterSpacing: '0.02em',
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.7,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
      },
      responsive: {
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          md: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
        },
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '10px 24px',
            boxShadow: 'none',
            transition: 'all 0.2s ease-in-out',
          },
          contained: {
            '&:hover': {
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.18)',
              transform: 'translateY(-2px)',
            },
          },
          containedPrimary: {
            backgroundImage: 'linear-gradient(135deg, #2962ff 0%, #3d74ff 100%)',
          },
          containedSecondary: {
            backgroundImage: 'linear-gradient(135deg, #00bfa5 0%, #00e2c3 100%)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 16,
            padding: theme.spacing(2.5),
            boxShadow: theme.palette.mode === 'dark' 
              ? '0 12px 24px rgba(0, 0, 0, 0.3), 0 0 1px 0 rgba(94, 114, 228, 0.15), 0 0 15px 0 rgba(0, 242, 195, 0.1)'
              : '0 12px 24px rgba(0, 0, 0, 0.06), 0 0 1px 0 rgba(41, 98, 255, 0.15), 0 0 15px 0 rgba(0, 191, 165, 0.1)',
            transition: 'all 0.3s ease',
            border: theme.palette.mode === 'dark' 
              ? '1px solid rgba(94, 114, 228, 0.2)'
              : '1px solid rgba(41, 98, 255, 0.05)',
            '&:hover': {
              boxShadow: theme.palette.mode === 'dark' 
                ? '0 16px 32px rgba(0, 0, 0, 0.35), 0 0 2px 0 rgba(94, 114, 228, 0.2), 0 0 20px 0 rgba(0, 242, 195, 0.15)'
                : '0 16px 32px rgba(0, 0, 0, 0.08), 0 0 2px 0 rgba(41, 98, 255, 0.2), 0 0 20px 0 rgba(0, 191, 165, 0.15)',
              borderColor: theme.palette.mode === 'dark' 
                ? 'rgba(94, 114, 228, 0.4)' 
                : 'rgba(41, 98, 255, 0.15)',
            },
            '&.chat-response': {
              animation: 'fadeIn 0.5s ease-out',
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '200%',
                height: '100%',
                backgroundImage: `linear-gradient(90deg, 
                  transparent, 
                  ${theme.palette.mode === 'dark' ? 'rgba(94, 114, 228, 0.1)' : 'rgba(41, 98, 255, 0.1)'}, 
                  transparent)`,
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite',
              },
            },
            '&.loading': {
              animation: 'pulse 1.5s infinite',
            },
          }),
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: '20px',
            '&:last-child': {
              paddingBottom: '20px',
            },
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          '@keyframes pulse': {
            '0%': {
              opacity: 1,
              transform: 'scale(1)',
            },
            '50%': {
              opacity: 0.8,
              transform: 'scale(1.05)',
            },
            '100%': {
              opacity: 1,
              transform: 'scale(1)',
            },
          },
          '@keyframes shimmer': {
            '0%': {
              backgroundPosition: '-200% 0',
            },
            '100%': {
              backgroundPosition: '200% 0',
            },
          },
          '@keyframes fadeIn': {
            '0%': {
              opacity: 0,
              transform: 'translateY(10px)',
            },
            '100%': {
              opacity: 1,
              transform: 'translateY(0)',
            },
          },
          '@keyframes glowPulse': {
            '0%': {
              boxShadow: '0 0 5px rgba(0, 191, 165, 0.2), 0 0 10px rgba(41, 98, 255, 0.1)'
            },
            '50%': {
              boxShadow: '0 0 20px rgba(0, 191, 165, 0.4), 0 0 30px rgba(41, 98, 255, 0.2)'
            },
            '100%': {
              boxShadow: '0 0 5px rgba(0, 191, 165, 0.2), 0 0 10px rgba(41, 98, 255, 0.1)'
            }
          },
          '@keyframes floatAnimation': {
            '0%': { 
              transform: 'translateY(0px)'
            },
            '50%': { 
              transform: 'translateY(-12px)'
            },
            '100%': { 
              transform: 'translateY(0px)'
            }
          },
          html: {
            scrollBehavior: 'smooth',
          },
          body: {
            transition: 'background-color 0.3s ease',
          },
          img: {
            maxWidth: '100%',
            height: 'auto',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          },
          '.ai-response': {
            position: 'relative',
            backdropFilter: 'blur(8px)',
            animation: 'glowPulse 4s infinite',
            borderRadius: '16px !important',
            background: theme => theme.palette.mode === 'dark' 
              ? 'rgba(25, 32, 45, 0.9)'
              : 'rgba(248, 250, 252, 0.95)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)'
            }
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease',
            [createTheme().breakpoints.down('sm')]: {
              padding: '16px',
            },
          },
        },
      },
    },
    shape: {
      borderRadius: 10,
    },
    shadows: [
      'none',
      '0 2px 4px rgba(0,0,0,0.05)',
      '0 16px 32px rgba(0,0,0,0.15)',
    ],
    transitions: {
      custom: {
        fast: 'all 0.2s ease',
        medium: 'all 0.3s ease',
        slow: 'all 0.5s ease',
      },
    },
  });
};

export default getTheme;
