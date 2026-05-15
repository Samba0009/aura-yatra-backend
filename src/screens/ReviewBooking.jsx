import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconCalendar, IconClock, IconUsers, IconMapPin, IconCoin } from '@tabler/icons-react';
import ProgressStepper from '../components/booking/ProgressStepper';

const ReviewBooking = () => {
  const navigate = useNavigate();

  const details = [
    { label: 'Date', value: '12 – 17 Jun 2025', icon: <IconCalendar size={16} /> },
    { label: 'Duration', value: '5 Nights, 6 Days', icon: <IconClock size={16} /> },
    { label: 'Travellers', value: '4 Adults', icon: <IconUsers size={16} /> },
    { label: 'Terrain', value: 'Hill Stations', icon: <IconMapPin size={16} /> },
    { label: 'Total Price', value: '₹54,000 (Incl. Taxes)', icon: <IconCoin size={16} /> },
  ];

  return (
    <div className="min-h-full bg-bgBase flex flex-col pb-[80px]">
      <div className="sticky top-0 z-40 bg-bgBase px-4 py-3 flex items-center gap-3 border-b-[0.5px] border-borderSubtle">
        <button onClick={() => navigate(-1)} className="text-accentPurple">
          <IconArrowLeft size={24} stroke={1.5} />
        </button>
        <h1 className="font-serif text-[20px] text-textPrimary leading-tight">Review Booking</h1>
      </div>

      <ProgressStepper currentStep={1} />

      <div className="px-4 py-2">
        <div className="bg-surface rounded-[14px] border border-borderDefault overflow-hidden">
          <div className="bg-surfaceElevated px-4 py-3 border-b border-borderDefault">
            <div className="inline-block px-2 py-1 bg-[#2a1a42] rounded text-accentPurpleBright text-[9px] uppercase font-bold tracking-wider mb-2">
              Coorg, Karnataka
            </div>
            <h2 className="font-serif text-[20px] text-textPrimary">Trip Summary</h2>
          </div>
          
          <div className="p-4 space-y-4">
            {details.map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-[24px] h-[24px] rounded bg-[#1a0f2e] flex items-center justify-center text-accentPurple shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] text-textMuted uppercase tracking-wider font-bold mb-0.5">{item.label}</p>
                  <p className="text-[14px] text-textPrimary font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-bgBase border-t-[0.5px] border-borderSubtle max-w-[320px] mx-auto z-50">
        <button 
          onClick={() => navigate('/traveller-details')}
          className="w-full py-3.5 bg-accentPurpleDeep rounded-[10px] text-textPrimary font-medium text-[14px] shadow-[0_4px_14px_rgba(58,31,90,0.3)]"
        >
          Continue to Travellers
        </button>
      </div>
    </div>
  );
};

export default ReviewBooking;
