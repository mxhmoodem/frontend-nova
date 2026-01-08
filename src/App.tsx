import Overview from './pages/Overview/Overview';
import './App.css';

// Rewrite function to render DashboardLayout once and this passes the selected page (e.g. Overview) as a child component
// DashboardLayout will handle rendering the header, sidebar, navigation and layout structure

function App() {
  return <Overview />;
}

export default App;
