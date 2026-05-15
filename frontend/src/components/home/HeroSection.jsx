import React, { useState } from 'react';
import { IconSearch, IconMapPin, IconCalendarEvent, IconChevronDown } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [fromCity, setFromCity] = useState('');
  const [isDestOpen, setIsDestOpen] = useState(false);

  const popularDestinations = ['Tirupati', 'Varanasi', 'Rameswaram', 'Madurai', 'Kedarnath'];

  return (
    <div className="relative w-full h-[600px] md:h-[700px] flex flex-col justify-end pb-12 px-6 md:px-16 overflow-hidden">
      {/* Background Image & Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/hero_temple_cinematic_1778623906123.png" 
          alt="Ancient Temple at Sunrise" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bgBase via-bgBase/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-bgBase/80 to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl">
        <span className="inline-block px-3 py-1 mb-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-goldAmber text-[11px] font-bold tracking-widest uppercase">
          Premium Spiritual Journeys
        </span>
        <h1 className="font-serif text-[42px] md:text-[64px] text-white leading-[1.1] mb-6 font-bold">
          Discover the soul of <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-goldAmber to-yellow-200">
            sacred destinations.
          </span>
        </h1>
        <p className="text-zinc-300 text-[16px] md:text-[18px] max-w-xl mb-10 leading-relaxed">
          Curated devotion. Handcrafted luxury. Embark on a seamless yatra designed exclusively for your peace of mind.
        </p>
      </div>

      {/* Horizontal Search Form Widget */}
      <div className="relative z-20 w-full max-w-6xl">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 md:p-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)] w-full">
          <div className="flex flex-col lg:flex-row gap-3">
            
            <div className="flex-[1.2] bg-black/40 hover:bg-black/60 transition-colors rounded-xl p-3 flex items-center gap-3 border border-transparent focus-within:border-goldAmber/50">
              <IconMapPin size={24} className="text-goldAmber shrink-0" stroke={1.5} />
              <div className="flex-1">
                <label className="block text-zinc-400 text-[10px] uppercase font-bold tracking-wider mb-0.5">From</label>
                <input type="text" placeholder="Departure city" className="w-full bg-transparent text-white text-[15px] font-medium outline-none placeholder:text-zinc-500" value={fromCity} onChange={(e) => setFromCity(e.target.value)} />
              </div>
            </div>

            <div className="hidden lg:block w-[1px] bg-white/10 my-2"></div>

            <div className="flex-[1.2] bg-black/40 hover:bg-black/60 transition-colors rounded-xl p-3 flex items-center gap-3 border border-transparent focus-within:border-goldAmber/50">
              <IconMapPin size={24} className="text-goldAmber shrink-0" stroke={1.5} />
              <div className="flex-1 relative">
                <label className="block text-zinc-400 text-[10px] uppercase font-bold tracking-wider mb-0.5">Destination</label>
                <div 
                  className="w-full flex items-center justify-between cursor-pointer"
                  onClick={() => setIsDestOpen(!isDestOpen)}
                >
                  <input type="text" placeholder="Where to?" className="w-full bg-transparent text-white text-[15px] font-medium outline-none placeholder:text-zinc-500 cursor-pointer pointer-events-none" value={destination} readOnly />
                  <IconChevronDown size={16} className={`text-zinc-400 transition-transform ${isDestOpen ? 'rotate-180' : ''}`} />
                </div>
                
                {isDestOpen && (
                  <div className="absolute top-[calc(100%+16px)] left-0 w-full min-w-[200px] bg-[#1a0a2e]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 z-50 shadow-2xl">
                    {popularDestinations.map(dest => (
                      <div 
                        key={dest}
                        onClick={(e) => {
                          e.stopPropagation();
                          setDestination(dest);
                          setIsDestOpen(false);
                        }}
                        className="px-4 py-3 text-white text-[14px] hover:bg-white/10 rounded-xl cursor-pointer transition-colors"
                      >
                        {dest}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="hidden lg:block w-[1px] bg-white/10 my-2"></div>

            <div className="flex-1 bg-black/40 hover:bg-black/60 transition-colors rounded-xl p-3 flex items-center gap-3 border border-transparent focus-within:border-goldAmber/50">
              <IconCalendarEvent size={24} className="text-goldAmber shrink-0" stroke={1.5} />
              <div className="flex-1">
                <label className="block text-zinc-400 text-[10px] uppercase font-bold tracking-wider mb-0.5">Travel Date</label>
                <input type="date" className="w-full bg-transparent text-white text-[15px] font-medium outline-none cursor-pointer [color-scheme:dark]" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} />
              </div>
            </div>

            <div className="hidden lg:block w-[1px] bg-white/10 my-2"></div>

            <div className="flex-1 bg-black/40 hover:bg-black/60 transition-colors rounded-xl p-3 flex items-center gap-3 border border-transparent focus-within:border-goldAmber/50">
              <IconCalendarEvent size={24} className="text-goldAmber shrink-0" stroke={1.5} />
              <div className="flex-1">
                <label className="block text-zinc-400 text-[10px] uppercase font-bold tracking-wider mb-0.5">Return Date</label>
                <input type="date" className="w-full bg-transparent text-white text-[15px] font-medium outline-none cursor-pointer [color-scheme:dark]" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
              </div>
            </div>

            <button 
              onClick={() => navigate('/temple-results', { state: { destination, date: travelDate } })}
              className="lg:w-[140px] bg-goldAmber hover:bg-yellow-400 transition-colors rounded-xl text-black font-bold text-[16px] flex items-center justify-center gap-2 py-4 lg:py-0 shadow-[0_0_20px_rgba(239,159,39,0.3)] hover:shadow-[0_0_30px_rgba(239,159,39,0.5)] z-10"
            >
              <IconSearch size={20} stroke={2.5}/>
              Search
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
