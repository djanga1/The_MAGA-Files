import React from 'react';

export const EyeIcon: React.FC = () => {
  return (
    <svg
      viewBox="0 0 200 100"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="Cybernetic Eye Icon"
    >
      <defs>
        <radialGradient id="irisGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style={{ stopColor: '#67e8f9', stopOpacity: 1 }} /> 
          <stop offset="60%" style={{ stopColor: '#d946ef', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#3b0764', stopOpacity: 1 }} />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer shape */}
      <path
        d="M 10 50 Q 50 10, 100 50 Q 150 90, 190 50 Q 150 10, 100 50 Q 50 90, 10 50 Z"
        fill="none"
        stroke="#1e293b"
        strokeWidth="3"
        filter="url(#glow)"
      />
       <path
        d="M 10 50 Q 50 10, 100 50 Q 150 90, 190 50 Q 150 10, 100 50 Q 50 90, 10 50 Z"
        fill="none"
        stroke="#a855f7"
        strokeWidth="1.5"
      />


      {/* Iris */}
      <circle cx="100" cy="50" r="30" fill="url(#irisGradient)" />

      {/* Pupil */}
      <circle cx="100" cy="50" r="12" fill="#020617" />
      <circle cx="100" cy="50" r="14" fill="none" stroke="#67e8f9" strokeWidth="1" opacity="0.5"/>


      {/* Tech lines */}
      <path d="M 60 50 L 70 50" stroke="#a855f7" strokeWidth="1" />
      <path d="M 130 50 L 140 50" stroke="#a855f7" strokeWidth="1" />
      <path d="M 100 20 L 100 30" stroke="#67e8f9" strokeWidth="1" />
      <path d="M 100 70 L 100 80" stroke="#67e8f9" strokeWidth="1" />
    </svg>
  );
};
