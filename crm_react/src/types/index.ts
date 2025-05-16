// User related types
export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
}

// Team related types
export interface Plan {
  id: number;
  name: string;
  max_leads: number;
  max_clients: number;
  price: number;
}

export interface Team {
  id: number;
  name: string;
  members: User[];
  created_by: User;
  plan?: Plan;
  plan_status?: string;
  plan_end_date?: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  leads: Lead[];
}

// Lead related types
export interface Lead {
  id: number;
  team: number;
  company: string;
  contact_person: string;
  email: string;
  phone: string;
  website?: string;
  confidence?: number;
  estimated_value?: number;
  status: string;
  priority: string;
  assigned_to?: User;
  created_by: User;
  created_at: string;
  modified_at: string;
}

// Client related types
export interface Client {
  id: number;
  team: number;
  company: string;
  contact_person: string;
  email: string;
  phone: string;
  website?: string;
  created_by: User;
  created_at: string;
  modified_at: string;
}

export interface Note {
  id: number;
  team: number;
  client: number;
  name: string;
  body?: string;
  created_by: User;
  created_at: string;
  modified_at: string;
}

// Pagination types
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Status and priority options for leads
export const LEAD_STATUS_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'inprogress', label: 'In Progress' },
  { value: 'lost', label: 'Lost' },
  { value: 'won', label: 'Won' }
];

export const LEAD_PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' }
];

// Subscription plan options
export const SUBSCRIPTION_PLANS = [
  { 
    id: 'free', 
    name: 'Free', 
    price: 0,
    features: ['5 leads', '5 clients', 'Basic CRM features']
  },
  { 
    id: 'smallteam', 
    name: 'Small Team', 
    price: 19,
    features: ['25 leads', '25 clients', 'Email notifications', 'Priority support']
  },
  { 
    id: 'bigteam', 
    name: 'Big Team', 
    price: 49,
    features: ['Unlimited leads', 'Unlimited clients', 'Advanced analytics', 'Priority support', 'API access']
  }
]; 