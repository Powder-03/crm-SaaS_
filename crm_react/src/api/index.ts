import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1/'
});

// Add a request interceptor to add the auth token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to log all errors
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error message:', error.message);
    }
    return Promise.reject(error);
  }
);

// Authentication services
export const authService = {
  login: (username: string, password: string) => 
    api.post('token/login/', { username, password }),
  register: (username: string, email: string, password: string) => {
    console.log('Registering user with:', { username, email, password: '****' });
    return api.post('users/', { 
      username, 
      email, 
      password,
      re_password: password // Djoser requires re_password when USER_CREATE_PASSWORD_RETYPE is true
    })
      .then(response => {
        console.log('Registration API response:', response);
        return response;
      })
      .catch(error => {
        console.error('Registration API error:', error.response?.data || error.message);
        throw error;
      });
  },
  logout: () => api.post('token/logout/'),
  getCurrentUser: () => api.get('users/me/')
};

// Team services
export const teamService = {
  getMyTeam: () => api.get('team/get-my-team/'),
  addMember: (email: string) => api.post('team/add-member/', { email }),
  upgradePlan: (plan: string) => api.post('team/upgrade-plan/', { plan }),
  getStripePubKey: () => api.get('stripe/get-stripe-pub-key/'),
  createCheckoutSession: (plan: string) => 
    api.post('stripe/create-checkout-session/', { plan }),
  checkSession: () => api.post('stripe/check_session/'),
  cancelPlan: () => api.post('stripe/cancel_plan/')
};

// Lead services
export const leadService = {
  getLeads: () => api.get('leads/'),
  getLead: (id: string) => api.get(`leads/${id}/`),
  createLead: (data: any) => api.post('leads/', data),
  updateLead: (id: string, data: any) => api.put(`leads/${id}/`, data),
  deleteLead: (id: string) => api.post('lead/delete_lead/', { id })
};

// Client services
export const clientService = {
  getClients: () => api.get('clients/'),
  getClient: (id: string) => api.get(`clients/${id}/`),
  createClient: (data: any) => api.post('clients/', data),
  updateClient: (id: string, data: any) => api.put(`clients/${id}/`, data),
  deleteClient: (id: string) => api.post(`client/delete_client/${id}/`),
  convertLeadToClient: (lead_id: string) => 
    api.post('convert-lead-to-client/', { lead_id })
};

// Notes services
export const noteService = {
  getNotes: () => api.get('notes/'),
  createNote: (data: any) => api.post('notes/', data),
  updateNote: (id: string, data: any) => api.put(`notes/${id}/`, data),
  deleteNote: (id: string) => api.delete(`notes/${id}/`)
};

export default api; 