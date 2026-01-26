import { DataPreviewProps } from '../types';
import './components.css';

export default function DataPreview({ data }: DataPreviewProps) {
  if (data.preview.length === 0) {
    return (
      <div className="data-preview-empty">
        <p>No data to preview</p>
      </div>
    );
  }

  return (
    <div className="data-preview-container">
      <div className="data-preview-header">
        <h4>Data Preview</h4>
        <span className="data-preview-count">
          Showing {data.preview.length} of {data.rows.length} rows
        </span>
      </div>
      <div className="data-preview-scroll">
        <table className="data-preview-table">
          <thead>
            <tr>
              {data.columns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.preview.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {data.columns.map((col, colIndex) => (
                  <td key={colIndex}>{String(row[col] ?? '')}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
