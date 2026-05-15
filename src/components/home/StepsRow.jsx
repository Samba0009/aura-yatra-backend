import React from 'react';
import { IconCalendarEvent, IconSparkles } from '@tabler/icons-react';

const StepsRow = () => {
  return (
    <div className="px-4 mb-6">
      <div className="flex gap-3">
        <div className="flex-1 bg-surface border border-borderDefault rounded-[14px] p-3 relative overflow-hidden">
          <div className="absolute top-2 right-2 font-serif text-[28px] text-[#7f50b8] opacity-20 font-semibold leading-none">1</div>
          <IconCalendarEvent size={18} className="text-accentPurple mb-2" />
          <h4 className="text-textPrimary text-[13px] font-medium mb-1">Tell Us</h4>
          <p className="text-textMuted text-[10px] leading-snug pr-2">Share your requirements</p>
        </div>
        
        <div className="flex-1 bg-surface border border-borderDefault rounded-[14px] p-3 relative overflow-hidden">
          <div className="absolute top-2 right-2 font-serif text-[28px] text-[#7f50b8] opacity-20 font-semibold leading-none">2</div>
          <IconSparkles size={18} className="text-accentPurple mb-2" />
          <h4 className="text-textPrimary text-[13px] font-medium mb-1">We Curate</h4>
          <p className="text-textMuted text-[10px] leading-snug pr-2">Get curated yatra options</p>
        </div>
      </div>
    </div>
  );
};

export default StepsRow;
