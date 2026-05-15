import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconHeart, IconArrowLeft } from '@tabler/icons-react';

const Saved = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-bgBase flex flex-col pb-[100px]">
      {/* Header */}
      <div className="relative px-6 py-6 flex items-center justify-between border-b border-borderDefault">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/5 transition-colors"
        >
          <IconArrowLeft size={20} className="text-textPrimary" />
        </button>
        <h1 className="font-serif text-[24px] text-textPrimary font-semibold absolute left-1/2 -translate-x-1/2">Saved</h1>
        <div className="w-8"></div>
      </div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-24 h-24 rounded-full bg-accentPurpleDeep/30 flex items-center justify-center mb-8">
          <IconHeart size={48} className="text-accentPurple" stroke={1} />
        </div>
        <h2 className="font-serif text-[24px] text-textPrimary mb-3">Your Favorites</h2>
        <p className="text-textMuted text-[14px] max-w-[260px] text-center mb-10">
          Save your favorite temples and travel plans here for quick access later.
        </p>
        <button
          onClick={() => navigate('/home')}
          className="px-8 py-3 bg-accentPurpleDeep rounded-full text-white text-[14px] font-semibold hover:bg-accentPurple transition-colors"
        >
          Start Exploring
        </button>
      </div>
    </div>
  );
};

export default Saved;
