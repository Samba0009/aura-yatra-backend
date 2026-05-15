import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconUsers, IconGasStation } from '@tabler/icons-react';
import { useBooking } from '../context/BookingContext';
import { fetchCabs } from '../api';

const Cabs = () => {
  const navigate = useNavigate();
  const { searchQuery, selectItem } = useBooking();
  const [cabs, setCabs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCabs = async () => {
      try {
        const data = await fetchCabs(searchQuery.to);
        setCabs(data);
      } catch (error) {
        console.error('Failed to load cabs:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCabs();
  }, [searchQuery.to]);

  const handleBook = (cab) => {
    selectItem('cab', cab);
    navigate('/review-booking');
  };

  return (
    <div className="min-h-full bg-lightBg flex flex-col pb-[100px]">
      <div className="sticky top-0 z-40 bg-bgBase px-4 py-3 flex items-center gap-3 border-b-[0.5px] border-borderSubtle">
        <button onClick={() => navigate(-1)} className="text-accentPurple">
          <IconArrowLeft size={24} stroke={1.5} />
        </button>
        <div>
          <h1 className="font-serif text-[20px] text-textPrimary leading-tight">Cabs in {searchQuery.to || 'City'}</h1>
          <p className="text-[11px] text-[#7a5a8a]">Local & Outstation</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {loading ? (
          <p className="text-textMuted text-center py-10">Finding available rides...</p>
        ) : cabs.length > 0 ? (
          cabs.map((cab) => (
            <div key={cab.id} className="bg-surface rounded-[16px] border border-borderDefault p-4 flex gap-4 items-center shadow-md">
              <div className="w-20 h-20 rounded-xl bg-[#2a1a42] flex items-center justify-center text-[40px]">
                {cab.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-textPrimary font-medium text-[16px] mb-1">{cab.name}</h3>
                <div className="flex gap-3 text-[11px] text-textMuted mb-3">
                  <div className="flex items-center gap-1">
                    <IconUsers size={12} />
                    <span>{cab.capacity} seats</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IconGasStation size={12} />
                    <span>AC</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-textPrimary font-bold text-[16px]">₹{cab.price}</p>
                  <button
                    onClick={() => handleBook(cab)}
                    className="px-4 py-1.5 bg-accentPurpleDeep rounded-full text-textPrimary text-[12px] font-medium"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-textMuted text-center py-10">No cabs found.</p>
        )}
      </div>
    </div>
  );
};

export default Cabs;
