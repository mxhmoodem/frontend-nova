export interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: 'payment' | 'crypto' | 'fintech' | 'regulation';
  timestamp: string;
  source: string;
}

export interface LiveNewsCardProps {
  title?: string;
  news?: NewsItem[];
  autoRotateInterval?: number;
  onNewsChange?: (newsItem: NewsItem) => void;
}
