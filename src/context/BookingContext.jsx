import React, { createContext, useContext, useState, useEffect } from 'react';
import { createBooking as apiCreateBooking } from '../api';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState({
    from: 'Hyderabad',
    to: 'Tirupati',
    startDate: '12 Jun 2025',
    endDate: '15 Jun 2025',
    travellers: 2
  });

  const [guidePreferences, setGuidePreferences] = useState({
    travellers: 4,
    terrain: 'Hill Stations',
    duration: '5 – 7 Days',
    budget: '₹15k Mid-range'
  });

  const [selection, setSelection] = useState({
    type: null, // 'temple' | 'plan'
    item: null
  });

  const [travellersDetails, setTravellersDetails] = useState({
    name: 'Arjun Kumar',
    age: 32,
    gender: 'Male',
    idType: 'Aadhar',
    idNumber: '',
    mobile: '+91 98765 43210',
    email: 'arjun@example.com'
  });

  const [bookingResponse, setBookingResponse] = useState(null);

  const updateSearchQuery = (updates) => {
    setSearchQuery(prev => ({ ...prev, ...updates }));
  };

  const updateGuidePreferences = (updates) => {
    setGuidePreferences(prev => ({ ...prev, ...updates }));
  };

  const selectItem = (type, item) => {
    setSelection({ type, item });
  };

  const submitBooking = async () => {
    try {
      const data = {
        item_id: selection.item.id,
        item_type: selection.type,
        item_name: selection.item.name || selection.item.title,
        item_location: selection.item.location,
        item_price: selection.item.price,
        item_icon: selection.item.icon || selection.item.image,
        user_details: travellersDetails,
        booking_date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      };
      const response = await apiCreateBooking(data);
      setBookingResponse(response);
      return response;
    } catch (error) {
      console.error('Booking failed:', error);
      throw error;
    }
  };

  return (
    <BookingContext.Provider value={{
      searchQuery,
      updateSearchQuery,
      guidePreferences,
      updateGuidePreferences,
      selection,
      selectItem,
      travellersDetails,
      setTravellersDetails,
      submitBooking,
      bookingResponse
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
