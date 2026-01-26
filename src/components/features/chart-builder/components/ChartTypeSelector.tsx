import React from 'react';
import { ChartType } from '../types';
import './components.css';
import {
  MdOutlineBarChart,
  MdOutlineShowChart,
  MdOutlineAreaChart,
  MdOutlinePieChart,
  MdOutlineScatterPlot,
  MdOutlineCandlestickChart,
  MdStackedLineChart,
} from 'react-icons/md';

interface ChartTypeSelectorProps {
  selectedType: ChartType;
  onTypeChange: (type: ChartType) => void;
}

const chartTypes: {
  type: ChartType;
  label: string;
  icon: React.ReactElement;
}[] = [
  {
    type: 'bar',
    label: 'Bar',
    icon: <MdOutlineBarChart size={24} />,
  },
  {
    type: 'line',
    label: 'Line',
    icon: <MdOutlineShowChart size={24} />,
  },
  {
    type: 'area',
    label: 'Area',
    icon: <MdOutlineAreaChart size={24} />,
  },
  {
    type: 'pie',
    label: 'Pie',
    icon: <MdOutlinePieChart size={24} />,
  },
  {
    type: 'scatter',
    label: 'Scatter',
    icon: <MdOutlineScatterPlot size={24} />,
  },
  {
    type: 'combo',
    label: 'Combo',
    icon: <MdStackedLineChart size={24} />,
  },
  {
    type: 'candlestick',
    label: 'Candlestick',
    icon: <MdOutlineCandlestickChart size={24} />,
  },
];

export default function ChartTypeSelector({
  selectedType,
  onTypeChange,
}: ChartTypeSelectorProps) {
  return (
    <div className="chart-type-selector">
      <h3 className="chart-type-label">CHART TYPE</h3>
      <div className="chart-type-options">
        {chartTypes.map(({ type, label, icon }) => (
          <button
            key={type}
            className={`chart-type-option ${selectedType === type ? 'active' : ''}`}
            onClick={() => onTypeChange(type)}
          >
            {icon}
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
