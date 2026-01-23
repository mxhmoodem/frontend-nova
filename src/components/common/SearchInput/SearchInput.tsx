import { FormEvent, ChangeEvent, KeyboardEvent } from 'react';
import { SearchInputProps } from './SearchInput.types';
import './SearchInput.css';

export function SearchInput({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search...',
  disabled = false,
  loading = false,
  leadingSlot,
  trailingSlot,
  ariaLabel,
  label,
  className = '',
  size = 'md', // Default size
  id,
  name,
}: SearchInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit && !disabled && !loading) {
      onSubmit();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSubmit && !disabled && !loading) {
      e.preventDefault();
      onSubmit();
    }
  };

  const inputId =
    id ||
    (label
      ? `search-input-${label.replace(/\s+/g, '-').toLowerCase()}`
      : undefined);

  return (
    <div className={`search-input-wrapper search-input--${size} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="search-input__label">
          {label}
        </label>
      )}
      <form onSubmit={handleSubmit} className="search-input">
        <div
          className={`search-input__container ${disabled ? 'search-input__container--disabled' : ''} ${loading ? 'search-input__container--loading' : ''}`}
        >
          {leadingSlot && (
            <div className="search-input__leading-slot">{leadingSlot}</div>
          )}

          <input
            type="text"
            id={inputId}
            name={name}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || loading}
            className="search-input__field"
            aria-label={ariaLabel || label}
            aria-busy={loading}
          />

          {trailingSlot && (
            <div className="search-input__trailing-slot">{trailingSlot}</div>
          )}
        </div>
      </form>
    </div>
  );
}

export default SearchInput;
