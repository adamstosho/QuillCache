import React from 'react';

const Logo = ({ 
  size = 64, 
  showText = true, 
  animated = true, 
  className = '',
  variant = 'default', // 'default', 'minimal', 'text-only'
  id = 'logo' // Add unique ID for gradients
}) => {
  if (variant === 'text-only') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <span className="text-xl font-bold text-gradient-primary">
          Quill
        </span>
        <span className="text-xl font-bold text-purple-600">
          Cache
        </span>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 32 32" 
          xmlns="http://www.w3.org/2000/svg"
          className={`${animated ? 'animate-pulse' : ''}`}
        >
          <defs>
            <linearGradient id={`quillGradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#5B3C88', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
            </linearGradient>
            
            <linearGradient id={`bookGradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#F59E0B', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#F97316', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          
          {/* Background circle */}
          <circle cx="16" cy="16" r="15" fill={`url(#quillGradient-${id})`} opacity="0.1"/>
          
          {/* Book */}
          <rect x="13" y="8" width="6" height="16" fill={`url(#bookGradient-${id})`} rx="1"/>
          <rect x="14" y="9" width="4" height="14" fill="white" rx="0.5"/>
          
          {/* Book lines */}
          <g stroke="#E5E7EB" strokeWidth="0.5" opacity="0.6">
            {[11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((y) => (
              <line key={y} x1="15" y1={y} x2="17" y2={y}/>
            ))}
          </g>
          
          {/* Quill Pen */}
          <path d="M 19 12 Q 22 9 25 11 Q 23 14 20 16 L 19 12" fill={`url(#quillGradient-${id})`}/>
          <path d="M 19 12 Q 17 11 16 12 Q 17 13 18 14 L 19 12" fill="#E5E7EB" opacity="0.8"/>
          <path d="M 20 16 L 21 17 L 20 18 L 19 17 Z" fill="#1F2937"/>
          
          {/* Ink drop */}
          <circle cx="20" cy="19" r="1" fill="#1F2937" opacity="0.8"/>
        </svg>
      </div>
    );
  }

  // Default animated logo
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg"
        className={`${animated ? 'animate-pulse' : ''}`}
      >
        <defs>
          {/* Gradient definitions */}
          <linearGradient id={`quillGradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#5B3C88', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
          </linearGradient>
          
          <linearGradient id={`bookGradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#F59E0B', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#F97316', stopOpacity: 1 }} />
          </linearGradient>
          
          <linearGradient id={`inkGradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#1F2937', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#374151', stopOpacity: 1 }} />
          </linearGradient>
          
          {/* Filter for glow effect */}
          <filter id={`glow-${id}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background circle with subtle animation */}
        <circle cx="100" cy="100" r="90" fill={`url(#quillGradient-${id})`} opacity="0.1">
          {animated && (
            <animate attributeName="r" values="90;95;90" dur="3s" repeatCount="indefinite"/>
          )}
        </circle>
        
        {/* Book */}
        <g id="book">
          {/* Book spine */}
          <rect x="85" y="60" width="30" height="80" fill={`url(#bookGradient-${id})`} rx="2">
            {animated && (
              <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>
            )}
          </rect>
          
          {/* Book pages */}
          <rect x="87" y="62" width="26" height="76" fill="white" rx="1">
            {animated && (
              <animate attributeName="opacity" values="0.9;1;0.9" dur="2.5s" repeatCount="indefinite"/>
            )}
          </rect>
          
          {/* Book lines (text) */}
          <g stroke="#E5E7EB" strokeWidth="1" opacity="0.6">
            {[70, 75, 80, 85, 90, 95, 100, 105, 110, 115].map((y, index) => (
              <line key={y} x1="90" y1={y} x2={110 - index * 2} y2={y}>
                {animated && (
                  <animate 
                    attributeName="opacity" 
                    values="0.3;0.8;0.3" 
                    dur="1.5s" 
                    repeatCount="indefinite"
                    begin={`${index * 0.2}s`}
                  />
                )}
              </line>
            ))}
          </g>
        </g>
        
        {/* Quill Pen */}
        <g id="quill">
          {/* Quill shaft */}
          <path d="M 120 80 Q 140 60 160 70 Q 150 90 130 100 L 120 80" fill={`url(#quillGradient-${id})`} filter={`url(#glow-${id})`}>
            {animated && (
              <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite"/>
            )}
          </path>
          
          {/* Quill feather */}
          <path d="M 120 80 Q 110 70 100 75 Q 105 85 115 90 L 120 80" fill="#E5E7EB" opacity="0.8">
            {animated && (
              <animate attributeName="opacity" values="0.6;0.9;0.6" dur="2.5s" repeatCount="indefinite"/>
            )}
          </path>
          
          {/* Quill tip */}
          <path d="M 130 100 L 135 105 L 130 110 L 125 105 Z" fill={`url(#inkGradient-${id})`}>
            {animated && (
              <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite"/>
            )}
          </path>
        </g>
        
        {/* Ink drops */}
        <g id="ink-drops">
          <circle cx="125" cy="115" r="2" fill={`url(#inkGradient-${id})`} opacity="0.8">
            {animated && (
              <>
                <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite"/>
              </>
            )}
          </circle>
          <circle cx="128" cy="118" r="1.5" fill={`url(#inkGradient-${id})`} opacity="0.6">
            {animated && (
              <>
                <animate attributeName="r" values="1.5;2.5;1.5" dur="2.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2.5s" repeatCount="indefinite"/>
              </>
            )}
          </circle>
        </g>
        
        {/* Floating particles */}
        <g id="particles">
          {[
            { cx: 60, cy: 50, r: 1, fill: '#8B5CF6', opacity: 0.6, dur: 3 },
            { cx: 140, cy: 40, r: 0.8, fill: '#F59E0B', opacity: 0.5, dur: 2.5 },
            { cx: 50, cy: 150, r: 1.2, fill: '#5B3C88', opacity: 0.4, dur: 3.5 },
            { cx: 150, cy: 160, r: 0.9, fill: '#F97316', opacity: 0.5, dur: 2.8 }
          ].map((particle, index) => (
            <circle 
              key={index}
              cx={particle.cx} 
              cy={particle.cy} 
              r={particle.r} 
              fill={particle.fill} 
              opacity={particle.opacity}
            >
              {animated && (
                <>
                  <animate 
                    attributeName="cy" 
                    values={`${particle.cy};${particle.cy - 10};${particle.cy}`} 
                    dur={`${particle.dur}s`} 
                    repeatCount="indefinite"
                  />
                  <animate 
                    attributeName="opacity" 
                    values={`${particle.opacity};${particle.opacity * 0.2};${particle.opacity}`} 
                    dur={`${particle.dur}s`} 
                    repeatCount="indefinite"
                  />
                </>
              )}
            </circle>
          ))}
        </g>
        
        {/* Text "QuillCache" */}
        {showText && (
          <text x="100" y="170" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#5B3C88">
            <tspan x="100" dy="0">Quill</tspan>
            <tspan fill="#8B5CF6">Cache</tspan>
            {animated && (
              <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>
            )}
          </text>
        )}
      </svg>
    </div>
  );
};

export default Logo; 