# FIND: Founders in Nascent Development

A comprehensive talent discovery platform designed to identify and catalog high-potential current and future founders across Australia's startup ecosystem.

## Features

- Advanced founder search with multiple filtering options
- AI-powered profile enrichment using Perplexity's Sonar API
- Comprehensive founder profiles with diversity metrics
- Tag-based categorization and filtering
- Real-time data updates and quality monitoring
- Export capabilities for search results

## Tech Stack

- Frontend: React + TypeScript + Vite
- UI Components: Shadcn UI
- Database: PostgreSQL (via Supabase)
- AI Integration: Perplexity Sonar API
- Authentication: Supabase Auth

## Prerequisites

- Node.js 18+
- Supabase account
- Perplexity API key

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_PERPLEXITY_API_KEY=your_perplexity_api_key
```

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/find.git
cd find
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
# Apply migrations
supabase db reset

# Seed the database with initial data
supabase db seed
```

4. Start the development server:
```bash
npm run dev
```

## Database Schema

The application uses the following main tables:

- `founders`: Core founder information
- `startups`: Startup details
- `founder_startups`: Founder-startup relationships
- `diversity_metrics`: Diversity and inclusion data
- `tags`: Categorization tags
- `founder_tags`: Founder-tag relationships

## API Integration

### Perplexity Sonar API

The platform uses Perplexity's Sonar API for AI-powered profile enrichment. The integration is handled through the `DataCollectionService` class.

### Supabase

All database operations are performed through Supabase's client library, with proper type safety and real-time capabilities.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Perplexity AI for their Sonar API
- Supabase for the backend infrastructure
- Shadcn UI for the component library
