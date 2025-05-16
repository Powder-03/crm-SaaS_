import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography, Paper, Divider, CircularProgress, useTheme } from '@mui/material';
import { 
  People as LeadsIcon, 
  Business as ClientsIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material';
import { leadService, clientService, teamService } from '../api';
import { Lead, Client, Team } from '../types';
import DashboardCard from '../components/dashboard/DashboardCard';
import LeadStatusChart from '../components/dashboard/LeadStatusChart';
import RecentLeads from '../components/dashboard/RecentLeads';
import RecentClients from '../components/dashboard/RecentClients';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [team, setTeam] = useState<Team | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch data in parallel
        const [leadsResponse, clientsResponse, teamResponse] = await Promise.all([
          leadService.getLeads(),
          clientService.getClients(),
          teamService.getMyTeam()
        ]);
        
        setLeads(leadsResponse.data.results || leadsResponse.data);
        setClients(clientsResponse.data.results || clientsResponse.data);
        setTeam(teamResponse.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate total estimated value from leads
  const totalEstimatedValue = leads
    .filter(lead => lead.status !== 'lost')
    .reduce((sum, lead) => sum + (lead.estimated_value || 0), 0);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {/* Summary Cards */}
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
          <DashboardCard 
            title="Total Leads" 
            value={leads.length}
            icon={<LeadsIcon sx={{ color: theme.palette.info.main }} />}
            color={theme.palette.info.light}
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
          <DashboardCard 
            title="Total Clients" 
            value={clients.length}
            icon={<ClientsIcon sx={{ color: theme.palette.success.main }} />}
            color={theme.palette.success.light}
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
          <DashboardCard 
            title="Conversion Rate" 
            value={`${leads.length ? Math.round((clients.length / leads.length) * 100) : 0}%`}
            icon={<TrendingUpIcon sx={{ color: theme.palette.warning.main }} />}
            color={theme.palette.warning.light}
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
          <DashboardCard 
            title="Est. Value" 
            value={`$${totalEstimatedValue.toLocaleString()}`}
            icon={<MoneyIcon sx={{ color: theme.palette.secondary.main }} />}
            color={theme.palette.secondary.light}
          />
        </Box>

        {/* Charts and Recent Activity */}
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Lead Status Distribution
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <LeadStatusChart leads={leads} />
          </Paper>
        </Box>

        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}>
          <Stack spacing={2}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Recent Leads
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <RecentLeads leads={leads.slice(0, 5)} />
            </Paper>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Recent Clients
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <RecentClients clients={clients.slice(0, 5)} />
            </Paper>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard; 