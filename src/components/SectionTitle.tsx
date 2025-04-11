
import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle, 
  align = 'center' 
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  
  return (
    <div className={`mb-12 ${alignmentClasses[align]}`}>
      <h2 className="text-3xl font-bold mb-3   relative inline-block pb-2">
        {title}
        <span className="absolute bottom-0 left-0 w-full md:w-2/3 h-1 bg-brand-gold"></span>
      </h2>
      {subtitle && <p className="  max-w-3xl mx-auto">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;
