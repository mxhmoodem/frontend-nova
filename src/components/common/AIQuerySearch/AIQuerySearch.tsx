import { useState, FormEvent, ChangeEvent } from 'react';
import { FiPaperclip } from 'react-icons/fi';
import { IoSend } from 'react-icons/io5';
import './AIQuerySearch.css';
import { AIQuerySearchProps } from './AIQuerySearch.model';

export default function AIQuerySearch({
  onAsk,
  placeholder = 'Ask about regulations, market data, or documents...',
  className = '',
  disabled = false,
  initialValue = '',
}: AIQuerySearchProps) {
  const [question, setQuestion] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (question.trim() && !disabled) {
      onAsk(question.trim());
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <form onSubmit={handleSubmit} className={`ai-query-search ${className}`}>
      <div
        className={`ai-query-search__container ${isFocused ? 'ai-query-search__container--focused' : ''}`}
      >
        {/* Left icon - Attachment paperclip for future implementation */}
        <button
          type="button"
          className="ai-query-search__icon-left"
          aria-label="Attach file"
          onClick={() =>
            console.log('Attach file - functionality coming later')
          }
        >
          <FiPaperclip size={20} />
        </button>

        {/* Input field */}
        <input
          type="text"
          value={question}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className="ai-query-search__field"
          aria-label="AI question input"
        />

        {/* Right action button - Placeholder for future implementation */}
        <button
          type="submit"
          disabled={disabled || !question.trim()}
          className="ai-query-search__submit-button"
          aria-label="Submit question"
          onClick={() => console.log('Send query - functionality coming later')}
        >
          <IoSend size={20} />
        </button>
      </div>
    </form>
  );
}
