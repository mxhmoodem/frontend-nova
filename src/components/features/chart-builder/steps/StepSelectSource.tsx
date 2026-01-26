import { useState } from 'react';
import FileCard from '../components/FileCard';
import FileUpload from '../components/FileUpload';
import DataPreview from '../components/DataPreview';
import { mockFiles, mockParsedData } from '../config/mockFiles.config';
import { DataFile } from '../types';
import { parseFile, formatFileSize, validateFile } from '../utils/fileParser';
import './steps.css';
import { StepSelectSourceProps } from '../types';

export default function StepSelectSource({
  selectedFile,
  parsedData,
  onFileSelect,
}: StepSelectSourceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  const handleFileUpload = async (file: File) => {
    setError(null);

    const validation = validateFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    setIsUploading(true);

    try {
      const parsed = await parseFile(file);

      const dataFile: DataFile = {
        id: `upload-${Date.now()}`,
        name: file.name,
        type: file.name.endsWith('.csv')
          ? 'csv'
          : file.name.endsWith('.json')
            ? 'json'
            : 'xlsx',
        category: 'Other',
        size: formatFileSize(file.size),
        timestamp: 'Just now',
        blob: file,
        rowCount: parsed.rows.length,
      };

      onFileSelect(dataFile, parsed);
      setShowUpload(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to parse file');
      } else {
        setError('Failed to parse file');
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleMockFileSelect = async (file: DataFile) => {
    // Get the mock parsed data for this file
    const parsed = mockParsedData[file.id];
    if (parsed) {
      onFileSelect(file, parsed);
    } else {
      setError('Mock data not available for this file');
    }
  };

  const filteredFiles = mockFiles.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="step-container">
      <div className="step-header">
        <h2 className="step-title">Select Data Source</h2>
        <p className="step-description">
          Upload a new file or choose from existing datasets
        </p>
      </div>

      <div className="step-content">
        {/* Toggle between upload and existing files */}
        <div className="source-selector-tabs">
          <button
            className={`source-tab ${showUpload ? 'active' : ''}`}
            onClick={() => setShowUpload(true)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 2V10M8 2L5 5M8 2L11 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M2 10V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Upload New File
          </button>
          <button
            className={`source-tab ${!showUpload ? 'active' : ''}`}
            onClick={() => setShowUpload(false)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect
                x="3"
                y="3"
                width="10"
                height="10"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            Existing Files
          </button>
        </div>

        {error && (
          <div className="error-message">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="#dc2626" strokeWidth="1.5" />
              <path
                d="M8 4V8M8 11V11.5"
                stroke="#dc2626"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            {error}
          </div>
        )}

        {showUpload ? (
          <FileUpload onFileSelect={handleFileUpload} isLoading={isUploading} />
        ) : (
          <>
            {/* Search Input */}
            <div className="search-input-wrapper">
              <svg
                className="search-icon"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <circle cx="9" cy="9" r="6" stroke="#9ca3af" strokeWidth="2" />
                <path
                  d="M14 14L18 18"
                  stroke="#9ca3af"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* File List */}
            <div className="file-list">
              {filteredFiles.map((file) => (
                <FileCard
                  key={file.id}
                  file={file}
                  isSelected={selectedFile?.id === file.id}
                  onSelect={handleMockFileSelect}
                />
              ))}
            </div>
          </>
        )}

        {/* Data Preview */}
        {parsedData && <DataPreview data={parsedData} />}
      </div>
    </div>
  );
}
