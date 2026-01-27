import React from 'react';
import { Sparkles } from 'lucide-react';
import { getInitials } from '../../../utils/formatters';
import { ChatMessageProps } from './ChatMessage.types';
import './ChatMessage.css';

const ChatMessage: React.FC<ChatMessageProps> = ({
  role,
  content,
  userInitals = 'User',
  timestamp,
}) => {
  const isAI = role === 'ai';

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
            <p className="chat-message__text">{content}</p>
          </div>
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
