/**
 * Mock Files Configuration
 * Provides sample data files for the Chart Builder data source selection
 *
 * TODO: Replace with actual API call to fetch user's uploaded files
 */

import { DataFile, ParsedData } from '../types';

// Sample parsed data for mock files
export const mockParsedData: Record<string, ParsedData> = {
  '1': {
    columns: ['Week', 'Sales', 'Revenue', 'Profit'],
    rows: [
      { Week: 'Week 1', Sales: 150, Revenue: 15000, Profit: 3000 },
      { Week: 'Week 2', Sales: 350, Revenue: 35000, Profit: 7000 },
      { Week: 'Week 3', Sales: 250, Revenue: 25000, Profit: 5000 },
      { Week: 'Week 4', Sales: 680, Revenue: 68000, Profit: 13600 },
      { Week: 'Week 5', Sales: 220, Revenue: 22000, Profit: 4400 },
      { Week: 'Week 6', Sales: 850, Revenue: 85000, Profit: 17000 },
      { Week: 'Week 7', Sales: 480, Revenue: 48000, Profit: 9600 },
      { Week: 'Week 8', Sales: 720, Revenue: 72000, Profit: 14400 },
    ],
    preview: [
      { Week: 'Week 1', Sales: 150, Revenue: 15000, Profit: 3000 },
      { Week: 'Week 2', Sales: 350, Revenue: 35000, Profit: 7000 },
      { Week: 'Week 3', Sales: 250, Revenue: 25000, Profit: 5000 },
    ],
  },
  '2': {
    columns: ['Region', 'Q1', 'Q2', 'Q3', 'Q4'],
    rows: [
      { Region: 'North America', Q1: 2500, Q2: 2800, Q3: 3200, Q4: 3500 },
      { Region: 'Europe', Q1: 2200, Q2: 2400, Q3: 2900, Q4: 3100 },
      { Region: 'Asia Pacific', Q1: 1800, Q2: 2100, Q3: 2600, Q4: 3000 },
      { Region: 'Latin America', Q1: 1200, Q2: 1400, Q3: 1600, Q4: 1800 },
      { Region: 'Middle East', Q1: 900, Q2: 1100, Q3: 1300, Q4: 1500 },
    ],
    preview: [
      { Region: 'North America', Q1: 2500, Q2: 2800, Q3: 3200, Q4: 3500 },
      { Region: 'Europe', Q1: 2200, Q2: 2400, Q3: 2900, Q4: 3100 },
      { Region: 'Asia Pacific', Q1: 1800, Q2: 2100, Q3: 2600, Q4: 3000 },
    ],
  },
  '3': {
    columns: ['Month', 'Customers', 'Churned', 'Retention Rate'],
    rows: [
      {
        Month: 'January',
        Customers: 10000,
        Churned: 250,
        'Retention Rate': 97.5,
      },
      {
        Month: 'February',
        Customers: 10200,
        Churned: 280,
        'Retention Rate': 97.3,
      },
      {
        Month: 'March',
        Customers: 10500,
        Churned: 220,
        'Retention Rate': 97.9,
      },
      {
        Month: 'April',
        Customers: 10800,
        Churned: 300,
        'Retention Rate': 97.2,
      },
      { Month: 'May', Customers: 11000, Churned: 260, 'Retention Rate': 97.6 },
      { Month: 'June', Customers: 11200, Churned: 240, 'Retention Rate': 97.9 },
    ],
    preview: [
      {
        Month: 'January',
        Customers: 10000,
        Churned: 250,
        'Retention Rate': 97.5,
      },
      {
        Month: 'February',
        Customers: 10200,
        Churned: 280,
        'Retention Rate': 97.3,
      },
      {
        Month: 'March',
        Customers: 10500,
        Churned: 220,
        'Retention Rate': 97.9,
      },
    ],
  },
};

export const mockFiles: DataFile[] = [
  {
    id: '1',
    name: 'Q3_Sales_Data.csv',
    type: 'csv',
    category: 'Sales',
    size: '1.2 MB',
    timestamp: 'Today',
  },
  {
    id: '2',
    name: 'Regional_Trends_2025.xlsx',
    type: 'xlsx',
    category: 'Trends',
    size: '840 KB',
    timestamp: 'Yesterday',
  },
  {
    id: '3',
    name: 'Customer_Churn_Analysis.csv',
    type: 'csv',
    category: 'CRM',
    size: '2.4 MB',
    timestamp: 'Last Week',
  },
];
