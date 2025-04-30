import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  MenuItem,
  Grid,
  Button,
  Divider,
  Alert
} from '@mui/material';
import {
  Calculate as CalculateIcon,
  RestartAlt as ResetIcon,
} from '@mui/icons-material';

import SectionHeading from '../components/shared/SectionHeading';
import PrimaryButton from '../components/shared/PrimaryButton';

const CalculatorPage = () => {
  // Form state
  const [formValues, setFormValues] = useState({
    filingStatus: 'single',
    income: '',
    dependents: '0',
  });

  const [results, setResults] = useState(null);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  // Reset form
  const handleReset = () => {
    setFormValues({
      filingStatus: 'single',
      income: '',
      dependents: '0',
    });
    setResults(null);
  };

  // Calculate taxes - simplified for development
  const calculateTaxes = () => {
    const income = parseFloat(formValues.income) || 0;
    const dependents = parseInt(formValues.dependents) || 0;
    
    // Simple tax calculation
    let taxRate = 0.15; // 15% flat rate for demo
    let dependentCredit = dependents * 2000; // $2000 per dependent
    
    let tax = income * taxRate;
    tax = Math.max(0, tax - dependentCredit);
    
    setResults({
      totalTax: tax.toFixed(2),
      effectiveRate: ((tax / income) * 100).toFixed(2),
      takeHome: (income - tax).toFixed(2)
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <SectionHeading 
        title="Simple Tax Calculator" 
        subtitle="Enter your basic information for a simplified tax estimate."
      />

      <Grid container spacing={4}>
        {/* Calculator Form */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              borderRadius: 3,
            }}
          >
            <Typography variant="h5" gutterBottom>
              <CalculateIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Enter Your Information
            </Typography>
            
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Filing Status"
                  name="filingStatus"
                  value={formValues.filingStatus}
                  onChange={handleChange}
                >
                  <MenuItem value="single">Single</MenuItem>
                  <MenuItem value="married">Married Filing Jointly</MenuItem>
                  <MenuItem value="headOfHousehold">Head of Household</MenuItem>
                </TextField>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Annual Income"
                  name="income"
                  type="number"
                  InputProps={{ startAdornment: '$' }}
                  value={formValues.income}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Number of Dependents"
                  name="dependents"
                  type="number"
                  value={formValues.dependents}
                  onChange={handleChange}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<ResetIcon />}
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                  
                  <PrimaryButton
                    onClick={calculateTaxes}
                    disabled={!formValues.income}
                    startIcon={<CalculateIcon />}
                  >
                    Calculate Taxes
                  </PrimaryButton>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        {/* Results */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              borderRadius: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography variant="h5" gutterBottom>
              Tax Calculation Results
            </Typography>
            
            <Divider sx={{ mb: 3 }} />
            
            {!results ? (
              <Box sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center' 
              }}>
                <Typography variant="body1" color="text.secondary" align="center">
                  Enter your information and click "Calculate Taxes" to see your estimated tax results.
                </Typography>
              </Box>
            ) : (
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" color="text.secondary">
                      Total Tax:
                    </Typography>
                    <Typography variant="h3" color="primary" gutterBottom>
                      ${results.totalTax}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" color="text.secondary">
                      Effective Tax Rate:
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                      {results.effectiveRate}%
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" color="text.secondary">
                      Take-Home Income:
                    </Typography>
                    <Typography variant="h5" color="secondary" gutterBottom>
                      ${results.takeHome}
                    </Typography>
                  </Grid>
                </Grid>
                
                <Alert severity="info" sx={{ mt: 4 }}>
                  This is a simplified calculation for development purposes. In a production environment, this would use more complex tax rules.
                </Alert>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CalculatorPage;