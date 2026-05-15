import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconMapPinBolt, IconChevronRight } from '@tabler/icons-react';

const GuideBanner = () => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate('/guide-my-yatra')}
      className="mx-4 mb-5 bg-surfaceElevated rounded-[14px] border-[0.5px] border-[#2e1f4a] p-3.5 flex items-center gap-3 cursor-pointer"
    >
      <div className="w-[38px] h-[38px] rounded-full bg-[#2e1f4a] flex items-center justify-center shrink-0">
        <IconMapPinBolt size={20} className="text-accentPurpleBright" />
      </div>
      <div className="flex-1">
        <h3 className="font-serif text-[15px] text-textPrimary leading-tight mb-0.5">Guide My Yatra</h3>
        <p className="text-[11px] text-[#7a6890]">Find yatras tailored for you!</p>
      </div>
      <IconChevronRight size={20} className="text-[#7a6890]" />
    </div>
  );
};

export default GuideBanner;
