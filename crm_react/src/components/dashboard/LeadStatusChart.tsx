import React, { useMemo } from 'react';
import { Box, useTheme } from '@mui/material';
import { Lead, LEAD_STATUS_OPTIONS } from '../../types';

interface LeadStatusChartProps {
  leads: Lead[];
}

const LeadStatusChart: React.FC<LeadStatusChartProps> = ({ leads }) => {
  const theme = useTheme();

  const statusCounts = useMemo(() => {
    // Initialize counts with 0 for all statuses
    const counts = LEAD_STATUS_OPTIONS.reduce((acc, status) => {
      acc[status.value] = 0;
      return acc;
    }, {} as Record<string, number>);
    
    // Count leads by status
    leads.forEach(lead => {
      counts[lead.status] = (counts[lead.status] || 0) + 1;
    });
    
    return counts;
  }, [leads]);

  const statusColors = {
    new: theme.palette.info.main,
    contacted: theme.palette.primary.main,
    inprogress: theme.palette.warning.main,
    lost: theme.palette.error.main,
    won: theme.palette.success.main,
  };

  const getStatusLabel = (status: string) => {
    const option = LEAD_STATUS_OPTIONS.find(opt => opt.value === status);
    return option ? option.label : status;
  };

  // Simple bar chart implementation
  return (
    <Box sx={{ height: 300, display: 'flex', alignItems: 'flex-end', mt: 2 }}>
      {LEAD_STATUS_OPTIONS.map(status => {
        const count = statusCounts[status.value] || 0;
        const percentage = leads.length ? (count / leads.length) * 100 : 0;
        
        return (
          <Box
            key={status.value}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              m: 1,
              textAlign: 'center',
            }}
          >
            <Box sx={{ mb: 1 }}>{count}</Box>
            <Box
              sx={{
                width: '80%',
                height: `${Math.max(percentage, 5)}%`,
                bgcolor: statusColors[status.value as keyof typeof statusColors] || theme.palette.grey[500],
                borderRadius: '4px 4px 0 0',
                minHeight: 20,
                transition: 'height 0.5s ease-in-out',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            ></Box>
            <Box
              sx={{
                mt: 1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
                fontSize: '0.75rem',
              }}
            >
              {getStatusLabel(status.value)}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default LeadStatusChart; 