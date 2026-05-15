import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconUser, IconSettings, IconGasStation } from '@tabler/icons-react';

const CarResults = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchState = location.state || {};
  const pickupCity = searchState.pickupCity || 'Tirupati';
  const dropoffCity = searchState.dropoffCity || 'Local';
  const dateStr = searchState.date 
    ? new Date(searchState.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) 
    : '12–15 Jun';

  // Using mock data directly as requested, bypassing Firebase
  const mockCars = [
    { id: "c1", model: "Toyota Innova Crysta", type: "Premium SUV", seats: 7, pricePerKm: 18, status: "available", img: "/assets/explore_luxury_1778623955229.png", features: ['AC', 'Diesel', 'Manual'] },
    { id: "c2", model: "Maruti Swift Dzire", type: "Sedan", seats: 4, pricePerKm: 12, status: "available", img: "/assets/explore_adventure_1778623926947.png", features: ['AC', 'Petrol', 'Manual'] },
    { id: "c3", model: "Tempo Traveller", type: "Van", seats: 12, pricePerKm: 22, status: "available", img: "/assets/explore_luxury_1778623955229.png", features: ['AC', 'Diesel', 'Manual'] },
    { id: "c4", model: "Maruti Ertiga", type: "MPV", seats: 7, pricePerKm: 15, status: "available", img: "/assets/explore_adventure_1778623926947.png", features: ['AC', 'CNG', 'Manual'] },
  ];

  const [cars] = useState(mockCars);

  return (
    <div className="min-h-full bg-lightBg flex flex-col pb-[70px] items-center">
      <div className="w-full max-w-3xl flex flex-col w-full relative">
        <div className="sticky top-0 z-40 bg-bgBase/80 backdrop-blur-md px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-goldAmber hover:text-white transition-colors">
            <IconArrowLeft size={24} stroke={1.5} />
          </button>
          <div>
            <h1 className="font-serif text-[20px] text-textPrimary leading-tight">{pickupCity} to {dropoffCity}</h1>
            <p className="text-[11px] text-[#7a5a8a]">{dateStr} · Rentals</p>
          </div>
        </div>

        <div className="px-4 py-6">
          <h2 className="font-serif text-[20px] text-textPrimary mb-4">Available Cars</h2>
          
          <div className="space-y-4">
            {cars.map((car) => (
              <div key={car.id} className="bg-surfaceElevated rounded-[14px] border border-borderDefault p-4 hover:border-goldAmber/40 transition-colors shadow-sm flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="w-[100px] h-[70px] rounded-[8px] bg-black/40 border border-white/5 overflow-hidden shrink-0 shadow-inner relative">
                    <img src={car.img} alt={car.model} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-serif text-[18px] text-textPrimary leading-snug mb-0.5">{car.model}</h3>
                      <div className="text-right">
                        <div className="text-[16px] font-bold text-goldAmber">₹{car.pricePerKm}</div>
                        <div className="text-[10px] text-textMuted">per km</div>
                      </div>
                    </div>
                    <p className="text-[12px] text-lightText font-medium">{car.type}</p>
                    
                    <div className="flex gap-3 mt-2">
                      <div className="flex items-center gap-1 text-[11px] text-textMuted">
                        <IconUser size={12} /> {car.seats} Seats
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-textMuted">
                        <IconGasStation size={12} /> {car.features[1]}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-textMuted">
                        <IconSettings size={12} /> {car.features[2]}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2 border-t border-white/5">
                  <button className="flex-1 py-2.5 bg-goldAmber hover:bg-yellow-500 transition-colors rounded-[8px] text-black text-[13px] font-semibold tracking-wide shadow-[0_0_15px_rgba(239,159,39,0.2)]">Book Now</button>
                  <button className="flex-[0.4] py-2.5 border border-goldAmber/30 hover:bg-goldAmber/10 transition-colors rounded-[8px] text-goldAmber text-[13px] font-medium">Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarResults;
