// src/Login.js

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';
//import { FaGoogle } from 'react-icons/fa';  // FontAwesome Google Icon
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();   
  const [usr_cd, setUsrCd] = useState('');
  const [passwd, setPasswd] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Get API Key from localStorage (set on ApiKeyPage)
  const apiKey = localStorage.getItem('apiKey');  // Retrieve API key from localStorage

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!apiKey) {
      setErrorMessage('API Key is missing. Please go back and enter it.');
      return;
    }
  
    try {
      // Make the API request with the user credentials and API key
      const response = await axios.post(
        'http://localhost:5000/api/login',
        { usr_cd, passwd },
        {
          headers: {
            'X-API-Key': apiKey,  // Use the stored API key here
          },
        }
      );
  
      console.log('Login Success:', response.data);
      // Handle successful login (store token, redirect, etc.)
      // If login is successful, redirect to the dashboard
      if (response.data.token) {
        // Store the JWT token in localStorage
        localStorage.setItem('authToken', response.data.token);
  
        // Redirect to Dashboard after successful login
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login Failed:', error);
      setErrorMessage('Invalid credentials or API key');
    }
  };
  

  return (
    <Container component="main" maxWidth="xs">
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h5" align="center">Sign In</Typography>
        
        {/* Error Message */}
        {errorMessage && (
          <Typography variant="body2" color="error" align="center">
            {errorMessage}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            {/* User ID (usr_cd) */}
            <TextField
              label="User ID"
              variant="outlined"
              value={usr_cd}
              onChange={(e) => setUsrCd(e.target.value)}
              fullWidth
            />
            {/* Password */}
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={passwd}
              onChange={(e) => setPasswd(e.target.value)}
              fullWidth
            />
            {/* Login Button */}
            <Button
              variant="contained"
              type="submit"
              fullWidth
            >
              Log In
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
