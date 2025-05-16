import React from 'react';
import { Box, Paper, Typography, Avatar, useTheme } from '@mui/material';

interface DashboardCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, color }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        transition: 'all 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <Box>
        <Typography variant="subtitle2" color="textSecondary">
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1 }}>
          {value}
        </Typography>
      </Box>
      <Avatar
        sx={{
          bgcolor: color,
          width: 52,
          height: 52,
        }}
      >
        {icon}
      </Avatar>
    </Paper>
  );
};

export default DashboardCard; 