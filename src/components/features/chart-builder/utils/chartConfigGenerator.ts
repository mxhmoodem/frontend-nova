/**
 * AG Charts Configuration Generator
 * Creates AG Charts options from chart configuration
 */

import {
  AgChartOptions,
  AgCartesianChartOptions,
  AgPolarChartOptions,
} from 'ag-charts-community';
import { ChartConfiguration } from '../types';

export const generateAGChartOptions = (
  config: ChartConfiguration
): AgChartOptions | null => {
  if (
    !config.parsedData ||
    !config.columnMapping.xAxis ||
    config.columnMapping.yAxis.length === 0
  ) {
    return null;
  }

  const { parsedData, columnMapping, styling, chartType } = config;

  // Apply filters and transformations to data
  const processedData = processData(parsedData.rows, config);

  // If no data after processing, return null
  if (processedData.length === 0) {
    console.warn('No data remaining after processing filters');
    return null;
  }

  const baseOptions: AgChartOptions = {
    data: processedData,
    title: styling.title ? { text: styling.title } : undefined,
    theme: styling.theme,
    legend: styling.showLegend ? { enabled: true } : { enabled: false },
  };

  switch (chartType) {
    case 'bar':
      // @ts-expect-error AG Charts axes type expects Record but array works fine
      return {
        ...baseOptions,
        series: [
          {
            type: 'bar',
            xKey: columnMapping.xAxis,
            yKey: columnMapping.yAxis[0],
            yName: columnMapping.yAxis[0],
            fill: styling.colorPalette[0] || '#dc2626',
            tooltip: {
              enabled: styling.showTooltips,
            },
          },
        ],
        axes: [
          {
            type: 'category',
            position: 'bottom',
            title: { text: columnMapping.xAxis },
          },
          {
            type: 'number',
            position: 'left',
            title: { text: columnMapping.yAxis[0] },
          },
        ],
      } as AgCartesianChartOptions;

    case 'line':
      // @ts-expect-error AG Charts axes type expects Record but array works fine
      return {
        ...baseOptions,
        series: columnMapping.yAxis.map((yKey, index) => ({
          type: 'line',
          xKey: columnMapping.xAxis,
          yKey,
          yName: yKey,
          stroke: styling.colorPalette[index] || `hsl(${index * 60}, 70%, 50%)`,
          marker: {
            enabled: true,
          },
          tooltip: {
            enabled: styling.showTooltips,
          },
        })),
        axes: [
          {
            type: 'category',
            position: 'bottom',
            title: { text: columnMapping.xAxis },
          },
          {
            type: 'number',
            position: 'left',
            title: { text: columnMapping.yAxis.join(', ') },
          },
        ],
      } as AgCartesianChartOptions;

    case 'area':
      // @ts-expect-error AG Charts axes type expects Record but array works fine
      return {
        ...baseOptions,
        series: columnMapping.yAxis.map((yKey, index) => ({
          type: 'area',
          xKey: columnMapping.xAxis,
          yKey,
          yName: yKey,
          fill: styling.colorPalette[index] || `hsl(${index * 60}, 70%, 50%)`,
          fillOpacity: 0.7,
          stroke: styling.colorPalette[index] || `hsl(${index * 60}, 70%, 50%)`,
          tooltip: {
            enabled: styling.showTooltips,
          },
        })),
        axes: [
          {
            type: 'category',
            position: 'bottom',
            title: { text: columnMapping.xAxis },
          },
          {
            type: 'number',
            position: 'left',
            title: { text: columnMapping.yAxis.join(', ') },
          },
        ],
      } as AgCartesianChartOptions;

    case 'scatter':
      // @ts-expect-error AG Charts axes type expects Record but array works fine
      return {
        ...baseOptions,
        series: [
          {
            type: 'scatter',
            xKey: columnMapping.xAxis,
            yKey: columnMapping.yAxis[0],
            yName: columnMapping.yAxis[0],
            fill: styling.colorPalette[0] || '#dc2626',
            tooltip: {
              enabled: styling.showTooltips,
            },
          },
        ],
        axes: [
          {
            type: 'number',
            position: 'bottom',
            title: { text: columnMapping.xAxis },
          },
          {
            type: 'number',
            position: 'left',
            title: { text: columnMapping.yAxis[0] },
          },
        ],
      } as AgCartesianChartOptions;

    case 'pie':
      return {
        ...baseOptions,
        series: [
          {
            type: 'pie',
            angleKey: columnMapping.yAxis[0],
            calloutLabelKey: columnMapping.xAxis,
            sectorLabelKey: columnMapping.yAxis[0],
            fills: styling.colorPalette,
            tooltip: {
              enabled: styling.showTooltips,
            },
          },
        ],
      } as AgPolarChartOptions;

    case 'combo':
      // @ts-expect-error AG Charts axes type expects Record but array works fine
      return {
        ...baseOptions,
        series: [
          {
            type: 'bar',
            xKey: columnMapping.xAxis,
            yKey: columnMapping.yAxis[0],
            yName: columnMapping.yAxis[0],
            fill: styling.colorPalette[0] || '#dc2626',
          },
          ...(columnMapping.yAxis.length > 1
            ? [
                {
                  type: 'line' as const,
                  xKey: columnMapping.xAxis,
                  yKey: columnMapping.yAxis[1],
                  yName: columnMapping.yAxis[1],
                  stroke: styling.colorPalette[1] || '#2563eb',
                },
              ]
            : []),
        ],
        axes: [
          {
            type: 'category',
            position: 'bottom',
            title: { text: columnMapping.xAxis },
          },
          {
            type: 'number',
            position: 'left',
            title: { text: columnMapping.yAxis[0] },
          },
        ],
      } as AgCartesianChartOptions;

    case 'candlestick':
      if (
        !columnMapping.openColumn ||
        !columnMapping.highColumn ||
        !columnMapping.lowColumn ||
        !columnMapping.closeColumn
      ) {
        return null;
      }
      // @ts-expect-error AG Charts axes type expects Record but array works fine
      return {
        ...baseOptions,
        series: [
          {
            type: 'candlestick',
            xKey: columnMapping.xAxis,
            openKey: columnMapping.openColumn,
            highKey: columnMapping.highColumn,
            lowKey: columnMapping.lowColumn,
            closeKey: columnMapping.closeColumn,
            tooltip: {
              enabled: styling.showTooltips,
            },
          },
        ],
        axes: [
          {
            type: 'category',
            position: 'bottom',
            title: { text: columnMapping.xAxis },
          },
          {
            type: 'number',
            position: 'left',
            title: { text: 'Price' },
          },
        ],
      } as AgCartesianChartOptions;

    default:
      return null;
  }
};

