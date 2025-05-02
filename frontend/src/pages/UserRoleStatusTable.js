import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, Box,Button,IconButton} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DashboardLayout from '../components/DashboardLayout';
const UserRolesStatusTable = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('No token found. Please log in again.');
        return;
      }
  
      const response = await axios.get('http://localhost:5000/api/user-roles-status', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log(response.data);  // Log the entire response to see its structure
  
      // Check if the response contains the expected data array
      if (Array.isArray(response.data)) {
        setData(response.data);  // If it's an array, set it
      } else if (response.data && Array.isArray(response.data.data)) {
        setData(response.data.data);  // If wrapped in a 'data' property, set it
      } else {
        setError('Response data is not in the expected format.');
      }
    } catch (err) {
      setError('Failed to fetch user role status data');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  // Function to format the date
  const formatDate = (date) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const handleEdit = (usr_cd, role_cd) => {
    console.log(`Edit user: ${usr_cd}, role: ${role_cd}`);
  };

  const handleDelete = (usr_cd, role_cd) => {
    console.log(`Delete user: ${usr_cd}, role: ${role_cd}`);
  };

  return (
    <DashboardLayout role="Admin">
    <Box sx={{ maxWidth: '1000px', margin: '20px auto' }}>
      {/* Back Button */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/dashboard')} // Navigate to the dashboard path
        sx={{ marginBottom: 2 }}
      >
        Back to Dashboard
      </Button>
      <Typography variant="h5" gutterBottom>
        User Role and Status Information
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="user role and status table">
          <TableHead sx={{ backgroundColor: '#1976d2', color: 'white' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>User Code</TableCell>
              <TableCell sx={{ color: 'white' }}>Role Code</TableCell>
              <TableCell sx={{ color: 'white' }}>Status Code</TableCell>
              <TableCell sx={{ color: 'white' }}>Start Date</TableCell>
              <TableCell sx={{ color: 'white' }}>End Date</TableCell>
              <TableCell sx={{ color: 'white' }}>Charge Code</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <TableRow
                  key={`${row.usr_cd}-${row.role_cd}`}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white', // Alternate row colors
                    '&:hover': {
                      backgroundColor: '#e0e0e0', // Highlight row on hover
                    },
                  }}
                >
                  <TableCell>{row.usr_cd}</TableCell>
                  <TableCell>{row.role_cd}</TableCell>
                  <TableCell>{row.status_cd}</TableCell>
                  <TableCell>{formatDate(row.start_dt)}</TableCell>
                  <TableCell>{formatDate(row.end_dt)}</TableCell>
                  <TableCell>{row.charge_cd}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(row.usr_cd, row.role_cd)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(row.usr_cd, row.role_cd)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </DashboardLayout>
  );
};

export default UserRolesStatusTable;
