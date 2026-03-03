// API Base URLs for different environments
export const API_CONFIG = {
  development: {
    baseUrl:
      import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
    timeout: 30000,
  },
  production: {
    baseUrl:
      import.meta.env.VITE_API_BASE_URL ||
      'https://backend-nova-production.up.railway.app/api/v1',
    timeout: 30000,
  },
  staging: {
    baseUrl:
      import.meta.env.VITE_API_BASE_URL ||
      'https://staging.your-domain.com/api/v1',
    timeout: 30000,
  },
} as const;

// Determine current environment
const getEnvironment = (): 'development' | 'production' | 'staging' => {
  // Check for explicit environment variable first
  const envVar = import.meta.env.VITE_ENV;
  if (envVar === 'production' || envVar === 'staging') return envVar;

  // Fall back to Vite's MODE
  if (import.meta.env.MODE === 'production') return 'production';
  if (import.meta.env.MODE === 'staging') return 'staging';
  return 'development';
};

export const CURRENT_ENV = getEnvironment();
export const API_BASE_URL = API_CONFIG[CURRENT_ENV].baseUrl;
export const API_TIMEOUT = API_CONFIG[CURRENT_ENV].timeout;

// Log configuration in non-production for debugging
if (import.meta.env.DEV) {
  console.log('[API Config]', {
    mode: import.meta.env.MODE,
    env: CURRENT_ENV,
    baseUrl: API_BASE_URL,
  });
}

// HTTP DEFAULTS
export const DEFAULT_HEADERS: HeadersInit = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

// REACT QUERY CONFIGURATION
export const QUERY_CONFIG = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes
  retry: 3,
  retryDelay: (attemptIndex: number) =>
    Math.min(1000 * 2 ** attemptIndex, 30000),
  refetchIntervals: {
    realtime: 30 * 1000, // 30 seconds
    frequent: 60 * 1000, // 1 minute
    standard: 5 * 60 * 1000, // 5 minutes
    infrequent: 15 * 60 * 1000, // 15 minutes
  },
} as const;
