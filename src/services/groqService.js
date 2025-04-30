import axios from 'axios';

// Use hardcoded API key to ensure it works
const GROQ_API_KEY = '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';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama3-70b-8192'; // Using the model from .env

export const sendMessageToGroq = async (messageHistory, userMessage) => {
  console.log('Sending message to Groq API...', { messageHistory, userMessage });
  
  try {
    // Format message history for Groq API
    const formattedHistory = messageHistory.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Add the system message to provide context about the tax assistant
    const messages = [
      {
        role: 'system',
        content: 
          'You are an AI Tax Assistant that helps users with tax calculations, explains tax concepts, ' +
          'and provides guidance on tax-related matters. You have knowledge of tax regulations and can ' +
          'perform calculations. Always be helpful, accurate, and clear in your explanations. When you ' +
          'don\'t know something specific, acknowledge that and suggest where the user might find more ' +
          'information. For calculations, show your work step by step.'
      },
      ...formattedHistory,
      {
        role: 'user',
        content: userMessage
      }
    ];

    console.log('Prepared request:', { url: GROQ_API_URL, model: GROQ_MODEL, messages });
    
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: GROQ_MODEL,
        messages,
        temperature: 0.5,
        max_tokens: 1024
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Groq API response:', response.data);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling Groq API:', error);
    
    // Provide a more specific error message if possible
    if (error.response) {
      console.error('API Error Response:', error.response.data);
      throw new Error(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    }
    
    throw new Error('Failed to communicate with the AI service');
  }
};
