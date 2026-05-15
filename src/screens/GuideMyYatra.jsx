import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconMinus, IconPlus, IconSparkles, IconChevronDown } from '@tabler/icons-react';

const GuideMyYatra = () => {
  const navigate = useNavigate();
  const [travellers, setTravellers] = useState(4);
  const [selectedTerrain, setSelectedTerrain] = useState('Hill Stations');
  const [selectedBudget, setSelectedBudget] = useState('₹15k Mid-range');

  const terrains = [
    { name: 'Hill Stations', icon: '⛰️' },
    { name: 'Beaches', icon: '🌊' },
    { name: 'Deserts', icon: '🐪' },
    { name: 'Snowy', icon: '❄️' },
    { name: 'Forests', icon: '🌲' },
    { name: 'Pilgrimage', icon: '🛕' },
  ];

  const budgets = ['₹5k Budget', '₹15k Mid-range', '₹30k Premium', '₹50k+ Luxury'];

  return (
    <div className="min-h-full bg-bgBase flex flex-col pb-8">
      <div className="sticky top-0 z-40 bg-bgBase px-4 py-3 flex items-center gap-3 border-b-[0.5px] border-borderSubtle">
        <button onClick={() => navigate(-1)} className="text-accentPurple">
          <IconArrowLeft size={24} stroke={1.5} />
        </button>
        <div>
          <h1 className="font-serif text-[20px] text-textPrimary leading-tight">Guide My Yatra</h1>
          <p className="text-[9px] text-[#5a4a3a] tracking-[0.15em] uppercase font-medium">Aura Yatra</p>
        </div>
      </div>

      <div className="px-4 py-6">
        <h2 className="font-serif text-[26px] text-textPrimary leading-tight mb-2">Tell us your dream,<br/>we'll plan the rest</h2>
        <p className="text-textMuted text-[13px] mb-8">Answer a few questions for a curated yatra</p>

        <div className="space-y-4">
          <div className="bg-surface rounded-[14px] border border-borderDefault p-4">
            <h3 className="text-[12px] font-medium text-textPrimary mb-3 uppercase tracking-wide">Travellers</h3>
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setTravellers(Math.max(1, travellers - 1))}
                className="w-[36px] h-[36px] rounded-full bg-surfaceElevated border border-borderActive flex items-center justify-center text-accentPurple"
              >
                <IconMinus size={18} />
              </button>
              <span className="text-[18px] text-textPrimary font-medium">{travellers} Travellers</span>
              <button 
                onClick={() => setTravellers(travellers + 1)}
                className="w-[36px] h-[36px] rounded-full bg-surfaceElevated border border-borderActive flex items-center justify-center text-accentPurple"
              >
                <IconPlus size={18} />
              </button>
            </div>
          </div>

          <div className="bg-surface rounded-[14px] border border-borderDefault p-4">
            <h3 className="text-[12px] font-medium text-textPrimary mb-3 uppercase tracking-wide">Destination Type</h3>
            <div className="grid grid-cols-2 gap-2">
              {terrains.map((t) => (
                <button
                  key={t.name}
                  onClick={() => setSelectedTerrain(t.name)}
                  className={`flex items-center gap-2 p-3 rounded-[10px] border-[0.5px] transition-colors ${
                    selectedTerrain === t.name 
                      ? 'bg-surfaceAccent border-borderActive text-accentPurpleBright' 
                      : 'bg-bgBase border-borderDefault text-textMuted'
                  }`}
                >
                  <span className="text-[16px]">{t.icon}</span>
                  <span className="text-[13px] font-medium">{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-surface rounded-[14px] border border-borderDefault p-4 flex justify-between items-center">
            <div>
              <h3 className="text-[12px] font-medium text-textPrimary uppercase tracking-wide">Duration</h3>
            </div>
            <div className="flex items-center gap-2 text-accentPurpleBright font-medium text-[14px]">
              <span>5 – 7 Days</span>
              <IconChevronDown size={18} />
            </div>
          </div>

          <div className="bg-surface rounded-[14px] border border-borderDefault p-4">
            <h3 className="text-[12px] font-medium text-textPrimary mb-3 uppercase tracking-wide">Budget Range</h3>
            <div className="flex flex-wrap gap-2">
              {budgets.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBudget(b)}
                  className={`px-4 py-2 rounded-full border-[0.5px] text-[12px] font-medium transition-colors ${
                    selectedBudget === b 
                      ? 'bg-surfaceAccent border-borderActive text-accentPurpleBright' 
                      : 'bg-bgBase border-borderDefault text-textMuted'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/curated-plans')}
          className="w-full mt-8 py-4 rounded-[14px] bg-accentPurpleDeep text-textPrimary font-medium text-[15px] flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(58,31,90,0.3)]"
        >
          <IconSparkles size={18} />
          Curate My Yatra
        </button>
      </div>
    </div>
  );
};

export default GuideMyYatra;
