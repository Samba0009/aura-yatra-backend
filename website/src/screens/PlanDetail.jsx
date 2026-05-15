import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconStarFilled, IconCheck, IconBed, IconCar, IconBus, IconTrain, IconPlane, IconChevronRight } from '@tabler/icons-react';

const PlanDetail = () => {
  const navigate = useNavigate();

  const days = [
    { day: 'D1', label: 'Day 1', name: 'Arrival in Coorg', desc: 'Transfer from airport, hotel check-in and evening at leisure.', meal: 'Dinner included' },
    { day: 'D2', label: 'Day 2', name: 'Temples & Waterfalls', desc: 'Visit Omkareshwara Temple and Abbey Falls.', meal: 'Breakfast & Dinner' },
    { day: 'D3', label: 'Day 3', name: 'Dubare Forest', desc: 'Elephant camp visit and river rafting experience.', meal: 'Breakfast included' },
    { day: 'D4', label: 'Day 4', name: 'Talacauvery', desc: 'Visit the source of river Cauvery and Bhagamandala.', meal: 'Breakfast included' },
    { day: 'D5', label: 'Day 5', name: 'Namdroling Monastery', desc: 'Golden Temple visit in Bylakuppe.', meal: 'Breakfast & Dinner' },
    { day: 'D6', label: 'Day 6', name: 'Departure', desc: 'Checkout and transfer back to the airport.', meal: 'Breakfast included' },
  ];

  return (
    <div className="min-h-full bg-bgBase flex flex-col pb-8">
      <div className="sticky top-0 z-40 bg-bgBase px-4 py-3 flex items-center gap-3 border-b-[0.5px] border-borderSubtle">
        <button onClick={() => navigate(-1)} className="text-accentPurple">
          <IconArrowLeft size={24} stroke={1.5} />
        </button>
        <div>
          <h1 className="font-serif text-[20px] text-textPrimary leading-tight">Coorg, Karnataka</h1>
          <p className="text-[11px] text-[#7a5a8a]">Your curated plan</p>
        </div>
      </div>

      <div className="bg-[#0e0620] px-4 py-6 text-center border-b-[0.5px] border-[#2e1f4a]">
        <div className="inline-flex items-center gap-1 px-3 py-1 bg-goldAmber/20 border border-goldAmber/50 rounded-full text-goldAmber text-[10px] font-bold uppercase tracking-wider mb-3">
          <IconStarFilled size={10} /> Best Pick
        </div>
        <h2 className="font-serif text-[26px] text-textPrimary leading-none mb-2">Coorg, Karnataka</h2>
        <p className="text-[#a090c0] text-[13px] mb-4">Coffee hills · Misty trails · Ancient temples</p>
        
        <div className="flex items-center justify-center gap-3 text-[11px] text-textMuted divide-x divide-borderDefault">
          <span className="px-3">6 Days</span>
          <span className="px-3">4 People</span>
          <span className="px-3 flex items-center gap-1"><IconStarFilled size={10} className="text-goldAmber"/> 4.8</span>
          <span className="px-3">Hill Terrain</span>
        </div>
      </div>

      <div className="bg-surfaceElevated px-4 py-4 flex items-center justify-between border-b-[0.5px] border-[#2e1f4a]">
        <div>
          <p className="text-[9px] text-[#7a5a8a] uppercase tracking-wider font-bold mb-0.5">Total Per Person</p>
          <div className="font-serif text-[22px] text-goldAmber leading-none mb-1">₹13,500</div>
          <p className="text-[10px] text-textMuted">Incl. stay, transport & breakfast</p>
        </div>
        <button 
          onClick={() => navigate('/review-booking')}
          className="bg-accentPurpleDeep px-6 py-3 rounded-[10px] text-textPrimary text-[13px] font-medium"
        >
          Book Now
        </button>
      </div>

      <div className="py-5 pl-4 border-b-[0.5px] border-borderSubtle overflow-x-auto no-scrollbar">
        <div className="flex gap-2 pr-4 min-w-max">
          {['5 Nights', 'Cab Transfers', 'Breakfast', 'Guided Tour', '24/7 Support'].map((inc, i) => (
            <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-surface rounded-full border-[0.5px] border-borderDefault text-[11px] text-[#c8a8e8]">
              <IconCheck size={12} className="text-accentPurpleBright" /> {inc}
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-6">
        <h3 className="font-serif text-[20px] text-textPrimary mb-6">Day-by-Day Itinerary</h3>
        <div className="space-y-0 relative">
          <div className="absolute left-[14px] top-[14px] bottom-0 w-[1px] bg-[#2a1a42]"></div>
          {days.map((d, i) => (
            <div key={i} className="flex gap-4 mb-6 relative">
              <div className="w-[28px] h-[28px] rounded-full bg-surfaceAccent border border-borderActive flex items-center justify-center shrink-0 z-10 text-[10px] font-bold text-accentPurpleBright">
                {d.day}
              </div>
              <div className="flex-1 pb-2">
                <p className="text-[10px] text-accentPurple uppercase tracking-wider font-bold mb-1">{d.label}</p>
                <div className="bg-surface rounded-[12px] border border-borderDefault p-3">
                  <h4 className="text-[14px] text-textPrimary font-medium mb-1">{d.name}</h4>
                  <p className="text-[11px] text-textMuted mb-2">{d.desc}</p>
                  <div className="text-[9px] text-[#8070a0] bg-[#1a0f2e] inline-block px-2 py-1 rounded">
                    {d.meal}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-6 border-t-[0.5px] border-borderSubtle">
        <h3 className="font-serif text-[20px] text-textPrimary mb-4">Where You'll Stay</h3>
        <div className="bg-surface rounded-[12px] border border-borderDefault p-3.5 flex items-center gap-3">
          <div className="w-[48px] h-[48px] rounded-[8px] bg-surfaceElevated flex items-center justify-center text-accentPurple">
            <IconBed size={24} />
          </div>
          <div className="flex-1">
            <h4 className="text-[14px] text-textPrimary font-medium mb-0.5">The Tamara Coorg</h4>
            <p className="text-[11px] text-textMuted mb-1">5 nights · Deluxe room</p>
            <div className="flex items-center gap-1 text-[10px] text-goldAmber">
              <IconStarFilled size={10} /> 4.9 Rating
            </div>
          </div>
          <IconChevronRight size={20} className="text-textMuted" />
        </div>
      </div>

      <div className="px-4 py-6 border-t-[0.5px] border-borderSubtle">
        <h3 className="font-serif text-[20px] text-textPrimary mb-4">Getting There</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: <IconCar size={20} />, label: 'Cab' },
            { icon: <IconBus size={20} />, label: 'Bus' },
            { icon: <IconTrain size={20} />, label: 'Train' },
            { icon: <IconPlane size={20} />, label: 'Flights' },
          ].map((item, i) => (
            <div key={i} className="bg-surface rounded-[10px] border border-borderDefault p-3 flex items-center gap-2 text-textMuted text-[12px] font-medium">
              <span className="text-accentPurple">{item.icon}</span> {item.label}
            </div>
          ))}
        </div>
      </div>

      <div className="m-4 mt-2 bg-accentPurpleDeep rounded-[14px] p-5">
        <h3 className="font-serif text-[22px] text-textPrimary mb-1">Ready to go on this Yatra?</h3>
        <p className="text-[#c8a8e8] text-[12px] mb-5">4 travellers · ₹54,000 total · 6 days</p>
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => navigate('/review-booking')}
            className="w-full py-3.5 bg-goldAmber rounded-[10px] text-[#1a0a2e] font-bold text-[14px]"
          >
            Book This Plan
          </button>
          <button className="w-full py-3.5 border border-[#5a3a80] rounded-[10px] text-textPrimary font-medium text-[14px]">
            Share Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanDetail;
