import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircleOutline as CheckIcon,
  InfoOutlined as InfoIcon,
  Description as DescriptionIcon,
  MonetizationOn as MoneyIcon,
  AccountBalance as AccountBalanceIcon,
  Home as HomeIcon,
  School as SchoolIcon,
  Calculate as CalculateIcon,
  Help as HelpIcon
} from '@mui/icons-material';

import SectionHeading from '../components/shared/SectionHeading';
import PrimaryButton from '../components/shared/PrimaryButton';
import { useChat } from '../contexts/ChatContext';
import { useNavigate } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`info-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const InfoHubPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const { sendMessage } = useChat();
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAskAboutTopic = (topic) => {
    sendMessage(`Can you explain ${topic} in simple terms?`);
    navigate('/chat');
  };

  const taxCategories = [
    {
      id: 'basics',
      title: 'Tax Basics',
      icon: <InfoIcon />,
      topics: [
        { name: 'Understanding Tax Brackets', description: 'How progressive tax rates work' },
        { name: 'Filing Status Options', description: 'Single, married filing jointly, head of household' },
        { name: 'Tax Deadlines', description: 'Important dates for filing and payments' },
        { name: 'Tax Forms Explained', description: 'Overview of common tax forms' }
      ]
    },
    {
      id: 'deductions',
      title: 'Deductions & Credits',
      icon: <MoneyIcon />,
      topics: [
        { name: 'Standard vs. Itemized Deductions', description: 'Which is better for you?' },
        { name: 'Common Tax Deductions', description: 'Mortgage interest, charitable donations, etc.' },
        { name: 'Child Tax Credit', description: 'Benefits for taxpayers with children' },
        { name: 'Education Credits', description: 'American Opportunity and Lifetime Learning Credits' }
      ]
    },
    {
      id: 'income',
      title: 'Income Types',
      icon: <AccountBalanceIcon />,
      topics: [
        { name: 'Earned Income', description: 'Wages, salaries, tips, and self-employment' },
        { name: 'Investment Income', description: 'Dividends, interest, capital gains' },
        { name: 'Rental Income', description: 'Tax implications of rental property ownership' },
        { name: 'Retirement Income', description: 'Social Security, pensions, and IRA distributions' }
      ]
    },
    {
      id: 'special',
      title: 'Special Situations',
      icon: <HomeIcon />,
      topics: [
        { name: 'Self-Employment Taxes', description: 'What you need to know when self-employed' },
        { name: 'Home Office Deduction', description: 'Rules for deducting home office expenses' },
        { name: 'Moving for Work', description: 'Tax implications of job-related moves' },
        { name: 'Selling Your Home', description: 'Capital gains exclusion rules' }
      ]
    }
  ];

  const faqs = [
    {
      question: 'What is the deadline for filing taxes?',
      answer: 'For most individuals, federal tax returns are generally due on April 15th. If this date falls on a weekend or holiday, the deadline is extended to the next business day. You can request an extension to file until October 15th, but you still need to pay any estimated taxes by the April deadline to avoid penalties and interest.'
    },
    {
      question: 'What documents do I need to prepare my tax return?',
      answer: 'You should gather: W-2 forms from employers, 1099 forms for other income, receipts for tax-deductible expenses, last year\'s tax return, Social Security numbers for you and dependents, bank account information for direct deposit, and any tax forms specific to your situation (like 1098-E for student loan interest).'
    },
    {
      question: 'What\'s the difference between a tax deduction and a tax credit?',
      answer: 'A tax deduction reduces your taxable income before calculating your tax liability, while a tax credit directly reduces your tax liability dollar-for-dollar. For example, a $1,000 deduction might reduce your taxes by $220 if you\'re in the 22% tax bracket, whereas a $1,000 tax credit reduces your taxes by the full $1,000 regardless of your tax bracket.'
    },
    {
      question: 'Do I have to file taxes if my income is low?',
      answer: 'Whether you need to file depends on your filing status, age, and gross income. For 2023, single filers under 65 generally need to file if their gross income was at least $12,950. However, even if you\'re not required to file, you might want to if you\'re eligible for refundable credits or had taxes withheld from your paycheck.'
    },
    {
      question: 'What happens if I can\'t pay the taxes I owe?',
      answer: 'You should still file your tax return on time to avoid the failure-to-file penalty. The IRS offers several payment options including installment agreements, temporary delay of collection, and offers in compromise. Contact the IRS as soon as possible to discuss your options.'
    },
    {
      question: 'How long should I keep my tax records?',
      answer: 'The IRS recommends keeping tax returns and supporting documents for at least three years after filing, as this is generally the period during which you can amend your return or the IRS can assess additional tax. However, for certain situations like claiming a loss from worthless securities, you should keep records for seven years. Employment tax records should be kept for at least four years.'
    }
  ];

  const educationalResources = [
    {
      title: 'Tax Guides for Beginners',
      description: 'Step-by-step guides to help you understand the basics of taxation.',
      icon: <SchoolIcon color="primary" />
    },
    {
      title: 'Video Tutorials',
      description: 'Visual explanations of common tax concepts and filing procedures.',
      icon: <DescriptionIcon color="secondary" />
    },
    {
      title: 'Tax Calculators & Tools',
      description: 'Interactive tools to estimate taxes and plan your finances.',
      icon: <CalculateIcon color="success" />
    },
    {
      title: 'Tax Law Updates',
      description: 'Latest changes to tax laws that might affect your filing.',
      icon: <InfoIcon color="info" />
    }
  ];

  // Filter topics based on search query
  const filteredTopics = searchQuery ? 
    taxCategories.flatMap(category => 
      category.topics
        .filter(topic => 
          topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map(topic => ({ ...topic, category: category.title }))
    ) : [];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <SectionHeading 
        title="Tax Information Hub" 
        subtitle="Explore tax topics, find answers to common questions, and learn about important tax concepts."
      />
      
      {/* Search Bar */}
      <Paper sx={{ p: 2, mb: 4, display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          placeholder="Search for tax topics..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>
      
      {/* Search Results */}
      {searchQuery && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Search Results ({filteredTopics.length})
          </Typography>
          <Grid container spacing={2}>
            {filteredTopics.length > 0 ? (
              filteredTopics.map((topic, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        {topic.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {topic.description}
                      </Typography>
                      <Typography variant="caption" color="primary">
                        Category: {topic.category}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Button 
                          size="small" 
                          endIcon={<ArrowForwardIcon />}
                          onClick={() => handleAskAboutTopic(topic.name)}
                        >
                          Ask About This
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Typography>No results found. Try different keywords or check out our categories below.</Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
          <Divider sx={{ my: 4 }} />
        </Box>
      )}
      
      {/* Main Content Tabs */}
      <Paper sx={{ borderRadius: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Tax Topics" icon={<InfoIcon />} iconPosition="start" />
          <Tab label="FAQs" icon={<HelpIcon />} iconPosition="start" />
          <Tab label="Resources" icon={<SchoolIcon />} iconPosition="start" />
        </Tabs>
        
        {/* Tax Topics Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {taxCategories.map((category) => (
              <Grid item xs={12} md={6} key={category.id}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    height: '100%',
                    borderTop: 4,
                    borderColor: 'primary.main',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ mr: 1, color: 'primary.main' }}>
                      {category.icon}
                    </Box>
                    <Typography variant="h6" component="h3">
                      {category.title}
                    </Typography>
                  </Box>
                  
                  <List dense>
                    {category.topics.map((topic, index) => (
                      <React.Fragment key={index}>
                        <ListItem 
                          secondaryAction={
                            <Button 
                              size="small" 
                              endIcon={<ArrowForwardIcon />}
                              onClick={() => handleAskAboutTopic(topic.name)}
                            >
                              Ask About This
                            </Button>
                          }
                        >
                          <ListItemIcon>
                            <CheckIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={topic.name}
                            secondary={topic.description}
                          />
                        </ListItem>
                        {index < category.topics.length - 1 && <Divider component="li" />}
                      </React.Fragment>
                    ))}
                  </List>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        
        {/* FAQs Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Frequently Asked Questions
          </Typography>
          {faqs.map((faq, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`faq-content-${index}`}
                id={`faq-header-${index}`}
              >
                <Typography fontWeight="medium">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
                <Button 
                  size="small" 
                  sx={{ mt: 2 }} 
                  onClick={() => handleAskAboutTopic(faq.question)}
                >
                  Ask for more details
                </Button>
              </AccordionDetails>
            </Accordion>
          ))}
        </TabPanel>
        
        {/* Resources Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Educational Resources
          </Typography>
          <Grid container spacing={3}>
            {educationalResources.map((resource, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                      {resource.icon}
                    </Box>
                    <Typography variant="h6" align="center" gutterBottom>
                      {resource.title}
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary">
                      {resource.description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button fullWidth variant="outlined">
                      Explore
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Official Tax Resources
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <List>
                <ListItem 
                  button 
                  component="a" 
                  href="https://www.irs.gov" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <ListItemIcon>
                    <img src="/irs-logo.svg" alt="IRS" width="24" height="24" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Internal Revenue Service (IRS)" 
                    secondary="Official source for tax forms, publications, and guidance" 
                  />
                  <ArrowForwardIcon fontSize="small" />
                </ListItem>
                <Divider />
                <ListItem 
                  button 
                  component="a" 
                  href="https://www.usa.gov/taxes" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <ListItemIcon>
                    <img src="/usa-gov-logo.svg" alt="USA.gov" width="24" height="24" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="USA.gov Tax Information" 
                    secondary="Government tax resources and links" 
                  />
                  <ArrowForwardIcon fontSize="small" />
                </ListItem>
                <Divider />
                <ListItem 
                  button 
                  component="a" 
                  href="https://www.taxpayeradvocate.irs.gov/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <ListItemIcon>
                    <img src="/taxpayer-advocate-logo.svg" alt="Taxpayer Advocate" width="24" height="24" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Taxpayer Advocate Service" 
                    secondary="Independent organization within the IRS that helps taxpayers" 
                  />
                  <ArrowForwardIcon fontSize="small" />
                </ListItem>
              </List>
            </Paper>
          </Box>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default InfoHubPage;
