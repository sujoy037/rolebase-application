import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Use useNavigate from React Router v6

const ApiKeyPage = () => {
  const [apiKey, setApiKey] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  // Use useNavigate for navigation

  // Store API key in localStorage or sessionStorage
  const handleSubmit = () => {
    if (apiKey.trim() === '') {
      setErrorMessage('API Key is required');
      return;
    }

    // Store the API key in localStorage (you can also use sessionStorage)
    localStorage.setItem('apiKey', apiKey);
    navigate('/login');  // Redirect to login page after setting API key
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">Enter API Key</Typography>
        {errorMessage && <Typography variant="body2" color="error">{errorMessage}</Typography>}
        
        <TextField
          label="API Key"
          variant="outlined"
          fullWidth
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          margin="normal"
        />

        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default ApiKeyPage;
