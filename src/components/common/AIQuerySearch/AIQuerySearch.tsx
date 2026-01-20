import { useState } from 'react';
import { FiPaperclip } from 'react-icons/fi';
import { IoSend } from 'react-icons/io5';
import { SearchInput } from '../SearchInput';
import './AIQuerySearch.css';
import { AIQuerySearchProps } from './AIQuerySearch.model';

export default function AIQuerySearch({
  onAsk,
  placeholder = 'Ask about regulations, market data, or documents...',
  disabled = false,
  initialValue = '',
}: AIQuerySearchProps) {
  const [question, setQuestion] = useState(initialValue);

  const handleSubmit = () => {
    if (question.trim() && !disabled) {
      onAsk(question.trim());
    }
  };

  return (
    <SearchInput
      className="ai-query-search"
      value={question}
      onChange={setQuestion}
      onSubmit={handleSubmit}
      placeholder={placeholder}
      disabled={disabled}
      ariaLabel="AI question input"
      leadingSlot={
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
      }
      trailingSlot={
        <button
          type="submit"
          disabled={disabled || !question.trim()}
          className="ai-query-search__submit-button"
          aria-label="Submit question"
        >
          <IoSend size={20} />
        </button>
      }
    />
  );
}
