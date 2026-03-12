import { useState, useRef, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Sparkles } from 'lucide-react';
import { InformationButton } from '../../components/common/InformationButton/InformationButton';
import { AIQuerySearch } from '../../components/common/AIQuerySearch';
import { Button } from '../../components/common';
import { InfoModal } from '../../components/features/common/InfoModal';
import { ChatMessage } from '../../components/common/ChatMessage';
import { infoModalContent } from '../../constants/infoModalContent';
import { promptCards } from './AIConsole.config';
import { getFirstName } from '../../utils/formatters';
import { useAuth } from '../../hooks/useAuth';
import { useAIConsole } from '../../context/AIConsoleContext';
import type { ChatEntry } from '../../context/AIConsoleContext';
import { useAgentQuery } from '../../services/api/agent';
import type { ConversationMessage } from '../../services/api/agent';
import './AIConsole.css';

export default function AIConsole() {
  const [showInfo, setShowInfo] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const userName = user?.name ? getFirstName(user.name) : 'User';
  const userFullName = user?.name ?? 'User';

  // Persistent conversation state
  const { messages, addUserMessage, addAIMessage, clearConversation } =
    useAIConsole();

  // React Query mutation for the agent API
  const { mutate: queryAgent, isPending } = useAgentQuery();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isPending]);

  const handleAsk = (query: string) => {
    if (!query.trim() || isPending) return;

    // Snapshot current history before updating state, then append new user msg
    const historyForBackend: ConversationMessage[] = [
      // Convert existing messages to backend format (ai → assistant)
      ...messages.map((m: ChatEntry) => ({
        role: (m.role === 'ai' ? 'assistant' : 'user') as 'user' | 'assistant',
        content: m.content,
      })),
      { role: 'user' as const, content: query },
    ];

    // Update the UI immediately
    addUserMessage(query);

    // Call the agent API
    queryAgent(historyForBackend, {
      onSuccess: (res) => {
        addAIMessage(res.message, res.sources ?? []);
      },
      onError: (err) => {
        addAIMessage(
          `Sorry, something went wrong. Please try again. (${err.message})`,
          []
        );
      },
    });
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
            onClick={clearConversation}
            className="ai-console__new-chat-button"
          />
        </div>
        <p className="ai-console__subheading">Powered by AI</p>
      </header>

      {messages.length === 0 && !isPending ? (
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
        <div className="ai-console-scroll-area">
          <div className="ai-console-messages">
            {messages.map((msg: ChatEntry, index: number) => (
              <ChatMessage
                key={index}
                role={msg.role}
                content={msg.content}
                userInitals={userFullName}
                timestamp={msg.timestamp}
                sources={msg.sources}
              />
            ))}

            {/* Typing indicator while waiting for the AI */}
            {isPending && (
              <div className="chat-message chat-message--ai">
                <div className="chat-message__container">
                  <div className="chat-message__avatar chat-message__avatar--ai">
                    <Sparkles size={20} />
                  </div>
                  <div className="chat-message__content">
                    <div className="chat-message__bubble ai-console-typing">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      <div className="ai-search-container">
        <AIQuerySearch
          onAsk={handleAsk}
          placeholder="Ask something.."
          disabled={isPending}
        />
      </div>
    </div>
  );
}
