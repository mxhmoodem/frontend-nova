import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SearchInput } from '../SearchInput';
import { LookupSearchProps, LookupResult } from './LookupSearch.types';
import './LookupSearch.css';

export function LookupSearch<T extends LookupResult = LookupResult>({
  fetchResults,
  onSelect,
  placeholder = 'Search...',
  minQueryLength = 3,
  renderResult,
  ariaLabel,
  label,
  className = '',
  size = 'md',
  initialValue = '',
  leadingSlot,
  trailingSlot,
  disabled = false,
  id,
  name,
  emptyStateMessage = 'No results found',
}: LookupSearchProps<T>) {
  const [query, setQuery] = useState(initialValue);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);

  // Determine if should fetch based on query length
  const shouldFetch = query.length >= minQueryLength;

  // Use React Query for data fetching
  const {
    data: results = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['lookup', query],
    queryFn: () => fetchResults(query),
    enabled: shouldFetch,
    staleTime: 30000,
  });

  // Compute results visibility based on current state
  const shouldShowResults = shouldFetch && !disabled && isResultsVisible;

  // Handle clicks outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputWrapperRef.current &&
        !inputWrapperRef.current.contains(event.target as Node)
      ) {
        setIsResultsVisible(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    if (value.length >= minQueryLength) {
      setIsResultsVisible(true);
    } else {
      setIsResultsVisible(false);
      setActiveIndex(-1);
    }
  };

  const handleResultSelect = (result: T) => {
    onSelect(result);
    setQuery(result.label);
    setIsResultsVisible(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isResultsVisible || results.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        event.preventDefault();
        if (activeIndex >= 0 && activeIndex < results.length) {
          handleResultSelect(results[activeIndex]);
        }
        break;
      case 'Escape':
        event.preventDefault();
        setIsResultsVisible(false);
        setActiveIndex(-1);
        break;
    }
  };

  // Scroll active result into view
  useEffect(() => {
    if (activeIndex >= 0 && resultsRef.current) {
      const activeElement = resultsRef.current.querySelector(
        `[data-index="${activeIndex}"]`
      );
      if (activeElement) {
        activeElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  }, [activeIndex]);

  const defaultRenderResult = (result: T) => (
    <div className="lookup-search__result-content">
      <span className="lookup-search__result-label">{result.label}</span>
    </div>
  );

  const resultRenderer = renderResult || defaultRenderResult;

  return (
    <div
      ref={inputWrapperRef}
      className={`lookup-search ${className}`}
      onKeyDown={handleKeyDown}
    >
      <SearchInput
        value={query}
        onChange={handleQueryChange}
        placeholder={placeholder}
        disabled={disabled}
        loading={isLoading || isFetching}
        leadingSlot={leadingSlot}
        trailingSlot={trailingSlot}
        ariaLabel={ariaLabel}
        label={label}
        size={size}
        id={id}
        name={name}
        className="lookup-search__input"
      />

      {shouldShowResults && (
        <div
          ref={resultsRef}
          className="lookup-search__results"
          role="listbox"
          aria-label={ariaLabel ? `${ariaLabel} results` : 'Search results'}
        >
          {results.length > 0 ? (
            results.map((result, index) => (
              <div
                key={result.id}
                data-index={index}
                role="option"
                aria-selected={index === activeIndex}
                className={`lookup-search__result ${
                  index === activeIndex ? 'lookup-search__result--active' : ''
                }`}
                onClick={() => handleResultSelect(result)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {resultRenderer(result, index === activeIndex)}
              </div>
            ))
          ) : (
            <div className="lookup-search__empty">
              {isLoading || isFetching ? (
                <span>Loading...</span>
              ) : (
                <span>{emptyStateMessage}</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default LookupSearch;
