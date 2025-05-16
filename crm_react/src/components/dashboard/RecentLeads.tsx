import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box,
  Chip,
  Link,
  Typography,
  Divider,
  useTheme
} from '@mui/material';
import { 
  Person as PersonIcon 
} from '@mui/icons-material';
import { Lead, LEAD_STATUS_OPTIONS } from '../../types';

interface RecentLeadsProps {
  leads: Lead[];
}

const RecentLeads: React.FC<RecentLeadsProps> = ({ leads }) => {
  const theme = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return theme.palette.info.main;
      case 'contacted':
        return theme.palette.primary.main;
      case 'inprogress':
        return theme.palette.warning.main;
      case 'lost':
        return theme.palette.error.main;
      case 'won':
        return theme.palette.success.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getStatusLabel = (status: string) => {
    const option = LEAD_STATUS_OPTIONS.find(opt => opt.value === status);
    return option ? option.label : status;
  };

  if (leads.length === 0) {
    return (
      <Typography variant="body2" color="textSecondary" align="center" sx={{ py: 2 }}>
        No leads available.
      </Typography>
    );
  }

  return (
    <List disablePadding>
      {leads.map((lead, index) => (
        <React.Fragment key={lead.id}>
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
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Link component={RouterLink} to={`/leads/${lead.id}`} color="inherit" underline="hover">
                    {lead.company}
                  </Link>
                  <Chip
                    label={getStatusLabel(lead.status)}
                    size="small"
                    sx={{
                      backgroundColor: getStatusColor(lead.status),
                      color: '#fff',
                      fontWeight: 'bold',
                    }}
                  />
                </Box>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    variant="body2"
                    color="textPrimary"
                    sx={{ display: 'block' }}
                  >
                    {lead.contact_person}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ display: 'block' }}
                  >
                    {lead.email}
                  </Typography>
                  {lead.estimated_value && (
                    <Typography
                      variant="body2"
                      sx={{ 
                        color: theme.palette.success.main,
                        fontWeight: 'bold' 
                      }}
                    >
                      ${lead.estimated_value.toLocaleString()}
                    </Typography>
                  )}
                </React.Fragment>
              }
            />
          </ListItem>
          {index < leads.length - 1 && <Divider component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default RecentLeads; 