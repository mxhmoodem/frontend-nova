import { useState } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import { cn } from '../../../../utils/cn';
import type { AIAssistantProps, Message } from './AIAssistant.types';

export default function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hello! I'm your AI assistant. I can help you analyze payment data, understand regulations, and generate insights. How can I assist you today?",
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages([...messages, { role: 'user', content: message }]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "I'm analyzing your request and gathering relevant data from the content hub...",
        },
      ]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div
      className={cn(
        'fixed top-0 right-0 h-full w-96 bg-card border-l border-border shadow-2xl transform transition-transform duration-300 z-50',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-border flex items-center justify-between bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">AI Assistant</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
            aria-label="Close AI Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={cn(
                'flex',
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[80%] p-3 rounded-lg',
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                )}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question..."
              className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <button
              onClick={handleSend}
              className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
