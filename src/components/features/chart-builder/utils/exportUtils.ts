/**
 * Export Utilities
 * Handles chart export functionality
 */

import { AgChartOptions } from 'ag-charts-community';
import { ChartConfiguration } from '../types';
import * as XLSX from 'xlsx';

export const exportChartAsPNG = async (
  _chartOptions: AgChartOptions,
  filename: string
): Promise<void> => {
  // Note: AG Charts provides export functionality through their API
  // This would need to be implemented using the chart instance ref
  console.log('Export as PNG:', filename);
  alert(
    'PNG export functionality requires chart instance reference. Feature coming soon!'
  );
};

export const exportChartAsPDF = async (
  _chartOptions: AgChartOptions,
  filename: string
): Promise<void> => {
  console.log('Export as PDF:', filename);
  alert(
    'PDF export functionality requires chart instance reference. Feature coming soon!'
  );
};

export const exportChartAsSVG = async (
  _chartOptions: AgChartOptions,
  filename: string
): Promise<void> => {
  console.log('Export as SVG:', filename);
  alert(
    'SVG export functionality requires chart instance reference. Feature coming soon!'
  );
};

export const exportDataAsCSV = (
  config: ChartConfiguration,
  filename: string
): void => {
  if (!config.parsedData) return;

  const csvContent = convertToCSV(
    config.parsedData.rows,
    config.parsedData.columns
  );
  downloadFile(csvContent, filename, 'text/csv');
};

export const exportDataAsExcel = (
  config: ChartConfiguration,
  filename: string
): void => {
  if (!config.parsedData) return;

  const worksheet = XLSX.utils.json_to_sheet(config.parsedData.rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

  XLSX.writeFile(workbook, filename);
};

export const copyChartToClipboard = async (): Promise<void> => {
  // This would require accessing the chart canvas and converting to blob
  console.log('Copy to clipboard');
  alert(
    'Copy to clipboard requires chart instance reference. Feature coming soon!'
  );
};

// Helper functions
const convertToCSV = (
  data: Record<string, unknown>[],
  columns: string[]
): string => {
  const header = columns.join(',');
  const rows = data.map((row) =>
    columns
      .map((col) => {
        const value = row[col];
        // Handle values with commas or quotes
        if (
          typeof value === 'string' &&
          (value.includes(',') || value.includes('"'))
        ) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value ?? '';
      })
      .join(',')
  );

  return [header, ...rows].join('\n');
};

const downloadFile = (
  content: string,
  filename: string,
  mimeType: string
): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
