import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconHeart, IconMessageCircle, IconShare, IconBookmark, IconSend } from '@tabler/icons-react';

const BlogDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-bgBase flex flex-col pb-[80px]">
      <div className="sticky top-0 z-40 bg-bgBase/80 backdrop-blur-md px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-accentPurple w-[34px] h-[34px] rounded-full bg-surface border border-borderDefault flex items-center justify-center">
          <IconArrowLeft size={18} stroke={1.5} />
        </button>
      </div>

      <div className="h-[90px] bg-[#3a1f5a] flex items-center justify-center mx-4 mt-2 rounded-[16px]">
        <span className="text-[40px]" aria-hidden="true">🏔️</span>
      </div>

      <div className="px-4 py-6">
        <span className="text-accentPurple text-[10px] uppercase font-bold tracking-wider mb-2 block">Hill Treks</span>
        <h1 className="font-serif text-[26px] text-goldAmber leading-tight mb-4">The ultimate guide to Amarnath Yatra 2025</h1>
        
        <div className="flex items-center justify-between mb-8 pb-6 border-b-[0.5px] border-borderSubtle">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-surfaceAccent flex items-center justify-center text-[10px] font-bold text-accentPurpleBright">ET</div>
            <div>
              <p className="text-[12px] text-textPrimary font-medium">Editorial Team</p>
              <p className="text-[10px] text-textMuted">12 May 2025</p>
            </div>
          </div>
          <button className="px-3 py-1.5 rounded-full border border-borderActive text-accentPurpleBright text-[11px] font-medium">
            Follow
          </button>
        </div>

        <div className="space-y-4 text-[12px] text-[#c8a8e8] leading-[1.8] opacity-90 mb-8">
          <p>
            The Amarnath Yatra is one of the most revered pilgrimages in Hinduism, taking devotees to the holy Amarnath Cave in Jammu and Kashmir. The journey is not just a test of faith but also of physical endurance, as it involves trekking through challenging mountainous terrains.
          </p>
          <p>
            Preparation is key. Ensure you start cardiovascular exercises at least a month before the yatra. The altitude can cause breathlessness, so physical fitness is non-negotiable. Additionally, pack layers of warm clothing, as the weather is highly unpredictable and can drop below freezing.
          </p>
          <p>
            Finally, remember that the journey is as important as the destination. The breathtaking views of the Himalayas and the chanting of fellow devotees create an atmosphere of profound spirituality that you will carry with you forever.
          </p>
        </div>

        <div className="flex items-center justify-between py-4 border-y-[0.5px] border-borderSubtle mb-8">
          <div className="flex gap-4 text-textMuted">
            <button className="flex items-center gap-1.5 text-[12px]"><IconHeart size={18} /> 1.2k</button>
            <button className="flex items-center gap-1.5 text-[12px]"><IconMessageCircle size={18} /> 28</button>
          </div>
          <div className="flex gap-3 text-textMuted">
            <button><IconShare size={18} /></button>
            <button><IconBookmark size={18} /></button>
          </div>
        </div>

        <div>
          <h3 className="font-serif text-[18px] text-textPrimary mb-4">Comments (28)</h3>
          
          <div className="space-y-4 mb-6">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-surfaceElevated flex items-center justify-center text-[10px] font-bold text-textMuted shrink-0">VK</div>
              <div>
                <p className="text-[11px] text-textPrimary font-medium mb-0.5">Vikram Kumar</p>
                <p className="text-[11px] text-textMuted">This was incredibly helpful. What kind of trekking shoes would you recommend?</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-surfaceElevated flex items-center justify-center text-[10px] font-bold text-textMuted shrink-0">SR</div>
              <div>
                <p className="text-[11px] text-textPrimary font-medium mb-0.5">Sneha R</p>
                <p className="text-[11px] text-textMuted">Beautifully written! Added to my bucket list for next year.</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 relative">
            <input 
              type="text" 
              placeholder="Add a comment..." 
              className="w-full bg-surface border border-borderDefault rounded-[10px] py-3 pl-3 pr-10 text-[12px] text-textPrimary outline-none"
            />
            <button className="absolute right-2 top-2 w-[28px] h-[28px] bg-accentPurpleDeep rounded-[6px] flex items-center justify-center text-textPrimary">
              <IconSend size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
