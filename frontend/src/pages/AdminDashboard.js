import React from 'react';
import { Box, Grid } from '@mui/material';
import DashboardLayout from '../components/DashboardLayout';
import InfoCard from '../components/InfoCard';
import {
  PeopleAlt as PeopleAltIcon,
  Business as BusinessIcon,
  ReportProblem as ReportProblemIcon,
} from '@mui/icons-material';

const AdminDashboard = () => {
  return (
    <DashboardLayout role="Admin">
      {/* Info Cards Section */}
      <Box sx={{ marginTop: 2, padding: 3 }}>
        <Grid container spacing={3}>
          {/* Card 1: Total Department */}
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                backgroundColor: '#e3f2fd', // Light blue background
                borderRadius: 2,
                boxShadow: 3,
                height: 150,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <InfoCard
                title="Total Department"
                value="2,000"
                color="#1E88E5"
                icon={BusinessIcon}
              />
            </Box>
          </Grid>

          {/* Card 2: Total Complaints */}
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                backgroundColor: '#fff3e0', // Light orange background
                borderRadius: 2,
                boxShadow: 3,
                height: 150,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <InfoCard
                title="Total Complaints"
                value="2,000"
                color="#F4511E"
                icon={ReportProblemIcon}
              />
            </Box>
          </Grid>

          {/* Card 3: Total Officers */}
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                backgroundColor: '#ede7f6', // Light purple background
                borderRadius: 2,
                boxShadow: 3,
                height: 150,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <InfoCard
                title="Total Officers"
                value="2,00,000"
                color="#5E35B1"
                icon={PeopleAltIcon}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default AdminDashboard;
