import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  useTheme,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import {
  LockOutlined as LockOutlinedIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

interface FieldErrors {
  [key: string]: string[];
}

const Register: React.FC = () => {
  const theme = useTheme();
  const { register, login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Reset errors
    setErrors({});
    setGeneralError('');
    
    // Client-side validation
    if (!username || !email || !password || !passwordConfirm) {
      setGeneralError('Please fill in all fields');
      return;
    }
    
    if (password !== passwordConfirm) {
      setErrors({ passwordConfirm: ['Passwords do not match'] });
      return;
    }

    try {
      setLoading(true);
      
      console.log('Form submitted with:', {
        username,
        email,
        password: '****',
        passwordConfirm: '****'
      });
      
      // Directly submit to API instead of using context to see clearer errors
      const response = await register(username, email, password);
      console.log('Registration successful:', response.data);
      
      // Login after successful registration
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      
      if (axios.isAxiosError(err) && err.response?.data) {
        const errorData = err.response.data;
        
        if (typeof errorData === 'object') {
          setErrors(errorData);
          
          // Handle non-field errors
          if (errorData.non_field_errors) {
            setGeneralError(errorData.non_field_errors.join(' '));
          }
        } else {
          setGeneralError('Failed to register. Please try again.');
        }
      } else {
        setGeneralError('Failed to register. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: theme.palette.secondary.main }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create an Account
          </Typography>
          
          {generalError && (
            <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
              {generalError}
            </Alert>
          )}
          
          {Object.keys(errors).length > 0 && (
            <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
              <Typography variant="subtitle2">Please fix the following errors:</Typography>
              <List dense>
                {Object.entries(errors).map(([field, messages]) => (
                  <ListItem key={field} disableGutters>
                    <ListItemText
                      primary={field === 'non_field_errors' ? '' : `${field.charAt(0).toUpperCase() + field.slice(1)}`}
                      secondary={messages.join(' ')}
                    />
                  </ListItem>
                ))}
              </List>
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              error={!!errors.username}
              helperText={errors.username && errors.username.join(' ')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              error={!!errors.email}
              helperText={errors.email && errors.email.join(' ')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              error={!!errors.password}
              helperText={errors.password && errors.password.join(' ')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordConfirm"
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              id="passwordConfirm"
              autoComplete="new-password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              disabled={loading}
              error={!!errors.passwordConfirm}
              helperText={errors.passwordConfirm && errors.passwordConfirm.join(' ')}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign Up'}
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              <Box>
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register; 