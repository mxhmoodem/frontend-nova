import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext/ThemeContext';
import { AuthProvider } from './context/AuthContext/AuthContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import { Login } from './pages/Auth';
import Overview from './pages/Overview/Overview';
import AIConsole from './pages/AIConsole/AIConsole';
import MarketPulse from './pages/MarketPulse/MarketPulse';
import RegulatoryRadar from './pages/RegulatoryRadar/RegulatoryRadar';
import ContentHub from './pages/ContentHub/ContentHub';
import Settings from './pages/Settings/Settings';
import HelpAndSupport from './pages/HelpAndSupport/HelpAndSupport';
import { ROUTES } from './constants/routes';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path={ROUTES.LOGIN} element={<Login />} />

            {/* Root redirect to overview */}
            <Route
              path={ROUTES.ROOT}
              element={<Navigate to={ROUTES.OVERVIEW} replace />}
            />

            {/* Protected Routes */}
            <Route
              path={ROUTES.APP_ROOT}
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={<Navigate to={ROUTES.OVERVIEW} replace />}
              />
              <Route path="overview" element={<Overview />} />
              <Route path="ai-console" element={<AIConsole />} />
              <Route path="market-pulse" element={<MarketPulse />} />
              <Route path="regulatory-radar" element={<RegulatoryRadar />} />
              <Route path="content-hub" element={<ContentHub />} />
              <Route path="settings" element={<Settings />} />
              <Route path="help-support" element={<HelpAndSupport />} />
            </Route>

            {/* Catch-all redirect to login */}
            <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
