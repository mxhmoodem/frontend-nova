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
  '4': {
    columns: ['Date', 'Total Payments', 'Successful', 'Failed', 'Pending'],
    rows: [
      {
        Date: '2025-01-01',
        'Total Payments': 4250,
        Successful: 4120,
        Failed: 98,
        Pending: 32,
      },
      {
        Date: '2025-01-08',
        'Total Payments': 5680,
        Successful: 5480,
        Failed: 145,
        Pending: 55,
      },
      {
        Date: '2025-01-15',
        'Total Payments': 6120,
        Successful: 5890,
        Failed: 178,
        Pending: 52,
      },
      {
        Date: '2025-01-22',
        'Total Payments': 7340,
        Successful: 7085,
        Failed: 198,
        Pending: 57,
      },
      {
        Date: '2025-01-29',
        'Total Payments': 6890,
        Successful: 6650,
        Failed: 187,
        Pending: 53,
      },
      {
        Date: '2025-02-05',
        'Total Payments': 7650,
        Successful: 7380,
        Failed: 216,
        Pending: 54,
      },
    ],
    preview: [
      {
        Date: '2025-01-01',
        'Total Payments': 4250,
        Successful: 4120,
        Failed: 98,
        Pending: 32,
      },
      {
        Date: '2025-01-08',
        'Total Payments': 5680,
        Successful: 5480,
        Failed: 145,
        Pending: 55,
      },
      {
        Date: '2025-01-15',
        'Total Payments': 6120,
        Successful: 5890,
        Failed: 178,
        Pending: 52,
      },
    ],
  },
  '5': {
    columns: ['Category', 'Documents', 'Views', 'Downloads', 'Avg Rating'],
    rows: [
      {
        Category: 'Market Intelligence',
        Documents: 156,
        Views: 8920,
        Downloads: 2340,
        'Avg Rating': 4.6,
      },
      {
        Category: 'Regulatory',
        Documents: 89,
        Views: 5230,
        Downloads: 1850,
        'Avg Rating': 4.8,
      },
      {
        Category: 'Compliance',
        Documents: 124,
        Views: 7650,
        Downloads: 2120,
        'Avg Rating': 4.5,
      },
      {
        Category: 'Payments',
        Documents: 93,
        Views: 6140,
        Downloads: 1980,
        'Avg Rating': 4.7,
      },
      {
        Category: 'Risk Analysis',
        Documents: 67,
        Views: 4320,
        Downloads: 1230,
        'Avg Rating': 4.4,
      },
    ],
    preview: [
      {
        Category: 'Market Intelligence',
        Documents: 156,
        Views: 8920,
        Downloads: 2340,
        'Avg Rating': 4.6,
      },
      {
        Category: 'Regulatory',
        Documents: 89,
        Views: 5230,
        Downloads: 1850,
        'Avg Rating': 4.8,
      },
      {
        Category: 'Compliance',
        Documents: 124,
        Views: 7650,
        Downloads: 2120,
        'Avg Rating': 4.5,
      },
    ],
  },
  '6': {
    columns: [
      'Jurisdiction',
      'Active Regulations',
      'Last Updated',
      'Compliance Score',
    ],
    rows: [
      {
        Jurisdiction: 'United Kingdom',
        'Active Regulations': 124,
        'Last Updated': '2025-02-01',
        'Compliance Score': 92,
      },
      {
        Jurisdiction: 'EU',
        'Active Regulations': 187,
        'Last Updated': '2025-02-03',
        'Compliance Score': 88,
      },
      {
        Jurisdiction: 'US',
        'Active Regulations': 156,
        'Last Updated': '2025-02-02',
        'Compliance Score': 85,
      },
      {
        Jurisdiction: 'APAC',
        'Active Regulations': 98,
        'Last Updated': '2025-01-28',
        'Compliance Score': 80,
      },
      {
        Jurisdiction: 'Canada',
        'Active Regulations': 67,
        'Last Updated': '2025-01-25',
        'Compliance Score': 89,
      },
    ],
    preview: [
      {
        Jurisdiction: 'United Kingdom',
        'Active Regulations': 124,
        'Last Updated': '2025-02-01',
        'Compliance Score': 92,
      },
      {
        Jurisdiction: 'EU',
        'Active Regulations': 187,
        'Last Updated': '2025-02-03',
        'Compliance Score': 88,
      },
      {
        Jurisdiction: 'US',
        'Active Regulations': 156,
        'Last Updated': '2025-02-02',
        'Compliance Score': 85,
      },
    ],
  },
  '7': {
    columns: [
      'Payment Method',
      'Volume',
      'Average Value',
      'Success Rate',
      'Fee %',
    ],
    rows: [
      {
        'Payment Method': 'Credit Card',
        Volume: 45230,
        'Average Value': 245.5,
        'Success Rate': 99.2,
        'Fee %': 2.5,
      },
      {
        'Payment Method': 'Bank Transfer',
        Volume: 28940,
        'Average Value': 1850.75,
        'Success Rate': 98.8,
        'Fee %': 0.5,
      },
      {
        'Payment Method': 'Digital Wallet',
        Volume: 33560,
        'Average Value': 156.2,
        'Success Rate': 99.5,
        'Fee %': 1.5,
      },
      {
        'Payment Method': 'Direct Debit',
        Volume: 15670,
        'Average Value': 2300.4,
        'Success Rate': 97.9,
        'Fee %': 0.2,
      },
      {
        'Payment Method': 'BNPL',
        Volume: 8920,
        'Average Value': 445.8,
        'Success Rate': 96.5,
        'Fee %': 4.2,
      },
    ],
    preview: [
      {
        'Payment Method': 'Credit Card',
        Volume: 45230,
        'Average Value': 245.5,
        'Success Rate': 99.2,
        'Fee %': 2.5,
      },
      {
        'Payment Method': 'Bank Transfer',
        Volume: 28940,
        'Average Value': 1850.75,
        'Success Rate': 98.8,
        'Fee %': 0.5,
      },
      {
        'Payment Method': 'Digital Wallet',
        Volume: 33560,
        'Average Value': 156.2,
        'Success Rate': 99.5,
        'Fee %': 1.5,
      },
    ],
  },
  '8': {
    columns: [
      'Time Period',
      'AI Queries',
      'Avg Response Time (ms)',
      'Accuracy %',
      'User Satisfaction',
    ],
    rows: [
      {
        'Time Period': 'Week 1',
        'AI Queries': 2340,
        'Avg Response Time (ms)': 245,
        'Accuracy %': 94.2,
        'User Satisfaction': 4.5,
      },
      {
        'Time Period': 'Week 2',
        'AI Queries': 2890,
        'Avg Response Time (ms)': 238,
        'Accuracy %': 95.1,
        'User Satisfaction': 4.6,
      },
      {
        'Time Period': 'Week 3',
        'AI Queries': 3450,
        'Avg Response Time (ms)': 232,
        'Accuracy %': 95.8,
        'User Satisfaction': 4.7,
      },
      {
        'Time Period': 'Week 4',
        'AI Queries': 4120,
        'Avg Response Time (ms)': 228,
        'Accuracy %': 96.2,
        'User Satisfaction': 4.8,
      },
      {
        'Time Period': 'Week 5',
        'AI Queries': 3890,
        'Avg Response Time (ms)': 235,
        'Accuracy %': 95.9,
        'User Satisfaction': 4.7,
      },
    ],
    preview: [
      {
        'Time Period': 'Week 1',
        'AI Queries': 2340,
        'Avg Response Time (ms)': 245,
        'Accuracy %': 94.2,
        'User Satisfaction': 4.5,
      },
      {
        'Time Period': 'Week 2',
        'AI Queries': 2890,
        'Avg Response Time (ms)': 238,
        'Accuracy %': 95.1,
        'User Satisfaction': 4.6,
      },
      {
        'Time Period': 'Week 3',
        'AI Queries': 3450,
        'Avg Response Time (ms)': 232,
        'Accuracy %': 95.8,
        'User Satisfaction': 4.7,
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
  {
    id: '4',
    name: 'Payment_Transactions_Feb.csv',
    type: 'csv',
    category: 'Payments',
    size: '3.8 MB',
    timestamp: 'Today',
  },
  {
    id: '5',
    name: 'Content_Hub_Analytics.xlsx',
    type: 'xlsx',
    category: 'Analytics',
    size: '1.5 MB',
    timestamp: 'Yesterday',
  },
  {
    id: '6',
    name: 'Global_Compliance_Status.csv',
    type: 'csv',
    category: 'Compliance',
    size: '456 KB',
    timestamp: '2 days ago',
  },
  {
    id: '7',
    name: 'Payment_Methods_Breakdown.xlsx',
    type: 'xlsx',
    category: 'Payments',
    size: '892 KB',
    timestamp: 'Today',
  },
  {
    id: '8',
    name: 'AI_Console_Performance.csv',
    type: 'csv',
    category: 'Performance',
    size: '567 KB',
    timestamp: 'Today',
  },
];
