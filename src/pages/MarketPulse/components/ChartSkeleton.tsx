import './ChartSkeleton.css';

export function ChartSkeleton() {
  return (
    <div className="chart-skeleton">
      <div className="chart-skeleton__header">
        <div>
          <div className="chart-skeleton__title" />
          <div className="chart-skeleton__value" />
        </div>
        <div className="chart-skeleton__badge" />
      </div>
      <div className="chart-skeleton__chart" />
    </div>
  );
}
