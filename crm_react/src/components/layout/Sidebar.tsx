import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  useTheme,
  Typography
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as LeadsIcon,
  Business as ClientsIcon,
  Group as TeamIcon,
  AttachMoney as SubscriptionIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  drawerWidth: number;
}

const navItems = [
  { name: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { name: 'Leads', icon: <LeadsIcon />, path: '/leads' },
  { name: 'Clients', icon: <ClientsIcon />, path: '/clients' },
  { name: 'Team', icon: <TeamIcon />, path: '/team' },
  { name: 'Subscription', icon: <SubscriptionIcon />, path: '/subscription' },
  { name: 'Settings', icon: <SettingsIcon />, path: '/settings' }
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, drawerWidth }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigation = (path: string) => {
    navigate(path);
    if (window.innerWidth < 600) {
      onClose();
    }
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: theme.palette.text.primary }}>
          Navigation
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton 
              selected={location.pathname.startsWith(item.path)}
              onClick={() => handleNavigation(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.light,
                  color: theme.palette.primary.contrastText,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                  },
                  '& .MuiListItemIcon-root': {
                    color: theme.palette.primary.contrastText,
                  }
                },
              }}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar; 