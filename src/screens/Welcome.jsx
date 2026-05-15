import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to Home after 2 seconds
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-full w-full bg-bgBase flex flex-col items-center justify-center p-6">
      <div className="w-[80px] h-[80px] rounded-full bg-[#12082a] border border-[#3a1f5a] flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(58,31,90,0.2)]">
        <span className="text-[28px]" aria-hidden="true">🙏</span>
      </div>
      
      <h2 className="font-serif text-[28px] text-textPrimary font-normal mb-1">Welcome,</h2>
      <h1 className="font-serif text-[34px] text-textPrimary font-semibold mb-8">Arjun</h1>
      
      <p className="text-[#4a3860] text-[11px] uppercase tracking-[0.12em] font-medium mb-12">
        Your Yatra Awaits
      </p>

      <div className="w-[6px] h-[6px] rounded-full bg-[#8060a0] animate-pulse"></div>
    </div>
  );
};

export default Welcome;
