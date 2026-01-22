import { IconType } from 'react-icons';
import { FiGlobe, FiTrendingUp, FiBookOpen } from 'react-icons/fi';

export interface PromptCard {
  id: string;
  icon: IconType;
  title: string;
  description: string;
}

export const promptCards: PromptCard[] = [
  {
    id: '1',
    icon: FiGlobe,
    title: "What's happened in the last 24 hours?",
    description:
      "See what's been happening in the world over the last 24 hours",
  },
  {
    id: '2',
    icon: FiTrendingUp,
    title: 'Stock market update',
    description: "See what's happening in the stock market in real time",
  },
  {
    id: '3',
    icon: FiBookOpen,
    title: 'Deep economic research',
    description: 'See research from experts that we have simplified',
  },
];
