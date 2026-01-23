import { Sparkles } from 'lucide-react';
import { getInitials } from '../../../utils/formatters';
import { ChatMessageProps } from './ChatMessage.types';
import './ChatMessage.css';

export default function ChatMessage({
  role,
  content,
  userInitals = 'User',
  timestamp,
}: ChatMessageProps) {
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
}
