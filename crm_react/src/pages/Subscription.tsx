import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  Alert,
  Divider,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useTheme
} from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { teamService } from '../api';
import PlanCard from '../components/subscriptions/PlanCard';
import { SUBSCRIPTION_PLANS } from '../types';

const Subscription: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [team, setTeam] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const response = await teamService.getMyTeam();
        setTeam(response.data);
        setSelectedPlan(response.data.plan?.name.toLowerCase().replace(/\s+/g, '') || 'free');
      } catch (error) {
        console.error('Error fetching team:', error);
        setError('Failed to load team data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  const handlePlanSelect = async (planId: string) => {
    setSelectedPlan(planId);
    
    if (planId === 'free') {
      try {
        await teamService.upgradePlan(planId);
        const response = await teamService.getMyTeam();
        setTeam(response.data);
      } catch (error) {
        console.error('Error upgrading to free plan:', error);
        setError('Failed to upgrade to free plan. Please try again.');
      }
    }
  };

  const handleSubscribe = async () => {
    if (selectedPlan === 'free') {
      return;
    }

    try {
      setProcessingPayment(true);
      
      // Get Stripe public key
      const stripeKeyResponse = await teamService.getStripePubKey();
      const stripePublicKey = stripeKeyResponse.data.pub_key;
      
      // Create Stripe session
      const sessionResponse = await teamService.createCheckoutSession(selectedPlan);
      
      // Redirect to Stripe checkout
      const stripe = await loadStripe(stripePublicKey);
      if (stripe) {
        await stripe.redirectToCheckout({
          sessionId: sessionResponse.data.sessionId
        });
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setError('Failed to process payment. Please try again later.');
      setProcessingPayment(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      await teamService.cancelPlan();
      setCancelDialogOpen(false);
      
      // Refresh team data
      const response = await teamService.getMyTeam();
      setTeam(response.data);
      setSelectedPlan('free');
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      setError('Failed to cancel subscription. Please try again.');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const isPlanActive = team.plan_status === 'active';
  const planEndDate = team.plan_end_date ? new Date(team.plan_end_date).toLocaleDateString() : null;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Subscription Plans
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {team.plan && planEndDate && (
        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Current Subscription
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)' } }}>
              <Typography variant="body1">
                <strong>Plan:</strong> {team.plan.name}
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong> {isPlanActive ? 'Active' : 'Cancelled'}
              </Typography>
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)' } }}>
              <Typography variant="body1">
                <strong>Renewal Date:</strong> {planEndDate}
              </Typography>
              {isPlanActive && team.plan.name !== 'Free' && (
                <Button 
                  variant="outlined" 
                  color="error" 
                  sx={{ mt: 1 }}
                  onClick={() => setCancelDialogOpen(true)}
                >
                  Cancel Subscription
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      )}

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {SUBSCRIPTION_PLANS.map((plan) => (
          <Box 
            key={plan.id}
            sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(33.333% - 16px)' } }}
          >
            <PlanCard
              id={plan.id}
              name={plan.name}
              price={plan.price}
              features={plan.features}
              currentPlan={selectedPlan}
              activePlan={isPlanActive && team.plan?.name.toLowerCase().replace(/\s+/g, '') === plan.id}
              onSelect={handlePlanSelect}
            />
          </Box>
        ))}
      </Box>

      {selectedPlan !== 'free' && selectedPlan !== (team.plan?.name.toLowerCase().replace(/\s+/g, '') || '') && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={handleSubscribe}
            disabled={processingPayment}
            sx={{ px: 4, py: 1.5 }}
          >
            {processingPayment ? <CircularProgress size={24} /> : 'Proceed to Payment'}
          </Button>
        </Box>
      )}

      {/* Cancel Subscription Dialog */}
      <Dialog
        open={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
      >
        <DialogTitle>Cancel Subscription</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel your subscription? You will still have access to premium features until the end of your billing period ({planEndDate}).
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)}>
            No, Keep Subscription
          </Button>
          <Button onClick={handleCancelSubscription} color="error">
            Yes, Cancel Subscription
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Subscription; 