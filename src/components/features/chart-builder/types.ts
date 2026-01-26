import { ReactNode } from 'react';

export interface ColumnMappingComponentProps {
  columns: string[];
  mapping: ColumnMapping;
  chartType: ChartType;
  onChange: (mapping: ColumnMapping) => void;
}
import { AgChartOptions } from 'ag-charts-community';

export type ChartType =
  | 'bar'
  | 'line'
  | 'pie'
  | 'area'
  | 'scatter'
  | 'combo'
  | 'candlestick';

export type FileCategory =
  | 'Sales'
  | 'Trends'
  | 'CRM'
  | 'Financial'
  | 'Analytics'
  | 'Other';

export type AggregationType = 'sum' | 'average' | 'count' | 'min' | 'max';

export type SortOrder = 'asc' | 'desc' | 'none';

export interface DataFile {
  id: string;
  name: string;
  type: 'csv' | 'xlsx' | 'json';
  category: FileCategory;
  size: string;
  timestamp: string;
  blob?: Blob;
  rowCount?: number;
}

export interface ParsedData {
  columns: string[];
  rows: Record<string, unknown>[];
  preview: Record<string, unknown>[];
}

export interface ColumnMapping {
  xAxis: string;
  yAxis: string[];
  groupBy?: string;
  dateColumn?: string;
  openColumn?: string;
  highColumn?: string;
  lowColumn?: string;
  closeColumn?: string;
}

export interface ChartFilter {
  timePeriod: string;
  region: string;
  customDateRange?: {
    start: Date;
    end: Date;
  };
  valueRange?: {
    min: number;
    max: number;
  };
}

export interface ChartDataPoint {
  label: string;
  value: number;
  [key: string]: string | number | boolean | undefined;
}

export interface ChartSummary {
  totalVolume: number;
  avgGrowth: string;
  topRegion: string;
  dataPoints: number;
  dateRange?: string;
}

export interface ChartStyling {
  title: string;
  theme: 'ag-default' | 'ag-default-dark';
  colorPalette: string[];
  showGrid: boolean;
  showLegend: boolean;
  showTooltips: boolean;
}

export interface ExportOptions {
  format: 'png' | 'pdf' | 'svg' | 'csv' | 'xlsx';
  width?: number;
  height?: number;
  quality?: number;
  includeData?: boolean;
}

export interface ChartConfiguration {
  selectedFile: DataFile | null;
  parsedData: ParsedData | null;
  chartType: ChartType;
  columnMapping: ColumnMapping;
  filters: ChartFilter;
  styling: ChartStyling;
  aggregation: AggregationType;
  sortOrder: SortOrder;
  agChartOptions?: AgChartOptions;
}

export interface ChartTemplate {
  id: string;
  name: string;
  description: string;
  chartType: ChartType;
  previewImage?: string;
  config: Partial<ChartConfiguration>;
}

export type WizardStep = 1 | 2 | 3;

export interface ValidationResult {
  valid: boolean;
  error?: string;
  warnings?: string[];
}

export interface DataPreviewProps {
  data: ParsedData;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export interface FileCardProps {
  file: DataFile;
  isSelected: boolean;
  onSelect: (file: DataFile) => void;
}

export interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isLoading?: boolean;
}

export interface LiveChartPreviewProps {
  options: AgChartOptions | null;
  height?: number;
  isLoading?: boolean;
}

export interface StepIndicatorProps {
  currentStep: WizardStep;
}

export interface StepConfigureChartProps {
  selectedFile: DataFile;
  parsedData: ParsedData;
  chartType: ChartType;
  columnMapping: ColumnMapping;
  filters: ChartFilter;
  styling: ChartStyling;
  aggregation: AggregationType;
  sortOrder: SortOrder;
  chartOptions: AgChartOptions | null;
  onChartTypeChange: (type: ChartType) => void;
  onColumnMappingChange: (mapping: ColumnMapping) => void;
  onFilterChange: (filters: ChartFilter) => void;
  onStylingChange: (styling: ChartStyling) => void;
  onAggregationChange: (aggregation: AggregationType) => void;
  onSortOrderChange: (sortOrder: SortOrder) => void;
}

export interface StepPreviewExportProps {
  configuration: ChartConfiguration;
  chartOptions: AgChartOptions | null;
}

export interface StepSelectSourceProps {
  selectedFile: DataFile | null;
  parsedData: ParsedData | null;
  onFileSelect: (file: DataFile, parsedData: ParsedData) => void;
}

export interface ChartBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
}
