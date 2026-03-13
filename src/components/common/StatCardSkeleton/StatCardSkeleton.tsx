import React from 'react';
import './StatCardSkeleton.css';

/**
 * Skeleton loading state for MarketStatCard component
 * Displays placeholder elements while data is loading
 */
export const StatCardSkeleton: React.FC = () => {
  return (
    <div className="stat-card-skeleton">
      <div className="stat-card-skeleton__header">
        <div className="stat-card-skeleton__icon" />
        <div className="stat-card-skeleton__badge" />
      </div>
      <div className="stat-card-skeleton__value" />
      <div className="stat-card-skeleton__label" />
      <div className="stat-card-skeleton__description" />
      <div className="stat-card-skeleton__footer">
        <div className="stat-card-skeleton__source" />
        <div className="stat-card-skeleton__period" />
      </div>
    </div>
  );
};
