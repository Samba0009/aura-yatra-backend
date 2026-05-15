import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconCar, IconBus, IconBuilding, IconBuildingMonument } from '@tabler/icons-react';

const NavPillsRow = () => {
  const navigate = useNavigate();
  
  const tabs = [
    { id: 'temple', label: 'Temple Yatra', icon: <IconBuildingMonument size={16} />, active: true, route: '/temple-search' },
    { id: 'cars', label: 'Car Rentals', icon: <IconCar size={16} />, active: false, route: '/car-search' },
    { id: 'buses', label: 'Buses', icon: <IconBus size={16} /> },
    { id: 'hotels', label: 'Hotels', icon: <IconBuilding size={16} /> },
  ];

  return (
    <div className="bg-bgBase overflow-x-auto no-scrollbar px-4 pb-4 pt-1">
      <div className="flex gap-2 min-w-max">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => tab.route && navigate(tab.route)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border-[0.5px] transition-colors ${
              tab.active 
                ? 'bg-surfaceAccent border-borderActive text-accentPurpleBright' 
                : 'bg-surface border-[#2e2645] text-textMuted'
            }`}
          >
            {tab.icon}
            <span className="text-[12px] font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavPillsRow;
