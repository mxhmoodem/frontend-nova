import { useMemo } from 'react';
import { AgCharts } from 'ag-charts-react';
import type { AgChartOptions } from 'ag-charts-community';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { MetricHistory, MetricKey } from '../../../services/api';
import { formatMetricValue } from '../utils/formatters';
import './MetricChart.css';

interface MetricChartProps {
  metricKey: MetricKey;
  history: MetricHistory;
  color: string;
}

export function MetricChart({ metricKey, history, color }: MetricChartProps) {
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

  // AG Charts options
  const chartOptions = useMemo(
    () => ({
      data: chartData,
      series: [
        {
          type: 'area' as const,
          xKey: 'date',
          yKey: 'value',
          stroke: color,
          strokeWidth: 2,
          fill: color,
          fillOpacity: 0.1,
          marker: {
            enabled: false,
          },
        },
      ],
      axes: [
        {
          type: 'category' as const,
          position: 'bottom' as const,
          label: {
            fontSize: 10,
          },
          line: {
            enabled: false,
          },
          tick: {
            enabled: false,
          },
        },
        {
          type: 'number' as const,
          position: 'left' as const,
          label: {
            enabled: false,
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
      ],
      background: {
        fill: 'transparent',
      },
      padding: {
        top: 10,
        right: 10,
        bottom: 30,
        left: 10,
      },
    }),
    [chartData, color]
  );

  if (chartData.length === 0) {
    return (
      <div className="metric-chart metric-chart--empty">
        <div className="metric-chart__header">
          <h3 className="metric-chart__title">{history.metric_name}</h3>
        </div>
        <div className="metric-chart__empty-state">No data available</div>
      </div>
    );
  }

  return (
    <div className="metric-chart" data-metric={metricKey}>
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
          options={chartOptions as unknown as AgChartOptions}
          style={{ width: '100%', height: 160 }}
        />
      </div>
    </div>
  );
}
