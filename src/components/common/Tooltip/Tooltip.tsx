import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './Tooltip.css';
import type { TooltipProps, TooltipPosition } from './Tooltip.model';

interface TooltipCoords {
  top: number;
  left: number;
}

export default function Tooltip({
  content,
  children,
  position = 'top',
  delay = 200,
  className = '',
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [computedPosition, setComputedPosition] =
    useState<TooltipPosition>(position);
  const [coords, setCoords] = useState<TooltipCoords>({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    let newPosition = position;
    let top = 0;
    let left = 0;

    const calculateCoords = (pos: TooltipPosition) => {
      switch (pos) {
        case 'top':
          return {
            top: triggerRect.top + scrollY - tooltipRect.height - 8,
            left:
              triggerRect.left +
              scrollX +
              triggerRect.width / 2 -
              tooltipRect.width / 2,
          };
        case 'bottom':
          return {
            top: triggerRect.bottom + scrollY + 8,
            left:
              triggerRect.left +
              scrollX +
              triggerRect.width / 2 -
              tooltipRect.width / 2,
          };
        case 'left':
          return {
            top:
              triggerRect.top +
              scrollY +
              triggerRect.height / 2 -
              tooltipRect.height / 2,
            left: triggerRect.left + scrollX - tooltipRect.width - 8,
          };
        case 'right':
          return {
            top:
              triggerRect.top +
              scrollY +
              triggerRect.height / 2 -
              tooltipRect.height / 2,
            left: triggerRect.right + scrollX + 8,
          };
      }
    };

    const initialCoords = calculateCoords(position);
    top = initialCoords.top;
    left = initialCoords.left;

    if (position === 'top' && top < scrollY) {
      newPosition = 'bottom';
      const newCoords = calculateCoords('bottom');
      top = newCoords.top;
      left = newCoords.left;
    } else if (
      position === 'bottom' &&
      top + tooltipRect.height > window.innerHeight + scrollY
    ) {
      newPosition = 'top';
      const newCoords = calculateCoords('top');
      top = newCoords.top;
      left = newCoords.left;
    } else if (position === 'left' && left < scrollX) {
      newPosition = 'right';
      const newCoords = calculateCoords('right');
      top = newCoords.top;
      left = newCoords.left;
    } else if (
      position === 'right' &&
      left + tooltipRect.width > window.innerWidth + scrollX
    ) {
      newPosition = 'left';
      const newCoords = calculateCoords('left');
      top = newCoords.top;
      left = newCoords.left;
    }

    const padding = 8;
    if (left < padding) {
      left = padding;
    } else if (left + tooltipRect.width > window.innerWidth - padding) {
      left = window.innerWidth - tooltipRect.width - padding;
    }

    setComputedPosition(newPosition);
    setCoords({ top, left });
  }, [position]);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
    setComputedPosition(position);
  };

  useEffect(() => {
    if (isVisible) {
      requestAnimationFrame(() => {
        calculatePosition();
      });
    }
  }, [isVisible, calculatePosition]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const tooltipElement = isVisible && (
    <div
      ref={tooltipRef}
      className={`tooltip-content tooltip-portal tooltip-${computedPosition}`}
      style={{ top: coords.top, left: coords.left }}
      role="tooltip"
    >
      <div className="tooltip-text">{content}</div>
      <div className={`tooltip-arrow tooltip-arrow-${computedPosition}`} />
    </div>
  );

  return (
    <span
      ref={triggerRef}
      className={`tooltip-wrapper ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {createPortal(tooltipElement, document.body)}
    </span>
  );
}
