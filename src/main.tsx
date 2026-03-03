import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryProvider } from './services/api';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './index.css';
import App from './App.jsx';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <QueryProvider>
        <App />
        <SpeedInsights />
      </QueryProvider>
    </StrictMode>
  );
} else {
  throw new Error("Root element with id 'root' not found.");
}
