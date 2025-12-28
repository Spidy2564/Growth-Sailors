import { ReactNode } from 'react';

interface ResponsiveWrapperProps {
  children: ReactNode;
  className?: string;
}

export function ResponsiveWrapper({ children, className = '' }: ResponsiveWrapperProps) {
  return (
    <div className={`responsive-component-wrapper ${className}`}>
      {children}
    </div>
  );
}

