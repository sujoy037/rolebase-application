import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'; // Login component
import AdminDashboard from './pages/AdminDashboard'; // Dashboard component
import ProtectedRoute from './routes/ProtectedRoute'; // ProtectedRoute component
import ApiKeyPage from './pages/ApiKeyPage'
import AssignRoleStatus from './pages/AssignRoleStatus';
import UserRoleStatusTable from './pages/UserRoleStatusTable';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<ApiKeyPage/>} />
        <Route path="/login" element={<Login />} />
        
        {/* Protect the Dashboard route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/role"
          element={
            <ProtectedRoute>
              <AssignRoleStatus/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-list"
          element={
            <ProtectedRoute>
              <UserRoleStatusTable/>
            </ProtectedRoute>
          }
        />

        {/* You can add more protected routes like this */}
      </Routes>
    </Router>
  );
};

export default App;
