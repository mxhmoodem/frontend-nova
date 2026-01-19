import { useNavigate } from 'react-router-dom';
import { KeyRound } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth/useAuth';
import { ROUTES } from '../../../constants/routes';
import { FEATURES } from './Login.config';
import HSBCLogo from '../../../assets/icons/hsbc-logo.png';
import './Login.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate(ROUTES.OVERVIEW);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div className="login">
      {/* Left Panel - Informational */}
      <div className="login__info-panel" onMouseMove={handleMouseMove}>
        <div className="login__info-content">
          <div className="login__brand">
            <div className="login__brand-accent"></div>
            <h2 className="login__brand-title">Noval IQ</h2>
          </div>

          <h1 className="login__hero-title">
            Turn fragmented data into{' '}
            <span className="login__hero-highlight">strategic advantage</span>
          </h1>

          <p className="login__hero-description">
            Centralised market intelligence, regulatory updates and trends.
            Access AI-powered insights for smarter product and strategy
            decisions.
          </p>

          <div className="login__features">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="login__feature">
                <div className="login__feature-icon">
                  <Icon size={36} strokeWidth={2} />
                </div>
                <div className="login__feature-text">
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Authentication */}
      <div className="login__auth-panel">
        <div className="login__auth-content">
          <div className="login__card">
            <div className="login__header">
              <div className="login__logo-container">
                <img
                  src={HSBCLogo}
                  alt="HSBC Logo"
                  className="login__logo-image"
                />
              </div>
              <h1 className="login__title">Welcome back</h1>
              <p className="login__subtitle">
                Sign in to access your insights workspace
              </p>
            </div>

            <div className="login__content">
              <button
                className="login__sso-button"
                onClick={handleLogin}
                type="button"
              >
                <KeyRound size={20} strokeWidth={2.5} />
                <span className="login__sso-text">Login with SSO</span>
              </button>
            </div>

            <div className="login__footer">
              <p className="login__footer-text">
                Protected by enterprise-grade security
              </p>
            </div>
          </div>

          <div className="login__disclaimer">
            <p>Secure authentication powered by SSO</p>
          </div>
        </div>
      </div>
    </div>
  );
}
