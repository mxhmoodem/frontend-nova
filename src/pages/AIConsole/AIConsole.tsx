import { useState, useRef, useEffect } from 'react';
import {
  Send,
  Mic,
  Sparkles,
  Paperclip,
  RotateCcw,
  BarChart2,
  Info,
} from 'lucide-react';
import { CornerPattern } from '../../components/layout';
import { InfoModal } from '../../components/features/common';
import type { InfoModalContent } from '../../components/features/common/InfoModal/InfoModal.types';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

const infoContent: InfoModalContent = {
  whatFor:
    'The AI Console is where you can ask questions in plain language and get answers based on all the data and documents in the platform.',
  whatItDoes: [
    'Accepts natural language questions about markets, regulations, performance, and customer feedback.',
    'Uses the centralised data and vector database to find relevant information.',
    'Returns clear summaries, explanations, comparisons, and simple tables or charts.',
    'Maintains context over multiple questions in a conversation.',
  ],
  whenToUse:
    'Use this screen whenever you need to understand a topic quickly, explore a question, or prepare for a decision, report, or meeting.',
  howToUse: [
    'Type a question in plain English, such as "What are the main new payment rules in the United Kingdom next year?"',
    'Review the answer and the referenced documents or data points.',
    'Ask follow-up questions without repeating all the context.',
    'Save useful conversations or turn them into report drafts.',
  ],
  example:
    "I ask: 'How are online card payments trending in Spain, and are there any new rules that might affect them?' The assistant combines market data and regulatory documents to give me a concise answer with links to sources.",
  projectRelation:
    'The AI Console is the "assistant" part of the Global Payments Content Hub & AI Assistant. It turns the centralised data into real, usable insight for product, investment, and risk decisions.',
};

export default function AIConsole() {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content:
        "Hello Jane. I've analyzed the latest regulatory updates from the EPC and UK Peacock. What would you like to explore today?",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = (text = input) => {
    if (!text.trim()) return;

    const newMsgId = Date.now();
    setMessages((prev) => [
      ...prev,
      { id: newMsgId, role: 'user', content: text },
    ]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: newMsgId + 1,
          role: 'assistant',
          content:
            "I can help with that. If you'd like to visualize the data, you can use the Chart Builder tool above.",
        },
      ]);
    }, 1500);
  };

  useEffect(() => {
    if (
      messagesEndRef.current &&
      typeof messagesEndRef.current.scrollIntoView === 'function'
    ) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col relative overflow-hidden animate-in fade-in duration-500">
      <CornerPattern />
      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        title="AI Console"
        content={infoContent}
      />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-6 flex items-center justify-between bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <div className="p-2 bg-white rounded-xl shadow-lg shadow-primary/25 border border-border">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            AI Console
          </h1>
          <button
            onClick={() => setShowInfo(true)}
            className="p-1.5 rounded-full bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            title="Learn about this page"
          >
            <Info className="w-4 h-4" />
          </button>
          <p className="text-sm text-muted-foreground ml-6 hidden sm:block">
            Powered by Noval IQ
          </p>
        </div>

        <div className="pointer-events-auto flex gap-2">
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold hover:opacity-90 transition-all shadow-md flex items-center gap-2">
            <BarChart2 className="w-4 h-4" /> Chart Builder
          </button>

          <button
            onClick={() =>
              setMessages([
                {
                  id: 1,
                  role: 'assistant',
                  content: 'Context reset. How can I help?',
                },
              ])
            }
            className="px-3 py-1.5 bg-secondary border border-border rounded-lg text-xs font-bold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 pt-24 pb-40 scrollbar-hide">
        <div className="max-w-3xl mx-auto space-y-8">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-4 animate-in slide-in-from-bottom-2 duration-500 ${
                msg.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center shadow-md ${
                  msg.role === 'assistant'
                    ? 'bg-gradient-to-br from-primary to-red-700 text-white'
                    : 'bg-secondary border border-border text-foreground'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <Sparkles className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-bold">JS</span>
                )}
              </div>

              <div
                className={`flex-1 max-w-2xl space-y-2 ${msg.role === 'user' ? 'text-right' : ''}`}
              >
                <div
                  className={`p-5 rounded-2xl text-sm leading-relaxed shadow-sm relative group ${
                    msg.role === 'assistant'
                      ? 'bg-card border border-border text-foreground'
                      : 'bg-primary text-white shadow-primary/20'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-4 animate-in fade-in">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-red-700 text-white flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div className="p-4 bg-card border border-border rounded-2xl flex items-center gap-1">
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: '0s' }}
                />
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: '0.15s' }}
                />
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: '0.3s' }}
                />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-transparent p-6 z-20">
        <div className="max-w-3xl mx-auto">
          <div className="relative group shadow-2xl shadow-primary/10 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-red-600/20 rounded-2xl blur-md opacity-50 group-focus-within:opacity-100 transition-opacity" />
            <div className="relative bg-card border border-primary/20 rounded-2xl flex items-end p-2 transition-colors focus-within:border-primary">
              <button className="p-3 text-muted-foreground hover:text-primary hover:bg-secondary rounded-xl transition-colors flex-shrink-0">
                <Paperclip className="w-5 h-5" />
              </button>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about regulations, market data, or documents..."
                className="flex-1 bg-transparent border-none focus:ring-0 min-h-[3rem] max-h-32 py-3 px-2 text-sm resize-none outline-none scrollbar-hide"
                rows={1}
              />
              <button className="p-3 text-muted-foreground hover:text-primary hover:bg-secondary rounded-xl transition-colors flex-shrink-0">
                <Mic className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="p-3 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-md ml-1"
              >
                <Send className="w-5 h-5 fill-current" />
              </button>
            </div>
          </div>
          <p className="text-center text-[10px] text-muted-foreground mt-3 font-medium">
            AI can make mistakes. Please verify critical regulatory information.
          </p>
        </div>
      </div>
    </div>
  );
}
