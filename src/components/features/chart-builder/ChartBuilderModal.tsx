import { useState, useMemo } from 'react';
import { Modal } from '../../common/Modal/Modal';
import { Button } from '../../common';
import StepSelectSource from './steps/StepSelectSource';
import StepConfigureChart from './steps/StepConfigureChart';
import StepPreviewExport from './steps/StepPreviewExport';
import StepIndicator from './components/StepIndicator';
import {
  ChartConfiguration,
  WizardStep,
  DataFile,
  ChartType,
  ChartFilter,
  ParsedData,
  ColumnMapping,
  ChartStyling,
  AggregationType,
  SortOrder,
} from './types';
import { generateAGChartOptions } from './utils/chartConfigGenerator';
import { validateConfiguration } from './utils/validation';
import './ChartBuilderModal.css';
import { ChartBuilderModalProps } from './types';

export default function ChartBuilderModal({
  isOpen,
  onClose,
}: ChartBuilderModalProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [configuration, setConfiguration] = useState<ChartConfiguration>({
    selectedFile: null,
    parsedData: null,
    chartType: 'bar',
    columnMapping: {
      xAxis: '',
      yAxis: [],
    },
    filters: {
      timePeriod: 'Last 30 Days',
      region: 'All Regions',
    },
    styling: {
      title: '',
      theme: 'ag-default',
      colorPalette: ['#dc2626', '#2563eb', '#059669', '#d97706', '#7c3aed'],
      showGrid: true,
      showLegend: true,
      showTooltips: true,
    },
    aggregation: 'sum',
    sortOrder: 'none',
  });

  // Generate AG Chart options whenever configuration changes
  const chartOptions = useMemo(() => {
    return generateAGChartOptions(configuration);
  }, [configuration]);

  // Validate configuration
  const validation = useMemo(() => {
    return validateConfiguration(configuration, currentStep);
  }, [configuration, currentStep]);

  const validationError = validation.valid ? null : validation.error || null;
  const validationWarnings = validation.warnings || [];

  if (!isOpen) return null;

  const handleFileSelect = (file: DataFile, parsedData: ParsedData) => {
    setConfiguration((prev) => ({
      ...prev,
      selectedFile: file,
      parsedData,
      styling: {
        ...prev.styling,
        title: file.name.replace(/\.[^/.]+$/, ''), // Remove file extension
      },
    }));
  };

  const handleChartTypeChange = (chartType: ChartType) => {
    setConfiguration((prev) => {
      // Reset column mapping when changing chart type
      const newMapping: ColumnMapping = {
        xAxis: prev.columnMapping.xAxis,
        yAxis:
          chartType === 'combo' || chartType === 'line' || chartType === 'area'
            ? prev.columnMapping.yAxis
            : prev.columnMapping.yAxis.slice(0, 1),
      };

      return { ...prev, chartType, columnMapping: newMapping };
    });
  };

  const handleColumnMappingChange = (columnMapping: ColumnMapping) => {
    setConfiguration((prev) => ({ ...prev, columnMapping }));
  };

  const handleFilterChange = (filters: ChartFilter) => {
    setConfiguration((prev) => ({ ...prev, filters }));
  };

  const handleStylingChange = (styling: ChartStyling) => {
    setConfiguration((prev) => ({ ...prev, styling }));
  };

  const handleAggregationChange = (aggregation: AggregationType) => {
    setConfiguration((prev) => ({ ...prev, aggregation }));
  };

  const handleSortOrderChange = (sortOrder: SortOrder) => {
    setConfiguration((prev) => ({ ...prev, sortOrder }));
  };

  const handleNext = () => {
    if (currentStep < 3 && canProceed()) {
      setCurrentStep((currentStep + 1) as WizardStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as WizardStep);
    }
  };

  const handleDone = () => {
    // TODO: Save chart configuration to Content Hub
    onClose();
    // Reset state
    setCurrentStep(1);
    setConfiguration({
      selectedFile: null,
      parsedData: null,
      chartType: 'bar',
      columnMapping: {
        xAxis: '',
        yAxis: [],
      },
      filters: {
        timePeriod: 'Last 30 Days',
        region: 'All Regions',
      },
      styling: {
        title: '',
        theme: 'ag-default',
        colorPalette: ['#dc2626', '#2563eb', '#059669', '#d97706', '#7c3aed'],
        showGrid: true,
        showLegend: true,
        showTooltips: true,
      },
      aggregation: 'sum',
      sortOrder: 'none',
    });
  };

  const canProceed = () => {
    return !validationError;
  };

  // Footer with navigation buttons
  const footerContent = (
    <div className="chart-builder-navigation">
      {currentStep > 1 && (
        <Button variant="secondary" text="Back" onClick={handleBack} />
      )}
      <div className="chart-builder-nav-spacer" />
      {currentStep < 3 ? (
        <Button
          variant="primary"
          text="Next Step"
          onClick={handleNext}
          disabled={!canProceed()}
        />
      ) : (
        <Button variant="primary" text="Done" onClick={handleDone} />
      )}
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Chart Builder"
      subtitle="Turn raw data into visual insights"
      size="xlarge"
      className="chart-builder-modal"
      footer={footerContent}
    >
      {/* Step Indicator */}
      <StepIndicator currentStep={currentStep} />

      {/* Validation Warnings */}
      {validationWarnings.length > 0 && (
        <div className="chart-builder-warnings">
          {validationWarnings.map((warning, index) => (
            <div key={index} className="warning-message">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1L1 14h14L8 1z"
                  stroke="#d97706"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M8 6v3M8 11.5v.5"
                  stroke="#d97706"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              {warning}
            </div>
          ))}
        </div>
      )}

      {/* Step Content */}
      <div className="chart-builder-content">
        {currentStep === 1 && (
          <StepSelectSource
            selectedFile={configuration.selectedFile}
            parsedData={configuration.parsedData}
            onFileSelect={handleFileSelect}
          />
        )}
        {currentStep === 2 &&
          configuration.selectedFile &&
          configuration.parsedData && (
            <StepConfigureChart
              selectedFile={configuration.selectedFile}
              parsedData={configuration.parsedData}
              chartType={configuration.chartType}
              columnMapping={configuration.columnMapping}
              filters={configuration.filters}
              styling={configuration.styling}
              aggregation={configuration.aggregation}
              sortOrder={configuration.sortOrder}
              chartOptions={chartOptions}
              onChartTypeChange={handleChartTypeChange}
              onColumnMappingChange={handleColumnMappingChange}
              onFilterChange={handleFilterChange}
              onStylingChange={handleStylingChange}
              onAggregationChange={handleAggregationChange}
              onSortOrderChange={handleSortOrderChange}
            />
          )}
        {currentStep === 3 && configuration.selectedFile && (
          <StepPreviewExport
            configuration={configuration}
            chartOptions={chartOptions}
          />
        )}
      </div>
    </Modal>
  );
}
