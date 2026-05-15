import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconStar, IconMapPin } from '@tabler/icons-react';
import { useBooking } from '../context/BookingContext';
import { fetchHotels } from '../api';

const Hotels = () => {
  const navigate = useNavigate();
  const { searchQuery, selectItem } = useBooking();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHotels = async () => {
      try {
        const data = await fetchHotels(searchQuery.to);
        setHotels(data);
      } catch (error) {
        console.error('Failed to load hotels:', error);
      } finally {
        setLoading(false);
      }
    };
    loadHotels();
  }, [searchQuery.to]);

  const handleBook = (hotel) => {
    selectItem('hotel', hotel);
    navigate('/review-booking');
  };

  return (
    <div className="min-h-full bg-lightBg flex flex-col pb-[100px]">
      <div className="sticky top-0 z-40 bg-bgBase px-4 py-3 flex items-center gap-3 border-b-[0.5px] border-borderSubtle">
        <button onClick={() => navigate(-1)} className="text-accentPurple">
          <IconArrowLeft size={24} stroke={1.5} />
        </button>
        <div>
          <h1 className="font-serif text-[20px] text-textPrimary leading-tight">Hotels in {searchQuery.to || 'City'}</h1>
          <p className="text-[11px] text-[#7a5a8a]">{searchQuery.startDate}–{searchQuery.endDate}</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {loading ? (
          <p className="text-textMuted text-center py-10">Searching for stays...</p>
        ) : hotels.length > 0 ? (
          hotels.map((hotel) => (
            <div key={hotel.id} className="bg-surface rounded-[16px] border border-borderDefault overflow-hidden shadow-md">
              <div className="h-[140px] bg-[#2a1a42] flex items-center justify-center text-[48px]">
                {hotel.icon}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-serif text-[18px] text-textPrimary leading-tight">{hotel.name}</h3>
                  <div className="flex items-center gap-1 bg-tealNature/10 px-1.5 py-0.5 rounded text-tealNature text-[11px] font-bold">
                    <IconStar size={12} fill="currentColor" />
                    <span>{hotel.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-textMuted text-[11px] mb-4">
                  <IconMapPin size={12} />
                  <span>{hotel.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-textMuted text-[10px] uppercase font-bold tracking-wider">Per Night</p>
                    <p className="text-textPrimary font-bold text-[18px]">₹{hotel.price?.toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => handleBook(hotel)}
                    className="px-6 py-2 bg-accentPurpleDeep rounded-full text-textPrimary text-[13px] font-medium"
                  >
                    Select Room
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-textMuted text-center py-10">No hotels found.</p>
        )}
      </div>
    </div>
  );
};

export default Hotels;
