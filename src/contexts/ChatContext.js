import React, { createContext, useState, useContext, useCallback } from 'react';
import { sendMessageToGroq } from '../services/groqService';
import { getTaxResponse } from '../services/mockResponses';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I\'m your AI Tax Assistant. How can I help you with tax-related questions today?',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  // Send a message to the chatbot - use Groq API with fallback
  const sendMessage = useCallback(async (content) => {
    if (!content.trim()) return;
    
    // Create user message
    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setError(null);
    
    try {
      // Try to call Groq API
      let response;
      try {
        response = await sendMessageToGroq(messages, content);
      } catch (apiError) {
        console.error('Groq API error, using fallback:', apiError);
        // Use fallback if API fails
        response = getTaxResponse(content);
      }
      
      // Create assistant message with response
      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Sorry, there was an error connecting to the AI service. Please try again.');
      
      // Create an error message from the assistant
      const errorMessage = {
        id: `assistant-error-${Date.now()}`,
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble connecting to my knowledge base right now. Please try again in a moment.',
        timestamp: new Date().toISOString(),
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [messages]);

  // Clear chat history
  const clearChat = useCallback(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Hello! I\'m your AI Tax Assistant. How can I help you with tax-related questions today?',
        timestamp: new Date().toISOString(),
      },
    ]);
    setError(null);
  }, []);

  return (
    <ChatContext.Provider value={{ 
      messages, 
      isTyping, 
      error, 
      sendMessage, 
      clearChat 
    }}>
      {children}
    </ChatContext.Provider>
  );
};
