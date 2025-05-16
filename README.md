# CRM Project

A full-stack Customer Relationship Management (CRM) system built with Django REST framework backend and React frontend.

## Project Structure

- `/crm` - Django backend
- `/crm_react` - React frontend

## Setup and Installation

### Backend Setup

```bash
# Navigate to the backend directory
cd crm

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start the development server
python manage.py runserver
```

### Frontend Setup

```bash
# Navigate to the frontend directory
cd crm_react

# Install dependencies
npm install

# Start the development server
npm start
```

## Features

- User authentication and authorization
- Client management
- Lead tracking
- Team collaboration
- [Add more features here]

## Technology Stack

- **Backend**: Django, Django REST Framework
- **Frontend**: React
- **Database**: SQLite (development), PostgreSQL (production)
- **Authentication**: JSON Web Tokens (JWT)
- **Payment Processing**: Stripe

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[Add license information here]
