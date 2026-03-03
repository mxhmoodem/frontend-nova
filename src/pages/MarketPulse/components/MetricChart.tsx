import { useMemo } from 'react';
import { AgCharts } from 'ag-charts-react';
import type { AgCartesianChartOptions } from 'ag-charts-community';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { MetricHistory, MetricKey } from '../../../services/api';
import { formatMetricValue } from '../utils/formatters';
import './MetricChart.css';

interface MetricChartProps {
  metricKey: MetricKey;
  history: MetricHistory;
  color: string;
  size?: 'default' | 'large';
}

export function MetricChart({
  metricKey,
  history,
  color,
  size = 'default',
}: MetricChartProps) {
  // Transform data for chart display
  const chartData = useMemo(() => {
    if (!history.data || history.data.length === 0) return [];
    return history.data.map((d) => ({
      date: new Date(d.date).toLocaleDateString('en-GB', {
        month: 'short',
        year: '2-digit',
      }),
      value: d.value,
      rawDate: d.date,
    }));
  }, [history.data]);

  // Calculate change percentage
  const { latestValue, change, isPositive } = useMemo(() => {
    if (chartData.length === 0) {
      return { latestValue: 0, change: '0', isPositive: true };
    }

    const latest = chartData[chartData.length - 1];
    const previous =
      chartData.length > 1 ? chartData[chartData.length - 2] : null;

    let changeValue = '0';
    let positive = true;

    if (previous && previous.value !== 0) {
      const diff = ((latest.value - previous.value) / previous.value) * 100;
      changeValue = Math.abs(diff).toFixed(1);
      positive = diff >= 0;
    }

    return {
      latestValue: latest.value,
      change: changeValue,
      isPositive: positive,
    };
  }, [chartData]);

  const isLarge = size === 'large';

  // AG Charts options
  const chartOptions = useMemo<AgCartesianChartOptions>(
    () => ({
      data: chartData,
      series: [
        {
          type: 'area',
          xKey: 'date',
          yKey: 'value',
          stroke: color,
          strokeWidth: isLarge ? 2.5 : 2,
          fill: color,
          fillOpacity: isLarge ? 0.15 : 0.1,
          marker: {
            enabled: false,
          },
          tooltip: {
            enabled: true,
          },
        },
      ],
      axes: {
        x: {
          type: 'category',
          position: 'bottom',
          label: {
            fontSize: isLarge ? 11 : 10,
          },
          line: {
            enabled: false,
          },
          tick: {
            enabled: false,
          },
        },
        y: {
          type: 'number',
          position: 'left',
          label: {
            enabled: isLarge,
            fontSize: 10,
            formatter: (params: { value: number }) =>
              formatMetricValue(params.value, history.unit),
          },
          line: {
            enabled: false,
          },
          tick: {
            enabled: false,
          },
          gridLine: {
            style: [
              {
                stroke: '#e5e7eb',
                lineDash: [4, 4],
              },
            ],
          },
        },
      },
      background: {
        fill: 'transparent',
      },
      padding: {
        top: isLarge ? 16 : 10,
        right: isLarge ? 16 : 10,
        bottom: isLarge ? 36 : 30,
        left: isLarge ? 60 : 10,
      },
    }),
    [chartData, color, isLarge, history.unit]
  );

  const chartClassName = ['metric-chart', isLarge && 'metric-chart--large']
    .filter(Boolean)
    .join(' ');

  if (chartData.length === 0) {
    return (
      <div className={`${chartClassName} metric-chart--empty`}>
        <div className="metric-chart__header">
          <h3 className="metric-chart__title">{history.metric_name}</h3>
        </div>
        <div className="metric-chart__empty-state">No data available</div>
      </div>
    );
  }

  return (
    <div className={chartClassName} data-metric={metricKey}>
      <div className="metric-chart__header">
        <div className="metric-chart__title-section">
          <h3 className="metric-chart__title">{history.metric_name}</h3>
          <p className="metric-chart__value">
            {formatMetricValue(latestValue, history.unit)}
          </p>
        </div>
        <span
          className={`metric-chart__change ${
            isPositive
              ? 'metric-chart__change--up'
              : 'metric-chart__change--down'
          }`}
        >
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {change}%
        </span>
      </div>

      <div className="metric-chart__chart-container">
        <AgCharts
          options={chartOptions}
          style={{ width: '100%', height: isLarge ? 320 : 160 }}
        />
      </div>
    </div>
  );
}
