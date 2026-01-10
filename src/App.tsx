import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Overview from './pages/Overview/Overview';
import AIConsole from './pages/AIConsole/AIConsole';
import MarketPulse from './pages/MarketPulse/MarketPulse';
import RegulatoryRadar from './pages/RegulatoryRadar/RegulatoryRadar';
import ContentHub from './pages/ContentHub/ContentHub';
import Settings from './pages/Settings/Settings';
import { ROUTES } from './constants/routes';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path={ROUTES.ROOT}
          element={<Navigate to={ROUTES.OVERVIEW} replace />}
        />

        <Route path={ROUTES.APP_ROOT} element={<DashboardLayout />}>
          <Route index element={<Navigate to={ROUTES.OVERVIEW} replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="ai-console" element={<AIConsole />} />
          <Route path="market-pulse" element={<MarketPulse />} />
          <Route path="regulatory-radar" element={<RegulatoryRadar />} />
          <Route path="content-hub" element={<ContentHub />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.OVERVIEW} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
