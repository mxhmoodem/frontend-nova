import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Sparkles, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { getInitials } from '../../../utils/formatters';
import { ChatMessageProps } from './ChatMessage.types';
import './ChatMessage.css';

const ChatMessage: React.FC<ChatMessageProps> = ({
  role,
  content,
  userInitals = 'User',
  timestamp,
  sources,
}) => {
  const isAI = role === 'ai';
  const hasSources = isAI && sources && sources.length > 0;
  const [sourcesExpanded, setSourcesExpanded] = useState(false);

  return (
    <div className={`chat-message chat-message--${role}`}>
      <div className="chat-message__container">
        {isAI && (
          <div className="chat-message__avatar chat-message__avatar--ai">
            <Sparkles size={20} />
          </div>
        )}

        <div className="chat-message__content">
          <div className="chat-message__bubble">
            {isAI ? (
              <div className="chat-message__markdown">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            ) : (
              <p className="chat-message__text">{content}</p>
            )}
          </div>

          {hasSources && (
            <div className="chat-message__sources">
              <button
                className="chat-message__sources-toggle"
                onClick={() => setSourcesExpanded((x) => !x)}
                aria-expanded={sourcesExpanded}
              >
                <BookOpen size={13} className="chat-message__sources-icon" />
                <span>Sources</span>
                <span className="chat-message__sources-count">
                  {sources!.length}
                </span>
                {sourcesExpanded ? (
                  <ChevronUp size={13} />
                ) : (
                  <ChevronDown size={13} />
                )}
              </button>
              {sourcesExpanded && (
                <ul className="chat-message__sources-list">
                  {sources!.map((src, i) => (
                    <li key={i} className="chat-message__source-item">
                      <span className="chat-message__source-index">
                        {i + 1}
                      </span>
                      {src}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {timestamp && (
            <span className="chat-message__timestamp">{timestamp}</span>
          )}
        </div>

        {!isAI && (
          <div className="chat-message__avatar chat-message__avatar--user">
            <span className="chat-message__initials">
              {getInitials(userInitals)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
