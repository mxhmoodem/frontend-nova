import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AIConsole from './AIConsole';

const renderAIConsole = () => {
  return render(
    <BrowserRouter>
      <AIConsole />
    </BrowserRouter>
  );
};

describe('AIConsole', () => {
  it('renders the page title', () => {
    renderAIConsole();
    expect(screen.getByText('AI Console')).toBeDefined();
  });

  it('renders the initial message', () => {
    renderAIConsole();
    expect(screen.getByText(/Hello Jane/)).toBeDefined();
  });

  it('renders the input placeholder', () => {
    renderAIConsole();
    expect(
      screen.getByPlaceholderText(
        'Ask about regulations, market data, or documents...'
      )
    ).toBeDefined();
  });

  it('renders Chart Builder button', () => {
    renderAIConsole();
    expect(screen.getByText('Chart Builder')).toBeDefined();
  });

  it('renders Reset button', () => {
    renderAIConsole();
    expect(screen.getByText('Reset')).toBeDefined();
  });

  it('renders AI disclaimer', () => {
    renderAIConsole();
    expect(
      screen.getByText(
        'AI can make mistakes. Please verify critical regulatory information.'
      )
    ).toBeDefined();
  });
});
