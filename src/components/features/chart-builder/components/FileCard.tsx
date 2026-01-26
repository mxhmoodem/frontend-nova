import './components.css';
import { FileCardProps } from '../types';

export default function FileCard({
  file,
  isSelected,
  onSelect,
}: FileCardProps) {
  return (
    <div
      className={`file-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(file)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(file);
        }
      }}
    >
      <div className="file-card-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="2" width="16" height="20" rx="2" fill="#dc2626" />
          <rect x="7" y="6" width="10" height="2" fill="white" />
          <rect x="7" y="10" width="10" height="2" fill="white" />
          <rect x="7" y="14" width="6" height="2" fill="white" />
        </svg>
      </div>
      <div className="file-card-content">
        <div className="file-card-header">
          <h3 className="file-card-name">{file.name}</h3>
          {isSelected && (
            <div className="file-card-check">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="8" fill="#dc2626" />
                <path
                  d="M5 8L7 10L11 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="file-card-meta">
          <span className="file-card-badge">{file.category}</span>
          <span className="file-card-info">
            {file.size} • {file.timestamp}
          </span>
        </div>
      </div>
    </div>
  );
}
