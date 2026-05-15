import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconClock, IconMapPin } from '@tabler/icons-react';
import { useBooking } from '../context/BookingContext';
import { fetchBuses } from '../api';

const Buses = () => {
  const navigate = useNavigate();
  const { searchQuery, selectItem } = useBooking();
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBuses = async () => {
      try {
        const data = await fetchBuses(searchQuery.to);
        setBuses(data);
      } catch (error) {
        console.error('Failed to load buses:', error);
      } finally {
        setLoading(false);
      }
    };
    loadBuses();
  }, [searchQuery.to]);

  const handleBook = (bus) => {
    selectItem('bus', bus);
    navigate('/review-booking');
  };

  return (
    <div className="min-h-full bg-lightBg flex flex-col pb-[100px]">
      <div className="sticky top-0 z-40 bg-bgBase px-4 py-3 flex items-center gap-3 border-b-[0.5px] border-borderSubtle">
        <button onClick={() => navigate(-1)} className="text-accentPurple">
          <IconArrowLeft size={24} stroke={1.5} />
        </button>
        <div>
          <h1 className="font-serif text-[20px] text-textPrimary leading-tight">Buses to {searchQuery.to || 'City'}</h1>
          <p className="text-[11px] text-[#7a5a8a]">{searchQuery.startDate}</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {loading ? (
          <p className="text-textMuted text-center py-10">Searching bus routes...</p>
        ) : buses.length > 0 ? (
          buses.map((bus) => (
            <div key={bus.id} className="bg-surface rounded-[16px] border border-borderDefault p-4 shadow-md">
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#2a1a42] flex items-center justify-center text-[20px]">
                    {bus.icon}
                  </div>
                  <div>
                    <h3 className="text-textPrimary font-medium text-[15px]">{bus.name}</h3>
                    <p className="text-textMuted text-[11px]">{bus.type}</p>
                  </div>
                </div>
                <p className="text-accentPurpleBright font-bold text-[16px]">₹{bus.price}</p>
              </div>

              <div className="flex justify-between items-center bg-bgBase/50 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2">
                  <IconClock size={14} className="text-textMuted" />
                  <span className="text-[12px] text-textPrimary font-medium">{bus.departure}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconMapPin size={14} className="text-textMuted" />
                  <span className="text-[12px] text-textPrimary font-medium">{bus.location}</span>
                </div>
              </div>

              <button
                onClick={() => handleBook(bus)}
                className="w-full py-2.5 bg-accentPurpleDeep rounded-lg text-textPrimary text-[13px] font-medium transition-all active:scale-95"
              >
                Select Seat
              </button>
            </div>
          ))
        ) : (
          <p className="text-textMuted text-center py-10">No buses found.</p>
        )}
      </div>
    </div>
  );
};

export default Buses;
