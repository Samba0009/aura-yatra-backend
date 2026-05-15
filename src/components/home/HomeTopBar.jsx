import React from 'react';
import { IconSearch, IconHeadset } from '@tabler/icons-react';

const HomeTopBar = () => {
  return (
    <div className="sticky top-0 z-40 bg-bgBase flex justify-between items-center px-4 py-3 relative">
      <h1 className="md:hidden font-serif text-[22px] text-textPrimary font-semibold tracking-wide absolute left-1/2 -translate-x-1/2">
        Aura Yatra
      </h1>
      <div className="flex-1"></div>
      <div className="flex gap-3 relative z-10">
        <button className="w-[34px] h-[34px] rounded-full bg-surface border border-[#1e1c30] flex items-center justify-center">
          <IconSearch size={18} className="text-[#8070a0]" stroke={1.5} />
        </button>
        <button className="w-[34px] h-[34px] rounded-full bg-surface border border-[#1e1c30] flex items-center justify-center">
          <IconHeadset size={18} className="text-[#8070a0]" stroke={1.5} />
        </button>
      </div>
    </div>
  );
};

export default HomeTopBar;
