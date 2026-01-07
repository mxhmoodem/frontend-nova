# Frontend Nova - Setup Guide

Welcome to Frontend Nova! This guide will help you get the project up and running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher) or **yarn** / **pnpm**
- **Git**

Check your versions:

```bash
node --version
npm --version
git --version
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mxhmoodem/frontend-nova.git
cd frontend-nova
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:

- React 19.2.0
- TypeScript 5.9.3
- Vite 7.2.4
- Vitest 4.0.16
- ESLint and testing libraries

### 3. Verify Installation

Run the type checker to ensure everything is set up correctly:

```bash
npm run type-check
```

\*\*Make sure to install the VSCode extensions: ESLint and Prettier ESLint

## Development

### Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Available Scripts

- **`npm run dev`** - Start the development server with hot reload
- **`npm run build`** - Build the production-ready application
- **`npm run preview`** - Preview the production build locally
- **`npm run lint`** - Run ESLint to check code quality
- **`npm run type-check`** - Run TypeScript compiler checks without emitting files
- **`npm test`** - Run tests in watch mode
- **`npm run test:ui`** - Run tests with Vitest UI
- **`npm run test:run`** - Run tests once (CI mode)
- **`npm run test:coverage`** - Generate test coverage report

## Testing

This project uses Vitest and React Testing Library for testing.

### Run Tests

```bash
# Watch mode
npm test

# Run once
npm run test:run

# With UI
npm run test:ui

# With coverage
npm run test:coverage
```

### Test Files

Test files are co-located with their source files:

- `*.test.tsx` - Component tests
- `*.test.ts` - Hook and utility tests

## Code Quality

### Linting

```bash
npm run lint
```

The project uses ESLint with React and TypeScript configurations.

### Type Checking

```bash
npm run type-check
```

TypeScript is configured to ensure type safety across the application.

## Building for Production

### Create Production Build

```bash
npm run build
```

This will:

1. Run TypeScript compiler checks
2. Build optimized assets using Vite
3. Output files to the `dist/` directory

### Preview Production Build

```bash
npm run preview
```

## Environment Variables

If the project requires environment variables, create a `.env` file in the root directory:

```bash
# .env
VITE_API_URL=your_api_url_here
```

> **Note:** Environment variables must be prefixed with `VITE_` to be exposed to the application.

## Contributing

1. Create a new branch for your feature/fix, should be same as one on Kanban Board
2. Make your changes
3. Run tests and linting
4. Commit your changes
5. Push and create a pull request

## Tech Stack

- **React 19.2** - UI library
- **TypeScript 5.9** - Type safety
- **Vite 7.2** - Build tool and dev server
- **Vitest 4.0** - Testing framework
- **React Testing Library** - Component testing utilities
- **SWC** - Fast JavaScript/TypeScript compiler
- **ESLint** - Code linting
- **CSS Modules** - Component-scoped styling
