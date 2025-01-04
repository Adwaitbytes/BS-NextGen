import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  Send as SendIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! I\'m your IITM BS degree assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('course') || input.includes('subject')) {
      return 'We offer various courses including Mathematics, Physics, Computer Science, and more. Which subject would you like to know more about?';
    }
    
    if (input.includes('assignment') || input.includes('homework')) {
      return 'You can find all your assignments in the Assignments section. Need help with a specific assignment?';
    }
    
    if (input.includes('exam') || input.includes('test')) {
      return 'Exams are conducted online through the IITM portal. Make sure to check the exam schedule and guidelines regularly.';
    }
    
    if (input.includes('deadline') || input.includes('due date')) {
      return 'You can view all upcoming deadlines in your Dashboard. Would you like me to help you manage your schedule?';
    }
    
    if (input.includes('study group') || input.includes('group study')) {
      return 'You can join or create study groups in the Study Groups section. It\'s a great way to collaborate with peers!';
    }
    
    return 'I\'m here to help with any questions about your IITM BS degree program. Could you please be more specific about what you\'d like to know?';
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper
        elevation={3}
        sx={{
          height: 'calc(100vh - 100px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            bgcolor: 'primary.main',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <BotIcon sx={{ mr: 1 }} />
          <Typography variant="h6">IITM BS Assistant</Typography>
        </Box>

        {/* Messages */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            p: 2,
            bgcolor: 'grey.50',
          }}
        >
          <List>
            {messages.map((message, index) => (
              <React.Fragment key={message.id}>
                <ListItem
                  sx={{
                    flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: message.sender === 'bot' ? 'primary.main' : 'secondary.main',
                      }}
                    >
                      {message.sender === 'bot' ? <BotIcon /> : <PersonIcon />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={message.text}
                    secondary={message.timestamp.toLocaleTimeString()}
                    sx={{
                      '& .MuiListItemText-primary': {
                        bgcolor: message.sender === 'bot' ? 'grey.100' : 'primary.light',
                        color: message.sender === 'bot' ? 'text.primary' : 'white',
                        p: 2,
                        borderRadius: 2,
                        display: 'inline-block',
                        maxWidth: '80%',
                      },
                      '& .MuiListItemText-secondary': {
                        textAlign: message.sender === 'user' ? 'right' : 'left',
                      },
                    }}
                  />
                </ListItem>
                {index < messages.length - 1 && <Divider variant="inset" />}
              </React.Fragment>
            ))}
            {isTyping && (
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <BotIcon />
                  </Avatar>
                </ListItemAvatar>
                <CircularProgress size={20} />
              </ListItem>
            )}
            <div ref={messagesEndRef} />
          </List>
        </Box>

        {/* Input */}
        <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              endAdornment: (
                <IconButton
                  color="primary"
                  onClick={handleSend}
                  disabled={!input.trim()}
                >
                  <SendIcon />
                </IconButton>
              ),
            }}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default ChatBot;
