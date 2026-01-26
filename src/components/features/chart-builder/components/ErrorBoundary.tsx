import React, { Component, ReactNode } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../types';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Chart Builder Error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            style={{
              padding: '2rem',
              textAlign: 'center',
              color: '#dc2626',
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              style={{ margin: '0 auto 1rem' }}
            >
              <circle cx="24" cy="24" r="20" stroke="#dc2626" strokeWidth="2" />
              <path
                d="M24 14V26M24 32V33"
                stroke="#dc2626"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <h3>Chart Preview Error</h3>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              {this.state.error?.message ||
                'An error occurred while rendering the chart'}
            </p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
