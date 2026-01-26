import { useState } from 'react';
import LiveChartPreview from '../components/LiveChartPreview';
import { getDataSummary } from '../utils/validation';
import {
  exportChartAsPNG,
  exportChartAsPDF,
  exportChartAsSVG,
  exportDataAsCSV,
  exportDataAsExcel,
  copyChartToClipboard,
} from '../utils/exportUtils';
import './steps.css';
import { StepPreviewExportProps } from '../types';

export default function StepPreviewExport({
  configuration,
  chartOptions,
}: StepPreviewExportProps) {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [exportType, setExportType] = useState<'chart' | 'data'>('chart');

  const { selectedFile, parsedData, styling } = configuration;

  const summary = parsedData
    ? getDataSummary(parsedData.rows, configuration)
    : null;

  const handleExport = async (
    format: 'png' | 'pdf' | 'svg' | 'csv' | 'xlsx'
  ) => {
    if (!chartOptions || !selectedFile) return;

    const filename = `${styling.title || selectedFile.name}-${Date.now()}`;

    try {
      switch (format) {
        case 'png':
          await exportChartAsPNG(chartOptions, `${filename}.png`);
          break;
        case 'pdf':
          await exportChartAsPDF(chartOptions, `${filename}.pdf`);
          break;
        case 'svg':
          await exportChartAsSVG(chartOptions, `${filename}.svg`);
          break;
        case 'csv':
          exportDataAsCSV(configuration, `${filename}.csv`);
          break;
        case 'xlsx':
          exportDataAsExcel(configuration, `${filename}.xlsx`);
          break;
      }
    } catch (error) {
      console.error('Export failed:', error);
    }

    setShowExportMenu(false);
  };

  const handleCopy = async () => {
    await copyChartToClipboard();
  };

  const handleSaveToContentHub = () => {
    // TODO: Implement save to Content Hub API call
    console.log('Save to Content Hub', configuration);
    alert('Chart configuration will be saved to Content Hub!');
  };

  if (!selectedFile || !parsedData) {
    return <div>Error: No data available</div>;
  }

  return (
    <div className="step-container">
      <div className="step-header-with-actions">
        <div>
          <h2 className="step-title">{styling.title || selectedFile.name}</h2>
          <p className="step-meta">
            {parsedData.rows.length} data points • {configuration.chartType}{' '}
            chart
          </p>
        </div>
        <div className="step-actions">
          <button className="action-btn-secondary" onClick={handleCopy}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect
                x="5"
                y="5"
                width="9"
                height="9"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M3 11V3C3 2.44772 3.44772 2 4 2H10"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            Copy
          </button>

          <div className="export-dropdown">
            <button
              className="action-btn-primary"
              onClick={() => setShowExportMenu(!showExportMenu)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 2V10M8 10L11 7M8 10L5 7"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V12"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              Export
            </button>
            {showExportMenu && (
              <div className="export-menu">
                <div className="export-menu-section">
                  <div className="export-menu-header">
                    <button
                      className={`export-type-tab ${exportType === 'chart' ? 'active' : ''}`}
                      onClick={() => setExportType('chart')}
                    >
                      Chart
                    </button>
                    <button
                      className={`export-type-tab ${exportType === 'data' ? 'active' : ''}`}
                      onClick={() => setExportType('data')}
                    >
                      Data
                    </button>
                  </div>

                  {exportType === 'chart' ? (
                    <>
                      <button
                        className="export-menu-item"
                        onClick={() => handleExport('png')}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <rect
                            x="2"
                            y="2"
                            width="12"
                            height="12"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <circle
                            cx="5.5"
                            cy="5.5"
                            r="1.5"
                            fill="currentColor"
                          />
                        </svg>
                        Export as PNG
                      </button>
                      <button
                        className="export-menu-item"
                        onClick={() => handleExport('pdf')}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M4 2H10L14 6V13C14 13.5523 13.5523 14 13 14H4C3.44772 14 3 13.5523 3 13V3C3 2.44772 3.44772 2 4 2Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </svg>
                        Export as PDF
                      </button>
                      <button
                        className="export-menu-item"
                        onClick={() => handleExport('svg')}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M2 8L8 2L14 8M8 2V14"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                        Export as SVG
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="export-menu-item"
                        onClick={() => handleExport('csv')}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <rect
                            x="3"
                            y="2"
                            width="10"
                            height="12"
                            rx="1"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M6 6H10M6 9H10"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </svg>
                        Export as CSV
                      </button>
                      <button
                        className="export-menu-item"
                        onClick={() => handleExport('xlsx')}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <rect
                            x="3"
                            y="2"
                            width="10"
                            height="12"
                            rx="1"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M6 2V14M10 2V14M3 6H13M3 10H13"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </svg>
                        Export as Excel
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="step-content">
        {/* Chart Preview */}
        <div className="final-preview">
          <LiveChartPreview options={chartOptions} />
        </div>

        {/* Summary Cards */}
        {summary && (
          <div className="summary-cards">
            <div className="summary-card">
              <div className="summary-label">DATA POINTS</div>
              <div className="summary-value">{summary.count}</div>
            </div>
            <div className="summary-card">
              <div className="summary-label">AVERAGE</div>
              <div className="summary-value">{summary.average.toFixed(2)}</div>
            </div>
            <div className="summary-card">
              <div className="summary-label">RANGE</div>
              <div className="summary-value">
                {summary.min.toFixed(0)} - {summary.max.toFixed(0)}
              </div>
            </div>
            <div className="summary-card summary-card-action">
              <button
                className="view-full-report-btn"
                onClick={handleSaveToContentHub}
              >
                Save to Hub
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6 4L10 8L6 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
