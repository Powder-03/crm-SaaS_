import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Link,
  Typography,
  Divider,
  useTheme
} from '@mui/material';
import { 
  Business as BusinessIcon 
} from '@mui/icons-material';
import { Client } from '../../types';

interface RecentClientsProps {
  clients: Client[];
}

const RecentClients: React.FC<RecentClientsProps> = ({ clients }) => {
  const theme = useTheme();

  if (clients.length === 0) {
    return (
      <Typography variant="body2" color="textSecondary" align="center" sx={{ py: 2 }}>
        No clients available.
      </Typography>
    );
  }

  return (
    <List disablePadding>
      {clients.map((client, index) => (
        <React.Fragment key={client.id}>
          <ListItem
            alignItems="flex-start"
            sx={{
              px: 1,
              py: 1.5,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: theme.palette.success.light }}>
                <BusinessIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Link component={RouterLink} to={`/clients/${client.id}`} color="inherit" underline="hover">
                  {client.company}
                </Link>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    variant="body2"
                    color="textPrimary"
                    sx={{ display: 'block' }}
                  >
                    {client.contact_person}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ display: 'block' }}
                  >
                    {client.email}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >
                    {new Date(client.created_at).toLocaleDateString()}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          {index < clients.length - 1 && <Divider component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default RecentClients; 