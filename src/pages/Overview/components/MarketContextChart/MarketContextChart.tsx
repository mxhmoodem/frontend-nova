import { useMemo } from 'react';
import { AgCharts } from 'ag-charts-react';
import type { AgChartOptions } from 'ag-charts-community';
import type { HistoryResponse } from '../../../../services/api';
import './MarketContextChart.css';

interface MarketContextChartProps {
  historyData?: HistoryResponse | null;
  isLoading?: boolean;
}

/** Fallback mock data when API is unavailable */
const MOCK_MONTHS = [
  { month: 'Mar', value: 1.38 },
  { month: 'Apr', value: 1.41 },
  { month: 'May', value: 1.39 },
  { month: 'Jun', value: 1.44 },
  { month: 'Jul', value: 1.47 },
  { month: 'Aug', value: 1.45 },
  { month: 'Sep', value: 1.5 },
  { month: 'Oct', value: 1.49 },
  { month: 'Nov', value: 1.53 },
  { month: 'Dec', value: 1.56 },
  { month: 'Jan', value: 1.59 },
  { month: 'Feb', value: 1.62 },
];

export function MarketContextChart({
  historyData,
  isLoading,
}: MarketContextChartProps) {
  const chartData = useMemo(() => {
    const series = historyData?.total_consumer_credit;
    if (!series?.data || series.data.length === 0) return MOCK_MONTHS;

    return series.data.slice(-12).map((pt) => ({
      month: new Date(pt.date).toLocaleDateString('en-GB', {
        month: 'short',
      }),
      value: pt.value,
    }));
  }, [historyData]);

  const lastValue = chartData[chartData.length - 1]?.value;
  const firstValue = chartData[0]?.value;
  const overallChange =
    firstValue && lastValue
      ? (((lastValue - firstValue) / firstValue) * 100).toFixed(1)
      : null;

  const isPositive = overallChange ? parseFloat(overallChange) >= 0 : true;

  const seriesData = useMemo(() => {
    const credit = historyData?.total_consumer_credit?.data?.slice(-12) ?? [];
    const mortgage =
      historyData?.gross_mortgage_advances?.data?.slice(-12) ?? [];

    if (credit.length === 0) {
      return MOCK_MONTHS.map((d) => ({ ...d, type: 'Credit' }));
    }

    const combined = credit
      .map((pt, i) => {
        const month = new Date(pt.date).toLocaleDateString('en-GB', {
          month: 'short',
        });
        return [
          { month, value: pt.value, type: 'Credit' },
          { month, value: mortgage[i]?.value ?? 0, type: 'Mortgage' },
        ];
      })
      .flat();

    return combined;
  }, [historyData]);

  // Mark the last bar as highlighted
  const dataWithHighlight = chartData.map((d, i) => ({
    ...d,
    highlight: i === chartData.length - 1,
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: any = {
    data: seriesData.length > 0 ? seriesData : dataWithHighlight,
    series: [
      {
        type: 'bar',
        xKey: 'month',
        yKey: 'value',
        yName: 'Consumer Credit',
        cornerRadius: 3,
        grouped: true,
        itemStyler: (params: { datum: { type: string } }) => ({
          fill: params.datum.type === 'Credit' ? '#3B82F6' : '#A5B4FC',
          strokeWidth: 0,
        }),
      },
      {
        type: 'bar',
        xKey: 'month',
        yKey: 'value',
        yName: 'Mortgage Advances',
        cornerRadius: 3,
        itemStyler: (params: { datum: { type: string } }) => ({
          fill: params.datum.type === 'Mortgage' ? '#A5B4FC' : 'transparent',
          strokeWidth: 0,
        }),
      },
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
        label: {
          fontSize: 10,
          color: 'var(--color-muted-foreground, #94A3B8)',
          fontFamily: 'inherit',
        },
        line: { enabled: false },
        tick: { enabled: false },
      },
      {
        type: 'number',
        position: 'left',
        label: { enabled: false },
        line: { enabled: false },
        tick: { enabled: false },
        gridLine: {
          style: [{ stroke: '#E5E7EB', lineDash: [3, 3] }],
        },
      },
    ],
    background: { fill: 'transparent' },
    padding: { top: 8, right: 4, bottom: 4, left: 4 },
    legend: {
      enabled: true,
      position: 'bottom',
      item: {
        label: {
          color: 'var(--color-muted-foreground)',
          fontSize: 10,
        },
        marker: {
          shape: 'square',
          size: 8,
        },
      },
    },
  };

  if (isLoading) {
    return (
      <div className="market-context-chart market-context-chart--loading">
        <div className="market-context-chart__skeleton-title" />
        <div className="market-context-chart__skeleton-chart" />
      </div>
    );
  }

  return (
    <div className="market-context-chart">
      <div className="market-context-chart__header">
        <div>
          <h3 className="market-context-chart__title">Market Context</h3>
          <p className="market-context-chart__subtitle">
            Credit vs. Mortgage Advances (12m)
          </p>
        </div>
        {overallChange && (
          <span
            className={`market-context-chart__change market-context-chart__change--${isPositive ? 'up' : 'down'}`}
          >
            {isPositive ? '+' : ''}
            {overallChange}% YTD
          </span>
        )}
      </div>

      <div className="market-context-chart__chart">
        <AgCharts
          options={options as unknown as AgChartOptions}
          style={{ width: '100%', height: 180 }}
        />
      </div>

      <div className="market-context-chart__insights">
        <div className="market-context-chart__insight">
          <span className="market-context-chart__insight-label">Peak</span>
          <span className="market-context-chart__insight-value">
            £{Math.max(...chartData.map((d) => d.value)).toFixed(2)}T
          </span>
        </div>
        <div className="market-context-chart__insight">
          <span className="market-context-chart__insight-label">Avg</span>
          <span className="market-context-chart__insight-value">
            £
            {(
              chartData.reduce((sum, d) => sum + d.value, 0) / chartData.length
            ).toFixed(2)}
            T
          </span>
        </div>
        <div className="market-context-chart__insight">
          <span className="market-context-chart__insight-label">Current</span>
          <span className="market-context-chart__insight-value">
            £{lastValue?.toFixed(2)}T
          </span>
        </div>
      </div>

      <div className="market-context-chart__footnotes">
        <span className="market-context-chart__footnote">
          Source: Bank of England
        </span>
        <span className="market-context-chart__footnote">12-month rolling</span>
      </div>
    </div>
  );
}
