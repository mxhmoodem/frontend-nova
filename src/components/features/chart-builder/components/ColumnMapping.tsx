import React from 'react';
import { ColumnMappingComponentProps } from '../types';

export default function ColumnMappingComponent({
  columns,
  mapping,
  onChange,
}: ColumnMappingComponentProps) {
  // Handle changes for each mapping field
  const handleXAxisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...mapping, xAxis: e.target.value });
  };

  const handleYAxisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...mapping, yAxis: [e.target.value] });
  };

  const handleGroupByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...mapping, groupBy: e.target.value || undefined });
  };

  return (
    <div className="column-mapping-component">
      <h3>Column Mapping</h3>
      <div className="mapping-group">
        <label>X Axis</label>
        <select
          value={mapping.xAxis}
          onChange={handleXAxisChange}
          className="mapping-select"
        >
          <option value="">Select column</option>
          {columns.map((col) => (
            <option key={col} value={col}>
              {col}
            </option>
          ))}
        </select>
      </div>
      <div className="mapping-group">
        <label>Y Axis</label>
        <select
          value={mapping.yAxis[0] || ''}
          onChange={handleYAxisChange}
          className="mapping-select"
        >
          <option value="">Select column</option>
          {columns.map((col) => (
            <option key={col} value={col}>
              {col}
            </option>
          ))}
        </select>
      </div>
      <div className="mapping-group">
        <label>Group By (optional)</label>
        <select
          value={mapping.groupBy || ''}
          onChange={handleGroupByChange}
          className="mapping-select"
        >
          <option value="">None</option>
          {columns.map((col) => (
            <option key={col} value={col}>
              {col}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
