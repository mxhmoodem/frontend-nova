export interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
