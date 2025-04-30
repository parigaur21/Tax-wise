import React, { useState, useRef, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Divider,
  IconButton,
  Avatar,
  Button,
  CircularProgress,
  Chip,
  Tooltip
} from '@mui/material';
import {
  Send as SendIcon,
  Delete as DeleteIcon,
  Info as InfoIcon,
  Assistant as AssistantIcon,
  PersonOutline as PersonIcon,
} from '@mui/icons-material';

import SectionHeading from '../components/shared/SectionHeading';
import PrimaryButton from '../components/shared/PrimaryButton';
import { useChat } from '../contexts/ChatContext';

const ChatPage = () => {
  // eslint-disable-next-line no-undef
  const { messages, isTyping, sendMessage, clearChat } = useChat();
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Sample suggested questions
  const suggestedQuestions = [
    "How do I calculate self-employment tax?",
    "What's the difference between tax credits and deductions?",
    "Can you explain capital gains tax?",
    "What deductions can I claim as a remote worker?"
  ];

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleSuggestedQuestion = (question) => {
    sendMessage(question);
  };

  // Function to render message content with potential formatting
  const renderMessageContent = (content) => {
    // Basic markdown-like parsing for code blocks and lists
    const formattedContent = content
      .split('\n')
      .map((line, i) => {
        // Check for lists
        if (line.match(/^\d+\.\s/)) {
          return <Typography component="li" key={i} sx={{ ml: 2 }}>{line}</Typography>;
        }
        // Check for bullet points
        if (line.match(/^•\s/) || line.match(/^\*\s/)) {
          return <Typography component="li" key={i} sx={{ ml: 2 }}>{line.replace(/^[•*]\s/, '')}</Typography>;
        }
        // Normal paragraph
        return line ? <Typography paragraph key={i}>{line}</Typography> : <br key={i} />;
      });

    return formattedContent;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <SectionHeading 
        title="AI Tax Assistant Chat" 
        subtitle="Ask questions about taxes, get calculations, and receive guidance tailored to your situation."
      />

      <Paper 
        elevation={3} 
        sx={{ 
          borderRadius: 3,
          overflow: 'hidden',
          height: '70vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Chat Messages Area */}
        <Box 
          sx={{ 
            flexGrow: 1, 
            overflowY: 'auto',
            p: 2,
            bgcolor: theme => theme.palette.mode === 'light' ? '#f5f7fa' : '#121212'
          }}
        >
          {messages.map((message) => (
            <Box 
              key={message.id} 
              sx={{ 
                display: 'flex',
                mb: 2,
                flexDirection: message.role === 'user' ? 'row-reverse' : 'row'
              }}
            >
              {/* Avatar */}
              <Avatar
                sx={{ 
                  bgcolor: message.role === 'user' ? 'primary.main' : 'secondary.main',
                  mr: message.role === 'user' ? 0 : 1,
                  ml: message.role === 'user' ? 1 : 0
                }}
              >
                {message.role === 'user' ? <PersonIcon /> : <AssistantIcon />}
              </Avatar>
              
              {/* Message Bubble */}
              <Paper 
                sx={{ 
                  p: 2, 
                  maxWidth: '80%',
                  borderRadius: 2,
                  backgroundColor: message.role === 'user' 
                    ? theme => theme.palette.primary.light + '20' 
                    : theme => theme.palette.background.paper,
                  borderTopLeftRadius: message.role === 'user' ? 2 : 0,
                  borderTopRightRadius: message.role === 'user' ? 0 : 2,
                  boxShadow: message.role === 'user'
                    ? theme => theme.shadows[1]
                    : theme => `0 4px 15px rgba(0, 191, 165, 0.2), 0 2px 5px rgba(41, 98, 255, 0.1)`,
                  animation: message.role === 'user' 
                    ? 'none' 
                    : 'glowPulse 4s infinite',
                  backdropFilter: message.role === 'user' ? 'none' : 'blur(8px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: message.role === 'user'
                      ? theme => theme.shadows[2]
                      : theme => `0 8px 20px rgba(0, 191, 165, 0.3), 0 4px 10px rgba(41, 98, 255, 0.15)`
                  }
                }}
              >
                {renderMessageContent(message.content)}

                {/* Timestamp */}
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ display: 'block', textAlign: message.role === 'user' ? 'right' : 'left', mt: 1 }}
                >
                  {new Date(message.timestamp).toLocaleTimeString()}
                </Typography>
              </Paper>
            </Box>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 6 }}>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Assistant is thinking...
              </Typography>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        {/* Suggested Questions */}
        {messages.length <= 2 && (
          <Box 
            sx={{ 
              p: 2, 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: 1,
              borderTop: 1,
              borderColor: 'divider',
              bgcolor: theme => theme.palette.grey[50]
            }}
          >
            <Typography variant="body2" sx={{ width: '100%', mb: 1 }}>
              <InfoIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
              Try asking:
            </Typography>
            
            {suggestedQuestions.map((question, index) => (
              <Chip 
                key={index}
                label={question}
                variant="outlined"
                onClick={() => handleSuggestedQuestion(question)}
                clickable
              />
            ))}
          </Box>
        )}

        <Divider />

        {/* Chat Input Area */}
        <Box sx={{ p: 2, backgroundColor: 'background.paper' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              fullWidth
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your tax question here..."
              variant="outlined"
              size="medium"
              disabled={isTyping}
              sx={{ mr: 2 }}
            />
            <IconButton 
              type="submit"
              color="primary"
              size="large"
              disabled={!inputMessage.trim() || isTyping}
            >
              <SendIcon />
            </IconButton>

            <Tooltip title="Clear chat history">
              <IconButton 
                color="default" 
                onClick={clearChat} 
                size="large" 
                sx={{ ml: 1 }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default ChatPage;
