import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Avatar, 
  Menu, 
  MenuItem, 
  Divider,
  useTheme
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Person as PersonIcon, 
  Settings as SettingsIcon, 
  Logout as LogoutIcon 
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onDrawerToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onDrawerToggle }) => {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await logout();
    navigate('/login');
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.primary.main
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
          CRM System
        </Typography>
        
        {user ? (
          <Box>
            <IconButton 
              size="large" 
              onClick={handleMenu}
              color="inherit"
              aria-label="account"
              aria-controls="menu-appbar"
              aria-haspopup="true"
            >
              <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                {user.first_name ? user.first_name[0] : user.username[0]}
              </Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem disabled sx={{ opacity: 1 }}>
                <Typography variant="body2">
                  {user.first_name ? `${user.first_name} ${user.last_name}` : user.username}
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleProfile}>
                <PersonIcon fontSize="small" sx={{ mr: 2 }} />
                Profile
              </MenuItem>
              <MenuItem onClick={() => { handleClose(); navigate('/settings'); }}>
                <SettingsIcon fontSize="small" sx={{ mr: 2 }} />
                Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <LogoutIcon fontSize="small" sx={{ mr: 2 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" component={RouterLink} to="/login">Login</Button>
            <Button color="inherit" component={RouterLink} to="/register">Register</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header; 