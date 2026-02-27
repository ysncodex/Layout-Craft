import React from 'react';
import { ComponentType } from '../model/types';

export const TypeIcon = ({
  type,
  className = 'h-3.5 w-3.5',
}: {
  type: ComponentType;
  className?: string;
}) => {
  if (type === 'text') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={className}
      >
        <path d="M4 6h16" />
        <path d="M12 6v12" />
        <path d="M8 18h8" />
      </svg>
    );
  }

  if (type === 'button') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={className}
      >
        <rect x="4" y="7" width="16" height="10" rx="3" />
      </svg>
    );
  }

  if (type === 'ratingStars') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={className}
      >
        <path d="m12 3.5 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />
      </svg>
    );
  }

  if (type === 'image') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={className}
      >
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <circle cx="9" cy="10" r="1.5" />
        <path d="m6 17 4-4 3 3 2-2 3 3" />
      </svg>
    );
  }

  if (type === 'gallery') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={className}
      >
        <rect x="3" y="7" width="8" height="8" rx="1.5" />
        <rect x="13" y="7" width="8" height="8" rx="1.5" />
        <rect x="8" y="15" width="8" height="6" rx="1.5" />
      </svg>
    );
  }

  if (type === 'pill') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={className}
      >
        <rect x="4" y="8" width="16" height="8" rx="4" />
      </svg>
    );
  }

  if (type === 'inputField') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={className}
      >
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M7 12h10" />
      </svg>
    );
  }

  if (type === 'iconText') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={className}
      >
        <circle cx="6" cy="12" r="2" />
        <path d="M11 12h9" />
      </svg>
    );
  }

  if (type === 'priceTag') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={className}
      >
        <path d="M4 10V6h6l10 10-4 4L6 10z" />
        <circle cx="8.5" cy="8.5" r="1" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="M12 4v16" />
      <path d="M8 8h8" />
      <path d="M8 16h8" />
    </svg>
  );
};
