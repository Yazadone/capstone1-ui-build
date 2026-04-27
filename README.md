# Capstone 1 - UI Build

A production-ready genomic data portal UI built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

✅ **Home Page** - Landing page with feature highlights and quick access
✅ **Datasets Listing** - Browse, search, and filter genomic datasets
✅ **Dataset Details** - Detailed view of individual datasets
✅ **Access Requests** - Track and manage dataset access requests
✅ **Analyses** - View and manage genomic analyses
✅ **Admin Dashboard** - Complete admin management interface
✅ **Responsive Design** - Works on mobile, tablet, and desktop
✅ **Mock Data** - All pages populated with realistic demo data

## Tech Stack

- **Framework**: Next.js 14
- **UI Library**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Navigation**: Next.js Router

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Project Structure

```
src/
├── pages/                    # Next.js pages
│   ├── index.tsx            # Home page
│   ├── datasets/
│   │   ├── index.tsx        # Datasets listing
│   │   └── [id].tsx         # Dataset detail
│   ├── access-requests/     # Access requests
│   ├── analyses/            # Analyses page
│   └── admin/               # Admin dashboard
├── components/              # Reusable components
│   ├── Header.tsx           # Navigation header
│   └── Footer.tsx           # Footer
└── styles/                  # Global styles
    └── globals.css          # Tailwind CSS

Root configs:
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
├── tsconfig.json            # TypeScript configuration
├── next.config.js           # Next.js configuration
└── package.json             # Dependencies
```

## Pages

### Home (`/`)
- Landing page with feature highlights
- Quick access buttons to main sections
- Call-to-action buttons

### Datasets (`/datasets`)
- Search datasets by title
- Filter by dataset type (Expression, SNP, Sequencing)
- Grid of dataset cards with key information
- Click cards to view details

### Dataset Detail (`/datasets/[id]`)
- Complete dataset information
- Accession number and metadata
- Sample and marker statistics
- Quick action buttons (Request Access, Download, Favorites)
- Sidebar with additional information

### Access Requests (`/access-requests`)
- Filter requests by status (All, Pending, Approved, Denied)
- Display request details with timestamps
- Status-specific action buttons
- Color-coded status indicators

### Analyses (`/analyses`)
- Grid view of completed and running analyses
- Analysis type, dataset, and status display
- View Results and Export buttons
- Status indicators for running/completed/failed

### Admin Dashboard (`/admin`)
- Statistics cards showing key metrics
- Tab navigation (Overview, Users, Requests, Datasets)
- Recent activity feed
- User management table
- Access request management with approve/deny
- Dataset management interface

## Design System

### Colors
- **Primary Blue**: #0ea5e9
- **Secondary Purple**: #a855f7
- **Success Green**: #22c55e
- **Warning Amber**: #f59e0b
- **Danger Red**: #ef4444

### Components
- Responsive header with navigation
- Reusable cards and sections
- Form inputs and buttons
- Status badges and indicators
- Tables for data display

## Deployment

Build for production:
```bash
npm run build
npm start
```

Ready to deploy to:
- Vercel (recommended for Next.js)
- Netlify
- AWS
- Docker
- Any Node.js hosting

## No API Integration

This is a pure UI demo with mock data. To connect to a real backend:

1. Replace mock data with API calls
2. Add authentication handling
3. Implement error handling
4. Add loading states
5. Connect to your backend endpoints

## Future Enhancements

- User authentication pages (Login/Register)
- Real API integration
- Data export functionality
- Advanced search filters
- File upload interface
- User profile management
- Notifications system
- Dark mode theme

## Contributing

This is a UI demo/prototype. Feel free to fork and customize!

## License

MIT
