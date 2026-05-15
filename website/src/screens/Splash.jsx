import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to Home after 2.5 seconds
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div 
      className="h-full w-full flex flex-col items-center justify-center relative"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #1a0a2e 0%, #06060f 70%)'
      }}
    >
      <div className="relative w-[100px] h-[100px] rounded-full border border-[#2d1f4a] flex items-center justify-center mb-6">
        <div className="absolute inset-[6px] rounded-full border border-[#4a2f6a] flex items-center justify-center">
          <div className="w-[10px] h-[10px] rounded-full bg-textPrimary opacity-60"></div>
        </div>
      </div>
      
      <h1 className="font-serif text-[38px] font-semibold text-textPrimary tracking-[0.08em] leading-none mb-3">
        Aura Yatra
      </h1>
      <p className="text-[#7a6a4a] text-[10px] tracking-[0.25em] uppercase font-medium">
        Sacred Journeys Await
      </p>
    </div>
  );
};

export default Splash;
