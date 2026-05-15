import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconStarFilled } from '@tabler/icons-react';

const CuratedPlans = () => {
  const navigate = useNavigate();

  const plans = [
    { id: 'coorg', name: 'Coorg, Karnataka', days: '6 Days', price: '₹13,500', rating: 4.8, best: true, tag: 'Hill Terrain', icon: '⛰️' },
    { id: 'manali', name: 'Manali, Himachal', days: '7 Days', price: '₹14,800', rating: 4.7, best: false, tag: 'Snowy', icon: '❄️' },
    { id: 'munnar', name: 'Munnar, Kerala', days: '5 Days', price: '₹12,200', rating: 4.6, best: false, tag: 'Hill Terrain', icon: '🌿' },
    { id: 'ooty', name: 'Ooty, Tamil Nadu', days: '5 Days', price: '₹11,000', rating: 4.5, best: false, tag: 'Hill Terrain', icon: '🌲' },
  ];

  return (
    <div className="min-h-full bg-bgBase flex flex-col pb-[70px]">
      <div className="sticky top-0 z-40 bg-bgBase px-4 py-3 flex items-center gap-3 border-b-[0.5px] border-borderSubtle">
        <button onClick={() => navigate(-1)} className="text-accentPurple">
          <IconArrowLeft size={24} stroke={1.5} />
        </button>
        <div>
          <h1 className="font-serif text-[20px] text-textPrimary leading-tight">Your Curated Plans</h1>
          <p className="text-[11px] text-[#7a5a8a]">4 travellers · Hill stations · 5–7 days</p>
        </div>
      </div>

      <div className="bg-surfaceElevated px-4 py-5 mb-4 border-b border-[#2e1f4a]">
        <div className="inline-block px-2 py-1 bg-[#2a1a42] rounded border border-[#7050a0] text-accentPurpleBright text-[9px] uppercase font-bold tracking-wider mb-3">
          AI Curated · Mid-range · ₹15k/person
        </div>
        <h2 className="font-serif text-[22px] text-textPrimary mb-1">We found 4 perfect yatras</h2>
        <p className="text-textMuted text-[12px]">Tap any plan to see full itinerary</p>
      </div>

      <div className="px-4 space-y-4">
        {plans.map((plan) => (
          <div 
            key={plan.id}
            onClick={() => navigate(`/plan-detail`)} // Ideally pass id via state or params
            className="bg-surface rounded-[14px] border border-borderDefault p-3.5 relative cursor-pointer overflow-hidden"
          >
            {plan.best && (
              <div className="absolute top-0 right-0 bg-goldAmber text-[#1a0a2e] text-[10px] font-bold px-3 py-1 rounded-bl-[14px] flex items-center gap-1 z-10">
                <IconStarFilled size={10} />
                Best Pick
              </div>
            )}
            <div className="flex gap-4 mb-3">
              <div className="w-[76px] h-[76px] rounded-[10px] bg-[#2a1a42] flex items-center justify-center text-[36px]" aria-hidden="true">{plan.icon}</div>
              <div className="flex-1 pt-1">
                <h3 className="font-serif text-[18px] text-textPrimary leading-snug">{plan.name}</h3>
                <div className="flex items-center gap-2 mt-1 mb-2">
                  <span className="text-[10px] text-textMuted bg-bgBase px-1.5 py-0.5 rounded border border-borderDefault">{plan.days}</span>
                  <span className="text-[10px] text-textMuted bg-bgBase px-1.5 py-0.5 rounded border border-borderDefault">4 Pax</span>
                  <span className="text-[10px] text-textMuted bg-bgBase px-1.5 py-0.5 rounded border border-borderDefault">{plan.tag}</span>
                </div>
                <div className="flex justify-between items-end">
                  <div className="font-serif text-[16px] text-goldAmber">{plan.price}</div>
                  <div className="flex items-center gap-1 text-[11px] text-[#a090c0]">
                    <IconStarFilled size={12} className="text-goldAmber" />
                    {plan.rating}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-accentPurpleDeep rounded-[8px] text-textPrimary text-[12px] font-medium">View Plan</button>
              <button className="flex-[0.5] py-2 border border-[#3a2a50] rounded-[8px] text-accentPurple text-[12px] font-medium">Save</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CuratedPlans;
