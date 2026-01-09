import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AIAssistant from './AIAssistant';

describe('AIAssistant', () => {
  it('renders when open', () => {
    render(<AIAssistant isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText('AI Assistant')).toBeDefined();
  });

  it('renders initial message', () => {
    render(<AIAssistant isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText(/Hello! I'm your AI assistant/i)).toBeDefined();
  });

  it('renders input placeholder', () => {
    render(<AIAssistant isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByPlaceholderText('Ask a question...')).toBeDefined();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<AIAssistant isOpen={true} onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('sends message when send button is clicked', () => {
    render(<AIAssistant isOpen={true} onClose={vi.fn()} />);

    const input = screen.getByPlaceholderText('Ask a question...');
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    expect(screen.getByText('Test message')).toBeDefined();
  });

  it('clears input after sending', () => {
    render(<AIAssistant isOpen={true} onClose={vi.fn()} />);

    const input = screen.getByPlaceholderText(
      'Ask a question...'
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    expect(input.value).toBe('');
  });
});
