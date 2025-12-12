# Mad - Intelligent Property Monitoring Platform

Mad is a comprehensive property monitoring platform that enables real-time tracking of electricity, water, and internet utilities. With AI-powered insights, predictive analytics, and transparent property data sharing, Mad helps property owners and managers optimize consumption, detect anomalies, and build trust with tenants and buyers.

## Features

### Real-Time Monitoring
- Track electricity, water, and internet usage in real-time
- Instant alerts for anomalies and unusual consumption patterns
- Visual dashboards with consumption charts and analytics

### AI-Powered Detection
- Agentic AI chatbot for instant assistance and troubleshooting
- Automated anomaly detection
- Smart reporting to service providers

### Predictive Insights
- ML-powered forecasting to optimize consumption
- Historical data analysis
- Cost reduction recommendations

### Property Code System
- Share verified property performance data with tenants and buyers
- Transparent property quality metrics
- Build trust through data transparency

### Multi-Property Management
- Manage multiple properties from a single dashboard
- Property leaderboards and comparison
- Complex and individual property support

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend & Auth**: Supabase
- **Database**: PostgreSQL (via Supabase)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd mad-property-monitoring
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run database migrations:
The project includes Supabase migrations in the `supabase/migrations` folder. Apply them to your Supabase project.

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## Project Structure

```
mad-property-monitoring/
├── public/               # Static assets and images
├── src/
│   ├── components/       # React components
│   │   ├── AuthPage.tsx
│   │   ├── Dashboard.tsx
│   │   ├── LandingPage.tsx
│   │   ├── PropertyLookup.tsx
│   │   └── ...
│   ├── lib/             # Utility functions and configurations
│   │   ├── supabase.ts
│   │   └── propertyCodeUtils.ts
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── supabase/
│   └── migrations/      # Database migrations
└── package.json
```

## Database Schema

The application uses the following main tables:

- `users` - User authentication and profiles
- `user_profiles` - Extended user information
- `properties` - Property information and metadata
- `property_codes` - Shareable property verification codes
- `electricity_data` - Electricity consumption records
- `water_data` - Water usage records
- `internet_data` - Internet usage and performance metrics

## Pricing Plans

- **Free**: Basic monitoring, weekly reports, 1 property
- **Mad Pro** ($9.99/mo): AI detection, real-time alerts, up to 5 properties
- **Mad Premium** ($29.99/mo): Certified reports, property codes, unlimited properties, priority support

## Features Overview

### For Property Owners
- Monitor all utilities in one place
- Detect issues before they become costly problems
- Generate verified property reports for marketing

### For Property Managers
- Manage multiple properties efficiently
- Track consumption across all units
- Automated reporting and alerts

### For Tenants & Buyers
- Look up property codes to verify quality
- View transparent consumption history
- Make informed decisions based on real data

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

Copyright 2024 Mad. All rights reserved.

## Support

For support and questions, please contact our team or use the in-app AI chatbot for instant assistance.
