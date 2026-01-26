import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './components.css';
import { FileUploadProps } from '../types';

export default function FileUpload({
  onFileSelect,
  isLoading,
}: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
      'application/vnd.ms-excel': ['.xls'],
      'application/json': ['.json'],
    },
    multiple: false,
    disabled: isLoading,
  });

  return (
    <div
      {...getRootProps()}
      className={`file-upload-dropzone ${isDragActive ? 'drag-active' : ''} ${isLoading ? 'loading' : ''}`}
    >
      <input {...getInputProps()} />
      <div className="file-upload-content">
        {isLoading ? (
          <>
            <div className="file-upload-spinner">
              <div className="spinner"></div>
            </div>
            <p className="file-upload-text">Processing file...</p>
          </>
        ) : (
          <>
            <svg
              className="file-upload-icon"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
            >
              <rect
                x="12"
                y="8"
                width="24"
                height="32"
                rx="2"
                stroke="#dc2626"
                strokeWidth="2"
              />
              <path
                d="M24 18V30M24 18L20 22M24 18L28 22"
                stroke="#dc2626"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="file-upload-text-container">
              {isDragActive ? (
                <p className="file-upload-text">Drop your file here</p>
              ) : (
                <>
                  <p className="file-upload-text">
                    Drag & drop your file here, or{' '}
                    <span className="file-upload-link">browse</span>
                  </p>
                  <p className="file-upload-subtext">
                    Supports CSV, XLSX, XLS, JSON (Max 10MB)
                  </p>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
