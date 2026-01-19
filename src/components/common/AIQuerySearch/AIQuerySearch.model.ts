export interface AIQuerySearchProps {
  onAsk: (question: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  initialValue?: string;
}
