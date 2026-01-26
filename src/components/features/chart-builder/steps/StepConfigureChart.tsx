import ChartTypeSelector from '../components/ChartTypeSelector';
import ColumnMappingComponent from '../components/ColumnMapping';
import LiveChartPreview from '../components/LiveChartPreview';
import ErrorBoundary from '../components/ErrorBoundary';
import { AggregationType, SortOrder } from '../types';
import './steps.css';
import { StepConfigureChartProps } from '../types';

export default function StepConfigureChart({
  parsedData,
  chartType,
  columnMapping,
  styling,
  aggregation,
  sortOrder,
  chartOptions,
  onChartTypeChange,
  onColumnMappingChange,
  onStylingChange,
  onAggregationChange,
  onSortOrderChange,
}: StepConfigureChartProps) {
  return (
    <div className="step-container">
      <div className="step-header">
        <h2 className="step-title">Configure Visualization</h2>
        <p className="step-description">
          Customize your chart type, data mapping, and appearance
        </p>
      </div>

      <div className="step-content-split">
        {/* Chart Type - Horizontal Row at Top */}
        <ChartTypeSelector
          selectedType={chartType}
          onTypeChange={onChartTypeChange}
        />

        {/* Configuration and Preview - Side by Side */}
        <div className="step-content-row">
          {/* Left Side - Configuration */}
          <div className="configuration-panel">
            {/* Column Mapping */}
            <ColumnMappingComponent
              columns={parsedData.columns}
              mapping={columnMapping}
              chartType={chartType}
              onChange={onColumnMappingChange}
            />

            {/* Chart Styling */}
            <div className="chart-styling">
              <h3 className="styling-label">CHART STYLING</h3>

              {/* Title */}
              <div className="styling-group">
                <label className="styling-label-small">Chart Title</label>
                <input
                  type="text"
                  className="styling-input"
                  placeholder="Enter chart title..."
                  value={styling.title}
                  onChange={(e) =>
                    onStylingChange({ ...styling, title: e.target.value })
                  }
                />
              </div>

              {/* Theme */}
              <div className="styling-group">
                <label className="styling-label-small">Theme</label>
                <select
                  className="styling-select"
                  value={styling.theme}
                  onChange={(e) =>
                    onStylingChange({
                      ...styling,
                      theme: e.target.value as 'ag-default' | 'ag-default-dark',
                    })
                  }
                >
                  <option value="ag-default">Default</option>
                  <option value="ag-default-dark">Default Dark</option>
                </select>
              </div>

              {/* Toggles */}
              <div className="styling-toggles">
                <label className="styling-toggle-label">
                  <input
                    type="checkbox"
                    checked={styling.showGrid}
                    onChange={(e) =>
                      onStylingChange({
                        ...styling,
                        showGrid: e.target.checked,
                      })
                    }
                  />
                  <span>Show Grid Lines</span>
                </label>
                <label className="styling-toggle-label">
                  <input
                    type="checkbox"
                    checked={styling.showLegend}
                    onChange={(e) =>
                      onStylingChange({
                        ...styling,
                        showLegend: e.target.checked,
                      })
                    }
                  />
                  <span>Show Legend</span>
                </label>
                <label className="styling-toggle-label">
                  <input
                    type="checkbox"
                    checked={styling.showTooltips}
                    onChange={(e) =>
                      onStylingChange({
                        ...styling,
                        showTooltips: e.target.checked,
                      })
                    }
                  />
                  <span>Show Tooltips</span>
                </label>
              </div>
            </div>

            {/* Data Options */}
            <div className="data-options">
              <h3 className="options-label">DATA OPTIONS</h3>

              {/* Aggregation */}
              {columnMapping.groupBy && (
                <div className="options-group">
                  <label className="options-label-small">Aggregation</label>
                  <select
                    className="options-select"
                    value={aggregation}
                    onChange={(e) =>
                      onAggregationChange(e.target.value as AggregationType)
                    }
                  >
                    <option value="sum">Sum</option>
                    <option value="average">Average</option>
                    <option value="count">Count</option>
                    <option value="min">Minimum</option>
                    <option value="max">Maximum</option>
                  </select>
                </div>
              )}

              {/* Sort Order */}
              <div className="options-group">
                <label className="options-label-small">Sort Order</label>
                <select
                  className="options-select"
                  value={sortOrder}
                  onChange={(e) =>
                    onSortOrderChange(e.target.value as SortOrder)
                  }
                >
                  <option value="none">None</option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Side - Live Preview */}
          <div className="preview-panel">
            <div className="preview-header">
              <h3 className="preview-label">LIVE PREVIEW</h3>
            </div>
            <div className="preview-content">
              <ErrorBoundary>
                <LiveChartPreview
                  options={chartOptions}
                  height={400}
                  isLoading={false}
                />
              </ErrorBoundary>
            </div>
            <p className="preview-caption">
              Updates automatically as you configure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
