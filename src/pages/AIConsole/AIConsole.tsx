import { useState, useRef, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { InformationButton } from '../../components/common/InformationButton/InformationButton';
import { AIQuerySearch } from '../../components/common/AIQuerySearch';
import { Button } from '../../components/common';
import { InfoModal } from '../../components/features/common/InfoModal';
import { ChatMessage } from '../../components/common/ChatMessage';
import { infoModalContent } from '../../constants/infoModalContent';
import { promptCards } from './AIConsole.config';
import { getFirstName } from '../../utils/formatters';
import { useAuth } from '../../hooks/useAuth';
import './AIConsole.css';

export default function AIConsole() {
  const [showInfo, setShowInfo] = useState(false);
  const [messages, setMessages] = useState<
    { role: 'user' | 'ai'; content: string; timestamp: string }[]
  >([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const userName = user?.name ? getFirstName(user.name) : 'User';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleAsk = (query: string) => {
    if (!query.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const newUserMessage = { role: 'user' as const, content: query, timestamp };

    setMessages((prev) => [...prev, newUserMessage]);

    // Simulate AI response until BE is integrated
    setTimeout(() => {
      const aiTimestamp = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai' as const,
          content: `I've analysed your request regarding "${query}". This is a demonstration of the AI console interface. How else can I assist you with your market research today?`,
          timestamp: aiTimestamp,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="ai-console-page">
      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title="AI Console"
        content={infoModalContent.aiConsole}
      />
      <header className="ai-console-header">
        <div className="ai-console-header__top">
          <h2 className="ai-console__heading">
            AI Console
            <InformationButton
              tooltip="Learn about this page"
              ariaLabel="Information about AI Console"
              onClick={() => setShowInfo(true)}
            />
          </h2>
          <Button
            variant="primary"
            text="New Chat"
            icon={<FiPlus size={16} />}
            onClick={() => setMessages([])}
            className="ai-console__new-chat-button"
          />
        </div>
        <p className="ai-console__subheading">Powered by AI</p>
      </header>

      {messages.length === 0 ? (
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
      ) : (
        <div className="ai-console-messages">
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              role={msg.role}
              content={msg.content}
              userInitals={userName}
              timestamp={msg.timestamp}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      <div className="ai-search-container">
        <AIQuerySearch onAsk={handleAsk} placeholder="Ask something.." />
      </div>
    </div>
  );
}
