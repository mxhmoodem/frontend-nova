import { InformationButton } from '../../components/common/InformationButton/InformationButton';
import { AIQuerySearch } from '../../components/common/AIQuerySearch';
import { useAuth } from '../../hooks/useAuth';
import { promptCards } from './AIConsole.config';
import './AIConsole.css';

export default function AIConsole() {
  const { user } = useAuth();

  const handleAsk = (query: string) => {
    console.log('AI Query:', query);
  };

  const getFirstName = (name: string) => {
    return name.split(' ')[0] || name;
  };

  const userName = user?.name ? getFirstName(user.name) : 'Guest';

  return (
    <div className="ai-console-page">
      <div className="ai-console-header">
        <h2 className="ai-console__heading">
          AI Console
          <InformationButton
            tooltip="More information"
            ariaLabel="Information"
          />
        </h2>
        <p className="ai-console__subheading">Powered by AI</p>
      </div>

      <div className="ai-console-landing">
        <div className="ai-landing-text">
          <h1 className="ai-landing-greeting">
            Hello <span className="ai-landing-username">{userName}</span>
          </h1>
          <h2 className="ai-landing-subtitle">How can I help you today?</h2>
        </div>

        <div className="ai-prompt-cards">
          {promptCards.map((card) => (
            <button
              key={card.id}
              className="ai-prompt-card"
              onClick={() => handleAsk(card.title)}
            >
              <div className="ai-prompt-card__icon-wrapper">
                <card.icon className="ai-prompt-card__icon" />
              </div>
              <div className="ai-prompt-card__content">
                <h3 className="ai-prompt-card__title">{card.title}</h3>
                <p className="ai-prompt-card__desc">{card.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="ai-search-container">
        <AIQuerySearch onAsk={handleAsk} placeholder="Ask something.." />
      </div>
    </div>
  );
}
