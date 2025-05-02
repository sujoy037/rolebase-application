import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button, Grid, Box, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import DashboardLayout from '../components/DashboardLayout';

const AssignRoleAndStatus = () => {
  const [chargeCd, setChargeCd] = useState('');
  const [usrCd, setUsrCd] = useState('');
  const [roleCd, setRoleCd] = useState('');
  const [statusCd, setStatusCd] = useState('');
  const [startDt, setStartDt] = useState('');
  const [endDt, setEndDt] = useState('');
  const [roles, setRoles] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [users, setUsers] = useState([]);
  const [charges, setCharges] = useState([]);  // State for charge_cd dropdown
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch initial data for roles, statuses, and charges
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('No token found, please log in again');
        return;
      }

      try {
        const [rolesResponse, statusesResponse, chargesResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/roles', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:5000/api/statuses', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:5000/api/charge-cd-list', { headers: { Authorization: `Bearer ${token}` } }), // Fetch charge_cd list
        ]);

        setRoles(rolesResponse.data);
        setStatuses(statusesResponse.data);
        setCharges(chargesResponse.data); // Set charges for the dropdown
        console.log(chargesResponse);
        
      } catch (error) {
        setError('Error fetching initial data');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Fetch Users when chargeCd is selected
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');
      if (chargeCd) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/users?charge_cd=${chargeCd}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (response.data && Array.isArray(response.data)) {
            setUsers(response.data);  // Populate users dropdown
          } else {
            setUsers([]);  // No users found
          }
        } catch (error) {
          console.error('Error fetching users:', error.response || error.message);
          setError('Error fetching user data');
        }
      } else {
        setUsers([]); // Clear users if no chargeCd is selected
      }
    };

    fetchUserData();
  }, [chargeCd]);

  // Handle role assignment for a single user
  const handleAssignRole = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      charge_cd: chargeCd,
      usr_cd: usrCd,  // User ID to be assigned the role
      role_cd: roleCd,
      status_cd: statusCd,
      start_dt: startDt,
      end_dt: endDt,
    };

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post('http://localhost:5000/api/assign-role-status', data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(`${response.data.message}. User assigned: ${response.data.assignedUser}`);
      // Clear fields after submission
      setUsrCd('');
      setRoleCd('');
      setStatusCd('');
      setStartDt('');
      setEndDt('');
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to assign role and status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="Admin">
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
      <Typography variant="h5" gutterBottom>Assign Role and Status to User</Typography>
      {error && <Typography color="error" gutterBottom>{error}</Typography>}
      <form onSubmit={handleAssignRole}>
        <Grid container spacing={3}>
          {/* Charge Dropdown */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Charge"
              select
              value={chargeCd}
              onChange={(e) => setChargeCd(e.target.value)}
              required
            >
              {charges.map((charge) => (
                <MenuItem key={charge.charge_cd} value={charge.charge_cd}>
                  {charge.charge_cd} - {charge.charge_nm}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* User Dropdown */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="User"
              select
              value={usrCd}
              onChange={(e) => setUsrCd(e.target.value)}
              required
              disabled={!chargeCd}
            >
              {users.map((user, index) => (
                <MenuItem key={`${user.usr_nm}-${index}`} value={user.usr_cd}>
                  {user.usr_nm} - {user.usr_cd}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Role Dropdown */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Role"
              select
              value={roleCd}
              onChange={(e) => setRoleCd(e.target.value)}
              required
            >
              {roles.map((role) => (
                <MenuItem key={role.role_cd} value={role.role_cd}>
                  {role.role_cd} - {role.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Status Dropdown */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Status"
              select
              value={statusCd}
              onChange={(e) => setStatusCd(e.target.value)}
              required
            >
              {statuses.map((status) => (
                <MenuItem key={status.status_cd} value={status.status_cd}>
                  {status.status_cd} - {status.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Start Date */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              value={startDt}
              onChange={(e) => setStartDt(e.target.value)}
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* End Date (Optional) */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="End Date (Optional)"
              type="date"
              value={endDt}
              onChange={(e) => setEndDt(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Assign Role and Status'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
    </DashboardLayout>
  );
};

export default AssignRoleAndStatus;
