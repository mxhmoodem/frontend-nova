import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Auth pages
import LandingPage from './pages/auth/LandingPage/LandingPage';
import Login from './pages/auth/Login/Login';
import Register from './pages/auth/Register/Register';
import ForgotPassword from './pages/auth/ForgotPassword/ForgotPassword';

// Layout
import { AppShell } from './components/layout';

// App pages
import Overview from './pages/Overview/Overview';
import MarketPulse from './pages/MarketPulse/MarketPulse';
import RegulatoryRadar from './pages/RegulatoryRadar/RegulatoryRadar';
import ContentHub from './pages/ContentHub/ContentHub';
import AIConsole from './pages/AIConsole/AIConsole';
import Scenarios from './pages/Scenarios/Scenarios';
import Reports from './pages/Reports/Reports';
import ReportsLibrary from './pages/ReportsLibrary/ReportsLibrary';
import Alerts from './pages/Alerts/Alerts';
import Workspaces from './pages/Workspaces/Workspaces';
import WorkspaceDetail from './pages/WorkspaceDetail/WorkspaceDetail';
import Settings from './pages/Settings/Settings';
import Profile from './pages/Profile/Profile';
import Help from './pages/Help/Help';

import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* App routes (wrapped in AppShell) */}
        <Route path="/app" element={<AppShell />}>
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="market-pulse" element={<MarketPulse />} />
          <Route path="regulatory-radar" element={<RegulatoryRadar />} />
          <Route path="content-hub" element={<ContentHub />} />
          <Route path="ai-console" element={<AIConsole />} />
          <Route path="insights/scenarios" element={<Scenarios />} />
          <Route path="insights/reports" element={<Reports />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="workspaces" element={<Workspaces />} />
          <Route path="workspaces/:id" element={<WorkspaceDetail />} />
          <Route path="reports" element={<ReportsLibrary />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
