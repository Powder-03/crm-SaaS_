import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context providers
import { AuthProvider } from './contexts/AuthContext';

// Layout
import Layout from './components/layout/Layout';

// Auth pages
import Login from './pages/Login';
import Register from './pages/Register';

// Main pages
import Dashboard from './pages/Dashboard';
import Subscription from './pages/Subscription';

// Protected route component
import ProtectedRoute from './components/common/ProtectedRoute';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#4791db',
      dark: '#115293',
    },
    secondary: {
      main: '#f50057',
      light: '#f73378',
      dark: '#ab003c',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="subscription" element={<Subscription />} />
              
              {/* Add more routes as needed */}
              <Route path="leads" element={<div>Leads Page (Coming Soon)</div>} />
              <Route path="clients" element={<div>Clients Page (Coming Soon)</div>} />
              <Route path="team" element={<div>Team Management (Coming Soon)</div>} />
              <Route path="settings" element={<div>Settings (Coming Soon)</div>} />
            </Route>
            
            {/* 404 route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
        
        {/* Toast notifications */}
        <ToastContainer position="bottom-right" />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
