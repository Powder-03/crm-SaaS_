import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme
} from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';

interface PlanCardProps {
  id: string;
  name: string;
  price: number;
  features: string[];
  currentPlan?: string;
  activePlan?: boolean;
  onSelect: (planId: string) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({
  id,
  name,
  price,
  features,
  currentPlan,
  activePlan,
  onSelect
}) => {
  const theme = useTheme();
  const isSelected = currentPlan === id;
  
  return (
    <Card
      raised={isSelected}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: isSelected ? theme.shadows[8] : theme.shadows[1],
        transition: 'all 0.3s ease-in-out',
        borderColor: isSelected ? theme.palette.primary.main : 'transparent',
        borderWidth: 2,
        borderStyle: 'solid',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <Box
        sx={{
          bgcolor: isSelected ? theme.palette.primary.main : theme.palette.background.paper,
          color: isSelected ? theme.palette.primary.contrastText : theme.palette.text.primary,
          p: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" component="div" fontWeight="bold">
          {name}
        </Typography>
      </Box>
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'baseline',
            mb: 2,
            mt: 1,
          }}
        >
          <Typography component="h2" variant="h3" fontWeight="bold">
            ${price}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ ml: 1 }}>
            /mo
          </Typography>
        </Box>
        
        <List sx={{ mb: 2, flexGrow: 1 }}>
          {features.map((feature) => (
            <ListItem key={feature} disableGutters>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckIcon sx={{ color: theme.palette.success.main }} />
              </ListItemIcon>
              <ListItemText primary={feature} />
            </ListItem>
          ))}
        </List>
        
        <Button
          fullWidth
          variant={isSelected ? "outlined" : "contained"}
          color={isSelected ? "success" : "primary"}
          onClick={() => onSelect(id)}
          disabled={isSelected && activePlan}
          sx={{ mt: 'auto' }}
        >
          {isSelected
            ? activePlan
              ? 'Current Plan'
              : 'Reactivate'
            : 'Select Plan'}
        </Button>
        
        {isSelected && activePlan && (
          <Typography variant="caption" color="text.secondary" align="center" sx={{ mt: 1 }}>
            Your current active plan
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default PlanCard; 