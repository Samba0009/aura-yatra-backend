import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconCheck } from '@tabler/icons-react';

const BookingConfirmed = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full bg-bgBase flex flex-col items-center justify-center p-6">
      <div className="w-[72px] h-[72px] rounded-full bg-[#1a0f2e] border border-[#5a3a80] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(90,58,128,0.3)]">
        <IconCheck size={32} className="text-accentPurpleBright" stroke={3} />
      </div>

      <h1 className="font-serif text-[26px] text-goldAmber leading-none mb-2">Yatra Booked!</h1>
      <p className="text-textMuted text-[13px] text-center mb-8">
        Your sacred journey to Coorg is confirmed.
      </p>

      <div className="w-full bg-surfaceElevated border border-borderDefault rounded-[14px] p-5 flex flex-col items-center mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accentPurple to-transparent"></div>
        <p className="text-[10px] text-textMuted uppercase tracking-wider font-bold mb-1">Booking ID</p>
        <div className="font-serif text-[18px] text-accentPurpleBright mb-4 tracking-[0.05em]">
          AY · 2025 · 00482
        </div>
        
        <div className="w-full space-y-3 pt-4 border-t border-[#2e1f4a]">
          <div className="flex justify-between">
            <span className="text-[11px] text-textMuted">Destination</span>
            <span className="text-[12px] text-textPrimary font-medium">Coorg, KA</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[11px] text-textMuted">Travel Date</span>
            <span className="text-[12px] text-textPrimary font-medium">12 Jun 2025</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[11px] text-textMuted">Travellers</span>
            <span className="text-[12px] text-textPrimary font-medium">4 Adults</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[11px] text-textMuted">Amount Paid</span>
            <span className="text-[12px] text-textPrimary font-medium">₹54,000</span>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3 mt-auto">
        <button 
          onClick={() => navigate('/home')}
          className="w-full py-3.5 bg-accentPurpleDeep rounded-[10px] text-textPrimary font-medium text-[14px] shadow-[0_4px_14px_rgba(58,31,90,0.4)]"
        >
          View My Trips
        </button>
        <button className="w-full py-3.5 border border-borderDefault rounded-[10px] text-accentPurple font-medium text-[14px]">
          Share
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmed;
