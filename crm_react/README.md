# CRM React Frontend

This is a modern React frontend for the CRM system, built with TypeScript, React Router, Material UI, and integrated with Stripe for subscription management.

## Features

- User authentication with token-based auth
- Dashboard with lead and client analytics
- Lead management
- Client management
- Team management
- Subscription plans with Stripe integration
- Responsive design for mobile and desktop

## Technologies Used

- **React**: UI library for building component-based interfaces
- **TypeScript**: For type safety and better developer experience
- **React Router**: For navigation and routing
- **Material UI**: Component library for modern, responsive UI
- **Axios**: For API communication
- **Stripe**: For handling subscription payments
- **React Toastify**: For notifications

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Backend API running (Django REST Framework)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   cd crm_react
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. The app will run at [http://localhost:3000](http://localhost:3000)

## Project Structure

- `src/api`: API service files for backend communication
- `src/components`: Reusable UI components
  - `layout`: Layout components like Header, Sidebar
  - `dashboard`: Dashboard-specific components
  - `leads`: Lead management components
  - `clients`: Client management components
  - `teams`: Team management components
  - `subscriptions`: Subscription plan components
  - `common`: Shared utility components
- `src/contexts`: React context providers
- `src/pages`: Main page components
- `src/types`: TypeScript type definitions
- `src/utils`: Utility functions

## Deployment

To build the app for production:

```
npm run build
```

This will create a `build` folder with optimized production files that can be served using any static hosting service.

## Backend API

This frontend is designed to work with the Django REST Framework backend in the `crm_django` folder. Make sure the backend is running before starting the frontend development server.
