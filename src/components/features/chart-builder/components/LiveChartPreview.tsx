import { useMemo } from 'react';
import { AgCharts } from 'ag-charts-react';
import { LiveChartPreviewProps } from '../types';
import * as agCharts from 'ag-charts-community';
import './components.css';

// Register all AG Charts modules we need
if (agCharts.ModuleRegistry) {
  const modules: unknown[] = [];
  const chartsWithModules = agCharts as Record<string, unknown>;

  // Register axis modules (required)
  if (chartsWithModules.NumberAxisModule)
    modules.push(chartsWithModules.NumberAxisModule);
  if (chartsWithModules.CategoryAxisModule)
    modules.push(chartsWithModules.CategoryAxisModule);
  if (chartsWithModules.LegendModule)
    modules.push(chartsWithModules.LegendModule);

  // Register series modules
  if (chartsWithModules.BarSeriesModule)
    modules.push(chartsWithModules.BarSeriesModule);
  if (chartsWithModules.LineSeriesModule)
    modules.push(chartsWithModules.LineSeriesModule);
  if (chartsWithModules.AreaSeriesModule)
    modules.push(chartsWithModules.AreaSeriesModule);
  if (chartsWithModules.PieSeriesModule)
    modules.push(chartsWithModules.PieSeriesModule);
  if (chartsWithModules.ScatterSeriesModule)
    modules.push(chartsWithModules.ScatterSeriesModule);

  if (modules.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    agCharts.ModuleRegistry.registerModules(modules as any);
  }
}

export default function LiveChartPreview({
  options,
  height = 300,
  isLoading = false,
}: LiveChartPreviewProps) {
  const chartOptions = useMemo(() => {
    if (!options) return null;
    // Add additional validation for data
    if (
      !options.data ||
      (Array.isArray(options.data) && options.data.length === 0)
    ) {
      return null;
    }

    // Wrap in try-catch to prevent crashes
    try {
      return {
        ...options,
        // AG Charts will auto-size to container
      };
    } catch (error) {
      console.error('Error creating chart options:', error);
      return null;
    }
  }, [options]);

  if (isLoading) {
    return (
      <div className="chart-preview-loading" style={{ height: `${height}px` }}>
        <div className="spinner"></div>
        <p>Generating preview...</p>
      </div>
    );
  }

  if (!chartOptions) {
    return (
      <div
        className="chart-preview-placeholder"
        style={{ height: `${height}px` }}
      >
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <rect x="12" y="20" width="10" height="24" fill="#e5e7eb" rx="2" />
          <rect x="27" y="14" width="10" height="30" fill="#e5e7eb" rx="2" />
          <rect x="42" y="8" width="10" height="36" fill="#e5e7eb" rx="2" />
        </svg>
        <p>Configure your chart to see preview</p>
      </div>
    );
  }

  return (
    <div
      className="live-chart-preview"
      style={{ height: `${height}px`, minHeight: `${height}px` }}
    >
      <AgCharts
        options={chartOptions}
        style={{ width: '100%', height: `${height}px` }}
      />
    </div>
  );
}
