import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  // Define the menu items for Dashboard
  const menuItems = [
    { text: 'Dashboard', icon: <HomeIcon />, path: '/dashboard' },
    { text: 'Role', icon: <HomeIcon />, path: '/role' },
    { text: 'User List', icon: <HomeIcon />, path: '/user-list' },
  ];

  return (
    <Box>
      {/* Sidebar Drawer */}
      <Drawer
        variant="temporary" // Always temporary
        open={isOpen} // Control visibility with state
        onClose={toggleSidebar} // Close when clicking outside the drawer
        ModalProps={{
          keepMounted: true, // Improve performance on mobile devices
        }}
        sx={{
          '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Toolbar /> {/* Ensures content starts below Navbar */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                navigate(item.path); // Navigate to the specified path
                toggleSidebar(); // Close sidebar when clicking a menu item
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
