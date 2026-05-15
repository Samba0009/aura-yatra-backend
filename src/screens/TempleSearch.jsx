import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconMapPin, IconCalendar, IconBuildingMonument, IconSearch } from '@tabler/icons-react';

const TempleSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const incomingState = location.state || {};
  
  const [fromCity, setFromCity] = React.useState('Hyderabad');
  const [travelDate, setTravelDate] = React.useState(incomingState.date || '2025-06-12');
  const [returnDate, setReturnDate] = React.useState('2025-06-15');
  const [destination, setDestination] = React.useState(incomingState.destination || 'Tirupati');

  return (
    <div className="min-h-full bg-bgBase flex flex-col w-full relative font-sans">
      
      {/* Cinematic Header Background */}
      <div className="w-full h-[350px] relative overflow-hidden flex flex-col justify-between">
        <img 
          src="/assets/hero_temple_cinematic_1778623906123.png" 
          alt="Ancient Temple" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-bgBase"></div>
        
        <div className="relative z-10 px-6 md:px-12 py-6 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white/70 hover:text-white transition-colors bg-white/5 p-2 rounded-full backdrop-blur-sm border border-white/10">
            <IconArrowLeft size={20} stroke={2} />
          </button>
          <div>
            <h1 className="font-serif text-[24px] text-white leading-tight font-bold">Temple Yatra</h1>
            <p className="text-[10px] text-goldAmber tracking-[0.2em] uppercase font-bold">Aura Concierge</p>
          </div>
        </div>

        <div className="relative z-10 px-6 md:px-12 pb-12">
          <h2 className="font-serif text-[36px] md:text-[48px] text-white leading-[1.1] mb-3 font-bold">
            Plan your next <span className="text-transparent bg-clip-text bg-gradient-to-r from-goldAmber to-yellow-200">devotional trip</span>
          </h2>
          <p className="text-zinc-300 text-[16px] max-w-xl">
            Sacred journeys, curated for you. Search across thousands of verified temples and accommodations.
          </p>
        </div>
      </div>

      {/* Horizontal Search Form Widget */}
      <div className="px-6 md:px-12 w-full relative z-20 -mt-8 mb-12">
        <div className="bg-[#18181b]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col lg:flex-row gap-3">
            
            <div className="flex-1 bg-white/5 hover:bg-white/10 transition-colors rounded-xl p-3 flex items-center gap-3 border border-transparent focus-within:border-goldAmber/50">
              <IconMapPin size={24} className="text-goldAmber shrink-0" stroke={1.5} />
              <div className="flex-1">
                <label className="block text-zinc-400 text-[10px] uppercase font-bold tracking-wider mb-0.5">From</label>
                <input type="text" placeholder="Departure city" className="w-full bg-transparent text-white text-[15px] font-medium outline-none placeholder:text-zinc-600" value={fromCity} onChange={(e) => setFromCity(e.target.value)} />
              </div>
            </div>

            <div className="hidden lg:block w-[1px] bg-white/10 my-2"></div>

            <div className="flex-1 bg-white/5 hover:bg-white/10 transition-colors rounded-xl p-3 flex items-center gap-3 border border-transparent focus-within:border-goldAmber/50">
              <IconBuildingMonument size={24} className="text-goldAmber shrink-0" stroke={1.5} />
              <div className="flex-1">
                <label className="block text-zinc-400 text-[10px] uppercase font-bold tracking-wider mb-0.5">Destination</label>
                <input type="text" placeholder="Temples, cities..." className="w-full bg-transparent text-white text-[15px] font-medium outline-none placeholder:text-zinc-600" value={destination} onChange={(e) => setDestination(e.target.value)} />
              </div>
            </div>

            <div className="hidden lg:block w-[1px] bg-white/10 my-2"></div>

            <div className="flex-[0.8] bg-white/5 hover:bg-white/10 transition-colors rounded-xl p-3 flex items-center gap-3 border border-transparent focus-within:border-goldAmber/50">
              <IconCalendar size={24} className="text-goldAmber shrink-0" stroke={1.5} />
              <div className="flex-1">
                <label className="block text-zinc-400 text-[10px] uppercase font-bold tracking-wider mb-0.5">Travel Date</label>
                <input type="date" className="w-full bg-transparent text-white text-[15px] font-medium outline-none cursor-pointer [color-scheme:dark]" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} />
              </div>
            </div>

            <div className="hidden lg:block w-[1px] bg-white/10 my-2"></div>

            <div className="flex-[0.8] bg-white/5 hover:bg-white/10 transition-colors rounded-xl p-3 flex items-center gap-3 border border-transparent focus-within:border-goldAmber/50">
              <IconCalendar size={24} className="text-goldAmber shrink-0" stroke={1.5} />
              <div className="flex-1">
                <label className="block text-zinc-400 text-[10px] uppercase font-bold tracking-wider mb-0.5">Return Date</label>
                <input type="date" className="w-full bg-transparent text-white text-[15px] font-medium outline-none cursor-pointer [color-scheme:dark]" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
              </div>
            </div>

            <button 
              onClick={() => navigate('/temple-results', { state: { destination, date: travelDate } })}
              className="lg:w-[160px] bg-goldAmber hover:bg-yellow-400 transition-colors rounded-xl text-black font-bold text-[16px] flex items-center justify-center gap-2 py-4 lg:py-0 shadow-[0_0_20px_rgba(239,159,39,0.2)] hover:shadow-[0_0_30px_rgba(239,159,39,0.4)]"
            >
              <IconSearch size={20} stroke={2.5}/>
              Search
            </button>

          </div>
        </div>
      </div>
      
      {/* Optional: Popular Searches or Recent space */}
      <div className="px-6 md:px-12 flex-1 pb-12">
        <h3 className="text-white font-serif text-[20px] mb-6">Popular Yatras</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Tirupati Balaji', 'Kashi Vishwanath', 'Mata Vaishno Devi', 'Kedarnath'].map((temple, i) => (
             <div key={i} onClick={() => setDestination(temple)} className="bg-surfaceElevated hover:bg-white/10 border border-borderDefault hover:border-goldAmber/50 transition-all cursor-pointer rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2">
                <IconBuildingMonument size={28} className="text-goldAmber" stroke={1.5}/>
                <span className="text-white text-[14px] font-medium">{temple}</span>
             </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default TempleSearch;
