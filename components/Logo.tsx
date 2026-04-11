import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* SVG Logo Icon */}
      <svg
        className={`${sizeClasses[size]} w-auto flex-shrink-0`}
        viewBox="0 0 200 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle */}
        <circle cx="50" cy="75" r="45" fill="none" stroke="#0c4a6e" strokeWidth="1" opacity="0.1" />

        {/* Network nodes */}
        <circle cx="30" cy="55" r="6" fill="#0ea5e9" />
        <circle cx="70" cy="55" r="6" fill="#0c4a6e" />
        <circle cx="50" cy="90" r="6" fill="#0c4a6e" />
        <circle cx="50" cy="30" r="5" fill="#0ea5e9" />

        {/* Network lines */}
        <line x1="30" y1="55" x2="70" y2="55" stroke="#0c4a6e" strokeWidth="2" />
        <line x1="30" y1="55" x2="50" y2="90" stroke="#0c4a6e" strokeWidth="2" />
        <line x1="70" y1="55" x2="50" y2="90" stroke="#0c4a6e" strokeWidth="2" />
        <line x1="50" y1="30" x2="30" y2="55" stroke="#0ea5e9" strokeWidth="1.5" opacity="0.7" />
        <line x1="50" y1="30" x2="70" y2="55" stroke="#0ea5e9" strokeWidth="1.5" opacity="0.7" />

        {/* Center accent */}
        <circle cx="50" cy="60" r="3" fill="#0ea5e9" opacity="0.8" />
      </svg>

      {/* Text */}
      <div className="flex flex-col leading-none">
        <span className="font-bold text-slate-900" style={{ fontSize: size === 'sm' ? '14px' : size === 'md' ? '18px' : '24px' }}>
          OMNITRA
        </span>
        <span className="text-brand-600 font-semibold tracking-widest" style={{ fontSize: size === 'sm' ? '8px' : size === 'md' ? '10px' : '12px' }}>
          TECH SERVICES
        </span>
      </div>
    </div>
  );
};

export default Logo;
