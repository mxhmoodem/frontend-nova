/**
 * Chart Configuration Validation
 */

import { ChartConfiguration, ValidationResult } from '../types';

export const validateConfiguration = (
  config: ChartConfiguration,
  step: number
): ValidationResult => {
  const warnings: string[] = [];

  // Step 1: File selection
  if (step >= 1) {
    if (!config.selectedFile) {
      return {
        valid: false,
        error: 'Please select a data file',
      };
    }

    if (!config.parsedData) {
      return {
        valid: false,
        error: 'File parsing in progress or failed',
      };
    }

    if (config.parsedData.rows.length === 0) {
      return {
        valid: false,
        error: 'Selected file contains no data',
      };
    }

    if (config.parsedData.rows.length > 10000) {
      warnings.push('Large dataset may impact performance');
    }
  }

  // Step 2: Configuration
  if (step >= 2) {
    if (!config.columnMapping.xAxis) {
      return {
        valid: false,
        error: 'Please select an X-axis column',
      };
    }

    if (config.columnMapping.yAxis.length === 0) {
      return {
        valid: false,
        error: 'Please select at least one Y-axis column',
      };
    }

    // Validate candlestick specific requirements
    if (config.chartType === 'candlestick') {
      if (
        !config.columnMapping.openColumn ||
        !config.columnMapping.highColumn ||
        !config.columnMapping.lowColumn ||
        !config.columnMapping.closeColumn
      ) {
        return {
          valid: false,
          error:
            'Candlestick charts require Open, High, Low, and Close columns',
        };
      }
    }

    // Validate combo chart requirements
    if (config.chartType === 'combo' && config.columnMapping.yAxis.length < 2) {
      warnings.push('Combo charts work best with 2 Y-axis columns');
    }

    // Check for data quality
    const hasNullValues = config.parsedData!.rows.some((row) => {
      const xValue = row[config.columnMapping.xAxis];
      const yValues = config.columnMapping.yAxis.map((yKey) => row[yKey]);
      return xValue == null || yValues.some((val) => val == null);
    });

    if (hasNullValues) {
      warnings.push(
        'Some data points contain missing values and will be filtered out'
      );
    }
  }

  // Step 3: Preview
  if (step >= 3) {
    if (!config.styling.title) {
      warnings.push('Consider adding a title to your chart');
    }
  }

  return {
    valid: true,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
};

export const getDataSummary = (
  data: Record<string, unknown>[],
  config: ChartConfiguration
) => {
  if (!config.columnMapping.yAxis[0]) return null;

  const yKey = config.columnMapping.yAxis[0];
  const values = data
    .map((row) => row[yKey] as number)
    .filter((val) => typeof val === 'number' && !isNaN(val));

  if (values.length === 0) return null;

  const sum = values.reduce((a, b) => a + b, 0);
  const avg = sum / values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);

  return {
    count: values.length,
    sum,
    average: avg,
    min,
    max,
  };
};
