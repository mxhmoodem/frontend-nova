import { NewsItem } from './liveNewsCard.types';

export const newsData: NewsItem[]  = [  
  {
    category: 'Business',
    title: 'Market Hits Record Highs',
    description:
      'Stock markets reached new heights today as investors reacted positively to economic data.',
    source: 'Reuters',
    timestamp: '2 mins ago',
  },
  {
    category: 'Technology',
    title: 'New Smartphone Released',
    description:
      'The latest smartphone model features cutting-edge technology and innovative design.',
    source: 'TechCrunch',
    timestamp: '10 mins ago',
  },
  {
    category: 'Health',
    title: 'Advancements in Medical Research',
    description:
      'Researchers have made significant progress in the fight against chronic diseases.',
    source: 'Healthline',
    timestamp: '15 mins ago',
  },
  {
    category: 'Entertainment',
    title: 'Blockbuster Movie Premiere',
    description:
      'The much-anticipated movie has premiered to rave reviews from critics and audiences alike.',
    source: 'Variety',
    timestamp: '30 mins ago',
  },
];

export const ROTATION_INTERVAL = 15000;