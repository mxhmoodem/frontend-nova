[![CI/CD Pipeline](https://github.com/mxhmoodem/frontend-nova/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/mxhmoodem/frontend-nova/actions/workflows/ci.yml)

# Frontend Nova

Frontend Nova is a React + TypeScript single-page application for market intelligence and regulatory insights. The app is organised into modular pages and reusable UI components, with testing and linting built into the workflow.

## Project Preview

## Tech Stack

- React 19
- TypeScript 5
- Vite 7
- React Router
- React Query
- Vitest + Testing Library
- ESLint + Prettier

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Git

### Installation

```bash
git clone https://github.com/mxhmoodem/frontend-nova.git
cd frontend-nova
npm install
```

### Run Locally

```bash
npm run dev
```

Default local URL: `http://localhost:5173`

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Type-check and build production bundle
- `npm run preview`: Preview production build locally
- `npm run lint`: Run ESLint checks
- `npm run lint:fix`: Auto-fix lint issues
- `npm run type-check`: Run TypeScript checks
- `npm test`: Run tests in watch mode
- `npm run test:run`: Run tests once (CI mode)
- `npm run test:ui`: Run Vitest UI
- `npm run test:coverage`: Generate coverage report
- `npm run format`: Format source files
- `npm run format:check`: Check formatting

## Environment Variables

Create a `.env` file in the project root for environment-specific values.

```bash
VITE_API_URL=your_api_url_here
```

Only variables prefixed with `VITE_` are exposed to the frontend.

## Project Structure

```text
src/
  components/      # Reusable UI, layout, and feature components
  pages/           # Route-level screens (Overview, MarketPulse, etc.)
  services/        # API integrations and data access
  hooks/           # Custom React hooks
  context/         # Application-wide providers/state
  constants/       # Static config and route constants
  styles/          # Global styles, utilities, variables
  types/           # Shared TypeScript types
  utils/           # Pure utility helpers
```

## Documentation

- `SETUP.md`: Local setup details
- `TESTING.md`: Testing conventions and examples
- `ROUTING_ARCHITECTURE.md`: Routing design
- `docs/API_INTEGRATION.md`: API integration notes
- `docs/API_QUICK_REFERENCE.md`: API reference shortcuts

## Contributing

1. Create a feature branch.
2. Make and test your changes.
3. Run linting and type checks.
4. Open a pull request.