const processData = (
  data: Record<string, unknown>[],
  config: ChartConfiguration
): Record<string, unknown>[] => {
  let processed = [...data];

  // Filter out null/undefined values - be more lenient
  processed = processed.filter((row) => {
    const xValue = row[config.columnMapping.xAxis];
    // Only check if x-axis value exists
    if (xValue == null) return false;

    // Check that at least one y-axis has a valid value
    const hasValidYValue = config.columnMapping.yAxis.some(
      (yKey) => row[yKey] != null
    );
    return hasValidYValue;
  });

  // Apply value range filter if exists
  if (config.filters.valueRange && config.columnMapping.yAxis[0]) {
    const yKey = config.columnMapping.yAxis[0];
    processed = processed.filter((row) => {
      const value = row[yKey] as number;
      if (value == null) return false;
      return (
        value >= (config.filters.valueRange?.min || -Infinity) &&
        value <= (config.filters.valueRange?.max || Infinity)
      );
    });
  }

  // Apply sorting
  if (config.sortOrder !== 'none' && config.columnMapping.yAxis[0]) {
    const yKey = config.columnMapping.yAxis[0];
    processed.sort((a, b) => {
      const aVal = a[yKey] as number;
      const bVal = b[yKey] as number;
      return config.sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }

  // Apply aggregation if groupBy is specified
  if (config.columnMapping.groupBy) {
    processed = aggregateData(processed, config);
  }

  return processed;
};

const aggregateData = (
  data: Record<string, unknown>[],
  config: ChartConfiguration
): Record<string, unknown>[] => {
  const { columnMapping, aggregation } = config;
  const groupBy = columnMapping.groupBy!;
  const yKey = columnMapping.yAxis[0];

  const grouped = data.reduce(
    (acc, row) => {
      const groupValue = String(row[groupBy]);
      if (!acc[groupValue]) {
        acc[groupValue] = [];
      }
      (acc[groupValue] as number[]).push(row[yKey] as number);
      return acc;
    },
    {} as Record<string, number[]>
  );

  return Object.entries(grouped).map(([key, values]) => ({
    [columnMapping.xAxis]: key,
    [yKey]: applyAggregation(values as number[], aggregation),
  }));
};

const applyAggregation = (values: number[], type: string): number => {
  switch (type) {
    case 'sum':
      return values.reduce((a, b) => a + b, 0);
    case 'average':
      return values.reduce((a, b) => a + b, 0) / values.length;
    case 'count':
      return values.length;
    case 'min':
      return Math.min(...values);
    case 'max':
      return Math.max(...values);
    default:
      return values[0];
  }
};
