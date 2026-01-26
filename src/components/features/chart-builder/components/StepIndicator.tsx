import React from 'react';
import { StepIndicatorProps } from '../types';
import './components.css';

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [1, 2, 3];

  return (
    <div className="step-indicator">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className={`step-circle ${step <= currentStep ? 'active' : ''}`}>
            {step}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`step-connector ${step < currentStep ? 'active' : ''}`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
