/**
 * Mock Chart Data Configuration
 * Provides sample chart data for visualization preview
 *
 * TODO: Replace with actual data parsed from selected file
 */

import { ChartDataPoint, ChartSummary } from '../types';

export const mockChartData: ChartDataPoint[] = [
  { label: 'Week 1', value: 15 },
  { label: 'Week 2', value: 35 },
  { label: 'Week 3', value: 25 },
  { label: 'Week 4', value: 68 },
  { label: 'Week 5', value: 22 },
  { label: 'Week 6', value: 85 },
  { label: 'Week 7', value: 48 },
  { label: 'Week 8', value: 72 },
];

export const mockChartSummary: ChartSummary = {
  dataPoints: 8,
  totalVolume: 1240,
  avgGrowth: '+12.5%',
  topRegion: 'EMEA',
};
