import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar, CssBaseline, useMediaQuery, useTheme } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

const drawerWidth = 240;

const Layout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      
      <Header onDrawerToggle={handleDrawerToggle} />
      
      <Sidebar
        open={mobileOpen}
        onClose={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Toolbar /> {/* Placeholder to push content below the app bar */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout; 