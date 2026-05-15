import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconHeart } from '@tabler/icons-react';

const Saved = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-bgBase flex flex-col items-center justify-center p-6 pb-[100px] text-center">
      <div className="w-20 h-20 rounded-full bg-[#2a1a42] flex items-center justify-center text-accentPurple mb-6">
        <IconHeart size={40} stroke={1.5} />
      </div>
      <h1 className="font-serif text-[24px] text-textPrimary mb-2">Your Favorites</h1>
      <p className="text-textMuted text-[14px] max-w-[240px] mb-8">
        Save your favorite temples and travel plans here for quick access later.
      </p>
      <button
        onClick={() => navigate('/home')}
        className="px-8 py-3 bg-accentPurpleDeep rounded-full text-white text-[14px] font-medium shadow-lg"
      >
        Start Exploring
      </button>
    </div>
  );
};

export default Saved;
