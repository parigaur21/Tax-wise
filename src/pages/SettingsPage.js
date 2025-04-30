import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Switch,
  FormControlLabel,
  FormGroup,
  Divider,
  Grid,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Button,
  Slider,
  Card,
  CardContent,
  CardActions,
  Alert,
  Chip,
  Stack
} from '@mui/material';
import {
  BrightnessAuto as ThemeIcon,
  FormatSize as TextIcon,
  Notifications as NotificationsIcon,
  Save as SaveIcon,
  RestartAlt as ResetIcon,
  SettingsBackupRestore as RestoreIcon,
  Check as CheckIcon,
  Calculate as CalculateIcon
} from '@mui/icons-material';

import SectionHeading from '../components/shared/SectionHeading';
import PrimaryButton from '../components/shared/PrimaryButton';
import { useSettings } from '../contexts/SettingsContext';

const SettingsPage = () => {
  const { settings, updateSetting, resetSettings } = useSettings();

  const themeOptions = [
    { value: 'blue', label: 'Blue (Default)', colorSample: '#1976d2' },
    { value: 'green', label: 'Green', colorSample: '#2e7d32' },
    { value: 'neutral', label: 'Neutral', colorSample: '#546e7a' },
  ];

  const verbosityOptions = [
    { value: 'low', label: 'Concise', description: 'Brief answers with minimal detail' },
    { value: 'medium', label: 'Balanced (Default)', description: 'Moderate detail with explanations' },
    { value: 'high', label: 'Detailed', description: 'Thorough explanations with examples' },
  ];

  const calculationOptions = [
    { value: 'standard', label: 'Standard Method', description: 'Uses standard deductions by default' },
    { value: 'itemized', label: 'Itemized Method', description: 'Focuses on itemized deductions' },
  ];

  const handleSaveSettings = () => {
    // In a real app, this might trigger additional actions
    // For now, settings are automatically saved via context
    alert('Settings saved successfully!');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <SectionHeading 
        title="Application Settings" 
        subtitle="Customize your tax assistant experience with these preferences."
      />

      <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
        {/* Appearance Settings */}
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <ThemeIcon sx={{ mr: 1 }} />
          Appearance
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={3} alignItems="center" sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.darkMode}
                  onChange={(e) => updateSetting('darkMode', e.target.checked)}
                  color="primary"
                />
              }
              label="Dark Mode"
            />
            <Typography variant="body2" color="text.secondary">
              Use dark theme for reduced eye strain in low light
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Color Theme</FormLabel>
              <RadioGroup
                row
                value={settings.colorTheme}
                onChange={(e) => updateSetting('colorTheme', e.target.value)}
              >
                {themeOptions.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box 
                          sx={{ 
                            width: 16, 
                            height: 16, 
                            borderRadius: '50%', 
                            backgroundColor: option.colorSample,
                            mr: 1,
                            border: '1px solid rgba(0,0,0,0.1)'
                          }} 
                        />
                        {option.label}
                      </Box>
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        
        {/* AI Assistant Settings */}
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
          <TextIcon sx={{ mr: 1 }} />
          AI Assistant Preferences
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <FormLabel id="verbosity-slider-label" sx={{ mb: 2, display: 'block' }}>
          Verbosity Level
        </FormLabel>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <Stack spacing={2} direction="row" alignItems="center">
              <Typography variant="body2" color="text.secondary">Concise</Typography>
              <Slider
                aria-labelledby="verbosity-slider-label"
                value={verbosityOptions.findIndex(o => o.value === settings.verbosityLevel)}
                onChange={(_, newValue) => updateSetting('verbosityLevel', verbosityOptions[newValue].value)}
                step={1}
                marks
                min={0}
                max={2}
                valueLabelDisplay="off"
                sx={{ mx: 2 }}
              />
              <Typography variant="body2" color="text.secondary">Detailed</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
              <Chip 
                label={verbosityOptions.find(o => o.value === settings.verbosityLevel)?.label || 'Balanced'} 
                color="primary"
                variant="outlined"
                icon={<CheckIcon />}
              />
            </Box>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
              {verbosityOptions.find(o => o.value === settings.verbosityLevel)?.description}
            </Typography>
          </Grid>
        </Grid>
        
        {/* Calculation Settings */}
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
          <CalculateIcon sx={{ mr: 1 }} />
          Tax Calculation Preferences
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {calculationOptions.map((option) => (
            <Grid item xs={12} sm={6} key={option.value}>
              <Card 
                sx={{ 
                  border: settings.preferredCalculationMethod === option.value ? 2 : 1,
                  borderColor: settings.preferredCalculationMethod === option.value ? 'primary.main' : 'divider',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {option.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {option.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <FormControlLabel
                    control={
                      <Radio 
                        checked={settings.preferredCalculationMethod === option.value}
                        onChange={() => updateSetting('preferredCalculationMethod', option.value)}
                      />
                    }
                    label="Use this method"
                  />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {/* Notification Settings */}
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>
          <NotificationsIcon sx={{ mr: 1 }} />
          Notifications
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={settings.notifications}
                onChange={(e) => updateSetting('notifications', e.target.checked)}
                color="primary"
              />
            }
            label="Enable Notifications"
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mt: -1 }}>
            Receive alerts about tax deadlines and important updates
          </Typography>
        </FormGroup>
        
        {/* GDPR and Data Usage Notice */}
        <Alert severity="info" sx={{ mt: 3 }}>
          <Typography variant="subtitle2">Data Usage Notice</Typography>
          <Typography variant="body2">
            This application doesn't store your personal tax information. All calculations are performed
            client-side and your data isn't sent to any servers except when explicitly interacting with the AI assistant.
          </Typography>
        </Alert>
        
        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, flexWrap: 'wrap', gap: 2 }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<ResetIcon />}
            onClick={resetSettings}
          >
            Reset to Defaults
          </Button>
          
          <Box>
            <Button
              variant="outlined"
              startIcon={<RestoreIcon />}
              sx={{ mr: 2 }}
            >
              Cancel Changes
            </Button>
            
            <PrimaryButton
              startIcon={<SaveIcon />}
              onClick={handleSaveSettings}
            >
              Save Settings
            </PrimaryButton>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default SettingsPage;
